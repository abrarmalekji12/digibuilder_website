"use strict";

/*
 * Homepage-only enhancement. The base app keeps routing/content ownership;
 * this layer turns its existing hero + tower into one scroll-led experience.
 */
(() => {
  const clamp=value=>Math.max(0,Math.min(1,value));

  function enhanceHomeExperience(){
    const journey=document.getElementById('tower-journey');
    const stage=document.getElementById('tower-stage');
    if(!journey||!stage||journey.dataset.experience==='ready')return;

    journey.dataset.experience='ready';
    journey.setAttribute('aria-label','Explore DigiBuilder capabilities from the top of the building to the foundation');

    /* Retire the base tower listeners before installing the richer journey. */
    if(typeof towerCleanup==='function')towerCleanup();
    towerCleanup=null;

    /* Merge the conventional hero into the tower so the building is the landing page. */
    const legacyHero=document.querySelector('main > .hero');
    const heroContent=legacyHero?.querySelector('.hero-content');
    let heroLayer=null;
    if(heroContent){
      heroLayer=document.createElement('div');
      heroLayer.className='tower-hero';
      heroLayer.id='tower-hero';
      heroLayer.innerHTML=`<div class="hero-content">${heroContent.innerHTML}</div>`;
      stage.appendChild(heroLayer);
      legacyHero.remove();
    }

    const camera=document.getElementById('building-camera');
    const copy=document.querySelector('.building-copy');
    const title=document.getElementById('tower-title');
    const desc=document.getElementById('tower-desc');
    const state=document.getElementById('tower-state');
    const progress=document.getElementById('journey-progress');
    const percent=document.getElementById('journey-percent');
    const hint=document.querySelector('.journey-hint');
    const nav=[...document.querySelectorAll('#floor-nav button')];
    const frames=[...document.querySelectorAll('.floor-frame')];
    if(!camera||!copy||!title||!desc||!state||!progress||!percent||!frames.length)return;

    if(hint)hint.textContent='Scroll down the building · strategy to automation';

    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const introEnd=.11;
    let rotationOffset=0;
    let dragging=false;
    let lastX=0;
    let frameId=0;
    let activeFloor=-1;

    const getPreset=()=>{
      if(window.innerWidth<=600)return{x:10,y:-window.innerHeight*.18,scale:.62,pitch:4,yaw:-18,travel:72};
      if(window.innerWidth<=900)return{x:9,y:-window.innerHeight*.05,scale:.82,pitch:3,yaw:-18,travel:100};
      return{x:6,y:0,scale:1.04,pitch:3,yaw:-22,travel:140};
    };

    const animateCopy=()=>{
      copy.classList.remove('changing');
      void copy.offsetWidth;
      copy.classList.add('changing');
    };

    const setFloor=index=>{
      if(index===activeFloor)return;
      activeFloor=index;
      const service=services[index];
      title.textContent=service[2];
      desc.textContent=service[4];
      state.textContent=`${service[1]} / 06 · BUILDING LAYER`;
      stage.dataset.floor=service[1];
      animateCopy();

      nav.forEach((button,buttonIndex)=>{
        const active=buttonIndex===index;
        button.classList.toggle('active',active);
        if(active)button.setAttribute('aria-current','step');
        else button.removeAttribute('aria-current');
      });
    };

    const update=()=>{
      frameId=0;
      const max=Math.max(1,journey.offsetHeight-window.innerHeight);
      const rect=journey.getBoundingClientRect();
      const scrollProgress=clamp(-rect.top/max);
      const serviceProgress=clamp((scrollProgress-introEnd)/(1-introEnd));
      const raw=serviceProgress*(services.length-1);
      const index=Math.min(services.length-1,Math.round(raw));
      const preset=getPreset();
      const travel=reducedMotion.matches?0:(.5-serviceProgress)*preset.travel;
      const zoom=reducedMotion.matches?1:1+Math.sin(serviceProgress*Math.PI)*.025;
      const pitch=preset.pitch+(reducedMotion.matches?0:serviceProgress*2.5);
      const yaw=preset.yaw+rotationOffset+(reducedMotion.matches?0:Math.sin(serviceProgress*Math.PI*2)*1.5);

      setFloor(index);

      const heroVisibility=heroLayer?clamp(1-scrollProgress/introEnd):0;
      const copyVisibility=clamp((scrollProgress-introEnd*.42)/(introEnd*.72));
      if(heroLayer){
        heroLayer.style.opacity=String(heroVisibility);
        heroLayer.style.transform=`translateY(calc(-50% + ${(1-heroVisibility)*-12}px))`;
        heroLayer.style.pointerEvents=heroVisibility>.15?'auto':'none';
      }
      copy.style.opacity=String(copyVisibility);
      if(window.innerWidth>900){
        copy.style.transform=`translateY(calc(-46% + ${(1-copyVisibility)*10}px))`;
      }else{
        copy.style.transform=`translateY(${(1-copyVisibility)*10}px)`;
      }

      percent.textContent=`${Math.round(scrollProgress*100)}%`;
      progress.style.width=`${scrollProgress*100}%`;
      camera.style.transform=`translate3d(${preset.x}vw,${preset.y+travel}px,0) rotateX(${pitch}deg) rotateY(${yaw}deg) scale(${preset.scale*zoom})`;

      frames.forEach((frame,frameIndex)=>{
        const distance=Math.abs(frameIndex-raw);
        frame.classList.toggle('active',frameIndex===index);
        frame.classList.toggle('is-near',frameIndex!==index&&distance<=1.15);
      });
    };

    const scheduleUpdate=()=>{
      if(!frameId)frameId=requestAnimationFrame(update);
    };

    const go=index=>{
      const max=Math.max(1,journey.offsetHeight-window.innerHeight);
      const servicePoint=index/(services.length-1);
      const targetProgress=introEnd+(1-introEnd)*servicePoint;
      window.scrollTo({
        top:journey.offsetTop+max*targetProgress,
        behavior:reducedMotion.matches?'auto':'smooth'
      });
    };

    const navHandlers=nav.map((button,index)=>{
      const handler=()=>go(index);
      button.addEventListener('click',handler);
      return[button,handler];
    });

    const onPointerDown=event=>{
      if(reducedMotion.matches||event.target.closest('button,a,input,textarea,select'))return;
      dragging=true;
      lastX=event.clientX;
      stage.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove=event=>{
      if(!dragging)return;
      rotationOffset=Math.max(-14,Math.min(14,rotationOffset+(event.clientX-lastX)*.16));
      lastX=event.clientX;
      scheduleUpdate();
    };

    const stopDragging=event=>{
      dragging=false;
      if(event?.pointerId!==undefined&&stage.hasPointerCapture?.(event.pointerId))stage.releasePointerCapture(event.pointerId);
    };

    const onMotionChange=()=>scheduleUpdate();

    stage.addEventListener('pointerdown',onPointerDown);
    stage.addEventListener('pointermove',onPointerMove);
    stage.addEventListener('pointerup',stopDragging);
    stage.addEventListener('pointercancel',stopDragging);
    window.addEventListener('scroll',scheduleUpdate,{passive:true});
    window.addEventListener('resize',scheduleUpdate);
    reducedMotion.addEventListener?.('change',onMotionChange);
    scheduleUpdate();

    towerCleanup=()=>{
      stage.removeEventListener('pointerdown',onPointerDown);
      stage.removeEventListener('pointermove',onPointerMove);
      stage.removeEventListener('pointerup',stopDragging);
      stage.removeEventListener('pointercancel',stopDragging);
      window.removeEventListener('scroll',scheduleUpdate);
      window.removeEventListener('resize',scheduleUpdate);
      reducedMotion.removeEventListener?.('change',onMotionChange);
      navHandlers.forEach(([button,handler])=>button.removeEventListener('click',handler));
      if(frameId)cancelAnimationFrame(frameId);
    };
  }

  /* app.js registers first, so this runs after its route render on navigation. */
  window.addEventListener('hashchange',()=>queueMicrotask(enhanceHomeExperience));
  queueMicrotask(enhanceHomeExperience);
})();
