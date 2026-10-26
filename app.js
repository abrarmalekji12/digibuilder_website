"use strict";

const services=[
  ["strategy","01","Strategy & Growth Consulting","Know where to focus next.","We turn scattered marketing activity into a practical plan, from audience research and positioning to campaigns and measurement.",["Growth strategy","Market research","Positioning","Marketing audits"]],
  ["brand","02","Branding & Creative","Look distinctive. Sound like yourself.","From naming and visual identity to campaign design, we build brands that feel consistent, recognisable and ready to grow.",["Brand identity","Logo & design systems","Ad creatives","Campaign direction"]],
  ["web","03","Websites & E-commerce","Make every visit count.","Clear, responsive websites and online stores designed for real people: easy to explore, easy to trust and simple to contact.",["Website design","Landing pages","E-commerce","Conversion optimisation"]],
  ["social","04","Social Media, Reels & Video","Make content worth watching.","We plan and create social-first content, from Instagram reels and video shoots to editing, design and publishing ideas.",["Social media marketing","Reel & video shoots","Video editing","Content creation"]],
  ["seo","05","SEO, Advertising & Performance","Get found by the right audience.","Build visibility through search engine optimisation, thoughtful Google and social advertising, and landing pages built to convert.",["Technical & local SEO","Google Ads","Meta advertising","Performance reporting"]],
  ["ai","06","AI Automation & Workflows","Spend less time on repeat work.","We explore where practical AI tools and automation can speed up everyday tasks while keeping people in control.",["AI assistants","Workflow automation","Lead handling","Team enablement"]]
];

const serviceDetails={
  "strategy": [
    "The problem usually isn't a lack of ideas. It's deciding what matters, who it matters to and what to do first.",
    "We audit your current channels, clarify your positioning and build a growth roadmap your team can actually use.",
    "You'll leave with priorities, recommended experiments and a clearer way to measure what is working."
  ],
  "brand": [
    "A good brand does more than look polished. It helps people recognise you, understand you and remember why they chose you.",
    "We shape the identity around the business: visual direction, messaging, social creatives and the little details that tie everything together.",
    "The result is a usable creative foundation for websites, reels, ads, print and everyday marketing."
  ],
  "web": [
    "Your website should answer questions quickly and make taking the next step feel obvious, whether someone visits on a phone or laptop.",
    "We design and build mobile-friendly websites, service pages, landing pages and e-commerce experiences with speed, accessibility and search in mind.",
    "We focus on clear offers, smooth navigation and calls to action that respect the visitor's time."
  ],
  "social": [
    "Posting more is not the same as connecting better. Strong social media starts with knowing your audience and telling stories they care about.",
    "From content planning and social media management to reel concepts, on-location video shoots and professional editing, we connect ideas with execution.",
    "We balance attention-grabbing creative with a consistent voice and a publishing rhythm you can maintain."
  ],
  "seo": [
    "Being visible matters most when the people finding you are already looking for what you offer.",
    "We work across on-page SEO, technical SEO, local search, Google Ads, Meta advertising and conversion-focused landing pages.",
    "You get clear reporting, useful experiments and a strategy that can change with real evidence—not vague ranking promises."
  ],
  "ai": [
    "If your team repeats the same admin steps every day, there may be a smarter way to work.",
    "We map the process first, then prototype AI-assisted workflows for enquiries, reporting, content operations and routine handoffs.",
    "You stay in control with documented workflows, sensible safeguards and a clear path for your team to use them."
  ]
};

const serviceMap=Object.fromEntries(services.map(service=>[service[0],service]));
const projects=['Sharp Immigration','Saathi4u','Meghreji Home Decor','Unique Led Light','Simun Bake & Cake (Simun Tea)','Gulbarg Garden Restaurant & Party Plot','Palate Restaurant','Recut','Cubixcraft','Crabby Hunt','NDS Life Coaching'];
const app=document.getElementById('app');
let towerCleanup=null;
let navigationBound=false;

function shell(eyebrow,title,copy,body=''){
  return `<section class="section reveal"><div class="wrap"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${copy?`<p class="lead">${copy}</p>`:''}${body}</div></section>`;
}

