(function(){
var $=function(s,c){return[].slice.call((c||document).querySelectorAll(s))},rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
$('.rv').forEach(function(el){io.observe(el)});
var last=-2,bar=document.getElementById('bar'),ps=$('[data-p]'),links=$('nav a'),secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
function onS(){var h=document.documentElement,m=h.scrollHeight-innerHeight;bar.style.width=(m>0?h.scrollTop/m*100:0)+'%';
 if(!rm)ps.forEach(function(el){var r=el.getBoundingClientRect(),c=r.top+r.height/2-innerHeight/2;el.style.transform='translateY('+(c*parseFloat(el.dataset.p)).toFixed(1)+'px)'});
 var cur=-1;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<innerHeight*.4)cur=i});links.forEach(function(a,i){a.classList.toggle('act',i===cur)});
 if(cur!==last){last=cur;var nv=links.length&&links[0].parentNode;if(cur>-1&&nv&&nv.scrollWidth>nv.clientWidth+2){var a=links[cur];nv.scrollTo({left:a.offsetLeft-(nv.clientWidth-a.offsetWidth)/2,behavior:rm?'auto':'smooth'})}}}
addEventListener('scroll',onS,{passive:true});onS();
if(matchMedia('(pointer:fine)').matches&&!rm){
 $('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.14+'px,'+(e.clientY-r.top-r.height/2)*.24+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
 $('.cd .im').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateY('+x*10+'deg) rotateX('+-y*10+'deg) scale(1.03)'});c.addEventListener('pointerleave',function(){c.style.transform=''})});
}
$('.tabs button').forEach(function(b){b.addEventListener('click',function(){$('.tabs button').forEach(function(x){x.setAttribute('aria-selected',x===b)});$('.panel').forEach(function(p){p.classList.toggle('on',p.id===b.dataset.t)})})});
$('.fq .it button').forEach(function(b){b.addEventListener('click',function(){var it=b.parentNode,o=!it.classList.contains('open');$('.fq .it').forEach(function(x){x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded','false')});if(o){it.classList.add('open');b.setAttribute('aria-expanded','true')}})});
var lb=document.getElementById('lb'),li=lb.querySelector('img');
$('.cd').forEach(function(c){c.addEventListener('click',function(){var im=c.querySelector('img');li.src=im.src;li.alt=im.alt;lb.classList.add('on');lb.querySelector('button').focus()})});
function cl(){lb.classList.remove('on')}lb.addEventListener('click',cl);addEventListener('keydown',function(e){if(e.key==='Escape')cl()});
$('.chips button').forEach(function(b){b.addEventListener('click',function(){$('.chips button').forEach(function(x){x.setAttribute('aria-checked',x===b)});document.getElementById('s').value=b.textContent})});
document.getElementById('send').addEventListener('click',function(){var v=function(i){return document.getElementById(i).value.trim()};
 var msg='Hola, soy '+(v('n')||'(sin nombre)')+(v('m')?' de '+v('m'):'')+'. Me interesa: '+document.getElementById('s').value+'.'+(v('t')?' '+v('t'):'');
 window.open('https://wa.me/573148336820?text='+encodeURIComponent(msg),'_blank','noopener')});
/* banner en movimiento: solo cuando el contenido no cabe en una línea */
$('.mq').forEach(function(el){var t=el.querySelector('.mq-t');if(!t)return;var items=[].slice.call(t.children);
 items.forEach(function(n){var c=n.cloneNode(true);c.classList.add('cl');c.setAttribute('aria-hidden','true');if(c.tagName==='IMG'){c.alt='';c.loading='eager'}t.appendChild(c)});
 function check(){el.classList.remove('on');var gap=parseFloat(getComputedStyle(t).columnGap)||0,need=items.reduce(function(s,n){return s+n.getBoundingClientRect().width},0)+gap*(items.length-1);
  if(need>el.clientWidth+1){var g=Math.max(40,gap);el.style.setProperty('--mqg',g+'px');el.classList.add('on');el.style.setProperty('--mqd',Math.max(14,(t.scrollWidth/2)/45).toFixed(1)+'s')}}
 if(window.ResizeObserver)new ResizeObserver(check).observe(el);addEventListener('load',check);check()});
/* filas deslizables: puntos que indican la tarjeta visible */
$('.band,.svc,#p2,.sg,.gr-row,.st').forEach(function(sc){var kids=[].slice.call(sc.children),d=document.createElement('div');d.className='hs-dots';d.setAttribute('aria-hidden','true');d.hidden=true;
 kids.forEach(function(){d.appendChild(document.createElement('i'))});sc.parentNode.insertBefore(d,sc.nextSibling);var dots=[].slice.call(d.children),raf=0;
 function upd(){raf=0;var over=sc.offsetParent!==null&&getComputedStyle(sc).display!=='contents'&&sc.scrollWidth>sc.clientWidth+2;d.hidden=!over;if(!over)return;
  var base=sc.getBoundingClientRect().left+parseFloat(getComputedStyle(sc).paddingLeft),act=0,best=1e9;
  kids.forEach(function(k,i){var dx=Math.abs(k.getBoundingClientRect().left-base);if(dx<best){best=dx;act=i}});
  if(sc.scrollLeft+sc.clientWidth>=sc.scrollWidth-2)act=kids.length-1;dots.forEach(function(x,i){x.classList.toggle('on',i===act)})}
 sc.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(upd)},{passive:true});if(window.ResizeObserver)new ResizeObserver(upd).observe(sc);addEventListener('resize',upd);upd();
 $('.tabs button').forEach(function(b){b.addEventListener('click',function(){setTimeout(upd,0)})})});
})();
