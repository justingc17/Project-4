(function(){
  if(window.matchMedia('(max-width:768px)').matches)return;
  const dot=document.querySelector('.cursor__dot');
  const ring=document.querySelector('.cursor__ring');
  if(!dot||!ring)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  function tick(){
    dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
    rx+=(mx-rx)*.22; ry+=(my-ry)*.22;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }
  tick();
  document.querySelectorAll('a,button,[data-cursor]').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
  });
})();
