"use strict";

const services=[
  ['strategy','01','Strategy & Consulting','Find the signal. Build the system.','Clarity before activity: positioning, research, growth roadmaps and practical priorities that connect business goals to digital action.',['Discovery & audits','Positioning','Go-to-market roadmaps','Measurement planning']],
  ['brand','02','Branding & Creative','Make the right people remember.','A distinctive identity and creative direction that gives every touchpoint a consistent, human point of view.',['Brand strategy','Visual identity','Campaign concepts','Design systems']],
  ['web','03','Website & E-commerce Development','Turn attention into action.','Fast, accessible, conversion-minded digital experiences built around your customers, content and commercial goals.',['UX & UI direction','Web builds','Shopify / commerce','Optimisation']],
  ['social','04','Social Media & Content','Show up with something to say.','A sustainable content engine: platform-native ideas, editorial planning and production guidance that earns attention.',['Content strategy','Social calendars','Creative production','Community playbooks']],
  ['seo','05','SEO & Performance Marketing','Compound the useful work.','Search and media programmes grounded in intent, good creative, clear measurement and continuous learning.',['Technical SEO','Paid media','Landing pages','Reporting frameworks']],
  ['ai','06','AI & Automation','Give your team leverage.','Thoughtful automation that removes friction without removing judgement—mapped, tested and handed over clearly.',['Workflow mapping','AI assistants','No-code automation','Enablement & handoff']]
];

const serviceMap=Object.fromEntries(services.map(service=>[service[0],service]));
const app=document.getElementById('app');
let towerCleanup=null;

function shell(eyebrow,title,copy,body=''){
  return `<section class="section reveal"><div class="wrap"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="lead">${copy}</p>${body}</div></section>`;
}

function card(service){
  return `<a class="card" href="#/service/${service[0]}"><span class="num">${service[1]} / 06</span><h3>${service[2]}</h3><p>${service[3]}</p><div class="tags">${service[5].slice(0,2).map(item=>`<span class="tag">${item}</span>`).join('')}</div></a>`;
}

function building(){
  return `<section class="tower-journey" id="tower-journey" aria-label="DigiBuilder capability building journey">
    <div class="tower-stage" id="tower-stage">
      <div class="city-glow"></div><div class="city-grid"></div>
      <div class="tower-heading" aria-hidden="true"><span>The DigiBuilder building</span><span>Six capability floors · top to foundation</span></div>
      <div class="building-scene">
        <div class="tower-cluster">
          <div class="building-camera" id="building-camera">
            <div class="building">
              <div class="front-shell"></div><div class="right-shell"></div><div class="left-shell"></div>
              <div class="roof"></div><div class="roof-core"></div><div class="mast"></div>
              ${services.map((service,index)=>`<div class="floor-frame" data-index="${index}" aria-label="Floor ${service[1]}: ${service[2]}">
                <div class="floor-edge"></div><div class="floor-window">
                  <div class="copy"><div class="number">${service[1]}</div><div class="title">${service[2]}</div><div class="desc">${service[3]}</div></div>
                  <div class="window-lights" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
                </div>
              </div>`).join('')}
              <div class="foundation"></div>
            </div>
          </div>
          <nav class="tower-tracker" id="floor-nav" aria-label="Capability floors">
            <div class="tracker-rail" aria-hidden="true"><i id="journey-progress"></i><b id="journey-marker"></b></div>
            ${services.map((service,index)=>`<button data-index="${index}" class="${index===0?'active':''}" aria-label="Go to floor ${service[1]}: ${service[2]}"><span>${service[1]} / 06</span></button>`).join('')}
          </nav>
        </div>
      </div>
      <div class="journey-ui">
        <div class="journey-hint"><strong id="tower-state">01 / 06</strong><span>Scroll down through the building</span></div>
        <div class="scroll-cue" aria-hidden="true">Explore <b>↓</b></div>
      </div>
    </div>
  </section>`;
}

function home(){
  return `<section class="hero"><div class="wrap hero-content">
    <div class="eyebrow">Digital growth, built with intent</div>
    <h1>Build a <span class="gradient">stronger</span> digital future.</h1>
    <p class="lead">Digibuilder brings strategy, creativity, technology and performance together into a clearer path from ambition to momentum.</p>
    <div class="actions"><a class="button primary" href="#/contact">Book a free consultation</a><a class="button secondary" href="#/services">Explore services</a></div>
    <div class="meta"><span><b>●</b> India + international</span><span><b>●</b> Startups to scale-ups</span></div>
  </div></section>
  ${building()}
  <section class="section"><div class="wrap section-head"><div><div class="eyebrow">A connected approach</div><h2>Growth is not a channel.</h2></div><p>It is the system between your story, your experience and the people you want to reach.</p></div><div class="wrap cards">${services.slice(0,3).map(card).join('')}</div></section>
  <section class="band"><div class="wrap split"><div><div class="eyebrow">Start with a useful conversation</div><div class="quote">Bring the question. Leave with a clearer next step.</div></div><a class="button primary" href="#/contact">Talk to Digibuilder</a></div></section>`;
}

