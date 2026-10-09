(function(){
 var s=document.getElementById('net'),L=[3,5,5,3],X=[50,140,230,310],H=414,P=[],o='',i,j;
 L.forEach(function(n,k){P[k]=[];for(i=0;i<n;i++)P[k].push([X[k],H/(n+1)*(i+1)])});
 for(i=0;i<3;i++)P[i].forEach(function(a){P[i+1].forEach(function(b){o+='<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="#4f6dff" stroke-opacity=".35"/>'})});
 P.forEach(function(l,k){l.forEach(function(p,m){o+='<circle class="node" style="animation-delay:'+((k+m)*.35)+'s" cx="'+p[0]+'" cy="'+p[1]+'" r="9" fill="'+(k%2?'#6d4cff':'#38bdf8')+'" stroke="#fff" stroke-opacity=".5"/>'})});
 s.innerHTML=o;
 var hd=document.getElementById('hd'),l=document.getElementById('links'),b=document.getElementById('bg');
 document.getElementById('yr').textContent=new Date().getFullYear();
 function sc(){hd.classList.toggle('s',scrollY>20)}sc();addEventListener('scroll',sc,{passive:true});
 b.onclick=function(){var x=l.classList.toggle('open');b.setAttribute('aria-expanded',x)};
 l.onclick=function(e){if(e.target.tagName==='A'){l.classList.remove('open');b.setAttribute('aria-expanded','false')}};
 var A=[].slice.call(l.querySelectorAll('a')),R=document.querySelectorAll('.rv');
 if('IntersectionObserver' in window){
  var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)A.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('section[id]').forEach(function(x){so.observe(x)});
  var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('v');ro.unobserve(e.target)}})},{threshold:.08});
  R.forEach(function(r){ro.observe(r)});
 }else R.forEach(function(r){r.classList.add('v')});
})();

/* ---------- Dynamic layer ---------- */
(function(){
 var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
 var $=function(q,c){return [].slice.call((c||document).querySelectorAll(q))};
 // staggered indexes
 $('.sk .s').forEach(function(e,i){e.style.setProperty('--i',i)});
 $('.tl').forEach(function(t){$('li',t).forEach(function(e,i){e.style.setProperty('--i',i)})});
 $('.sh').forEach(function(e){e.classList.add('rv')});
 // typing role
 var tw=document.getElementById('tw'),ph=['MSc AI student at Dublin Business School','BSc Computer Science graduate','friendly customer service team member','Python, Java and C++ learner'],pi=0,ci=0,del=false;
 function type(){var p=ph[pi];
  if(rm){tw.textContent=p;pi=(pi+1)%ph.length;return setTimeout(type,2600)}
  ci+=del?-1:1;tw.textContent=p.slice(0,ci);
  var t=del?28:55;
  if(!del&&ci===p.length){del=true;t=1800}else if(del&&ci===0){del=false;pi=(pi+1)%ph.length;t=350}
  setTimeout(type,t)}
 type();
 // scroll progress
 var pg=document.getElementById('prog');
 function pr(){var m=document.documentElement.scrollHeight-innerHeight;pg.style.transform='scaleX('+(m>0?scrollY/m:0)+')'}
 pr();addEventListener('scroll',pr,{passive:true});addEventListener('resize',pr);
 // counters
 var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);
  var n=+e.target.dataset.n,s=null;if(rm)return;
  (function f(t){s=s||t;var k=Math.min((t-s)/1100,1);e.target.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(performance.now())})},{threshold:.6});
 $('[data-n]').forEach(function(e){if(!rm)e.textContent='0';cio.observe(e)});
 if(rm)return;
 // starfield canvas
 var c=document.createElement('canvas');c.id='stars';document.body.prepend(c);
 var x=c.getContext('2d'),S=[],W,H,mx=0,my=0,vis=true;
 function rs(){W=c.width=innerWidth;H=c.height=innerHeight;S=[];var n=Math.min(70,Math.round(W*H/22000));
  for(var i=0;i<n;i++)S.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.4,v:Math.random()*.18+.04,a:Math.random()*.5+.2,z:Math.random()+.3})}
 rs();addEventListener('resize',rs);
 document.addEventListener('visibilitychange',function(){vis=!document.hidden;if(vis)draw()});
 function draw(){if(!vis)return;x.clearRect(0,0,W,H);
  S.forEach(function(s){s.y-=s.v;if(s.y<-4){s.y=H+4;s.x=Math.random()*W}
   var px=s.x+mx*12*s.z,py=s.y+my*12*s.z;x.beginPath();x.arc(px,py,s.r,0,6.283);x.fillStyle='rgba(150,175,255,'+s.a+')';x.fill()});
  for(var i=0;i<S.length;i++)for(var j=i+1;j<S.length;j++){var dx=S[i].x-S[j].x,dy=S[i].y-S[j].y,d=dx*dx+dy*dy;
   if(d<9000){x.strokeStyle='rgba(90,120,255,'+(.12*(1-d/9000))+')';x.beginPath();x.moveTo(S[i].x,S[i].y);x.lineTo(S[j].x,S[j].y);x.stroke()}}
  requestAnimationFrame(draw)}
 draw();
 if(!fine)return;
 // cursor glow
 var g=document.createElement('div');g.className='glow';document.body.appendChild(g);
 var gx=0,gy=0,tx=0,ty=0;
 addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;mx=e.clientX/W-.5;my=e.clientY/H-.5},{passive:true});
 (function lp(){gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;g.style.transform='translate('+gx+'px,'+gy+'px)';requestAnimationFrame(lp)})();
 // hero parallax
 var art=document.querySelector('.art'),L=$('.art>*'),dp=[10,-8,14,-10];
 document.querySelector('.hero').addEventListener('mousemove',function(e){
  var r=art.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
  L.forEach(function(el,i){var d=dp[i%4];el.style.translate=(px*d)+'px '+(py*d)+'px'})});
 // card spotlight and tilt
 $('.s,.pc,.feat div').forEach(function(el){el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')})});
 $('.pc,.frame').forEach(function(el){var k=el.classList.contains('frame')?8:6;
  el.addEventListener('mousemove',function(e){var r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
   el.style.transform='perspective(800px) rotateY('+(px*k)+'deg) rotateX('+(-py*k)+'deg)'+(el.classList.contains('frame')?' translateX(8%)':'')});
  el.addEventListener('mouseleave',function(){el.style.transform=''})});
 // magnetic buttons
 $('.mag').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});b.addEventListener('mouseleave',function(){b.style.transform=''})});
})();

