"use strict";

// Build real, crawlable HTML URLs from the same plain-JS templates used by the site.
// No framework or runtime server is required; run: node build-site.js
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const ORIGIN='https://digibuilderai.com';
const OUT=path.join(__dirname,'_site');
const template=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const source=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const cacheVersion=(process.env.GITHUB_SHA||'local').slice(0,12);
const app={innerHTML:'',dataset:{}};
const location={hash:'#/',pathname:'/'};
const document={
  hidden:false,
  getElementById(id){return id==='app'?app:id==='year'?{textContent:''}:null;},
  querySelectorAll(){return [];},
  addEventListener(){},
  documentElement:{style:{setProperty(){}}}
};
const window={
  addEventListener(){},
  scrollTo(){},
  matchMedia(){return {matches:false};}
};
const ctx=vm.createContext({document,window,location,console,FormData,URL,Date,Math});
vm.runInContext(source,ctx,{filename:'app.js'});
const services=vm.runInContext('services.map(item=>({slug:item[0],name:item[2],description:item[4]}))',ctx);

const pages=[
 {route:'/',hash:'#/',title:'Digital Marketing & Branding Agency in Modasa, Gujarat | DigiBuilder',description:'DigiBuilder helps brands grow with digital marketing, branding, social media reels, websites, SEO, advertising and AI automation in Modasa, Gujarat and beyond.',name:'Home'},
 {route:'/about/',hash:'#/about',title:'About DigiBuilder | Creative Digital Marketing Team in Gujarat',description:'Meet DigiBuilder, a creative digital marketing team based in Modasa, Gujarat. Branding, content, websites, performance marketing and practical AI workflows.',name:'About'},
 {route:'/services/',hash:'#/services',title:'Digital Marketing, Branding & AI Automation Services | DigiBuilder',description:'Explore DigiBuilder services: brand identity, social media marketing, reels and video editing, websites, Google Ads, local SEO and AI automation.',name:'Services'},
 {route:'/work/',hash:'#/work',title:'Our Work | Branding & Digital Marketing Projects | DigiBuilder',description:'Explore the DigiBuilder project list across businesses and brands. Project industries, services delivered and details are being documented.',name:'Work'},
 {route:'/contact/',hash:'#/contact',title:'Contact DigiBuilder | Digital Marketing Agency in Modasa',description:'Tell DigiBuilder about your project. Contact our Gujarat-based team for branding, social media, advertising, web design, SEO and AI automation.',name:'Contact'},
 {route:'/privacy/',hash:'#/privacy',title:'Privacy Policy | DigiBuilder',description:'Learn how DigiBuilder handles website enquiries, contact details, form submissions and third-party services.',name:'Privacy'},
 {route:'/terms/',hash:'#/terms',title:'Website Terms & Project Enquiries | DigiBuilder',description:'Read DigiBuilder website terms, project enquiry expectations, creative work, third-party platforms and scope agreements.',name:'Terms'}
];
const serviceMeta={
 strategy:['Growth Strategy & Marketing Consulting | DigiBuilder','Marketing and brand growth strategy, market research, positioning and practical planning from DigiBuilder in Gujarat.'],
 brand:['Branding & Creative Design Agency in Gujarat | DigiBuilder','Build a clear identity with DigiBuilder branding, logo and creative design, ad creatives and campaign direction.'],
 web:['Website Design & E-commerce Development | DigiBuilder','Responsive website design, landing pages, online stores and conversion-focused web development from DigiBuilder.'],
 social:['Social Media Marketing, Reels & Video Production | DigiBuilder','Social media management, Instagram reels, video shoots, editing, content creation and creative campaigns by DigiBuilder.'],
 seo:['SEO, Google Ads & Performance Marketing Agency | DigiBuilder','Get found with local and technical SEO, Google Ads, Meta advertising and measurable performance marketing from DigiBuilder.'],
 ai:['AI Automation & Workflow Services | DigiBuilder','Explore practical AI assistants, workflow automation and lead-management processes with DigiBuilder.']
};
services.forEach(service=>{
  const meta=serviceMeta[service.slug];
  pages.push({route:'/service/'+service.slug+'/',hash:'#/service/'+service.slug,title:meta[0],description:meta[1],name:service.name,service});
});

