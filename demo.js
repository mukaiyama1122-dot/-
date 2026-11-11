const byId = id => document.getElementById(id);
const menu = document.querySelector('.menu');
menu.onclick = () => menu.setAttribute('aria-expanded', byId('navigation').classList.toggle('open'));
const classes = [
 {name:'朝のガーデンヨガ',short:'庭ヨガ',time:'10:00–11:00',place:'凪の庭',fee:'1,500円',intro:'芝生にマットを広げ、空を見上げて深呼吸。立位のポーズで全身をゆっくり伸ばします。'},
 {name:'夕暮れのサウンドヨガ',short:'音ヨガ',time:'16:00–17:15',place:'音の間',fee:'2,500円',intro:'軽く身体をほぐしたあと、マットに横になり、ボウルの音が静かに消えていく余韻を味わいます。'}
];
const now = new Date();
let month = new Date(now.getFullYear(),now.getMonth(),1);
function classDay(index,date){
 const firstSaturday = 1+(6-date.getDay()+7)%7;
 return firstSaturday+(index+1)*7;
}
function dateText(date,day){return (date.getMonth()+1)+'月'+day+'日（土）'}
function openClass(index,date,day){
 const item=classes[index], label=dateText(date,day)+'　'+item.time, dialog=byId('booking'),step=byId('step');
 step.innerHTML='<p class="eyebrow">体験予約</p><h2>'+item.name+'</h2><p>'+label+'<br>'+item.place+'　／　'+item.fee+'</p><p>'+item.intro+'</p><label>お支払い方法（サンプル）<br><select id="method"><option>当日現金</option><option>オンラインカード</option></select></label><br><button id="confirm">申込内容を確認</button>';
 dialog.showModal();
 byId('confirm').onclick=()=>{
  const payment=byId('method').value;
  step.innerHTML='<h2>申込内容の確認</h2><p>'+item.name+'<br>'+label+'<br>'+item.fee+'　／　'+payment+'</p><button id="finish">デモ申込を完了</button>';
  byId('finish').onclick=()=>{step.innerHTML='<h2>体験が完了しました</h2><p>実際の予約・請求は発生しません。</p>';byId('close').focus()};
 };
}
byId('close').onclick=()=>byId('booking').close();
classes.forEach((item,i)=>{
 const date=new Date(now.getFullYear(),now.getMonth(),1),day=classDay(i,date),card=document.createElement('article');
 card.className='lesson';
 card.innerHTML='<p class="eyebrow">'+dateText(date,day)+'　'+item.time+'</p><h3>'+item.name+'</h3><p>'+item.intro+'</p><p class="sub">'+item.place+'　／　'+item.fee+'</p><button class="button">詳細・体験予約　↗</button>';
 card.querySelector('button').onclick=()=>openClass(i,date,day);byId('picks').append(card);
});
function render(){
 byId('month').textContent=month.getFullYear()+'年'+(month.getMonth()+1)+'月';
 const days=byId('days');days.replaceChildren();
 for(const letter of '日月火水木金土'){const cell=document.createElement('b');cell.textContent=letter;days.append(cell)}
 for(let i=0;i<month.getDay();i++)days.append(document.createElement('span'));
 const last=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
 for(let day=1;day<=last;day++){
  const index=classes.findIndex((_,i)=>classDay(i,month)===day);
  const cell=document.createElement(index<0?'span':'button');cell.textContent=day;
  if(index>=0){const tag=document.createElement('small');tag.textContent=classes[index].short;cell.append(tag);cell.onclick=()=>openClass(index,month,day)}
  days.append(cell);
 }
}
function move(amount){month=new Date(month.getFullYear(),month.getMonth()+amount,1);render()}
byId('prev').onclick=()=>move(-1);byId('next').onclick=()=>move(1);render();
