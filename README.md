# 天弘基金 M+ 会员专区

纯静态 HTML、CSS、JavaScript，无需安装依赖或构建。所有资源使用相对路径，支持 GitHub Pages 项目子路径。

## 页面

- `index.html`：会员页面，`?grade=mass|gold|sunflower|private` 切换四档会员。
- `iphone-preview.html`：手机预览、尺寸切换、外侧分层表及随板块滚动的批注。
- `footer-reference.html`：回访指引与完整风险提示的原始内容；首页以同页组件加载，使用单一滚动区域。

## 本地预览

运行 `python3 -m http.server 4180` 后打开 `http://localhost:4180/iphone-preview.html`。

## 发布与更新

GitHub Pages 使用 `main` 分支根目录，`.nojekyll` 禁用 Jekyll。提交更新并推送 `main` 后 GitHub 自动重新发布。

页面源文件保存在仓库根目录，无构建产物目录。修改页面、样式或脚本后，核验四个会员等级和 375–440px 手机尺寸，再推送。

## 数据与交互

基金名称与近一年涨跌幅来自天天基金，数据日期记录于 `member-live-data.js`。榜单按提供的名单顺序展示。

尚未配置实际跳转地址的权益、购买和内容入口会显示“待补充跳转链接”；页面不执行真实申购或奖品领取。

## 本次更新

v24：根据红利专区代码包的 evidence-stable.png、evidence-income.png、evidence-central.png 核实产品增信图规格为1026×441px；更正全部占位标注、对角线坐标与版位比例。
