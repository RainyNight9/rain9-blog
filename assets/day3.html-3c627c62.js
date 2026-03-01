import{_ as a,o as n,c as d,e as r}from"./app-f89883cd.js";const t={};function h(i,e){return n(),d("div",null,[...e[0]||(e[0]=[r(`<h1 id="day3" tabindex="-1"><a class="header-anchor" href="#day3" aria-hidden="true">#</a> day3</h1><h2 id="目标-掌握-vim-语法" tabindex="-1"><a class="header-anchor" href="#目标-掌握-vim-语法" aria-hidden="true">#</a> 目标：掌握 vim 语法</h2><h2 id="vim-语法" tabindex="-1"><a class="header-anchor" href="#vim-语法" aria-hidden="true">#</a> vim 语法</h2><p>操作符（operation） + 动作范围</p><h3 id="动作范围" tabindex="-1"><a class="header-anchor" href="#动作范围" aria-hidden="true">#</a> 动作范围</h3><p>也就是之前所学的内容， 复习一下：</p><pre><code>1、移动：行首-&gt; 0 或 ^ 改键 H 行尾 -&gt; $ 改键 L

2、方向移动：h -&gt; 向左 j -&gt; 向下  k -&gt; 向上 l -&gt; 向上
</code></pre><h3 id="操作符" tabindex="-1"><a class="header-anchor" href="#操作符" aria-hidden="true">#</a> 操作符</h3><p>复习昨天的：</p><pre><code>1、插入：行首 -&gt; I 行尾 -&gt; A 行前 -&gt; O 行后 -&gt; o

2、复制当前行 —&gt; yy

3、粘贴 -&gt; P

4、删除当前行 -&gt; dd
</code></pre><p>今日的：</p><pre><code>1、删除 -&gt; d

2、删除并进入 insert 模式 -&gt; c

3、复制 -&gt; y
</code></pre><p>基于单词/字串的移动：</p><pre><code>1、移动到单词的结尾 -&gt; e

2、移动到上一个单词的开头 -&gt; b

3、移动到单词的开头 -&gt; w

4、移动到上一个单词的结尾 -&gt; ge
</code></pre><h3 id="组合起来" tabindex="-1"><a class="header-anchor" href="#组合起来" aria-hidden="true">#</a> 组合起来</h3><pre><code>d + l -&gt; 删除当前右边字符
d + h -&gt; 删除当前左边字符
... 以此类推其他组合


c + w 删除当前单词
e + a 在当前单词处添加
</code></pre><blockquote><p>寄存器：复制的内容都存放在寄存器里边，粘贴则从里边取出</p></blockquote>`,17)])])}const o=a(t,[["render",h],["__file","day3.html.vue"]]);export{o as default};
