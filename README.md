# Todo List 四象限应用

一个基于Web技术的Todo List应用，使用四象限法则来管理任务的优先级。

## 功能特点

- 任务管理：添加、删除和拖拽任务
- 四象限布局：按照紧急性和重要性分类任务
- 截止时间：为每个任务设置截止时间
- 桌面通知：任务截止前15分钟自动提醒
- 实时提示：24小时内到期的任务会显示红色提醒

## 在线使用

1. 直接访问：[[Todo List 应用](#)（部署后更新链接）](https://starkrobb.github.io/Todo-list/)
2. 功能说明：
   - 在输入框中输入任务内容
   - 选择任务的截止时间
   - 点击Add按钮或按Enter键添加任务
   - 通过拖拽将任务移动到不同的优先级区域
   - 点击Delete按钮删除任务

## 本地部署

1. 克隆仓库：
```bash
git clone <仓库URL>
cd <仓库目录>
```

2. 启动本地服务器：
```bash
python3 -m http.server 8000
```

3. 访问应用：
   打开浏览器访问 `http://localhost:8000`

## 部署到GitHub Pages

1. 确保你有GitHub账号
2. 运行部署脚本：
```bash
chmod +x deploy.sh
./deploy.sh
```
3. 按照脚本提示完成部署

## 注意事项

- 首次使用时需要允许浏览器通知权限
- 建议使用现代浏览器访问（Chrome、Firefox、Safari等）
- 本应用使用localStorage存储数据，数据仅保存在本地浏览器中
