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

    const isMobile=()=>window.innerWidth<=680;
    const isTablet=()=>window.innerWidth<=980;
    const floorProgress=value=>clamp((value-FLOOR_START)/(FLOOR_END-FLOOR_START));
    const scrollForFloor=index=>FLOOR_START+(index/(services.length-1))*(FLOOR_END-FLOOR_START);

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

    const updateTracker=value=>{
      const raw=floorProgress(value)*(services.length-1);
      const index=Math.min(services.length-1,Math.max(0,Math.round(raw)));
      const amount=clamp(raw/(services.length-1));
      setFloor(index);
      progress.style.transform=`scaleY(${amount})`;
      marker.style.top=`${amount*100}%`;
      stage.style.setProperty('--journey-progress',String(value));
    };

    const projectLabels=()=>{
      if(!THREE||!camera||!towerRoot||!floorAnchors.length||!renderer)return;
      towerRoot.updateMatrixWorld(true);
      camera.updateMatrixWorld(true);
      const point=new THREE.Vector3();

      floorAnchors.forEach((anchor,index)=>{
        point.copy(anchor);
        towerRoot.localToWorld(point);
        point.project(camera);
        const x=(point.x*.5+.5)*viewportWidth;
        const y=(-point.y*.5+.5)*viewportHeight;
        const visible=point.z>-1&&point.z<1&&x>-120&&x<viewportWidth+120&&y>-100&&y<viewportHeight+100;
        const label=labels[index];
        label.style.setProperty('--label-x',x.toFixed(2));
        label.style.setProperty('--label-y',y.toFixed(2));
        label.style.setProperty('--label-visible',visible?'1':'0');
      });
    };

    const applyScene=value=>{
      if(!THREE||!camera||!towerRoot||!renderer)return;
      const mobile=isMobile();
      const tablet=isTablet();
      const reduced=reducedMotion.matches;
      const focused=floorProgress(value);
      const raw=focused*(services.length-1);
      const low=Math.floor(raw);
      const high=Math.min(services.length-1,Math.ceil(raw));
      const fraction=raw-low;
      const currentY=lerp(floorAnchors[low].y,floorAnchors[high].y,fraction);

      floorMaterials.forEach((material,index)=>{
        const proximity=1-Math.min(1,Math.abs(index-raw));
        material.emissiveIntensity=.16+(proximity*(mobile?1.65:2.25));
        material.opacity=.58+(proximity*.34);
      });

      const enter=smoothstep(0,.13,value);
      const exit=smoothstep(.89,1,value);
      if(reduced){
        camera.position.set(mobile?2.1:5.8,.9,mobile?30:32.5);
        camera.fov=mobile?47:39;
        camera.lookAt(0,0,0);
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

        camera.position.x=lerp(startX,settleX,enter)+drift;
        camera.position.y=lerp(.85,settleY,enter);
        camera.position.z=lerp(startZ,settleZ,enter);
        camera.fov=mobile?44:(tablet?41:38);
        const lookY=lerp(0,lerp(currentY,-4.5,exit),enter);
        camera.lookAt(0,lookY,0);
        towerRoot.rotation.y=-.055+(Math.sin(focused*Math.PI)*.018);
      }
      camera.updateProjectionMatrix();

      if(accentLight){
        accentLight.position.y=currentY+.1;
        accentLight.intensity=mobile?12:20;
      }

      renderer.render(scene,camera);
      projectLabels();
    };

    const tick=()=>{
      frameId=0;
      if(disposed)return;
      const reduced=reducedMotion.matches;
      visualProgress=reduced?targetProgress:lerp(visualProgress,targetProgress,.14);
      if(Math.abs(visualProgress-targetProgress)<.0005)visualProgress=targetProgress;
      updateTracker(visualProgress);
      applyScene(visualProgress);
      if(Math.abs(visualProgress-targetProgress)>.0005)scheduleFrame();
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
