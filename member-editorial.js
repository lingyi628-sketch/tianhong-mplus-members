(() => {
 const grade=document.body.dataset.grade,level={mass:0,gold:1,sunflower:2,private:3}[grade],home=document.querySelector('#mp-home');
 const rail=document.querySelector('.activity-rail'),wrap=document.querySelector('.activity-wrap');
 const banners=[['ai-current.png','投AI全链，布局科技主线；抽至高88元现金红包','AI专区'],['figma-0.png','投多元行业主题，赢8888元基金体验金','主题产品活动'],['figma-2.png','投AI全链，把握时代机遇；赢8888元基金体验金','AI主题活动'],['figma-3.png','稳健产品活动，抽至高8.8元现金红包','稳健产品活动']];
 banners.push(['figma-1.png','投AI浪潮硬科技，抽至高188元现金红包','AI主题活动']);
 const fresh=rail.cloneNode(false);fresh.className='rail original-banners';fresh.innerHTML=banners.map(([file,label,title])=>'<button type="button" class="original-banner" data-entry="'+title+'" aria-label="'+label+'"><img src="assets/banners/'+file+'" alt="'+label+'"></button>').join('');rail.replaceWith(fresh);
 const oldDots=wrap.querySelector('.rail-dots'),dots=oldDots.cloneNode(false);oldDots.replaceWith(dots);dots.innerHTML=banners.map(([file,label],i)=>'<button type="button" aria-label="'+label+'" aria-current="'+(i===0)+'"></button>').join('');
 let current=0;const move=i=>{current=(i+banners.length)%banners.length;fresh.scrollTo({left:current*fresh.clientWidth,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});};
 dots.querySelectorAll('button').forEach((b,i)=>b.addEventListener('click',()=>move(i)));
 fresh.addEventListener('scroll',()=>{current=Math.round(fresh.scrollLeft/fresh.clientWidth);dots.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-current',String(i===current)));},{passive:true});
 wrap.insertAdjacentHTML('beforeend','<button type="button" class="banner-arrow prev" aria-label="上一张活动">‹</button><button type="button" class="banner-arrow next" aria-label="下一张活动">›</button>');
 wrap.querySelector('.prev').addEventListener('click',()=>move(current-1));wrap.querySelector('.next').addEventListener('click',()=>move(current+1));

 fresh.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(current+(e.key==='ArrowRight'?1:-1));}});
 const zones=document.querySelector('.zones');
 const zoneCards=[
  {title:'稳健专区',reward:'抽至高88元红包',tone:'steady'},
  {title:'红利专区',reward:'赢8888元体验金',tone:'dividend'},
  {title:'AI专区',reward:'抽至高88元红包',tone:'ai'}
 ];
 zones.setAttribute('aria-label','横向滑动浏览专区');zones.setAttribute('tabindex','0');
 zones.innerHTML=zoneCards.map(c=>'<button type="button" class="zone-card zone-'+c.tone+'" data-entry="'+c.title+'"><span class="zone-card-copy"><strong>'+c.title+'<span class="zone-entry-arrow" aria-hidden="true">›</span></strong><span class="zone-card-reward">'+c.reward+'</span></span></button>').join('');
 const enableHorizontalRail=rail=>{
  rail.tabIndex=0;
  rail.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();rail.scrollBy({left:(e.key==='ArrowRight'?1:-1)*(rail.firstElementChild.offsetWidth+10),behavior:'smooth'});}});
  let dragging=false,moved=false,startX=0,startLeft=0;
  rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;dragging=true;moved=false;startX=e.clientX;startLeft=rail.scrollLeft;});
  rail.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-startX;if(Math.abs(dx)>5){moved=true;rail.style.scrollSnapType='none';rail.scrollLeft=startLeft-dx;}});
  const end=()=>{dragging=false;rail.style.scrollSnapType='';};window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
  rail.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},true);
 };
 enableHorizontalRail(zones);
 document.querySelectorAll('.rank-row').forEach(row=>{const code=row.querySelector('.rank-product p span').textContent,record=window.memberLiveFunds[code]||window.fundPerformance.funds[code];if(!record)return;const metric=document.createElement('div');metric.className='rank-return '+(record.oneYearReturn<0?'negative':'positive');metric.innerHTML='<strong>'+(record.oneYearReturn>0?'+':'')+record.oneYearReturn.toFixed(2)+'%</strong><small>近1年涨跌幅</small>';row.insertBefore(metric,row.querySelector('.rank-buy'));});
 const boards=document.querySelector('#member-leaderboards');
 boards.querySelectorAll('[role=tabpanel]').forEach(p=>p.setAttribute('aria-description','按提供的榜单产品顺序展示，基金数据来自天天基金。'));document.querySelectorAll('.rank-product strong').forEach(n=>n.title=n.textContent);
 let autoTimer;const schedule=()=>{clearTimeout(autoTimer);if(!document.hidden)autoTimer=setTimeout(()=>{move(current+1);schedule();},4500);};schedule();wrap.addEventListener('pointerenter',()=>clearTimeout(autoTimer));wrap.addEventListener('pointerleave',schedule);wrap.addEventListener('focusin',()=>clearTimeout(autoTimer));wrap.addEventListener('focusout',schedule);document.addEventListener('visibilitychange',schedule);
 const contentRoot=document.querySelector('#member-content-groups');
 if(level===0)document.querySelector('.member-content').classList.add('single-content');
 document.querySelectorAll('.education-tiles').forEach(rail=>{rail.setAttribute('aria-label','横向滑动浏览资讯');enableHorizontalRail(rail);});
 document.querySelectorAll('.education-tiles .content-tile').forEach((tile,i)=>{tile.querySelector('.lesson-art').innerHTML='<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'+['<rect x="8" y="8" width="16" height="16" rx="4"/><path d="M12 3v5m8-5v5M12 24v5m8-5v5M3 12h5m-5 8h5m16-8h5m-5 8h5M12 16h8m-4-4v8"/>','<path d="M5 7h10c3 0 4 2 4 4v16c0-3-2-4-5-4H5V7Zm14 4c0-3 2-4 5-4h3v16h-3c-3 0-5 1-5 4"/><path d="M8 12h6m-6 5h6"/>','<circle cx="16" cy="10" r="5"/><path d="M7 28v-4c0-5 4-8 9-8s9 3 9 8v4M11 22v6m10-6v6"/>'][i]+'</svg>';tile.querySelector('.lesson-action').remove();});

 const contentDescriptions={live:'市场观点与策略交流',podcast:'听见投资背后的故事',video:'精选财富视频'};
 document.querySelectorAll('.media-tiles .content-tile').forEach(tile=>{const title=tile.querySelector('strong'),copy=document.createElement('span'),kind=tile.closest('.content-deck').id.replace('content-','');copy.className='media-copy';title.before(copy);copy.append(title);const caption=document.createElement('small');caption.textContent=contentDescriptions[kind];copy.append(caption);});
 const footer=document.querySelector('.footer');
 // The original artwork keeps its isolated styles, but shares the page's native
 // scroll surface. A second iframe can trap wheel/touch gestures in previews.
 async function mountReturnGuide(){
  const response=await fetch('footer-reference.html?v=24&grade='+grade);
  if(!response.ok)throw new Error('Return guide unavailable');
  const source=new DOMParser().parseFromString(await response.text(),'text/html');
  const host=document.createElement('div');host.className='original-return-guide inline-return-guide';
  const shadow=host.attachShadow({mode:'open'});
  source.querySelectorAll('link[rel="stylesheet"],style').forEach(node=>shadow.append(node.cloneNode(true)));
  const base=document.createElement('style');
  base.textContent=':host{display:block;font-family:"PingFang SC","Microsoft YaHei",sans-serif;-webkit-text-size-adjust:100%;font-size:12px;line-height:1.65}';shadow.append(base);
  [...source.body.children].filter(node=>node.tagName!=='SCRIPT').forEach(node=>shadow.append(node.cloneNode(true)));
  const search=shadow.querySelector('.search-hit');search.removeAttribute('onclick');search.addEventListener('click',()=>window.mplusEntry());
  const stylesReady=[...shadow.querySelectorAll('link')].map(link=>new Promise(resolve=>{link.addEventListener('load',resolve,{once:true});link.addEventListener('error',resolve,{once:true});}));
  footer.replaceChildren(host);
  await Promise.all(stylesReady);
  const stage=shadow.querySelector('#viewport'),guide=shadow.querySelector('#guide-frame');
  const originalText=[...shadow.querySelectorAll('#original p,#original span')].map(el=>({el,size:parseFloat(getComputedStyle(el).fontSize)}));
  const fit=()=>{const scale=host.clientWidth/375;if(!scale)return;stage.style.transform='scale('+scale+')';guide.style.height=284*scale+'px';originalText.forEach(({el,size})=>{if(size>0)el.style.fontSize=Math.max(size,12/scale)+'px';});};
  fit();new ResizeObserver(fit).observe(host);document.fonts.ready.then(fit);
 }
 mountReturnGuide().catch(()=>{footer.innerHTML='<a class="footer-retry" href="footer-reference.html?v=24&grade='+grade+'">查看回访指引与完整风险提示 ›</a>';});
 const fitContent=()=>{const height=fresh.querySelector('img').getBoundingClientRect().height;home.style.setProperty('--content-banner-height',height+'px');};new ResizeObserver(fitContent).observe(fresh);fresh.querySelector('img').addEventListener('load',fitContent);fitContent();
 const shared=value=>[value,value,value,value];
 const fundLabel=code=>window.memberLiveFunds[code].name+'<small>'+code+'</small>';
 const rankRows=(key,label)=>window.memberBoardCodes[key].map((code,i)=>[label+' '+(i+1),'—','—',fundLabel(code),fundLabel(code)]);
 const groups=[
  ['页面配色',[['基础色','蓝色','浅金色','棕金色','紫色']]],
  ['月享权益',[['基金体验金','1888元','2888元','8888元','18888元'],['现金红包','—','0.28元','0.58元','1.88元'],['每月专属大奖','—','—','—','188元<br>等级独享']]],
  ['活动加享 · Banner',[['活动',...shared('弘粉圈<br>来定投<br>指数拼图')],['专题',...shared('马龙稳健产品')]]],
  ['活动加享 · 专区',[['稳健专区',...shared('抽至高88元红包')],['红利专区',...shared('赢8888元体验金')],['AI专区',...shared('抽至高88元红包')]]],
  ['甄选产品',[['投稳健',...['017025','021042','015525','019894'].map(fundLabel)],['投红利',...shared('天弘中证央企红利50指数发起C<small>021562</small>')],['投AI',...shared('天弘中证沪港深云计算ETF联接C<small>019170</small>')],...rankRows('sip','定投人气榜'),...rankRows('new','新客心选榜')]],
  ['深研好内容',[['资讯',...shared('AI 坐标系<br>红利小百科<br>红利股东课')],['视频','—','财富视频','财富视频','财富视频'],['播客','—','—','人间钱话','人间钱话'],['直播','—','—','—','私享直播'],['首屏内容','资讯','视频','播客','直播']]],
  ['回访指引',[['查找入口',...shared('搜索「天弘基金」<br>进入天弘基金招财号')],['搜索提示',...shared('上招商银行App搜「天弘基金」')]]]
 ];
 const rowMarkup=row=>{row=row.map(value=>value.replace(/<br>/g,' ／ '));let cells='<th scope="row">'+row[0]+'</th>';for(let i=1;i<row.length;){let span=1;while(row[i]!=='—'&&i+span<row.length&&row[i+span]===row[i])span++;cells+='<td colspan="'+span+'" class="'+(level+1>=i&&level+1<i+span?'current-tier':'')+'">'+row[i]+'</td>';i+=span;}return '<tr>'+cells+'</tr>';};
 const table=document.createElement('section');table.className='section tier-table-section';table.id='tier-comparison';table.innerHTML='<h2>会员分层一览</h2><div class="tier-table-scroll"><table class="tier-table"><thead><tr><th>内容</th><th>大众</th><th>金卡</th><th>金葵花</th><th>金葵花 M3-私人银行</th></tr></thead><tbody>'+groups.map(([name,rows])=>'<tr class="tier-category"><th colspan="5">'+name+'</th></tr>'+rows.map(rowMarkup).join('')).join('')+'</tbody></table></div>';document.body.append(table);
 const expandTable=document.createElement('button');expandTable.type='button';expandTable.className='table-expand';expandTable.textContent='展开';expandTable.setAttribute('aria-expanded','false');table.querySelector('h2').append(expandTable);expandTable.addEventListener('click',()=>{const expanded=table.classList.toggle('table-expanded');expandTable.textContent=expanded?'收起':'展开';expandTable.setAttribute('aria-expanded',String(expanded));});
 const notes=[['页面配色',({mass:'大众采用蓝色',gold:'金卡采用浅金色',sunflower:'金葵花采用棕金色',private:'私行采用紫色'})[grade]+'，头卡、模块标题渐变与胶囊 Tab 使用统一的等级强调色，头卡下方展示本等级专属权益说明。','.hero'],['月享权益',({mass:'1888元体验金，无现金红包。',gold:'2888元体验金＋0.28元红包。',sunflower:'8888元体验金＋0.58元红包。',private:'18888元体验金＋1.88元红包；每月188元大奖为等级独享，三项权益采用相同排版，仅大奖增加“等级独享”气泡标识。'})[grade]+'月享礼集中展示，弱化重复按钮。','.gifts'],['内容优先级',({mass:'只展示资讯，省去单一分类栏。',gold:'视频优先，另有资讯。',sunflower:'播客优先，另有视频、资讯。',private:'直播优先，另有播客、视频、资讯。'})[grade]+'内容卡片不加底色，统一高度；资讯展示两张半，可横滑。','.member-content']];
 if(level>=2)notes.push(['客户榜单','仅金葵花和私行展示两榜，各3只基金，按指定顺序排列。榜单卡片不加底色；买一笔居中，收益与基金名称左对齐。','#member-leaderboards']);
 notes.push(['活动加享','四档共用原版轮播。活动规划：弘粉圈、来定投、指数拼图；专题：马龙稳健产品。未配链接时提示“待补充跳转链接”。','.activity-wrap']);
 notes.push(['专区卡片','四档共用，首屏两张半，可横滑。稳健、AI抽至高88元红包；红利赢8888元体验金。','.zones']);
 notes.push(['回访指引','四档共用原Figma回访指引和搜索入口；标题与搜索条随等级配色；同页滚动可查看完整风险提示。','.footer']);
 notes.push(['产品选品','投稳健按等级展示：大众通享、金卡弘利、金葵花多元增利、私行通利。投红利、投AI四档共用。图片统一占位：宽1026×高441px，JPG/PNG。','.products']);
 const aside=document.createElement('aside');aside.className='tier-annotations';aside.innerHTML='<h2>本等级差异批注</h2>'+notes.map(([title,text,target],i)=>'<a href="#" data-note-target="'+target+'"><span>'+String(i+1).padStart(2,'0')+'</span><div><strong>'+title+'</strong><p>'+text+'</p></div></a>').join('');document.body.append(aside);
 const refreshNotes=()=>{let previous=0;const homeBox=home.getBoundingClientRect();aside.style.left=(homeBox.right+18)+'px';aside.style.top=(homeBox.top+scrollY)+'px';aside.style.height=home.scrollHeight+'px';aside.style.width=Math.max(95,Math.min(175,innerWidth-homeBox.right-26))+'px';const ordered=[...aside.querySelectorAll('[data-note-target]')].sort((a,b)=>document.querySelector(a.dataset.noteTarget).getBoundingClientRect().top-document.querySelector(b.dataset.noteTarget).getBoundingClientRect().top);ordered.forEach((a,i)=>{aside.append(a);a.firstElementChild.textContent=String(i+1).padStart(2,'0');});ordered.forEach(a=>{const target=document.querySelector(a.dataset.noteTarget);const desired=target.getBoundingClientRect().top-homeBox.top;const top=Math.max(desired,previous);a.style.top=top+'px';previous=top+a.offsetHeight+12;});};
 new ResizeObserver(refreshNotes).observe(home);window.addEventListener('resize',refreshNotes);document.fonts.ready.then(refreshNotes);setTimeout(refreshNotes,100);
 const toggle=document.createElement('button');toggle.type='button';toggle.className='annotation-toggle';toggle.textContent='等级批注';toggle.setAttribute('aria-expanded','false');document.body.append(toggle);toggle.addEventListener('click',()=>{const open=aside.classList.toggle('mobile-open');toggle.setAttribute('aria-expanded',String(open));});
 aside.querySelectorAll('[data-note-target]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const target=document.querySelector(a.dataset.noteTarget);target.scrollIntoView({behavior:'smooth',block:'center'});target.classList.add('annotation-highlight');setTimeout(()=>target.classList.remove('annotation-highlight'),1600);aside.classList.remove('mobile-open');toggle.setAttribute('aria-expanded','false');}));
})();
