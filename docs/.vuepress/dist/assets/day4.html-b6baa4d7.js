import{_ as e,o as d,c as a,d as r}from"./app-0b7f733a.js";const n={},o=r(`<h1 id="day4" tabindex="-1"><a class="header-anchor" href="#day4" aria-hidden="true">#</a> day4</h1><h2 id="目标-更有效率的处理单字符-undo-redo" tabindex="-1"><a class="header-anchor" href="#目标-更有效率的处理单字符-undo-redo" aria-hidden="true">#</a> 目标：更有效率的处理单字符 &amp; undo/redo</h2><h2 id="新的知识点" tabindex="-1"><a class="header-anchor" href="#新的知识点" aria-hidden="true">#</a> 新的知识点</h2><pre><code>1、删除光标所在的字符 ——&gt; x
2、删除光标前的字符 ——&gt; X
3、删除当前光标的字符并进入 insert 模式 ——&gt; s
4、删除当前光标缩在⾏并进⼊ insert 模式 ——&gt; S
5、替换一个字符 ——&gt; r
6、替换多个字符 ——&gt; R
</code></pre><h3 id="undo-redo" tabindex="-1"><a class="header-anchor" href="#undo-redo" aria-hidden="true">#</a> undo/redo</h3><p>可撤销块 进⼊插⼊模式开始，直到返回普通模式为⽌，在此期间输⼊或删除的任何内容都被当成⼀次修改</p><pre><code>undo ——&gt; u
redo ——&gt; C-r
</code></pre>`,7),t=[o];function c(h,i){return d(),a("div",null,t)}const u=e(n,[["render",c],["__file","day4.html.vue"]]);export{u as default};