function escaped(value){
  return String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function jsonLd(page){
  const canonical=ORIGIN+page.route;
  const served=[
    { '@type':'Place',name:'Modasa, Gujarat, India' },
    { '@type':'Place',name:'Gujarat, India' },
    { '@type':'Place',name:'Sydney, Australia' },
    { '@type':'Place',name:'Brampton, Ontario, Canada' },
    { '@type':'Place',name:'London, United Kingdom' }
  ];
  const organization={
    '@type':'Organization','@id':ORIGIN+'/#organization',
    name:'DigiBuilder',url:ORIGIN+'/',
    logo:{'@type':'ImageObject',url:ORIGIN+'/digibuilder-logo.webp'},
    description:'Digital marketing, branding, content production, websites, search advertising and AI automation.',
    email:'abdussamadvhora@gmail.com',telephone:'+917016348927',
    contactPoint:{'@type':'ContactPoint',contactType:'business enquiries',email:'abdussamadvhora@gmail.com',telephone:'+917016348927'},
    areaServed:served,
    hasOfferCatalog:{
      '@type':'OfferCatalog',name:'Digital marketing and creative services',
      itemListElement:services.map(s=>({
        '@type':'Offer',itemOffered:{
          '@type':'Service',name:s.name,url:ORIGIN+'/service/'+s.slug+'/',
          description:s.description
        }
      }))
    }
  };
  const graph=[
    organization,
    {'@type':'WebSite','@id':ORIGIN+'/#website',name:'DigiBuilder',url:ORIGIN+'/',publisher:{'@id':ORIGIN+'/#organization'}},
    {'@type':'WebPage','@id':canonical+'#webpage',url:canonical,name:page.title,description:page.description,
      isPartOf:{'@id':ORIGIN+'/#website'},about:{'@id':ORIGIN+'/#organization'},inLanguage:'en'}
  ];
  if(page.route!=='/'){
    const crumbs=[
      {'@type':'ListItem',position:1,name:'Home',item:ORIGIN+'/'},
      {'@type':'ListItem',position:2,name:page.service?'Services':page.name,item:ORIGIN+(page.service?'/services/':page.route)}
    ];
    if(page.service)crumbs.push({'@type':'ListItem',position:3,name:page.name,item:canonical});
    graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumbs',itemListElement:crumbs});
  }
  if(page.service){
    graph.push({'@type':'Service','@id':canonical+'#service',name:page.service.name,
      serviceType:page.service.name,description:page.service.description,
      provider:{'@id':ORIGIN+'/#organization'},url:canonical,areaServed:served});
  }
  return JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c');
}
function head(page){
  const url=ORIGIN+page.route;
  const title=escaped(page.title),description=escaped(page.description);
  return [
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width,initial-scale=1">',
    '  <meta name="theme-color" content="#03141f">',
    '  <meta name="robots" content="index,follow,max-image-preview:large">',
    '  <meta name="description" content="'+description+'">',
    '  <title>'+title+'</title>',
    '  <link rel="canonical" href="'+url+'">',
    '  <link rel="icon" href="/digibuilder-logo.webp" type="image/webp">',
    '  <link rel="preload" as="image" href="/digibuilder-logo.webp">',
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="DigiBuilder">',
    '  <meta property="og:locale" content="en_IN">',
    '  <meta property="og:title" content="'+title+'">',
    '  <meta property="og:description" content="'+description+'">',
    '  <meta property="og:url" content="'+url+'">',
    '  <meta property="og:image" content="'+ORIGIN+'/digibuilder-logo.webp">',
    '  <meta property="og:image:alt" content="DigiBuilder logo">',
    '  <meta name="twitter:card" content="summary">',
    '  <meta name="twitter:title" content="'+title+'">',
    '  <meta name="twitter:description" content="'+description+'">',
    '  <script type="application/ld+json">'+jsonLd(page)+'</script>',
    '  <link rel="stylesheet" href="/styles.css?v='+cacheVersion+'">',
    '  <link rel="stylesheet" href="/experience.css?v='+cacheVersion+'">',
    '</head>'
  ].join('\n');
}
fs.rmSync(OUT,{recursive:true,force:true});
fs.mkdirSync(OUT,{recursive:true});
for(const asset of ['styles.css','experience.css','app.js','experience.js','digibuilder-logo.webp']){
  fs.copyFileSync(path.join(__dirname,asset),path.join(OUT,asset));
}
for(const page of pages){
  location.hash=page.hash;
  location.pathname=page.route;
  vm.runInContext('render()',ctx);
  let html=template.replace(/<head>[\s\S]*?<\/head>/,head(page));
  html=html.replace('<main id="app"></main>','<main id="app" data-prerendered="true">'+app.innerHTML+'</main>');
  html=html.replace('src="/app.js"','src="/app.js?v='+cacheVersion+'"');
  html=html.replace('src="/experience.js"','src="/experience.js?v='+cacheVersion+'"');
  html=html.replaceAll('src="/digibuilder-logo.webp"','src="/digibuilder-logo.webp?v='+cacheVersion+'"');
  if(page.route!=='/')html=html.replace(/\s*<script src="\/experience\.js\?v=[^"]+" defer><\/script>/,'');
  const activeRoute=page.service?'/services/':page.route;
  html=html.replace('href="'+activeRoute+'"','href="'+activeRoute+'" aria-current="page"');
  const dir=path.join(OUT,page.route);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'),html);
}
fs.writeFileSync(path.join(OUT,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+ORIGIN+'/sitemap.xml\n');
const urls=pages.map(p=>'  <url><loc>'+ORIGIN+p.route+'</loc></url>').join('\n');
fs.writeFileSync(path.join(OUT,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls+'\n</urlset>\n');
fs.writeFileSync(path.join(OUT,'CNAME'),'digibuilderai.com\n');
fs.writeFileSync(path.join(OUT,'.nojekyll'),'');
console.log('Generated '+pages.length+' crawlable pages, sitemap.xml and robots.txt');
