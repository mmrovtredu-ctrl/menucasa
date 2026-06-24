var WHATSAPP="5524999643048"; // (24) 99964-3048
var order={};
var selRoom="",selTime="";
function pickChip(group,btn,attr){
  var was=btn.classList.contains('sel');
  var els=document.getElementById(group).querySelectorAll('.chip');
  for(var i=0;i<els.length;i++)els[i].classList.remove('sel');
  if(was)return "";
  btn.classList.add('sel');
  return btn.getAttribute(attr);
}
function wireChips(group,attr,setter){
  var els=document.getElementById(group).querySelectorAll('.chip');
  for(var i=0;i<els.length;i++){(function(b){b.onclick=function(){setter(pickChip(group,b,attr));};})(els[i]);}
}
wireChips('rooms','data-room',function(v){selRoom=v;});
wireChips('times','data-time',function(v){selTime=v;});
function goTo(id){var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}
function chg(id,d){
  var card=document.getElementById('it-'+id);if(!card)return;
  var cur=order[id]?order[id].qty:0;var q=Math.max(0,cur+d);
  if(q<=0){delete order[id];}else{order[id]={name:card.dataset.name,cat:card.dataset.cat,qty:q};}
  var qel=document.getElementById('q-'+id);if(qel)qel.textContent=q;
  card.classList.toggle('sel',q>0);
  refresh();
}
function refresh(){
  var total=0,perCat={};
  for(var k in order){total+=order[k].qty;var ci=k.split('_')[0];perCat[ci]=(perCat[ci]||0)+order[k].qty;}
  for(var i=0;i<4;i++){var el=document.getElementById('cnt-'+i);if(el){el.textContent=perCat[i]||0;el.classList.toggle('show',!!perCat[i]);}}
  var btn=document.getElementById('cartbtn'),b=document.getElementById('cartbadge'),l=document.getElementById('cartlabel');
  if(total>0){btn.disabled=false;b.style.display='flex';b.textContent=total;l.textContent='Ver pedido e enviar';}
  else{btn.disabled=true;b.style.display='none';l.textContent='Selecione seu café da manhã';}
}
var CATNAMES=["Bebidas","Pães e massas","Doces","Frios"];
var scrim=document.getElementById('scrim'),sheet=document.getElementById('sheet');
function openSheet(){buildOrder();scrim.classList.add('open');sheet.classList.add('open');}
function closeSheet(){scrim.classList.remove('open');sheet.classList.remove('open');}
document.getElementById('cartbtn').onclick=function(){if(Object.keys(order).length)openSheet();};
scrim.onclick=closeSheet;
function buildOrder(){
  var list=document.getElementById('ordlist');var keys=Object.keys(order);
  if(!keys.length){list.innerHTML='<p class="empty">Nenhum item ainda.</p>';return;}
  var html='';
  for(var ci=0;ci<4;ci++){
    var its=keys.filter(function(k){return k.indexOf(ci+'_')===0;});
    if(!its.length)continue;
    html+='<div class="ord-cat">'+CATNAMES[ci]+'</div>';
    its.forEach(function(k){var o=order[k];
      html+='<div class="ord-line"><span class="q">'+o.qty+'x</span><span class="nm">'+o.name+'</span><button class="rm" onclick="chg(\''+k+'\',-99);refreshSheet()">remover</button></div>';});
  }
  list.innerHTML=html;
}
function refreshSheet(){buildOrder();if(!Object.keys(order).length)closeSheet();}
document.getElementById('send').onclick=function(){
  var keys=Object.keys(order);if(!keys.length)return;
  var nome=document.getElementById('g-nome').value.trim();
  var quarto=selRoom;
  var hora=selTime;
  var obs=document.getElementById('g-obs').value.trim();
  var m='*Pedido de café da manhã — RECREIO* (Casa Caiçara)\n';
  if(nome)m+='Hóspede: '+nome+'\n';
  if(quarto)m+='Quarto: '+quarto+'\n';
  for(var ci=0;ci<4;ci++){
    var its=keys.filter(function(k){return k.indexOf(ci+'_')===0;});
    if(!its.length)continue;
    m+='\n*'+CATNAMES[ci].toUpperCase()+'*\n';
    its.forEach(function(k){m+='• '+order[k].qty+'x '+order[k].name+'\n';});
  }
  if(hora)m+='\nHorário desejado: '+hora+'\n';
  if(obs)m+='Observações: '+obs+'\n';
  window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(m),'_blank');
};
// 3D tilt logo
(function(){
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var logo=document.getElementById('logo'),stage=document.querySelector('.logo-stage');
  stage.addEventListener('pointermove',function(e){
    var r=stage.getBoundingClientRect();
    var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    logo.style.transform='rotateY('+(x*18)+'deg) rotateX('+(-y*18)+'deg)';
  });
  stage.addEventListener('pointerleave',function(){logo.style.transform='';});
})();
refresh();
