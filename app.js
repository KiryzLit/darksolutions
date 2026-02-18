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

async function checkInjectorStatus(file,dotId,textId){

  let dot=document.getElementById(dotId);
  let st=document.getElementById(textId);

  try{
    let s=(await (await fetch(file)).text()).trim().toLowerCase();

    if(s=='working'){
      dot.className='dot green';
      st.innerText=lang=='ru'?'Работает':'Working';
    }

    else if(s=='updating'){
      dot.className='dot yellow';
      st.innerText=lang=='ru'?'Обновляется':'Updating';
    }

    else if(s=='detected'){
      dot.className='dot red';
      st.innerText=lang=='ru'?'Обнаружен':'Detected';
    }

    else if(s=='patched'){
      dot.className='dot red';
      st.innerText=lang=='ru'?'Пропатчен':'Patched';
    }

    else if(s=='testing'){
      dot.className='dot yellow';
      st.innerText=lang=='ru'?'Тестируется':'Testing';
    }

    else if(s=='fixing'){
      dot.className='dot yellow';
      st.innerText=lang=='ru'?'Исправляется':'Fixing';
    }

    else if(s=='down'){
      dot.className='dot red';
      st.innerText=lang=='ru'?'Не работает':'Down';
    }

  }catch{
    dot.className='dot red';
    st.innerText=lang=='ru'
      ? 'Ошибка'
      : 'Error';
  }
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
  checkInjector('internal.txt','dot_internal','status_internal');
  checkInjector('external.txt','dot_external','status_external');
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
checkInjector('internal.txt','dot_internal','status_internal');
checkInjector('external.txt','dot_external','status_external');
loadChangelog();
