"use strict";
const services=[
  ["strategy","01","Strategy & Growth Consulting","Know your roots. Grow with purpose.","We uncover your business DNA, legacy and customer connections before shaping brand positioning, marketing strategy and a practical growth plan.",["Business DNA discovery","Brand positioning","Growth roadmaps","Marketing strategy"]],
  ["brand","02","Branding & Creative","Build a brand people can feel and remember.","Identity design built on business roots, clear positioning, emotional storytelling and creative that feels consistent wherever customers meet your brand.",["Brand identity","Logo & design systems","Ad creatives","Campaign direction"]],
  ["web","03","Websites & E-commerce","Your brand deserves a better digital home.","Business-led websites and e-commerce experiences that bring your story to life through thoughtful UX, responsive design, fast development and SEO foundations.",["Website design","Landing pages","E-commerce","Conversion optimisation"]],
  ["social","04","Social Media, Reels & Video","Tell stories people want to watch.","Audience-led social media marketing with meaningful content ideas, reel and video shoots, thoughtful editing and a practical publishing rhythm.",["Social media marketing","Reel & video shoots","Video editing","Content creation"]],
  ["seo","05","SEO, Advertising & Performance","Be found when it matters.","Technical and local SEO, customer search intent, purposeful Google and Meta advertising, useful landing pages and measurement tied to business goals.",["Technical & local SEO","Google Ads","Meta advertising","Performance reporting"]],
  ["ai","06","AI Automation & Workflows","Save time without losing judgement.","We map business workflows first, then prototype useful AI assistants and human-supervised automation for repetitive work.",["AI assistants","Workflow automation","Lead handling","Team enablement"]]
];

let towerCleanup=null;
let projectJourneyCleanup=null;
function initProjectJourney(){
  const journey=document.getElementById('project-journey');
  if(!journey||typeof window.requestAnimationFrame!=='function')return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const cards=[...journey.querySelectorAll('.project-slide')];
  const indicator=document.getElementById('project-journey-count');
  if(cards.length<2||!indicator)return;

  let frameId=0;
  let current=0;
  let target=0;
  let journeyTop=0;
  let scrollRange=1;
  let horizontalStep=180;
  let lastIndex=-1;
  let disposed=false;
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  const schedule=()=>{
    if(!frameId&&!disposed&&!document.hidden)frameId=window.requestAnimationFrame(paint);
  };

  const paint=()=>{
    frameId=0;
    if(disposed)return;
    const bounds=journey.getBoundingClientRect();
    if(bounds.bottom<=0||bounds.top>=window.innerHeight)return;

    current+=((target-current)*.15);
    if(Math.abs(current-target)<.002)current=target;

    cards.forEach((card,index)=>{
      const offset=index-current;
      const distance=Math.abs(offset);
      const visible=distance<4.1;
      if(!visible){
        if(card.style.visibility!=='hidden'){
          card.style.visibility='hidden';
          card.style.opacity='0';
        }
        return;
      }
      const spread=clamp(offset,-4,4);
      const z=-Math.min(distance,4)*62;
      const x=offset*horizontalStep;
      const y=Math.min(distance,3)*5;
      const angle=-spread*7.5;
      const scale=1-Math.min(distance,3)*.07;
      card.style.visibility='visible';
      card.style.opacity=String(clamp((4.1-distance)*.85,0,1));
      card.style.zIndex=String(100-Math.round(distance*12));
      card.style.transform=`translate3d(calc(-50% + ${x.toFixed(1)}px),calc(-50% + ${y.toFixed(1)}px),${z.toFixed(1)}px) rotateY(${angle.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
    });

    const index=clamp(Math.round(current),0,cards.length-1);
    if(index!==lastIndex){
      lastIndex=index;
      indicator.textContent=`${String(index+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
      indicator.setAttribute('aria-label',`Project ${index+1} of ${cards.length}`);
    }
    if(Math.abs(current-target)>.002)schedule();
  };

  const scroll=()=>{
    target=clamp((window.scrollY-journeyTop)/scrollRange,0,1)*(cards.length-1);
    schedule();
  };

  const measure=()=>{
    const small=window.innerWidth<=600;
    horizontalStep=small?clamp(window.innerWidth*.51,148,210):clamp(window.innerWidth*.25,210,305);
    const scrollPerProject=small?clamp(window.innerHeight*.35,170,270):clamp(window.innerHeight*.42,215,355);
    const verticalTravel=Math.round((cards.length-1)*scrollPerProject);
    journey.style.setProperty('--project-scroll-height',`${Math.round(window.innerHeight+verticalTravel)}px`);
    journeyTop=journey.getBoundingClientRect().top+window.scrollY;
    scrollRange=Math.max(1,journey.offsetHeight-window.innerHeight);
    target=clamp((window.scrollY-journeyTop)/scrollRange,0,1)*(cards.length-1);
    current=target;
    schedule();
  };

  journey.classList.add('is-animated');
  window.addEventListener('scroll',scroll,{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  document.addEventListener('visibilitychange',scroll);
  measure();

  projectJourneyCleanup=()=>{
    disposed=true;
    if(frameId)window.cancelAnimationFrame(frameId);
    window.removeEventListener('scroll',scroll);
    window.removeEventListener('resize',measure);
    document.removeEventListener('visibilitychange',scroll);
    journey.classList.remove('is-animated');
    journey.style.removeProperty('--project-scroll-height');
    cards.forEach(card=>{
      card.style.transform='';
      card.style.opacity='';
      card.style.zIndex='';
      card.style.visibility='';
    });
  };
}


initProjectJourney();