function about(){
  return shell(
    'About Digibuilder',
    'Build the right things, in the right order.',
    'Digibuilder is an independent digital growth partner for teams who want thoughtful work and practical progress—not more noise. We work across India and international markets, with startups, ecommerce businesses and organisations across industries.',
    `<div class="split content-gap"><div class="panel"><div class="kicker">Our point of view</div><h2>Strategy should make the next move easier.</h2><p class="muted">We connect the dots between what a business needs to achieve and what its audience needs to believe, feel and do. Scope stays honest, language stays clear, and every engagement ends with a handoff your team can use.</p></div><div><div class="steps"><div class="step"><div><h3>Listen first</h3><p>Context, constraints and customer reality before recommendations.</p></div></div><div class="step"><div><h3>Make it tangible</h3><p>Clear artefacts, prototypes and decisions—not decks that gather dust.</p></div></div><div class="step"><div><h3>Leave capability behind</h3><p>Documentation and enablement so momentum does not depend on us.</p></div></div></div></div></div>`
  );
}

function servicesPage(){
  return shell(
    'Services',
    'One tower. Six ways to move forward.',
    'Choose the constraint that matters most right now, or combine capabilities into a focused growth sprint. Every engagement is scoped around your context.',
    `<div class="cards content-gap">${services.map(card).join('')}</div>`
  );
}

function servicePage(key){
  const service=serviceMap[key];
  return shell(
    `Service ${service[1]}`,
    service[2],
    service[3],
    `<div class="split content-gap"><div><div class="panel"><div class="kicker">What this can include</div><div class="tags">${service[5].map(item=>`<span class="tag">${item}</span>`).join('')}</div><p class="muted">We tailor the depth to your stage, team and goals. Start with a focused brief; expand only when the evidence says it is useful.</p><a class="button primary" href="#/contact">Discuss this service</a></div></div><div><div class="kicker">How we work</div><h2>Useful clarity, then momentum.</h2><div class="steps"><div class="step"><div><h3>01 — Diagnose</h3><p>Review the current state, audience and opportunity without assuming the answer.</p></div></div><div class="step"><div><h3>02 — Design</h3><p>Turn insight into a prioritised direction, system or working prototype.</p></div></div><div class="step"><div><h3>03 — Deliver & enable</h3><p>Launch what matters, measure honestly and leave your team with the keys.</p></div></div></div></div></div><div class="section-head section-followup"><div><div class="eyebrow">Questions worth asking</div><h2>Before we begin.</h2></div></div><div class="faq"><details open><summary>Can this be a small engagement?</summary><p>Yes. A focused audit, workshop or sprint can be the right starting point.</p></details><details><summary>Do you work with an existing team?</summary><p>Absolutely—we can complement internal marketing, product, design or engineering teams.</p></details><details><summary>What happens after the first call?</summary><p>You receive a clear suggested scope, assumptions and next step. No pressure and no mystery.</p></details></div>`
  );
}

function work(){
  return shell(
    'Work / case studies',
    'Good work should be easy to verify.',
    'We are building this portfolio in public. Rather than invent results, we prefer to show real work when the owners have approved it.',
    `<div class="panel content-gap"><div class="eyebrow">Portfolio coming soon</div><h2>No fabricated projects. No borrowed logos.</h2><p class="muted">This page will become a home for approved case studies with context, contribution and outcomes. Until then, here are illustrative engagement shapes—examples of the kind of work we can explore, not actual client work or case studies.</p></div><div class="cards compact-gap"><div class="card"><span class="num">ILLUSTRATIVE / 01</span><h3>Commerce launch system</h3><p>Positioning, storefront experience and acquisition foundations for a new product line.</p></div><div class="card"><span class="num">ILLUSTRATIVE / 02</span><h3>Founder-led content engine</h3><p>Editorial point of view, content workflow and a sustainable social rhythm for a growing team.</p></div><div class="card"><span class="num">ILLUSTRATIVE / 03</span><h3>Operational AI sprint</h3><p>Map repetitive work, prototype safe automations and document a human-in-the-loop handoff.</p></div></div><div class="notice notice-gap">These are illustrative engagement examples only—not client names, testimonials, performance claims or completed case studies.</div>`
  );
}

