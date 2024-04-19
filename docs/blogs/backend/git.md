# git 常用命令

```zsh
git branch/ git branch -a
git checkout
git merge XXX
git add .
git commit -m 'XXX'
git pull/git pull origin 
git push/git push origin
git reset --hard(回滚)
git stash (暂放垃圾桶)
git stash pop (回滚垃圾桶)
git diff  + 版本号  对比修改文件
git config --global user.name XXX 更改git用户名
git config --global user.mail  XXX  更改git邮箱名
git branch -a  查看本地分支列表git 

git checkout -b xxx  // 创建新的分支并跳转到新分支
git checkout xxx  // 跳转到指定分支
git branch -d/-D 分支name  // 删除指定分支  -D表示不可恢复  
git push origin --delete  // 删除远程指定分支
git add .             // 将当前修改放暂存区
git add <file>  // 将当前文件放入暂存区
git reset HEAD <file>  // 恢复单个文件
git stash       // 缓存起来当前修改
git stash list // 查看缓存列表
git stash apply // 重新多次应用缓存 （不删除缓存）
git stash pop  // 重新应用全部缓存 （删除缓存）
git stash pop stash@{x} 
git stash drop stash@{x} // 删除指定缓存
git stash clear // 清除所有缓存
git commit -m "xxx"   // 将当前修改放入本地仓库
git commit --amend   // 从新修改commit 描述
git reset --hard xxx  // 回退到指定版本
git reset --soft xxx  // 回退到指定版本（保留本地仓库的修改）
git show xxx   // 查看指定版本修改内容
git log --oneline  // 查看本地本地版本记录
git reflog      // 查看本地操作log
git clean -fd  // 清除没有跟踪的文件
git remote prune origin  // 删除远程不存在的分支
git reset HEAD~1 // 回退上一次提交
```