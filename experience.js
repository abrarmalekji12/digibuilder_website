"use strict";

/* Homepage-only tower controller. app.js owns routing/markup; this file owns tower interaction. */
(() => {
  const clamp=value=>Math.max(0,Math.min(1,value));

  function initTowerExperience(){
    const journey=document.getElementById('tower-journey');
    const stage=document.getElementById('tower-stage');
    const camera=document.getElementById('building-camera');
    const state=document.getElementById('tower-state');
    const progress=document.getElementById('journey-progress');
    const marker=document.getElementById('journey-marker');
    const tracker=document.getElementById('floor-nav');
    const rail=tracker?.querySelector('.tracker-rail');
    const buttons=[...document.querySelectorAll('#floor-nav button')];
    const frames=[...document.querySelectorAll('.floor-frame')];
    if(!journey||!stage||!camera||!state||!progress||!marker||!tracker||!rail||!buttons.length||!frames.length)return;
    if(journey.dataset.experience==='ready')return;

    journey.dataset.experience='ready';
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId=0;
    let activeFloor=-1;
    let rotationOffset=0;
    let dragging=false;
    let lastX=0;

    const getCameraPreset=()=>{
      if(window.innerWidth<=600)return{pitch:.35,yaw:-4.5};
      if(window.innerWidth<=900)return{pitch:.65,yaw:-6};
      return{pitch:1,yaw:-7.5};
    };

    const setFloor=index=>{
      if(index===activeFloor)return false;
      activeFloor=index;
      const service=services[index];
      stage.dataset.floor=service[1];
      stage.setAttribute('aria-label',`DigiBuilder building, floor ${service[1]} of 06: ${service[2]}`);
      state.textContent=`${service[1]} / 06`;

      buttons.forEach((button,buttonIndex)=>{
        const active=buttonIndex===index;
        button.classList.toggle('active',active);
        if(active)button.setAttribute('aria-current','step');
        else button.removeAttribute('aria-current');
      });

      frames.forEach((frame,frameIndex)=>{
        const active=frameIndex===index;
        frame.classList.toggle('active',active);
        if(active)frame.setAttribute('aria-current','step');
        else frame.removeAttribute('aria-current');
      });
      return true;
    };

    const syncTracker=(raw,scrollProgress)=>{
      const trackerRect=tracker.getBoundingClientRect();
      const centers=frames.map(frame=>{
        const rect=frame.getBoundingClientRect();
        return rect.top+(rect.height/2)-trackerRect.top;
      });
      if(!centers.length)return;

      buttons.forEach((button,index)=>button.style.top=`${centers[index]}px`);
      const start=centers[0];
      const end=centers[centers.length-1];
      const lower=Math.min(centers.length-1,Math.floor(raw));
      const upper=Math.min(centers.length-1,Math.ceil(raw));
      const fraction=raw-lower;
      const markerY=centers[lower]+((centers[upper]-centers[lower])*fraction);

      rail.style.top=`${start}px`;
      rail.style.height=`${Math.max(0,end-start)}px`;
      progress.style.height=`${Math.max(0,markerY-start)}px`;
      marker.style.top=`${markerY-start}px`;
      stage.style.setProperty('--journey-progress',String(scrollProgress));
    };

    const update=()=>{
      frameId=0;
      const max=Math.max(1,journey.offsetHeight-window.innerHeight);
      const rect=journey.getBoundingClientRect();
      const scrollProgress=clamp(-rect.top/max);
      const raw=scrollProgress*(services.length-1);
      const index=Math.min(services.length-1,Math.round(raw));
      const preset=getCameraPreset();
      const motion=reducedMotion.matches?0:Math.sin(scrollProgress*Math.PI*2);
      const pitch=preset.pitch+(motion*.18);
      const yaw=preset.yaw+rotationOffset+(motion*.28);

      setFloor(index);
      camera.style.transform=`rotateX(${pitch}deg) rotateY(${yaw}deg)`;

      frames.forEach((frame,frameIndex)=>{
        const distance=Math.abs(frameIndex-raw);
        frame.classList.toggle('is-near',frameIndex!==index&&distance<=1.1);
      });

      syncTracker(raw,scrollProgress);
    };

    const scheduleUpdate=()=>{
      if(!frameId)frameId=requestAnimationFrame(update);
    };

    const go=index=>{
      const max=Math.max(1,journey.offsetHeight-window.innerHeight);
      window.scrollTo({
        top:journey.offsetTop+max*(index/(services.length-1)),
        behavior:reducedMotion.matches?'auto':'smooth'
      });
    };

    const buttonHandlers=buttons.map((button,index)=>{
      const handler=()=>go(index);
      button.addEventListener('click',handler);
      return[button,handler];
    });

    const onPointerDown=event=>{
      if(reducedMotion.matches||window.innerWidth<=600||event.target.closest('button,a,input,textarea,select'))return;
      dragging=true;
      lastX=event.clientX;
      stage.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove=event=>{
      if(!dragging)return;
      rotationOffset=Math.max(-2.5,Math.min(2.5,rotationOffset+(event.clientX-lastX)*.025));
      lastX=event.clientX;
      scheduleUpdate();
    };

    const stopDragging=event=>{
      dragging=false;
      if(event?.pointerId!==undefined&&stage.hasPointerCapture?.(event.pointerId))stage.releasePointerCapture(event.pointerId);
    };

    const onMotionChange=()=>{
      if(reducedMotion.matches)rotationOffset=0;
      scheduleUpdate();
    };

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
      buttonHandlers.forEach(([button,handler])=>button.removeEventListener('click',handler));
      if(frameId)cancelAnimationFrame(frameId);
    };
  }

  window.addEventListener('hashchange',()=>queueMicrotask(initTowerExperience));
  queueMicrotask(initTowerExperience);
})();
