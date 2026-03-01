import{_ as s,o as a,c as i,e}from"./app-f89883cd.js";const t={};function l(c,n){return a(),i("div",null,[...n[0]||(n[0]=[e(`<h1 id="git-常用命令" tabindex="-1"><a class="header-anchor" href="#git-常用命令" aria-hidden="true">#</a> git 常用命令</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch/ <span class="token function">git</span> branch <span class="token parameter variable">-a</span>
<span class="token function">git</span> checkout
<span class="token function">git</span> merge XXX
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;XXX&#39;</span>
<span class="token function">git</span> pull/git pull origin 
<span class="token function">git</span> push/git push origin
<span class="token function">git</span> reset --hard<span class="token punctuation">(</span>回滚<span class="token punctuation">)</span>
<span class="token function">git</span> stash <span class="token punctuation">(</span>暂放垃圾桶<span class="token punctuation">)</span>
<span class="token function">git</span> stash pop <span class="token punctuation">(</span>回滚垃圾桶<span class="token punctuation">)</span>
<span class="token function">git</span> <span class="token function">diff</span>  + 版本号  对比修改文件
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name XXX 更改git用户名
<span class="token function">git</span> config <span class="token parameter variable">--global</span> user.mail  XXX  更改git邮箱名
<span class="token function">git</span> branch <span class="token parameter variable">-a</span>  查看本地分支列表git 

<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> xxx  // 创建新的分支并跳转到新分支
<span class="token function">git</span> checkout xxx  // 跳转到指定分支
<span class="token function">git</span> branch -d/-D 分支name  // 删除指定分支  -D表示不可恢复  
<span class="token function">git</span> push origin <span class="token parameter variable">--delete</span>  // 删除远程指定分支
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>             // 将当前修改放暂存区
<span class="token function">git</span> <span class="token function">add</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>  // 将当前文件放入暂存区
<span class="token function">git</span> reset HEAD <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>  // 恢复单个文件
<span class="token function">git</span> stash       // 缓存起来当前修改
<span class="token function">git</span> stash list // 查看缓存列表
<span class="token function">git</span> stash apply // 重新多次应用缓存 （不删除缓存）
<span class="token function">git</span> stash pop  // 重新应用全部缓存 （删除缓存）
<span class="token function">git</span> stash pop stash@<span class="token punctuation">{</span>x<span class="token punctuation">}</span> 
<span class="token function">git</span> stash drop stash@<span class="token punctuation">{</span>x<span class="token punctuation">}</span> // 删除指定缓存
<span class="token function">git</span> stash <span class="token function">clear</span> // 清除所有缓存
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;xxx&quot;</span>   // 将当前修改放入本地仓库
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span>   // 从新修改commit 描述
<span class="token function">git</span> reset <span class="token parameter variable">--hard</span> xxx  // 回退到指定版本
<span class="token function">git</span> reset <span class="token parameter variable">--soft</span> xxx  // 回退到指定版本（保留本地仓库的修改）
<span class="token function">git</span> show xxx   // 查看指定版本修改内容
<span class="token function">git</span> log <span class="token parameter variable">--oneline</span>  // 查看本地本地版本记录
<span class="token function">git</span> reflog      // 查看本地操作log
<span class="token function">git</span> clean <span class="token parameter variable">-fd</span>  // 清除没有跟踪的文件
<span class="token function">git</span> remote prune origin  // 删除远程不存在的分支
<span class="token function">git</span> reset HEAD~1 // 回退上一次提交
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)])])}const o=s(t,[["render",l],["__file","git.html.vue"]]);export{o as default};
