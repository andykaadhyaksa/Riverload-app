const VERSION='riverload-v1';
const SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
const CDN=[
'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/3.0.1/chartjs-plugin-annotation.min.js',
'https://cdn.jsdelivr.net/npm/xlsx-js-style/dist/xlsx.bundle.js',
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
'https://cdn.jsdelivr.net/npm/topojson-client@3',
'https://cdn.jsdelivr.net/npm/shpjs@4/dist/shp.js',
'https://cdn.jsdelivr.net/npm/dxf-parser@1.1.2/dist/dxf-parser.min.js',
'https://cdn.jsdelivr.net/npm/geotiff@2.1.3/dist-browser/geotiff.js',
'https://cdn.jsdelivr.net/npm/georaster@1.6.0/dist/georaster.browser.bundle.min.js',
'https://cdn.jsdelivr.net/npm/georaster-layer-for-leaflet@3.10.0/dist/georaster-layer-for-leaflet.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Sora:wght@600;700;800&display=swap'
];
self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(VERSION);
    await c.addAll(SHELL);
    await Promise.allSettled(CDN.map(u=>c.add(new Request(u,{mode:'no-cors'}))));
    self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys()) if(k!==VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});
const ok=r=>r&&(r.ok||r.type==='opaque');
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  if(!/^https?:$/.test(url.protocol)) return;
  const sameOrigin=url.origin===location.origin;
  if(req.mode==='navigate'){
    e.respondWith((async()=>{
      try{
        const r=await fetch(req);
        if(ok(r)){(await caches.open(VERSION)).put('./index.html',r.clone());}
        return r;
      }catch(_){return (await caches.match('./index.html'))||(await caches.match('./'));}
    })());
    return;
  }
  e.respondWith((async()=>{
    const hit=await caches.match(req);
    if(hit) return hit;
    try{
      const r=await fetch(req);
      const cacheable=sameOrigin||/cdnjs|jsdelivr|fonts\.(googleapis|gstatic)/.test(url.hostname);
      if(cacheable&&ok(r)) (await caches.open(VERSION)).put(req,r.clone());
      return r;
    }catch(_){return new Response('',{status:504,statusText:'Offline'});}
  })());
});