function card(service){
  return `<a class="card" href="/service/${service[0]}"><span class="num">${service[1]} / 06</span><h3>${service[2]}</h3><p>${service[3]}</p><div class="tags">${service[5].slice(0,2).map(item=>`<span class="tag">${item}</span>`).join('')}</div></a>`;
}

function projectCard(name,index){
  return `<article class="card project-card"><span class="num">PROJECT / ${String(index+1).padStart(2,'0')}</span><h3>${name}</h3></article>`;
}

function building(){
  return `<section class="tower-journey" id="tower-journey" aria-label="DigiBuilder capability building journey">
    <div class="tower-stage" id="tower-stage" data-floor="01">
      <div class="tower-atmosphere" aria-hidden="true"><div class="city-glow"></div><div class="city-grid"></div></div>
      <div class="tower-heading" aria-hidden="true"><span>The DigiBuilder tower</span><span>Six capability levels · one connected system</span></div>

      <div class="tower-viewport" id="tower-viewport">
        <div class="tower-webgl" id="tower-webgl" aria-hidden="true"></div>
        <div class="tower-fallback" id="tower-fallback" aria-hidden="true">
          <div class="tower-fallback-building">${services.map(()=>'<i></i>').join('')}</div>
        </div>
        <div class="tower-label-layer" id="tower-label-layer">
          ${services.map((service,index)=>`<article class="tower-floor-label ${index===0?'active':''}" data-index="${index}" ${index===0?'':'aria-hidden="true"'}>
            <span class="tower-label-number">${service[1]}</span>
            <div class="tower-label-copy"><h3>${service[2]}</h3><p>${service[3]}</p></div>
          </article>`).join('')}
        </div>
      </div>

      <nav class="tower-tracker" id="floor-nav" aria-label="Capability floors">
        <div class="tracker-rail" aria-hidden="true"><i id="journey-progress"></i><b id="journey-marker"></b></div>
        ${services.map((service,index)=>`<button type="button" data-index="${index}" class="${index===0?'active':''}" aria-label="Go to floor ${service[1]}: ${service[2]}" ${index===0?'aria-current="step"':''}><span>${service[1]}</span></button>`).join('')}
      </nav>

      <div class="journey-ui">
        <div class="journey-hint"><strong id="tower-state">01 / 06</strong><span>Scroll through the building</span></div>
        <div class="scroll-cue" aria-hidden="true">Explore <b>↓</b></div>
      </div>
    </div>
  </section>`;
}

function home(){
  return `<section class="hero"><div class="wrap hero-content">
    <div class="eyebrow">Digital marketing, built around your business</div>
    <h1>Ideas that look <span class="gradient">good.</span> Growth that makes sense.</h1>
    <p class="lead">DigiBuilder brings branding, digital marketing, social media reels, websites, advertising and AI automation into one thoughtful growth partner.</p>
    <div class="actions"><a class="button primary" href="/contact/">Let's talk about your project</a><a class="button secondary" href="/services/">Explore our services</a></div>
    <div class="meta"><span><b>●</b> Based in Gujarat, India</span><span><b>●</b> Working across time zones</span></div>
  </div></section>
  ${building()}
  <section class="section"><div class="wrap section-head"><div><div class="eyebrow">What we can help with</div><h2>One team. Six ways to grow.</h2></div><p>From a sharper brand to the content, website and campaigns behind it, we help you choose the right next move.</p></div><div class="wrap cards">${services.map(card).join('')}</div></section>
  <section class="section markets-section"><div class="wrap split"><div><div class="eyebrow">Local insight. Remote collaboration.</div><h2>Built in Gujarat. Open to the world.</h2><p class="muted">Looking for a digital marketing agency in Modasa or elsewhere in Gujarat? We're here to talk. We also work remotely with businesses considering projects in Sydney, Brampton and London—without pretending to have an office in every city.</p></div><div class="panel"><div class="kicker">What matters to us</div><h3>Less noise, more useful work.</h3><p>Honest conversations, creative thinking and practical delivery. Whether it's a brand refresh, a reel shoot, a better website or an automation idea, we start with the problem you're trying to solve.</p><a class="button secondary" href="/about/">Meet DigiBuilder</a></div></div></section>
  <section class="band"><div class="wrap split"><div><div class="eyebrow">Let's make your next move count</div><div class="quote">Tell us what's on your mind. We'll help you find a sensible place to start.</div></div><a class="button primary" href="/contact/">Start a conversation</a></div></section>`;
}

