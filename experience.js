"use strict";

/* Homepage-only WebGL tower controller. app.js owns routing/markup; this file owns the 3D tower and scroll journey. */
(() => {
  const THREE_URL='https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.min.js';
  const FLOOR_START=.11;
  const FLOOR_END=.89;
  const clamp=value=>Math.max(0,Math.min(1,value));
  const lerp=(from,to,t)=>from+(to-from)*t;
  const smoothstep=(from,to,value)=>{
    const t=clamp((value-from)/(to-from));
    return t*t*(3-(2*t));
  };
  const easeOutCubic=t=>1-Math.pow(1-clamp(t),3);
  const easeInOutCubic=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  const cubic=(a,b,c,d,t)=>{
    const u=1-t;
    return (u*u*u*a)+(3*u*u*t*b)+(3*u*t*t*c)+(t*t*t*d);
  };

  function canUseWebGL(){
    try{
      const canvas=document.createElement('canvas');
      return !!(window.WebGL2RenderingContext&&canvas.getContext('webgl2'))||!!canvas.getContext('webgl');
    }catch(_error){
      return false;
    }
  }

  async function initTowerExperience(){
    const journey=document.getElementById('tower-journey');
    const stage=document.getElementById('tower-stage');
    const host=document.getElementById('tower-webgl');
    const state=document.getElementById('tower-state');
    const progress=document.getElementById('journey-progress');
    const marker=document.getElementById('journey-marker');
    const tracker=document.getElementById('floor-nav');
    const labels=[...document.querySelectorAll('.tower-floor-label')];
    const buttons=[...document.querySelectorAll('#floor-nav button')];
    if(!journey||!stage||!host||!state||!progress||!marker||!tracker||labels.length!==services.length||buttons.length!==services.length)return;
    if(journey.dataset.experience==='ready')return;

    journey.dataset.experience='ready';
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed=false;
    let frameId=0;
    let activeFloor=-1;
    let targetProgress=0;
    let visualProgress=0;
    let journeyTop=0;
    let maxScroll=1;
    let viewportWidth=1;
    let viewportHeight=1;
    let renderer=null;
    let scene=null;
    let camera=null;
    let towerRoot=null;
    let floorMaterials=[];
    let floorAnchors=[];
    let accentLight=null;
    let THREE=null;

    let storyFrom=-1;
    let storyTo=-1;
    let storyDirection=1;
    let storyStartedAt=0;
    let storyDuration=840;
    let storyAnimating=false;
    let storyFromStart=null;
    let storyToStart=null;
    const storyVisuals=labels.map(()=>({x:0,y:0,z:0,rx:0,ry:0,scale:1,opacity:0}));

    const isMobile=()=>window.innerWidth<=680;
    const isTablet=()=>window.innerWidth<=980;
    const floorProgress=value=>clamp((value-FLOOR_START)/(FLOOR_END-FLOOR_START));
    const scrollForFloor=index=>FLOOR_START+(index/(services.length-1))*(FLOOR_END-FLOOR_START);
    const copyStoryState=value=>({...value});

    /* Keep page scroll continuous. Near a floor centre, only the rendered tower gets a
       gentle magnetic settle; this avoids fighting the browser with a second smooth scroll. */
    const magneticFloorRaw=raw=>{
      if(reducedMotion.matches)return raw;
      const nearest=Math.round(raw);
      const delta=raw-nearest;
      const distance=Math.abs(delta);
      const radius=isMobile()?.16:(isTablet()?.20:.24);
      if(!distance||distance>=radius)return raw;
      const release=smoothstep(0,radius,distance);
      const strength=isMobile()?.48:(isTablet()?.58:.66);
      return raw-(delta*strength*(1-release));
    };

    labels.forEach(label=>{
      const heading=label.querySelector('.tower-label-copy h3');
      if(!heading)return;
      heading.style.background='linear-gradient(100deg,#e6a946 0%,#da7839 100%)';
      heading.style.backgroundClip='text';
      heading.style.webkitBackgroundClip='text';
      heading.style.color='transparent';
      heading.style.webkitTextFillColor='transparent';
      heading.style.webkitTextStroke='.4px rgba(246,190,89,.26)';
      heading.style.textShadow='0 1px 0 rgba(255,197,100,.12),2px 2px 0 rgba(74,43,28,.38),0 12px 24px rgba(0,0,0,.18)';
      heading.style.filter='drop-shadow(0 10px 20px rgba(0,0,0,.16))';
    });

    const setStoryState=(index,next)=>{
      if(index<0||index>=labels.length)return;
      const label=labels[index];
      storyVisuals[index]=next;
      label.style.setProperty('--story-x',`${next.x.toFixed(2)}px`);
      label.style.setProperty('--story-y',`${next.y.toFixed(2)}px`);
      label.style.setProperty('--story-z',`${next.z.toFixed(2)}px`);
      label.style.setProperty('--story-rx',`${next.rx.toFixed(2)}deg`);
      label.style.setProperty('--story-ry',`${next.ry.toFixed(2)}deg`);
      label.style.setProperty('--story-scale',next.scale.toFixed(4));
      label.style.setProperty('--story-opacity',next.opacity.toFixed(4));
    };

    const hiddenStoryState=()=>({x:0,y:0,z:0,rx:0,ry:0,scale:.985,opacity:0});
    const centeredStoryState=()=>({x:0,y:0,z:0,rx:0,ry:0,scale:1,opacity:1});

    const storyMetrics=()=>{
      if(isMobile())return{vertical:46,horizontal:0,depth:0};
      const tablet=isTablet();
      return{
        vertical:tablet?Math.min(112,Math.max(82,viewportHeight*.125)):Math.min(142,Math.max(102,viewportHeight*.15)),
        horizontal:tablet?Math.min(62,Math.max(42,viewportWidth*.045)):Math.min(88,Math.max(56,viewportWidth*.055)),
        depth:tablet?Math.min(42,Math.max(28,viewportWidth*.03)):Math.min(58,Math.max(36,viewportWidth*.035))
      };
    };

    const outgoingStoryState=(t,direction,metrics)=>{
      if(isMobile()){
        const eased=easeInOutCubic(t);
        return{x:0,y:-metrics.vertical*eased,z:0,rx:0,ry:0,scale:1,opacity:1-smoothstep(.04,.82,t)};
      }
      const side=direction>0?-1:1;
      const eased=easeInOutCubic(t);
      return{
        x:cubic(0,metrics.horizontal*.18*side,metrics.horizontal*.62*side,metrics.horizontal*.32*side,eased),
        y:cubic(0,-metrics.vertical*.1,-metrics.vertical*.48,-metrics.vertical*.82,eased),
        z:cubic(0,-metrics.depth*.08,-metrics.depth*.5,-metrics.depth*.72,eased),
        rx:cubic(0,-.08,-.35,-.55,eased),
        ry:cubic(0,side*.12,side*.58,side*.82,eased),
        scale:lerp(1,.982,eased),
        opacity:1-smoothstep(.08,.86,t)
      };
    };

    const incomingStoryState=(t,direction,metrics)=>{
      if(isMobile()){
        const eased=easeInOutCubic(t);
        return{x:0,y:metrics.vertical*(1-eased),z:0,rx:0,ry:0,scale:1,opacity:smoothstep(.12,.9,t)};
      }
      const side=direction>0?-1:1;
      const eased=easeInOutCubic(t);
      return{
        x:cubic(-metrics.horizontal*.38*side,-metrics.horizontal*.6*side,-metrics.horizontal*.2*side,0,eased),
        y:cubic(metrics.vertical*.82,metrics.vertical*.7,metrics.vertical*.18,0,eased),
        z:cubic(-metrics.depth*.72,-metrics.depth*.58,-metrics.depth*.12,0,eased),
        rx:cubic(.5,.38,.08,0,eased),
        ry:cubic(-side*.76,-side*.52,-side*.08,0,eased),
        scale:lerp(.982,1,eased),
        opacity:smoothstep(.08,.9,t)
      };
    };

    const preserveStart=(canonical,start,base,t)=>{
      if(!start)return canonical;
      const carry=1-easeOutCubic(t);
      return{
        x:canonical.x+((start.x-base.x)*carry),
        y:canonical.y+((start.y-base.y)*carry),
        z:canonical.z+((start.z-base.z)*carry),
        rx:canonical.rx+((start.rx-base.rx)*carry),
        ry:canonical.ry+((start.ry-base.ry)*carry),
        scale:canonical.scale+((start.scale-base.scale)*carry),
        opacity:clamp(canonical.opacity+((start.opacity-base.opacity)*carry))
      };
    };

    const setFloor=index=>{
      if(index===activeFloor)return;
      activeFloor=index;
      const service=services[index];
      stage.dataset.floor=service[1];
      stage.setAttribute('aria-label',`DigiBuilder tower, floor ${service[1]} of 06: ${service[2]}`);
      state.textContent=`${service[1]} / 06`;

      buttons.forEach((button,buttonIndex)=>{
        const active=buttonIndex===index;
        button.classList.toggle('active',active);
        if(active)button.setAttribute('aria-current','step');
        else button.removeAttribute('aria-current');
      });

      labels.forEach((label,labelIndex)=>{
        const active=labelIndex===index;
        label.classList.toggle('active',active);
        label.setAttribute('aria-hidden',active?'false':'true');
      });
    };

    const updateStory=now=>{
      const reduced=reducedMotion.matches;
      if(activeFloor<0)return;

      if(reduced){
        storyAnimating=false;
        labels.forEach((_label,index)=>setStoryState(index,index===activeFloor?centeredStoryState():hiddenStoryState()));
        storyFrom=activeFloor;
        storyTo=activeFloor;
        return;
      }

      if(!storyAnimating){
        labels.forEach((_label,index)=>setStoryState(index,index===activeFloor?centeredStoryState():hiddenStoryState()));
        return;
      }

      const t=clamp((now-storyStartedAt)/storyDuration);
      const metrics=storyMetrics();
      labels.forEach((_label,index)=>{
        if(index!==storyFrom&&index!==storyTo&&storyVisuals[index].opacity!==0)setStoryState(index,hiddenStoryState());
      });

      if(storyFrom>=0&&storyFrom!==storyTo){
        const canonical=outgoingStoryState(t,storyDirection,metrics);
        const fromState=preserveStart(canonical,storyFromStart,centeredStoryState(),t);
        setStoryState(storyFrom,fromState);
      }

      const incomingBase=incomingStoryState(0,storyDirection,metrics);
      const incoming=preserveStart(incomingStoryState(t,storyDirection,metrics),storyToStart,incomingBase,t);
      setStoryState(storyTo,incoming);

      if(t>=1){
        storyAnimating=false;
        storyFrom=storyTo=activeFloor;
        storyFromStart=null;
        storyToStart=null;
        labels.forEach((_label,index)=>setStoryState(index,index===activeFloor?centeredStoryState():hiddenStoryState()));
      }
    };

    const startStoryTransition=(nextFloor,now)=>{
      if(nextFloor===activeFloor)return;
      if(activeFloor<0||reducedMotion.matches){
        setFloor(nextFloor);
        storyFrom=storyTo=nextFloor;
        storyAnimating=false;
        updateStory(now);
        return;
      }

      updateStory(now);
      const previousFloor=activeFloor;
      const visibleCandidates=[storyFrom,storyTo,previousFloor]
        .filter((index,position,array)=>index>=0&&index!==nextFloor&&array.indexOf(index)===position)
        .sort((a,b)=>storyVisuals[b].opacity-storyVisuals[a].opacity);
      const fromFloor=visibleCandidates[0]??previousFloor;
      const direction=nextFloor>previousFloor?1:-1;
      const metrics=storyMetrics();
      const nextCurrentlyVisible=storyVisuals[nextFloor].opacity>.015;

      storyFrom=fromFloor;
      storyTo=nextFloor;
      storyDirection=direction;
      storyStartedAt=now;
      storyDuration=isMobile()?560:(isTablet()?780:840);
      storyFromStart=copyStoryState(storyVisuals[fromFloor]||centeredStoryState());
      storyToStart=nextCurrentlyVisible?copyStoryState(storyVisuals[nextFloor]):incomingStoryState(0,direction,metrics);
      storyAnimating=true;
      setFloor(nextFloor);
    };

    const updateTracker=(value,now)=>{
      const raw=floorProgress(value)*(services.length-1);
      const index=Math.min(services.length-1,Math.max(0,Math.round(raw)));
      const amount=clamp(raw/(services.length-1));
      if(index!==activeFloor)startStoryTransition(index,now);
      progress.style.transform=`scaleY(${amount})`;
      marker.style.top=`${amount*100}%`;
      stage.style.setProperty('--journey-progress',String(value));
    };

    const applyScene=value=>{
      if(!THREE||!camera||!towerRoot||!renderer)return;
      const mobile=isMobile();
      const tablet=isTablet();
      const reduced=reducedMotion.matches;
      const scrollFocused=floorProgress(value);
      const scrollRaw=scrollFocused*(services.length-1);
      const raw=magneticFloorRaw(scrollRaw);
      const focused=raw/(services.length-1);
      const low=Math.floor(raw);
      const high=Math.min(services.length-1,Math.ceil(raw));
      const fraction=raw-low;
      const currentY=lerp(floorAnchors[low].y,floorAnchors[high].y,fraction);
      const towerOffsetX=mobile?0:(tablet?.9:2.65);

      towerRoot.position.x=towerOffsetX;
      floorMaterials.forEach((material,index)=>{
        const proximity=1-Math.min(1,Math.abs(index-raw));
        material.emissiveIntensity=.16+(proximity*(mobile?1.65:2.25));
        material.opacity=.58+(proximity*.34);
      });

      const enter=smoothstep(0,.13,value);
      const exit=smoothstep(.89,1,value);
      if(reduced){
        camera.position.set(mobile?2.1:5.8,mobile?1.25:1.05,mobile?30:32.5);
        camera.fov=mobile?48:41;
        camera.lookAt(0,mobile?1.45:1.2,0);
        towerRoot.rotation.y=-.055;
      }else{
        const startX=mobile?2.5:(tablet?4.4:6.8);
        const focusX=mobile?1.45:(tablet?3.6:5.1);
        const startZ=mobile?30:(tablet?32:34);
        const focusZ=mobile?20.2:(tablet?20:18.5);
        const focusY=currentY+.12;
        const settleY=lerp(focusY,-3.8,exit);
        const settleZ=focusZ+(exit*(mobile?5.2:7.3));
        const settleX=focusX+(exit*(mobile?.45:1.0));
        const drift=Math.sin(focused*Math.PI*1.35)*(mobile?.08:.28);
        const lookX=0;
        const entryCameraY=mobile?1.35:(tablet?1.2:1.08);
        const entryLookY=mobile?1.62:(tablet?1.48:1.36);
        const entryFov=mobile?48:(tablet?43:40.5);
        const focusFov=mobile?44:(tablet?41:38);

        camera.position.x=lerp(startX,settleX,enter)+drift;
        camera.position.y=lerp(entryCameraY,settleY,enter);
        camera.position.z=lerp(startZ,settleZ,enter);
        camera.fov=lerp(entryFov,focusFov,enter);
        const lookY=lerp(entryLookY,lerp(currentY,-4.5,exit),enter);
        camera.lookAt(lookX,lookY,0);
        towerRoot.rotation.y=-.055+(Math.sin(focused*Math.PI)*.018);
      }
      camera.updateProjectionMatrix();

      if(accentLight){
        accentLight.position.x=towerOffsetX;
        accentLight.position.y=currentY+.1;
        accentLight.intensity=mobile?12:20;
      }

      renderer.render(scene,camera);
    };

    const tick=now=>{
      frameId=0;
      if(disposed)return;
      const reduced=reducedMotion.matches;
      visualProgress=reduced?targetProgress:lerp(visualProgress,targetProgress,.14);
      if(Math.abs(visualProgress-targetProgress)<.0005)visualProgress=targetProgress;
      updateTracker(visualProgress,now);
      updateStory(now);
      applyScene(visualProgress);
      if(Math.abs(visualProgress-targetProgress)>.0005||storyAnimating)scheduleFrame();
    };

    const scheduleFrame=()=>{
      if(!frameId&&!disposed)frameId=requestAnimationFrame(tick);
    };

    const syncScroll=()=>{
      targetProgress=clamp((window.scrollY-journeyTop)/maxScroll);
      scheduleFrame();
    };

    const measure=()=>{
      journeyTop=journey.getBoundingClientRect().top+window.scrollY;
      maxScroll=Math.max(1,journey.offsetHeight-window.innerHeight);
      viewportWidth=Math.max(1,host.clientWidth||stage.clientWidth);
      viewportHeight=Math.max(1,host.clientHeight||stage.clientHeight);

      if(renderer&&camera){
        const mobile=isMobile();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,mobile?1.25:1.65));
        renderer.setSize(viewportWidth,viewportHeight,false);
        camera.aspect=viewportWidth/viewportHeight;
        camera.updateProjectionMatrix();
      }
      syncScroll();
    };

    const go=index=>{
      const destination=journeyTop+(maxScroll*scrollForFloor(index));
      window.scrollTo({top:destination,behavior:reducedMotion.matches?'auto':'smooth'});
    };

    const buttonHandlers=buttons.map((button,index)=>{
      const handler=()=>go(index);
      button.addEventListener('click',handler);
      return[button,handler];
    });

    const onMotionChange=()=>{
      stage.classList.toggle('reduced-motion',reducedMotion.matches);
      visualProgress=targetProgress;
      storyAnimating=false;
      scheduleFrame();
    };

    window.addEventListener('scroll',syncScroll,{passive:true});
    window.addEventListener('resize',measure,{passive:true});
    reducedMotion.addEventListener?.('change',onMotionChange);
    reducedMotion.addListener?.(onMotionChange);
    stage.classList.toggle('reduced-motion',reducedMotion.matches);
    measure();

    towerCleanup=()=>{
      disposed=true;
      window.removeEventListener('scroll',syncScroll);
      window.removeEventListener('resize',measure);
      reducedMotion.removeEventListener?.('change',onMotionChange);
      reducedMotion.removeListener?.(onMotionChange);
      buttonHandlers.forEach(([button,handler])=>button.removeEventListener('click',handler));
      if(frameId)cancelAnimationFrame(frameId);
      frameId=0;

      if(scene){
        const geometries=new Set();
        const materials=new Set();
        scene.traverse(object=>{
          if(object.geometry)geometries.add(object.geometry);
          if(Array.isArray(object.material))object.material.forEach(material=>materials.add(material));
          else if(object.material)materials.add(object.material);
        });
        geometries.forEach(geometry=>geometry.dispose?.());
        materials.forEach(material=>material.dispose?.());
      }
      renderer?.dispose?.();
      renderer?.forceContextLoss?.();
      host.replaceChildren();
    };

    if(!canUseWebGL()){
      stage.classList.add('webgl-failed');
      scheduleFrame();
      return;
    }

    try{
      THREE=await import(THREE_URL);
    }catch(error){
      console.warn('DigiBuilder tower: Three.js could not load, using the static fallback.',error);
      if(!disposed)stage.classList.add('webgl-failed');
      return;
    }
    if(disposed||!stage.isConnected)return;

    try{
      scene=new THREE.Scene();
      scene.fog=new THREE.FogExp2(0x03121c,.025);
      camera=new THREE.PerspectiveCamera(38,viewportWidth/viewportHeight,.1,100);
      renderer=new THREE.WebGLRenderer({alpha:true,antialias:!isMobile(),powerPreference:'high-performance'});
      renderer.setClearColor(0x000000,0);
      renderer.outputColorSpace=THREE.SRGBColorSpace;
      renderer.toneMapping=THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure=1.08;
      renderer.domElement.className='tower-canvas';
      host.replaceChildren(renderer.domElement);

      const geometryCache=new Map();
      const boxGeometry=(width,height,depth)=>{
        const key=`${width}:${height}:${depth}`;
        if(!geometryCache.has(key))geometryCache.set(key,new THREE.BoxGeometry(width,height,depth));
        return geometryCache.get(key);
      };
      const addBox=(parent,width,height,depth,x,y,z,material)=>{
        const mesh=new THREE.Mesh(boxGeometry(width,height,depth),material);
        mesh.position.set(x,y,z);
        parent.add(mesh);
        return mesh;
      };

      const glass=new THREE.MeshStandardMaterial({color:0x071b28,roughness:.24,metalness:.7,transparent:true,opacity:.94});
      const smokedGlass=new THREE.MeshStandardMaterial({color:0x0a2736,roughness:.3,metalness:.62,transparent:true,opacity:.9});
      const metal=new THREE.MeshStandardMaterial({color:0x102f3a,roughness:.36,metalness:.9});
      const darkMetal=new THREE.MeshStandardMaterial({color:0x06131b,roughness:.42,metalness:.84});
      const tealMetal=new THREE.MeshStandardMaterial({color:0x174d59,emissive:0x0b3845,emissiveIntensity:.28,roughness:.3,metalness:.82});
      const gold=new THREE.MeshStandardMaterial({color:0xc17b1b,emissive:0xe76620,emissiveIntensity:.85,roughness:.3,metalness:.78});

      towerRoot=new THREE.Group();
      towerRoot.position.y=-.15;
      scene.add(towerRoot);

      addBox(towerRoot,6.25,17.6,3.65,0,0,0,glass);
      addBox(towerRoot,1.15,15.9,4.25,-3.42,-.6,-.1,smokedGlass);
      addBox(towerRoot,.88,13.8,4.55,3.48,-1.65,.05,darkMetal);
      addBox(towerRoot,2.42,16.75,.24,.2,-.15,1.95,darkMetal);
      addBox(towerRoot,1.15,16.95,.16,-1.63,-.05,2.08,smokedGlass);

      [-2.72,-1.86,1.88,2.72].forEach(x=>addBox(towerRoot,.075,17.9,.24,x,0,2.08,tealMetal));
      [-3.08,3.08].forEach(x=>addBox(towerRoot,.12,18.0,3.96,x,0,0,metal));

      const floorYs=[6.75,4.05,1.35,-1.35,-4.05,-6.75];
      floorMaterials=floorYs.map((y,index)=>{
        const material=new THREE.MeshStandardMaterial({
          color:index%2===0?0x0d5265:0x0b4558,
          emissive:0x1594b8,
          emissiveIntensity:index===0?2.2:.16,
          roughness:.2,
          metalness:.42,
          transparent:true,
          opacity:index===0?.92:.58
        });
        addBox(towerRoot,5.55,1.72,.10,.05,y,2.04,material);
        addBox(towerRoot,.10,1.72,2.55,3.15,y,.12,material);
        addBox(towerRoot,6.62,.10,4.05,0,y-1.18,0,metal);
        addBox(towerRoot,1.22,.055,.13,index%2===0?2.12:-2.08,y+.91,2.13,gold);
        return material;
      });
      floorAnchors=floorYs.map(y=>new THREE.Vector3(-3.42,y,2.22));

      const mullionGeometry=boxGeometry(.045,1.72,.08);
      const mullions=new THREE.InstancedMesh(mullionGeometry,metal,floorYs.length*7);
      const matrix=new THREE.Matrix4();
      let mullionIndex=0;
      floorYs.forEach(y=>{
        for(let column=0;column<7;column++){
          const x=-2.4+(column*.8);
          matrix.makeTranslation(x,y,2.105);
          mullions.setMatrixAt(mullionIndex++,matrix);
        }
      });
      towerRoot.add(mullions);

      addBox(towerRoot,5.8,1.05,3.25,.05,9.15,0,smokedGlass);
      addBox(towerRoot,4.25,.72,2.55,.4,10.05,-.05,metal);
      addBox(towerRoot,2.3,.32,1.65,.65,10.58,0,gold);
      const spire=new THREE.Mesh(new THREE.CylinderGeometry(.035,.085,2.55,8),gold);
      spire.position.set(.72,11.98,.02);
      towerRoot.add(spire);
      addBox(towerRoot,8.25,.34,5.35,0,-9.18,0,darkMetal);
      addBox(towerRoot,7.15,.62,4.45,.2,-8.72,0,smokedGlass);
      addBox(towerRoot,3.8,.12,.22,.8,-8.33,2.18,gold);

      const grid=new THREE.GridHelper(80,40,0x15596b,0x0a3140);
      grid.position.y=-9.42;
      grid.material.transparent=true;
      grid.material.opacity=.23;
      scene.add(grid);

      scene.add(new THREE.HemisphereLight(0x7cd8e3,0x01070b,1.5));
      const keyLight=new THREE.DirectionalLight(0x8de6ee,2.8);
      keyLight.position.set(7,13,11);
      scene.add(keyLight);
      const rimLight=new THREE.DirectionalLight(0xe76620,1.15);
      rimLight.position.set(-8,-2,7);
      scene.add(rimLight);
      accentLight=new THREE.PointLight(0x46d5e7,20,8,2);
      accentLight.position.set(0,floorYs[0],4.3);
      scene.add(accentLight);

      stage.classList.add('webgl-ready');
      stage.classList.remove('webgl-failed');
      measure();
      visualProgress=targetProgress;
      scheduleFrame();
    }catch(error){
      console.warn('DigiBuilder tower: WebGL scene setup failed, using the static fallback.',error);
      stage.classList.remove('webgl-ready');
      stage.classList.add('webgl-failed');
      renderer?.dispose?.();
      renderer=null;
      host.replaceChildren();
      scheduleFrame();
    }
  }

  window.addEventListener('hashchange',()=>queueMicrotask(initTowerExperience));
  queueMicrotask(initTowerExperience);
})();