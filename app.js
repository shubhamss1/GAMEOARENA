const demoGames=[
 {id:'r1',title:'Turbo Drift',genre:'Racing',emoji:'🏎️',color:'linear-gradient(135deg,#ff784e,#7026a8)',desc:'Hit the track and chase the perfect drift.'},
 {id:'p1',title:'Pixel Quest',genre:'Adventure',emoji:'🧙',color:'linear-gradient(135deg,#1d9b8a,#2852a0)',desc:'Explore a tiny world full of surprises.'},
 {id:'a1',title:'Neon Blaster',genre:'Arcade',emoji:'👾',color:'linear-gradient(135deg,#7b2cff,#142c78)',desc:'A fast-paced arcade challenge.'},
 {id:'z1',title:'Gem Garden',genre:'Puzzle',emoji:'💎',color:'linear-gradient(135deg,#e94eaa,#5c3ec7)',desc:'Match gems and clear the board.'}
];
let activeFilter='All';
const $=s=>document.querySelector(s);
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function card(g){return `<article class="game-card"><div class="game-art" style="background:${g.color}">${g.emoji}</div><div class="game-info"><h3>${escapeHTML(g.title)}</h3><div class="game-meta">${escapeHTML(g.genre)} · GAMEOARENA</div><button data-play="${g.id}">Play game →</button></div></article>`}
function render(){const q=$('#searchInput').value.toLowerCase();const games=demoGames.filter(g=>(activeFilter==='All'||g.genre===activeFilter)&&(`${g.title} ${g.genre}`).toLowerCase().includes(q));$('#homeGames').innerHTML=demoGames.slice(0,4).map(card).join('');$('#browseGames').innerHTML=games.length?games.map(card).join(''):'<p class="game-meta">No games found. Try another search.</p>'}
function showView(name){document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));$('#'+name+'View').classList.remove('hidden');document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.view===name));window.scrollTo({top:0,behavior:'smooth'});if(name==='browse')render()}
document.addEventListener('click',e=>{const nav=e.target.closest('[data-view]');if(nav)showView(nav.dataset.view);const go=e.target.closest('[data-go]');if(go)showView(go.dataset.go);const play=e.target.closest('[data-play]');if(play)openGame(play.dataset.play);const filter=e.target.closest('[data-filter]');if(filter){activeFilter=filter.dataset.filter;document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('selected',c===filter));render()}});
$('#searchInput').addEventListener('input',()=>{if($('#browseView').classList.contains('hidden'))showView('browse');render()});
function openGame(id){const g=demoGames.find(x=>x.id===id);if(!g)return;$('#modalTitle').textContent=g.title;$('#gameStage').innerHTML=`<div class="demo-game"><div style="font-size:65px">${g.emoji}</div><h2>${escapeHTML(g.title)}</h2><p>${escapeHTML(g.desc)}</p><p>Sample game preview. Your published HTML5 games will launch here.</p><button id="demoStart">Start demo</button><p id="demoScore">Score: 0</p></div>`;let score=0;$('#demoStart').onclick=()=>{$('#demoScore').textContent='Score: '+(++score)+' — nice!'};$('#gameModal').classList.remove('hidden')}
$('#closeModal').onclick=()=>$('#gameModal').classList.add('hidden');$('#gameModal').addEventListener('click',e=>{if(e.target.id==='gameModal')$('#gameModal').classList.add('hidden')});
render();