function contact(){
  return shell(
    'Contact',
    'Bring your next move into focus.',
    'Tell us what you are building, where it feels stuck and what a useful outcome would look like. We will use your note to prepare a thoughtful reply.',
    `<div class="split content-gap"><div><div class="panel"><div class="kicker">Prefer a direct hello?</div><h2>Let’s start with context, not a sales script.</h2><p class="muted">Email <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a> or message <a href="https://wa.me/917016348927" target="_blank" rel="noopener" class="accent-link">WhatsApp +91 70163 48927</a>.</p><p class="muted">Serving India and international clients. Remote-first, collaborative and transparent about fit.</p></div></div><div class="panel"><form class="form" id="contact-form"><div class="row"><label>Name *<input required name="name" autocomplete="name"></label><label>Email *<input required type="email" name="email" autocomplete="email"></label></div><div class="row"><label>Phone (optional)<input name="phone" type="tel"></label><label>Service<select name="service"><option>Not sure yet</option>${services.map(service=>`<option>${service[2]}</option>`).join('')}</select></label></div><label>Project context<textarea required name="project" placeholder="What are you building or trying to improve?"></textarea></label><div class="notice">This static site has no backend. Choose an option below to prepare a message in your own email client or WhatsApp. Nothing is sent automatically, and Digibuilder cannot see this form until you send it.</div><div class="actions"><button class="button primary" type="submit">Prepare email</button><button class="button secondary" type="button" id="wa">Prepare WhatsApp</button></div><p id="form-status" class="muted" aria-live="polite"></p></form></div></div>`
  );
}

function legal(kind){
  const privacy=kind==='privacy';
  return shell(
    privacy?'Privacy — draft':'Terms — draft',
    privacy?'A simple, static-site privacy note.':'A starting point for engagement terms.',
    privacy?'This draft reflects the current no-tracking, static handoff and should be reviewed by the owner and a qualified adviser before publication.':'This draft is a plain-language starting point, not legal advice. The owner should review and adapt it before publishing.',
    `<div class="legal content-gap">${privacy?`<h2>What this site does</h2><p>This static website does not intentionally use analytics, advertising pixels, cookies, accounts or behavioural tracking. The hosting provider may process technical request data under its own terms.</p><h2>Contact information</h2><p>If you use the email or WhatsApp links, your message is handled by those services. The contact form only prepares a message in your device’s chosen app; it is not submitted to a Digibuilder server.</p><h2>Owner review needed</h2><p>Confirm hosting logs, embedded services, retention practices and the applicable law for your business before launch.</p>`:`<h2>Scope</h2><p>Work begins after both parties agree a written scope, deliverables, timeline, fees and responsibilities. Changes may require a revised estimate.</p><h2>Client responsibilities</h2><p>The client provides timely access, accurate information, approvals and rights to supplied materials. Delays may affect timelines.</p><h2>Handoff and third parties</h2><p>Recommendations may involve third-party platforms. Their availability, fees and terms remain the client’s responsibility unless agreed otherwise.</p><h2>Owner review needed</h2><p>This draft does not cover every commercial, intellectual-property, payment, liability or governing-law detail. Obtain professional review before relying on it.</p>`}</div>`
  );
}

function prepare(mode){
  const form=document.getElementById('contact-form');
  if(!form?.reportValidity())return;

  const data=new FormData(form);
  const name=data.get('name');
  const email=data.get('email');
  const phone=data.get('phone')||'Not provided';
  const service=data.get('service');
  const project=data.get('project');
  const text=`Hello Digibuilder,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nProject context:\n${project}`;

  if(mode==='email'){
    location.href=`mailto:abdussamadvhora@gmail.com?subject=${encodeURIComponent(`Consultation enquiry from ${name}`)}&body=${encodeURIComponent(text)}`;
  }else{
    location.href=`https://wa.me/917016348927?text=${encodeURIComponent(text)}`;
  }
}

function bind(){
  const menu=document.getElementById('menu');
  const nav=document.getElementById('nav');

  menu?.addEventListener('click',()=>{
    const isOpen=nav.classList.toggle('open');
    menu.setAttribute('aria-expanded',String(isOpen));
  });

  document.querySelectorAll('.links a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded','false');
  }));

  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',event=>{event.preventDefault();prepare('email')});
    document.getElementById('wa')?.addEventListener('click',()=>prepare('wa'));
  }
}

function render(){
  towerCleanup?.();
  towerCleanup=null;

  const parts=location.hash.replace(/^#\/?/,'').split('/');
  const view=parts[0]||'home';
  const output=view==='home'?home():view==='about'?about():view==='services'?servicesPage():view==='service'&&serviceMap[parts[1]]?servicePage(parts[1]):view==='work'?work():view==='contact'?contact():view==='privacy'?legal('privacy'):view==='terms'?legal('terms'):home();

  app.innerHTML=output;
  document.querySelectorAll('.links a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#/${view}`));
  bind();
  window.scrollTo(0,0);
}

document.getElementById('year').textContent=new Date().getFullYear();
window.addEventListener('hashchange',render);
render();