function about(){
  return shell(
    'About DigiBuilder',
    'Creative thinking, practical follow-through.',
    'We are a digital marketing and branding team rooted in Gujarat, India. We bring strategy, design, content, advertising, websites and AI automation together so growing businesses do not have to connect every piece themselves.',
    `<div class="split content-gap"><div class="panel"><div class="kicker">How we think</div><h2>First understand the business. Then build the marketing.</h2><p class="muted">Every business has a different story, budget and audience. We ask questions, look at what is already working and recommend what is worth doing next—rather than selling a long list of services you may not need.</p></div><div><div class="steps"><div class="step"><div><h3>Listen and learn</h3><p>We understand your customers, goals, challenges and where opportunities might be hiding.</p></div></div><div class="step"><div><h3>Create with purpose</h3><p>From a visual identity to a campaign or video, each decision has a reason behind it.</p></div></div><div class="step"><div><h3>Improve together</h3><p>We review the work, make changes with real feedback and keep communication straightforward.</p></div></div></div></div></div><div class="panel content-gap"><div class="kicker">Where we work</div><p>Our roots are in Modasa, Gujarat. We welcome enquiries from across India, and we can collaborate remotely with teams in markets including Sydney, Brampton and London. Project requirements, availability and local production needs are discussed before we agree on a scope.</p></div>`
  );
}

function servicesPage(){
  return shell(
    'Digital marketing services',
    'The right mix makes the difference.',
    'Need a brand people remember, better social media content, an advertising campaign or an easier way to handle enquiries? Start with what matters to your business. We can help with one focused project or connect several services.',
    `<div class="cards content-gap">${services.map(card).join('')}</div><div class="panel content-gap"><div class="kicker">Not sure where to start?</div><h2>Tell us what you want to change.</h2><p>We will help you narrow down the next practical step before discussing the scope.</p><a href="/contact/" class="button primary">Discuss your goals</a></div>`
  );
}

function servicePage(key){
  const service=serviceMap[key];
  const detail=serviceDetails[key];
  return shell(
    'What we do / '+service[1],
    service[2],
    detail[0],
    `<div class="split content-gap"><div><div class="panel"><div class="kicker">How we can help</div><p>${detail[1]}</p><div class="tags">${service[5].map(item=>`<span class="tag">${item}</span>`).join('')}</div></div></div><div><div class="kicker">The outcome</div><h2>Work that earns its place.</h2><p class="muted">${detail[2]}</p><a class="button primary" href="/contact/">Discuss this service</a></div></div><div class="section-head section-followup"><div><div class="eyebrow">Your questions</div><h2>How do we get started?</h2></div></div><div class="faq"><details><summary>Can we begin with a small project?</summary><p>Yes. We can start with an audit, a shoot, a landing page or another clearly defined first step, depending on what you need.</p></details><details><summary>Can DigiBuilder work with our existing team?</summary><p>Absolutely. We can support your in-house marketers, designers or developers and agree who owns each part of the work.</p></details><details><summary>Will you share a clear scope?</summary><p>Yes. Before work starts, we'll talk through deliverables, responsibilities, timelines and fees.</p></details></div>`
  );
}

function work(){
  return shell(
    'Our work',
    'The names behind the projects.',
    'Here are projects from our growing portfolio. We will add each project’s industry, services delivered and the work involved as those details are documented.',
    `<div class="cards project-grid content-gap">${projects.map(projectCard).join('')}</div>`
  );
}

