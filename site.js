(() => {
  const root = document.getElementById('mp-compact');
  const monthlyData = {
    metal: { title:'工业有色', thesis:'从工业金属需求、供给和价格变化理解行业逻辑，关注资源周期及行业集中风险。', reasons:[['策略机制','理解工业有色指数的行业范围和选股规则'],['观察线索','关注工业需求、供给变化及商品价格'],['风险边界','行业集中与商品价格波动可能影响净值']], evidence:'指数编制规则 · 基金定期报告 · 产品法律文件', fund:'天弘中证工业有色金属主题ETF联接 C', code:'017193', risk:'R5 高风险', feature:'工业有色主题 · 行业集中与资源周期风险' },
    dividend: { title:'央企红利', thesis:'从选股规则、行业分布与分红特征，理解央企红利策略的投资逻辑。', reasons:[['策略机制','看懂指数如何筛选红利股票'],['观察线索','关注行业分布与持仓集中度'],['风险边界','红利仍是权益投资，并非低风险替代']], evidence:'指数编制规则 · 基金定期报告 · 产品法律文件', fund:'天弘中证央企红利50指数发起 C', code:'021562', risk:'R4 中高风险', feature:'央企红利指数 · 跟踪指数表现' },
    bond: { title:'债券配置', thesis:'从债券票息与价格变化出发，理解债券基金的收益来源和净值波动。', reasons:[['策略机制','区分票息收入与债券价格变化'],['观察线索','关注久期、信用结构与组合集中度'],['风险边界','债券基金仍有净值波动，不等同存款']], evidence:'基金定期报告 · 产品法律文件 · 费率与申赎规则', fund:'天弘通享债券发起 C', code:'017025', risk:'R3 中风险', feature:'债券策略 · 利率、信用与流动性风险' },
    cloud: { title:'云计算', thesis:'从指数覆盖范围和产业链环节入手，理解云计算主题的投资范围与集中风险。', reasons:[['策略机制','看懂指数覆盖的市场与产业链环节'],['观察线索','关注成分股、行业集中度与估值变化'],['风险边界','主题投资波动较大，跨市场风险需关注']], evidence:'指数编制规则 · 基金定期报告 · 产品法律文件', fund:'天弘中证沪港深云计算ETF联接 C', code:'019170', risk:'R5 高风险', feature:'云计算主题 · 集中度与跨市场风险' }
  };
  let currentMonthlyTopic = 'dividend';
  const equalizeProductPanels = () => {
    if(!root.querySelector('#mp-home').offsetWidth)return;
    const panels=[root.querySelector('#monthly-long'),root.querySelector('#monthly-stage')];
    const hiddenStates=panels.map(x=>x.hidden);
    panels.forEach(x=>{x.style.minHeight='';x.style.visibility='hidden';x.hidden=false;});
    const height=Math.ceil(Math.max(...panels.map(x=>x.getBoundingClientRect().height)));
    panels.forEach((x,i)=>{x.hidden=hiddenStates[i];x.style.visibility='';x.style.minHeight=height+'px';});
  };
  window.addEventListener('resize',equalizeProductPanels);
  document.fonts.ready.then(equalizeProductPanels);
  root.querySelectorAll('.allocation-notes').forEach(x=>x.addEventListener('toggle',equalizeProductPanels));
  const renderMonthly = key => {
    currentMonthlyTopic=key;
    const d=monthlyData[key];
    const fields={'monthly-topic-title':d.title,'monthly-thesis':d.thesis,'monthly-evidence':d.evidence,'monthly-fund-name':d.fund,'monthly-fund-code':d.code,'monthly-fund-risk':d.risk,'monthly-fund-feature':d.feature};
    Object.entries(fields).forEach(([id,value])=>{const el=root.querySelector('#'+id);if(el)el.textContent=value;});
    root.querySelectorAll('[data-month-topic]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.monthTopic===key)));
  };
  root.querySelectorAll('[data-month-topic]').forEach(b=>b.addEventListener('click',()=>renderMonthly(b.dataset.monthTopic)));
  root.querySelectorAll('[data-month-group]').forEach(b=>b.addEventListener('click',()=>{
    const isLong=b.dataset.monthGroup==='long';
    root.querySelectorAll('[data-month-group]').forEach(x=>x.setAttribute('aria-selected',String(x===b)));
    root.querySelectorAll('[data-month-topic]').forEach(x=>x.hidden=isLong?x.dataset.monthTopic==='cloud':x.dataset.monthTopic!=='cloud');
    root.querySelector('#monthly-long').hidden=!isLong;
    root.querySelector('#monthly-stage').hidden=isLong;
    renderMonthly('cloud');
  }));
  root.querySelectorAll('#monthly-deep,#monthly-fund-detail,[data-asset-topic]').forEach(b=>b.addEventListener('click',()=>{
    if(b.dataset.assetTopic)currentMonthlyTopic=b.dataset.assetTopic;
    const d=monthlyData[currentMonthlyTopic];const page=root.querySelector('#mp-product-page');
    page.querySelector('.hero h2').textContent=d.fund;
    page.querySelector('.hero .small:last-child').textContent=d.code+' · '+d.risk+' · 解读示意';
    const sections=page.querySelectorAll('.section');
    sections[0].querySelector('p').textContent=d.thesis;
    sections[1].querySelectorAll('.entry').forEach((e,i)=>{e.firstChild.textContent=d.reasons[i][0];e.querySelector('p').textContent=d.reasons[i][1]+'。正式页面配套核验数据及来源。';});
    sections[2].querySelector('p').textContent=d.reasons[2][1]+'。具体风险以产品文件为准。';
  }));
  const updateBannerArt = () => {
    const count = Number(root.querySelector('#mp-banner-count').textContent.split('/')[0]);
    const art = root.querySelector('#mp-banner-art');
    art.src = ['assets/img7.png', 'assets/img3D1.png', 'assets/imgJimeng2026062531561.png'][count - 1];
    art.alt = count === 3 ? '私享交流插画' : '稳健产品活动插画';
  };
  root.addEventListener('bannerchange', updateBannerArt);
  const dialog = document.createElement('dialog');
  dialog.className = 'site-dialog';
  dialog.innerHTML = '<h3 id="dialog-title"></h3><p id="dialog-body"></p><form method="dialog"><button>返回专区</button></form>';
  dialog.setAttribute('aria-labelledby', 'dialog-title');
  document.body.append(dialog);
  const show = (title, body) => {
    dialog.querySelector('h3').textContent = title;
    dialog.querySelector('p').textContent = body;
    dialog.showModal();
  };
  root.querySelector('[data-rank]').addEventListener('click',()=>show('基金业绩排名','排名入口已预留，待接入正式榜单。正式页面需标明分类、统计区间、数据来源及更新时间；当前不展示模拟排名。'));
  root.querySelectorAll('[data-note]').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.querySelector('#mp-stable-title')?.textContent || button.textContent.trim();
      const isGift = title.includes('抽取');
      show(title, isGift ? '会员权益领取入口已预留。实际领取需要接入招行活动地址及登录状态。当前页面不会执行领取或扣款。' : '活动入口已预留。具体参与规则、奖励及真实页面地址待配置，当前可继续体验专区其他模块。');
    });
  });
  root.querySelectorAll('.entry').forEach(entry => {
    entry.setAttribute('role', 'button');
    entry.tabIndex = 0;
    const open = () => show(entry.firstChild.textContent.replace('→', '').trim(), '该栏目入口已预留，待接入正式内容。当前没有用模拟文章或视频替代真实内容。');
    entry.addEventListener('click', open);
    entry.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
  });
  root.querySelectorAll('.fund-row').forEach(row => {
    row.setAttribute('role', 'button'); row.tabIndex = 0;
    const open = () => show(row.querySelector('div').textContent, '该产品的资金数据尚未接入。产品详细资料和销售入口待配置；页面中的资金流向不是买卖建议。');
    row.addEventListener('click', open);
    row.addEventListener('keydown', event => { if (event.key === 'Enter') open(); });
  });
  const monthly = root.querySelector('.strategy-reports .report:not(button)');
  if (monthly) {
    monthly.setAttribute('role', 'button'); monthly.tabIndex = 0; monthly.style.cursor = 'pointer';
    const open = () => show('投资策略月报', '月报入口已预留，待接入经审核的投研策略月报。');
    monthly.addEventListener('click', open);
    monthly.addEventListener('keydown', event => { if (event.key === 'Enter') open(); });
  }
})();
