"use strict";
let navigationBound=false;
function prepareWhatsApp(){
  const form=document.getElementById('contact-form');
  if(!form?.reportValidity())return;

  const data=new FormData(form);
  const name=data.get('name');
  const email=data.get('email');
  const phone=data.get('phone')||'Not provided';
  const service=data.get('service');
  const project=data.get('project');
  const text=`Hello Digibuilder,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nProject context:\n${project}`;

  location.href=`https://wa.me/917016348927?text=${encodeURIComponent(text)}`;
}

async function submitContact(event){
  event.preventDefault();

  const form=event.currentTarget;
  if(!form.reportValidity())return;

  const status=document.getElementById('form-status');
  const submitButton=form.querySelector('button[type="submit"]');
  const originalLabel=submitButton?.textContent;

  if(status)status.textContent='Sending your enquiry…';
  if(submitButton){
    submitButton.disabled=true;
    submitButton.textContent='Sending…';
  }

  try{
    const response=await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{Accept:'application/json'}
    });

    if(response.ok){
      form.reset();
      if(status)status.textContent='Thanks! Your enquiry has been sent. We’ll get back to you soon.';
      return;
    }

    let message='Sorry, your enquiry could not be sent. Please try again or use WhatsApp.';
    try{
      const data=await response.json();
      if(Array.isArray(data?.errors)&&data.errors.length){
        message=data.errors.map(error=>error.message).filter(Boolean).join(' ')||message;
      }
    }catch(_error){
      // Keep the friendly fallback message when Formspree does not return JSON.
    }
    if(status)status.textContent=message;
  }catch(_error){
    if(status)status.textContent='Sorry, your enquiry could not be sent. Please check your connection or use WhatsApp.';
  }finally{
    if(submitButton){
      submitButton.disabled=false;
      submitButton.textContent=originalLabel||'Send enquiry';
    }
  }
}

function setMenuOpen(open){
  const menu=document.getElementById('menu');
  const nav=document.getElementById('nav');
  if(!menu||!nav)return;
  nav.classList.toggle('open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  menu.textContent=open?'✕':'☰';
}

function bind(){
  const menu=document.getElementById('menu');
  const nav=document.getElementById('nav');

  // Header persists across page changes: register its listeners only once.
  if(!navigationBound&&menu&&nav){
    navigationBound=true;
    menu.addEventListener('click',()=>setMenuOpen(!nav.classList.contains('open')));
    nav.addEventListener('click',event=>{
      if(event.target.closest('a'))setMenuOpen(false);
    });
    document.addEventListener('pointerdown',event=>{
      if(nav.classList.contains('open')&&!nav.contains(event.target)&&!menu.contains(event.target)){
        setMenuOpen(false);
      }
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&nav.classList.contains('open')){
        setMenuOpen(false);
        menu.focus();
      }
    });
    window.addEventListener('resize',()=>{
      if(!window.matchMedia('(max-width:900px), (pointer:coarse) and (max-width:1100px)').matches){
        setMenuOpen(false);
      }
    },{passive:true});
  }

  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',submitContact);
    document.getElementById('wa')?.addEventListener('click',prepareWhatsApp);
  }
}

const routePaths={
  home:'/',about:'/about/',services:'/services/',work:'/work/',contact:'/contact/',
  privacy:'/privacy/',terms:'/terms/'
};
function legacyHashTarget(){
  const match=location.hash.match(/^#\/(about|services|work|contact|privacy|terms|service\/[^/]+)\/?$/);
  if(!match)return null;
  return match[1].startsWith('service/')?'/'+match[1]+'/':routePaths[match[1]];
}

function initAmbientPointer(){
  // Subtle easing with more visible travel on pointer-equipped desktops.
  // Touch devices and reduced-motion users keep the ambient field static.
  if(!window.matchMedia('(hover:hover) and (pointer:fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const root=document.documentElement;
  let targetX=0,targetY=0,x=0,y=0,frame=0;
  const step=()=>{
    frame=0;
    x+=(targetX-x)*.075;
    y+=(targetY-y)*.075;
    root.style.setProperty('--ambient-x',x.toFixed(2)+'px');
    root.style.setProperty('--ambient-y',y.toFixed(2)+'px');
    if(Math.abs(targetX-x)>.1||Math.abs(targetY-y)>.1)frame=requestAnimationFrame(step);
  };
  window.addEventListener('pointermove',event=>{
    // Maximum displacement: about 36px from center, without abrupt snapping.
    targetX=((event.clientX/window.innerWidth)-.5)*72;
    targetY=((event.clientY/window.innerHeight)-.5)*72;
    if(!frame && !document.hidden)frame=requestAnimationFrame(step);
  },{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0}
  });
}

const legacy=legacyHashTarget();
if(legacy)location.replace(legacy);
else{
  document.getElementById('year').textContent=new Date().getFullYear();
  const view=location.pathname.split('/').filter(Boolean)[0]||'home';
  document.querySelectorAll('.links a').forEach(link=>{
    const href=link.getAttribute('href');
    link.classList.toggle('active',href===routePaths[view]||(view==='service'&&href==='/services/'));
  });
  bind();
  initAmbientPointer();
}
window.addEventListener('hashchange',()=>{const target=legacyHashTarget();if(target)location.replace(target);});
