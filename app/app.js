const WA = '573000000000';
const money = n => '$' + n.toLocaleString('es-CO') + ' COP';
const U = id => `https://images.unsplash.com/${id}?q=80&w=1800&auto=format&fit=crop`;

const slides = [
  {chip:'Res', title:'Cortes de res<br>de campo', desc:'Ganado bovino seleccionado, madurado y empacado en frío. Suavidad y sabor para su parrilla.',
   bg:U('photo-1500595046743-cd271d694d30'), img:U('photo-1603048588665-791ca8aea617'), name:'Lomo Fino y Churrasco', price:42000, unit:'500g'},
  {chip:'Cerdo', title:'Cerdo limpio<br>y jugoso', desc:'Costillas BBQ y pernil bajos en grasa, ideales para ahumar u hornear.',
   bg:U('photo-1544025162-d76694265947'), img:U('photo-1607623814075-eaf1df15c0e3'), name:'Costillas BBQ y Pernil', price:32000, unit:'500g'},
  {chip:'Pollo', title:'Pollo campesino<br>fresco', desc:'Aves criadas en galpones abiertos con granos naturales, sin hormonas añadidas.',
   bg:U('photo-1500595046743-cd271d694d30'), img:U('photo-1587593810167-a84920ea0781'), name:'Pollo Entero y Pechuga', price:18000, unit:'unidad'}
];
let cur = 0, cart = [];
const $ = id => document.getElementById(id);

function render(){
  const s = slides[cur];
  $('bg').style.backgroundImage = `url(${s.bg})`;
  $('title').innerHTML = s.title; $('desc').textContent = s.desc;
  $('f-img').src = s.img; $('f-name').textContent = s.name;
  $('f-price').textContent = `${money(s.price)} / ${s.unit}`;
  $('count').textContent = `0${cur+1} / 0${slides.length}`;
  $('bar').style.width = ((cur+1)/slides.length*100) + '%';
  $('chips').innerHTML = slides.map((x,i)=>`<button class="chip ${i===cur?'on':''}" data-i="${i}">${x.chip}</button>`).join('');
}
$('chips').onclick = e => { const i = e.target.dataset.i; if(i!==undefined){cur=+i;render();} };
$('next').onclick = () => { cur=(cur+1)%slides.length; render(); };
$('prev').onclick = () => { cur=(cur-1+slides.length)%slides.length; render(); };
$('f-add').onclick = () => add(slides[cur].name, slides[cur].price);

$('grid').innerHTML = slides.map(s=>`
  <article class="prod"><img src="${s.img}" alt="${s.name}"><div>
    <h4>${s.name}</h4><p>${s.desc}</p>
    <footer><b>${money(s.price)}<small style="font-size:11px;font-weight:400;color:#52646b"> / ${s.unit}</small></b>
    <button onclick="add('${s.name}',${s.price})">Añadir</button></footer></div></article>`).join('');

function add(name, price){ cart.push({name,price}); drawCart(); }
function del(i){ cart.splice(i,1); drawCart(); }
function drawCart(){
  $('cart-count').textContent = cart.length;
  $('cart-items').innerHTML = cart.length ? cart.map((c,i)=>
    `<div class="item"><span>${c.name}<br><small>${money(c.price)}</small></span><button onclick="del(${i})"><i class="fa-solid fa-trash"></i></button></div>`).join('')
    : '<p>Tu carrito está vacío.</p>';
  $('cart-total').textContent = money(cart.reduce((a,c)=>a+c.price,0));
}
function toggle(id){ $(id).classList.toggle('hidden'); }
function checkout(method){
  if(!cart.length) return alert('Tu carrito está vacío.');
  const total = cart.reduce((a,c)=>a+c.price,0);
  const items = cart.map(c=>c.name).join(', ');
  const msg = `Hola, quiero confirmar mi pedido (${items}) por ${money(total)} pagando con ${method}.`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
}
render(); drawCart();
