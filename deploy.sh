#!/bin/bash

# 创建一个新的git仓库
git init

# 添加所有文件
git add .

# 创建第一次提交
git commit -m "Initial commit"

# 创建gh-pages分支
git checkout -b gh-pages

# 提示用户
echo "请按照以下步骤操作："
echo "1. 在GitHub上创建一个新的仓库"
echo "2. 复制仓库的URL"
echo "3. 运行以下命令（将URL替换为你的仓库URL）："
echo "   git remote add origin <你的仓库URL>"
echo "   git push -u origin gh-pages"
echo ""
echo "完成后，你的Todo List应用将在以下地址可用："
echo "https://<你的GitHub用户名>.github.io/<仓库名>/"