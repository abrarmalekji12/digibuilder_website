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
    "You get clear reporting, useful experiments and a strategy shaped by real evidence, not vague ranking promises."
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
  return `<a class="card" href="/service/${service[0]}/"><span class="num">${service[1]} / 06</span><h3>${service[2]}</h3><p>${service[3]}</p><div class="tags">${service[5].slice(0,2).map(item=>`<span class="tag">${item}</span>`).join('')}</div></a>`;
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
  <section class="section markets-section"><div class="wrap split"><div><div class="eyebrow">Local insight. Remote collaboration.</div><h2>Built in Gujarat. Open to the world.</h2><p class="muted">Looking for a digital marketing agency in Modasa or elsewhere in Gujarat? We're here to talk. We also work remotely with businesses considering projects in Sydney, Brampton and London. We do not claim to have an office in every city.</p></div><div class="panel"><div class="kicker">What matters to us</div><h3>Less noise, more useful work.</h3><p>Honest conversations, creative thinking and practical delivery. Whether it's a brand refresh, a reel shoot, a better website or an automation idea, we start with the problem you're trying to solve.</p><a class="button secondary" href="/about/">Meet DigiBuilder</a></div></div></section>
  <section class="band"><div class="wrap split"><div><div class="eyebrow">Let's make your next move count</div><div class="quote">Tell us what's on your mind. We'll help you find a sensible place to start.</div></div><a class="button primary" href="/contact/">Start a conversation</a></div></section>`;
}

function about(){
  return shell(
    'About DigiBuilder',
    'Creative thinking, practical follow-through.',
    'We are a digital marketing and branding team rooted in Gujarat, India. We bring strategy, design, content, advertising, websites and AI automation together so growing businesses do not have to connect every piece themselves.',
    `<div class="split content-gap"><div class="panel"><div class="kicker">How we think</div><h2>First understand the business. Then build the marketing.</h2><p class="muted">Every business has a different story, budget and audience. We ask questions, look at what is already working and recommend the next useful move instead of selling services you may not need.</p></div><div><div class="steps"><div class="step"><div><h3>Listen and learn</h3><p>We understand your customers, goals, challenges and where opportunities might be hiding.</p></div></div><div class="step"><div><h3>Create with purpose</h3><p>From a visual identity to a campaign or video, each decision has a reason behind it.</p></div></div><div class="step"><div><h3>Improve together</h3><p>We review the work, make changes with real feedback and keep communication straightforward.</p></div></div></div></div></div><div class="panel content-gap"><div class="kicker">Where we work</div><p>Our roots are in Modasa, Gujarat. We welcome enquiries from across India, and we can collaborate remotely with teams in markets including Sydney, Brampton and London. Project requirements, availability and local production needs are discussed before we agree on a scope.</p></div>`
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
    'Tell us what you are working on.',
    'Need a clearer brand, stronger social content, a new website or better-performing ads? Share the idea, the challenge and your timeline. We will reply with a practical next step.',
    `<div class="split content-gap"><div><div class="panel"><div class="kicker">Prefer a direct hello?</div><h2>Your idea deserves a real conversation.</h2><p class="muted">Email <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a> or message <a href="https://wa.me/917016348927" target="_blank" rel="noopener" class="accent-link">WhatsApp +91 70163 48927</a>.</p><p class="muted">Based in Gujarat, we welcome enquiries from Modasa and beyond. Remote projects are discussed around your time zone and the work involved.</p></div></div><div class="panel"><form class="form" id="contact-form" action="https://formspree.io/f/maenabzy" method="POST"><input type="hidden" name="_subject" value="New DigiBuilder consultation enquiry"><div class="row"><label>Name *<input required name="name" autocomplete="name"></label><label>Email *<input required type="email" name="email" autocomplete="email"></label></div><div class="row"><label>Phone (optional)<input name="phone" type="tel"></label><label>Service<select name="service"><option>Not sure yet</option>${services.map(service=>`<option>${service[2]}</option>`).join('')}</select></label></div><label>Project context<textarea required name="project" placeholder="What are you building or trying to improve?"></textarea></label><div class="notice">Sending this form shares your enquiry with Formspree so DigiBuilder can reply. See our <a href="/privacy/" class="accent-link">privacy policy</a>, or use WhatsApp if you prefer.</div><div class="actions"><button class="button primary" type="submit">Send enquiry</button><button class="button secondary" type="button" id="wa">Message on WhatsApp</button></div><p id="form-status" class="muted" aria-live="polite"></p></form></div></div>`
  );
}

