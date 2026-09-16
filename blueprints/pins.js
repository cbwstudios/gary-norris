(function(){
  var body=document.body;
  try{ if(new URLSearchParams(location.search).get('pins')==='0'){ body.classList.add('pins-off'); var t0=document.getElementById('bp-toggle'); if(t0) t0.checked=false; } }catch(e){}
  function closeAll(except){ document.querySelectorAll('.pin.open').forEach(function(p){ if(p!==except){ p.classList.remove('open'); p.setAttribute('aria-expanded','false'); } }); }
  function place(p){ var r=p.getBoundingClientRect(); p.classList.remove('pin-edge','pin-edge-l'); if(r.left+170>window.innerWidth) p.classList.add('pin-edge'); else if(r.left<170) p.classList.add('pin-edge-l'); }
  document.querySelectorAll('.pin').forEach(function(p){
    p.addEventListener('click',function(e){ e.stopPropagation(); var open=p.classList.contains('open'); closeAll(p); p.classList.toggle('open',!open); p.setAttribute('aria-expanded',String(!open)); place(p); });
  });
  document.addEventListener('click',function(e){ if(!e.target.closest('.pin')) closeAll(); if(!e.target.closest('.bp-panel') && !e.target.closest('.bp-gear')) hidePanel(); if(!e.target.closest('.dd')) document.querySelectorAll('.dd.open').forEach(function(d){ d.classList.remove('open'); d.querySelector('.dd-btn').setAttribute('aria-expanded','false'); }); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ closeAll(); hidePanel(); closeModal(); } });
  var gear=document.querySelector('.bp-gear'), panel=document.getElementById('bp-panel');
  function hidePanel(){ if(panel && !panel.hidden){ panel.hidden=true; gear.setAttribute('aria-expanded','false'); } }
  if(gear&&panel){
    gear.addEventListener('click',function(e){ e.stopPropagation(); panel.hidden=!panel.hidden; gear.setAttribute('aria-expanded',String(!panel.hidden)); });
    var tog=document.getElementById('bp-toggle');
    if(tog) tog.addEventListener('change',function(){ body.classList.toggle('pins-off',!tog.checked); });
    panel.querySelectorAll('a[data-pin]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); var p=document.getElementById('pin-'+a.getAttribute('data-pin')); if(!p) return; if(tog&&!tog.checked){ tog.checked=true; body.classList.remove('pins-off'); } hidePanel(); p.scrollIntoView({block:'center'}); closeAll(p); p.classList.add('open'); p.setAttribute('aria-expanded','true'); place(p); p.focus(); }); });
  }
  var burger=document.querySelector('.burger'), nav=document.getElementById('nav');
  if(burger&&nav) burger.addEventListener('click',function(){ var o=nav.classList.toggle('open'); burger.setAttribute('aria-expanded',String(o)); });
  document.querySelectorAll('.dd-btn').forEach(function(b){ b.addEventListener('click',function(e){ e.stopPropagation(); var li=b.parentNode, o=li.classList.toggle('open'); b.setAttribute('aria-expanded',String(o)); }); });
  var modal=document.getElementById('consult'), last=null;
  function openModal(el){ if(!modal) return; last=el; modal.hidden=false; var f=modal.querySelector('input,select,textarea'); if(f) f.focus(); }
  function closeModal(){ if(modal&&!modal.hidden){ modal.hidden=true; if(last) last.focus(); } }
  document.querySelectorAll('[data-open-consult]').forEach(function(b){ b.addEventListener('click',function(){ openModal(b); }); });
  if(modal){ modal.querySelector('.modal-x').addEventListener('click',closeModal); modal.addEventListener('click',function(e){ if(e.target===modal) closeModal(); }); }
  document.querySelectorAll('form.consult').forEach(function(f){ f.addEventListener('submit',function(e){ e.preventDefault(); var m=f.querySelector('.fine'); if(m) m.textContent='Prototype: this form will post to AIO, the all-in-one marketing CRM, once the endpoint is configured. Nothing was sent.'; }); });
})();