function contact(){
  return shell(
    'Contact',
    'Bring your next move into focus.',
    'Tell us what you are building, where it feels stuck and what a useful outcome would look like. We will use your note to prepare a thoughtful reply.',
    `<div class="split content-gap"><div><div class="panel"><div class="kicker">Prefer a direct hello?</div><h2>Let’s start with context, not a sales script.</h2><p class="muted">Email <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a> or message <a href="https://wa.me/917016348927" target="_blank" rel="noopener" class="accent-link">WhatsApp +91 70163 48927</a>.</p><p class="muted">Serving India and international clients. Remote-first, collaborative and transparent about fit.</p></div></div><div class="panel"><form class="form" id="contact-form" action="https://formspree.io/f/maenabzy" method="POST"><input type="hidden" name="_subject" value="New DigiBuilder consultation enquiry"><div class="row"><label>Name *<input required name="name" autocomplete="name"></label><label>Email *<input required type="email" name="email" autocomplete="email"></label></div><div class="row"><label>Phone (optional)<input name="phone" type="tel"></label><label>Service<select name="service"><option>Not sure yet</option>${services.map(service=>`<option>${service[2]}</option>`).join('')}</select></label></div><label>Project context<textarea required name="project" placeholder="What are you building or trying to improve?"></textarea></label><div class="notice">Submitting this form sends your details securely through Formspree so Digibuilder can reply. You can also use WhatsApp if you prefer.</div><div class="actions"><button class="button primary" type="submit">Send enquiry</button><button class="button secondary" type="button" id="wa">Message on WhatsApp</button></div><p id="form-status" class="muted" aria-live="polite"></p></form></div></div>`
  );
}

function legal(kind){
  const privacy=kind==='privacy';
  return shell(
    privacy?'Privacy':'Terms',
    privacy?'A simple, static-site privacy note.':'A starting point for engagement terms.',
    privacy?'This draft reflects the current no-tracking, static handoff and should be reviewed by the owner and a qualified adviser before publication.':'This draft is a plain-language starting point, not legal advice. The owner should review and adapt it before publishing.',
    `<div class="legal content-gap">${privacy?`<h2>What this site does</h2><p>This static website does not intentionally use analytics, advertising pixels, cookies, accounts or behavioural tracking. The hosting provider may process technical request data under its own terms.</p><h2>Contact information</h2><p>If you submit the contact form, the details you enter are sent through Formspree so Digibuilder can receive and respond to your enquiry. If you use the email or WhatsApp links instead, your message is handled by those services under their own terms.</p><h2>Owner review needed</h2><p>Confirm hosting logs, embedded services, retention practices and the applicable law for your business before launch.</p>`:`<h2>Scope</h2><p>Work begins after both parties agree a written scope, deliverables, timeline, fees and responsibilities. Changes may require a revised estimate.</p><h2>Client responsibilities</h2><p>The client provides timely access, accurate information, approvals and rights to supplied materials. Delays may affect timelines.</p><h2>Handoff and third parties</h2><p>Recommendations may involve third-party platforms. Their availability, fees and terms remain the client’s responsibility unless agreed otherwise.</p><h2>Owner review needed</h2><p>This draft does not cover every commercial, intellectual-property, payment, liability or governing-law detail. Obtain professional review before relying on it.</p>`}</div>`
  );
}

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
      if(status)status.textContent='Thanks — your enquiry has been sent. We’ll get back to you soon.';
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

function render(){
  towerCleanup?.();
  towerCleanup=null;

  const parts=location.hash.replace(/^#\/?/,'').split('/');
  const view=parts[0]||'home';
  const output=view==='home'?home():view==='about'?about():view==='services'?servicesPage():view==='service'&&serviceMap[parts[1]]?servicePage(parts[1]):view==='work'?work():view==='contact'?contact():view==='privacy'?legal('privacy'):view==='terms'?legal('terms'):home();

  app.innerHTML=output;
  setMenuOpen(false);
  document.querySelectorAll('.links a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#/${view}`));
  bind();
  window.scrollTo(0,0);
}

document.getElementById('year').textContent=new Date().getFullYear();
window.addEventListener('hashchange',render);
render();
