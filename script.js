'use strict';
const assetUrl = path => (window.AXIOM_ASSETS && window.AXIOM_ASSETS[path]) || path;
const groups = {
  'atomic-seen': {description:'Individual manipulation and navigation tasks.', videos:[['SlideDishwasherRack_seed659','Slide the dishwasher rack in',659],['PickPlaceCounterToCabinet_seed407','Move an object from counter to cabinet',407]]},
  'composite-seen': {description:'Multi-step tasks drawn from familiar task compositions.', videos:[['SearingMeat_seed1357','Sear meat',1357],['SetUpCuttingStation_seed1407','Set up a cutting station',1407]]},
  'composite-unseen': {description:'Evaluation on task compositions unseen during RoboCasa-specific training.', videos:[['CategorizeCondiments_seed1857','Categorize condiments',1857],['WaffleReheat_seed2359','Reheat a waffle',2359]]}
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
const gallery = document.querySelector('#video-gallery');
const panel = document.querySelector('#video-panel');
function activate(tab, focus=false) {
  gallery.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.querySelectorAll('source').forEach(s=>s.removeAttribute('src'));v.load();});
  tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
  panel.setAttribute('aria-labelledby',tab.id);
  const group=groups[tab.dataset.group];
  document.querySelector('#split-description').textContent=group.description;
  document.querySelector('#video-count').textContent=`${group.videos.length} videos`;
  gallery.replaceChildren(...group.videos.map(([stem,title,seed])=>{
    const article=document.createElement('article');article.className='video-card';
    const header=document.createElement('header');
    const h=document.createElement('h3');h.textContent=title;
    const meta=document.createElement('span');meta.textContent=`Seed ${seed} · 2× speed`;
    header.append(h,meta);
    const v=document.createElement('video');v.controls=true;v.muted=true;v.playsInline=true;v.preload='none';v.poster=assetUrl(`assets/posters/${stem}.jpg`);v.setAttribute('aria-label',`${title}: baseline and Axiom-0 comparison, seed ${seed}`);
    const source=document.createElement('source');source.src=assetUrl(`assets/videos/${stem}.mp4`);source.type='video/mp4';v.append(source);
    const fallback=document.createElement('a');fallback.href=source.src;fallback.textContent='Download this video';v.append(fallback);
    article.append(header,v);return article;
  }));
  if(focus)tab.focus();
}
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>activate(tab));
  tab.addEventListener('keydown',e=>{
    let next;
    if(e.key==='ArrowRight')next=(i+1)%tabs.length;
    if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;
    if(e.key==='Home')next=0;
    if(e.key==='End')next=tabs.length-1;
    if(next!==undefined){e.preventDefault();activate(tabs[next],true);}
  });
});
document.addEventListener('play',e=>{
  if(e.target.tagName==='VIDEO')document.querySelectorAll('video').forEach(v=>{if(v!==e.target)v.pause();});
},true);
activate(tabs[0]);

// Complete task and episode explorer.
(() => {
 const data = JSON.parse(document.getElementById('task-data').textContent);
 const byName = new Map(data.map(t => [t.name,t]));
 const taskGrid = document.querySelector('.task-grid');
 const cards = [...taskGrid.querySelectorAll('.task-card')];
 const categoryButtons = [...document.querySelectorAll('[data-task-group]')];
 const search = document.getElementById('task-search');
 const sort = document.getElementById('task-sort');
 let selected = 'all';
 const normalize = text => text.toLowerCase().replace(/[^a-z0-9]/g,'');
 function update() {
  const query = normalize(search.value);
  const ordered = [...cards].sort((a,b) => {
   if(sort.value==='name')return a.dataset.task.localeCompare(b.dataset.task);
   if(sort.value==='high')return Number(b.dataset.success)-Number(a.dataset.success)||Number(a.dataset.index)-Number(b.dataset.index);
   if(sort.value==='low')return Number(a.dataset.success)-Number(b.dataset.success)||Number(a.dataset.index)-Number(b.dataset.index);
   return Number(a.dataset.index)-Number(b.dataset.index);
  });
  let count=0;
  ordered.forEach(card => {card.hidden=!((selected==='all'||card.dataset.category===selected)&&normalize(card.dataset.task).includes(query));if(!card.hidden)count++;taskGrid.append(card);});
  document.getElementById('task-count').textContent=`Showing ${count} of 50 tasks`;
  document.querySelector('.task-empty').hidden=count!==0;
  document.querySelector('.task-scroll').scrollTop=0;
 }
 categoryButtons.forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.taskGroup;categoryButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));update();}));
 search.addEventListener('input',update);sort.addEventListener('change',update);
 cards.forEach(card=>card.addEventListener('toggle',()=>{
  card.querySelector('.task-open').textContent=card.open?'−':'+';
  if(!card.open||card.dataset.ready)return;
  card.dataset.ready='true';const task=byName.get(card.dataset.task);const grid=card.querySelector('.episode-grid');const readout=card.querySelector('.episode-readout');
  const selectEpisode=(episode,button)=>{grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));readout.textContent=`Episode ${episode.episode+1} · Seed ${episode.seed} · ${episode.success?'Success':'Unsuccessful'} · ${episode.steps.toLocaleString()} steps`;};
  task.episodes.forEach(episode=>{const button=document.createElement('button');button.type='button';button.className=episode.success?'episode success':'episode failed';button.textContent=episode.success?'✓':'−';const label=`Episode ${episode.episode+1}: ${episode.success?'success':'unsuccessful'}, seed ${episode.seed}, ${episode.steps} steps`;button.title=label;button.setAttribute('aria-label',label);button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>selectEpisode(episode,button));grid.append(button);});
  selectEpisode(task.episodes[0],grid.firstElementChild);
 }));
})();
