let lang='ru';

async function loadLang(){
  try{
    let t = await (await fetch('lang/'+lang+'.json')).json();
    for(let k in t){
      let e=document.getElementById(k);
      if(e) e.innerText=t[k];
    }
  }catch{}
}

async function checkInjector(file,dotId,textId){

  let dot=document.getElementById(dotId);
  let st=document.getElementById(textId);

  try{
    let v=(await (await fetch(file)).text()).trim();

    if(v=='1.0'){
      dot.className='dot green';
      st.innerText=lang=='ru'
        ? 'Работает'
        : 'Working';
    }else{
      dot.className='dot yellow';
      st.innerText=lang=='ru'
        ? 'Обновляется'
        : 'Updating';
    }

  }catch{
    dot.className='dot red';
    st.innerText=lang=='ru'
      ? 'Не обновлён'
      : 'Outdated';
  }
}

async function loadChangelog(){
  document.getElementById('changelog_text').innerText =
    await (await fetch('changelog.txt')).text();
}

function toggleLang(){
  lang=lang=='ru'?'en':'ru';
  loadLang();
  checkVersion();
}

// Плавный переход по якорям
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// ===== PARTS =====
const c = document.getElementById('particles');
const ctx = c.getContext('2d');

function resize(){
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}
resize();
window.onresize = resize;

let p = Array.from({length:70}, () => ({
  x: Math.random()*c.width,
  y: Math.random()*c.height,
  s: Math.random()*1.2+0.2
}));

function draw(){
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle='#fff';

  p.forEach(a=>{
    ctx.beginPath();
    ctx.arc(a.x,a.y,a.s,0,6);
    ctx.fill();

    a.y += a.s*0.3;
    if(a.y>c.height) a.y=0;
  });

  requestAnimationFrame(draw);
}

// ===== DISCORD COUNTER =====
async function loadDiscord(){
  try{
    let r = await fetch(
      'https://discord.com/api/guilds/9W9UcM5w/widget.json'
    );

    let j = await r.json();
    document.getElementById('discord_users').innerText =
      j.presence_count || '---';
  }catch{
    document.getElementById('discord_users').innerText='---';
  }
}

loadDiscord();
draw();
loadLang();
checkInjector();
loadChangelog();