function legal(kind){
  if(kind==='privacy'){
    return shell(
      'Privacy policy',
      'Your trust matters. So does your privacy.',
      'Last updated: 7 November 2026. This policy covers DigiBuilder’s website, its website-based features in the DigiBuilder Android app, and enquiries sent to our team.',
      `<div class="legal content-gap">
        <h2>1. Who we are</h2>
        <p>DigiBuilder is a digital marketing and creative services business based in Modasa, Gujarat, India. This Privacy Policy explains how we handle personal information when you visit <a href="https://digibuilderai.com/" class="accent-link">digibuilderai.com</a>, use DigiBuilder website features in our Android app, or contact us about our services. For privacy questions or requests, email <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a>.</p>
        <h2>2. Information you choose to share</h2>
        <p>Our contact form requests your name, email address and project details. It also includes a service selection and an optional phone number. If you email or message us on WhatsApp, we receive the details you include in that conversation. If you decide to work with us, we may receive additional project information you provide in the course of that engagement.</p>
        <p>Please avoid sending passwords, financial account information, government identification numbers or sensitive personal details through our enquiry form.</p>
        <h2>3. Technical information when you visit</h2>
        <p>When you access the website or its pages through an app, our hosting and delivery providers may automatically process technical information such as your IP address, browser or device type, requested pages and time of access. GitHub Pages, our website hosting service, logs visitor IP addresses for security purposes. We do not operate a visitor account system on this website.</p>
        <h2>4. How and why we use information</h2>
        <p>We use the information you share to respond to enquiries, discuss your requirements, arrange conversations, prepare requested proposals and manage any resulting business relationship. We may also use relevant records to protect the website from misuse, resolve disputes and comply with applicable legal obligations. Where the law requires a legal basis, this may be your request or consent, steps toward a service agreement, our legitimate business interests, or a legal obligation, as applicable.</p>
        <p>We do not sell your enquiry details or add you to unrelated marketing mailing lists merely because you contacted us.</p>
        <h2>5. Contact forms, email and WhatsApp</h2>
        <p>Our website enquiry form sends the details you enter to <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" class="accent-link">Formspree</a> for processing and delivery to DigiBuilder. If you choose the WhatsApp option, the website prepares a message using the information you entered; that information goes to WhatsApp only if you choose to continue and send it. Emails and WhatsApp messages are handled by their respective providers, subject to their policies. See <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" class="accent-link">WhatsApp’s Privacy Policy</a>.</p>
        <h2>6. Hosting and other service providers</h2>
        <p>The website is hosted through GitHub Pages. Some pages may load a visual JavaScript library from jsDelivr to display the 3D experience. Hosting, content-delivery, form and communications providers may process limited personal or technical data to deliver their services. Their own privacy notices apply to information handled independently by them.</p>
        <p>We share enquiry information only with people working on the relevant request, service providers needed to operate these functions, or others when required by law. We do not share submitted enquiries with advertisers for targeted advertising.</p>
        <h2>7. DigiBuilder Android app</h2>
        <p>When the DigiBuilder Android app displays pages or enquiry features from our website, the same information practices described above apply to those features. The website content itself does not request access to your camera, microphone, contacts, precise location or device files. Your Android device, Google Play, network provider and any separately integrated app components may handle technical information under their own policies. Any additional app permissions, analytics or services introduced in a release must be reviewed and reflected in this policy and the app’s Google Play Data safety disclosures.</p>
        <h2>8. Cookies, analytics and advertising</h2>
        <p>As of the date above, the DigiBuilder website source does not include visitor analytics trackers, advertising pixels or a site-managed marketing cookie system. Providers that deliver hosting, form submissions or external links may use their own logs, cookies or other necessary technologies. If we introduce analytics, advertising technologies or new forms of tracking, we will update this policy and provide any notices or choices required by law.</p>
        <h2>9. How long we keep information</h2>
        <p>We retain enquiries and related messages while needed to respond, follow up on a requested service, manage an active project and maintain necessary business or legal records. Retention varies with the nature of the conversation and applicable obligations; we do not apply a single fixed period to every enquiry. When the information is no longer needed, we aim to delete it or limit its retention, subject to lawful record-keeping and the retention practices of our service providers.</p>
        <h2>10. Security</h2>
        <p>We take reasonable steps to protect information under our control, including limiting access to those who need it for business purposes and using established hosting and communications services. No online transmission or storage method can be guaranteed completely secure, so please do not submit confidential credentials or unnecessary sensitive information.</p>
        <h2>11. Your privacy choices and requests</h2>
        <p>You may contact us to ask what personal information we hold about you or to request a correction or deletion. Depending on the law that applies to you, you may also be able to withdraw consent, object to certain processing or exercise other privacy rights. Send your request to <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a>. We may need to verify your identity before acting, and some information may need to be retained to comply with legal obligations. You can also raise concerns with the relevant data protection authority where applicable.</p>
        <h2>12. International visitors and data processing</h2>
        <p>DigiBuilder accepts enquiries from India and other countries. Depending on where you are and which providers are involved, personal information may be transferred to or processed in countries other than your own. We use service providers for the purposes described here and take applicable legal requirements into account when handling international information.</p>
        <h2>13. Children and external links</h2>
        <p>Our services and enquiry form are intended for businesses and people seeking professional services, not for children. We do not knowingly seek personal information from children. If you believe a child has sent us personal data, please contact us so we can review the request. Our website may link to independent sites and apps; their own privacy practices apply when you visit them.</p>
        <h2>14. Updates and contact</h2>
        <p>We may update this policy when our website, app, service providers or legal obligations change. We will post the revised policy here with a new “Last updated” date. For any privacy question, access request or deletion request, contact DigiBuilder at <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a> or through our <a href="/contact/" class="accent-link">contact page</a>.</p>
      </div>`
    );
  }
  return shell(
    'Website terms',
    'Clear expectations make better work.',
    'Last updated: 26 October 2026. These terms describe use of the DigiBuilder website. Any paid project is governed by the written proposal or agreement accepted by both sides.',
    `<div class="legal content-gap">
      <h2>1. Using this website</h2>
      <p>You are welcome to explore our services, work and contact details. Please do not misuse the site, attempt unauthorised access or use its content in ways that infringe someone else's rights.</p>
      <h2>2. Website information</h2>
      <p>We aim to describe our services accurately, but the website provides general information. It is not a binding offer, a fixed price list or a guarantee of particular marketing results. Availability, deliverables and estimates depend on your brief.</p>
      <h2>3. Starting a project</h2>
      <p>Before we begin paid work, we discuss the brief and agree a written scope that can include deliverables, timelines, payment milestones, review rounds, approvals and responsibilities. A website enquiry or introductory conversation does not, by itself, create a paid engagement.</p>
      <h2>4. Feedback, changes and timelines</h2>
      <p>Projects work best when materials, access and approvals arrive on time. If the scope changes after an agreement, we will discuss the effect on fees and timing before moving ahead with the added work.</p>
      <h2>5. Materials and ownership</h2>
      <p>Please share only brand assets, images, music, copy and other material you have permission to use. Ownership and permitted use of any work we create are governed by the agreed project terms; third-party fonts, stock assets and software may have their own licences.</p>
      <h2>6. Third-party tools and advertising</h2>
      <p>Services may involve platforms such as Google, Meta, website hosts and AI tools. Their fees, account rules, availability and policies are separate from ours unless the agreed scope says otherwise. Advertising or search performance can change due to factors outside any agency's control.</p>
      <h2>7. Project results and examples</h2>
      <p>Every business and campaign is different. We do not guarantee rankings, reach, leads or sales from the website descriptions alone. Project names shown in our portfolio do not imply a particular service or result unless we describe it on that project.</p>
      <h2>8. External websites</h2>
      <p>Links to third-party websites are offered for convenience. Their content, policies and services are managed by those providers.</p>
      <h2>9. Questions and updates</h2>
      <p>We may update these website terms to reflect changes to our services or online presence. For questions about an engagement or this page, write to <a href="mailto:abdussamadvhora@gmail.com" class="accent-link">abdussamadvhora@gmail.com</a>. A separately signed agreement takes precedence for the specific work it covers.</p>
    </div>`
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

function render(){
  const legacy=legacyHashTarget();
  if(legacy && typeof location.replace==='function'){
    location.replace(legacy);
    return;
  }

  // Pre-rendered pages already contain their SEO-readable content.
  // Only attach the menu and contact form interactions in the browser.
  if(app.dataset?.prerendered==='true'){
    const view=location.pathname.split('/').filter(Boolean)[0]||'home';
    document.querySelectorAll('.links a').forEach(link=>{
      const href=link.getAttribute('href');
      link.classList.toggle('active',href===routePaths[view]||(view==='service'&&href==='/services/'));
    });
    bind();
    return;
  }

  towerCleanup?.();
  towerCleanup=null;
  const parts=location.hash.replace(/^#\/?/,'').split('/');
  const path=location.pathname.split('/').filter(Boolean);
  const view=parts[0]||path[0]||'home';
  const key=parts[1]||path[1];
  const output=view==='home'?home():view==='about'?about():view==='services'?servicesPage():view==='service'&&serviceMap[key]?servicePage(key):view==='work'?work():view==='contact'?contact():view==='privacy'?legal('privacy'):view==='terms'?legal('terms'):home();
  app.innerHTML=output;
  setMenuOpen(false);
  bind();
  window.scrollTo(0,0);
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

document.getElementById('year').textContent=new Date().getFullYear();
initAmbientPointer();
window.addEventListener('hashchange',render);
render();
