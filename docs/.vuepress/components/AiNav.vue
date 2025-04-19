<template>
  <div class="container">
    <h1>🚀 AI 导航 - 卡片式网站集合</h1>
    <div class="card-grid">
      <div class="card" v-for="site in sites" :key="site.title">
        <div class="card-emoji">{{ site.emoji }}</div>
        <div class="card-title">{{ site.title }}</div>
        <div class="card-desc">{{ site.desc }}</div>
        <a class="card-link" :href="site.link" target="_blank">访问网站</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const sites = [
  { emoji: "🧑‍💻", title: "微软 AI 课程（中文）", desc: "微软官方出品的生成式 AI 入门课程", link: "https://microsoft.github.io/generative-ai-for-beginners/#/translations/cn/" },
  { emoji: "📖", title: "Fast.ai", desc: "免费实用的深度学习课程", link: "https://course.fast.ai/" },
  { emoji: "🎓", title: "DeepLearning.AI", desc: "吴恩达团队打造的 AI 教育平台", link: "https://www.deeplearning.ai/" },
  { emoji: "🎵", title: "Udio", desc: "AI 音乐生成工具", link: "https://www.udio.com/" },
  { emoji: "🤗", title: "Hugging Face", desc: "开源 AI 模型社区与工具平台", link: "https://huggingface.co/" },
  { emoji: "⚡", title: "Replicate", desc: "在线运行和部署 AI 模型", link: "https://replicate.com/" },
  { emoji: "📚", title: "Anna's Archive", desc: "人类历史上最大的完全开放的图书馆", link: "https://zh.annas-archive.org/" },
  { emoji: "📄", title: "Papers with Code", desc: "最新 AI 论文与代码资源", link: "https://paperswithcode.com/" },
  { emoji: "🔍", title: "Elasticsearch 中文社区", desc: "搜索与大数据相关社区", link: "https://elasticsearch.cn/" },
];
</script>

<style scoped>
.container { max-width: 1100px; margin: 40px auto; padding: 0 16px; }
h1 { text-align: center; margin-bottom: 32px; }
.card-grid { display: flex; flex-wrap: wrap; gap: 24px; justify-content: center; }
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  width: 320px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.13); }
.card-emoji { font-size: 2.2rem; margin-bottom: 12px; }
.card-title { font-size: 1.15rem; font-weight: bold; margin-bottom: 8px; }
.card-desc { color: #555; font-size: 0.98rem; margin-bottom: 12px; }
.card-link { color: #0078e7; text-decoration: none; font-weight: 500; }
.card-link:hover { text-decoration: underline; }
</style>