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

async function checkVersion(){
  let dot=document.getElementById('dot');
  let st=document.getElementById('status_text');

  try{
    let v=(await (await fetch('version.txt')).text()).trim();

    if(v=='1.0'){
      dot.className='dot green';
      st.innerText=lang=='ru'
        ? 'Актуальная версия'
        : 'Up to date';
    }else{
      dot.className='dot yellow';
      st.innerText=lang=='ru'
        ? 'В процессе обновления'
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

loadLang();
checkVersion();
loadChangelog();
