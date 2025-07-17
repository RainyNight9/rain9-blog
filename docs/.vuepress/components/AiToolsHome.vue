<template>
  <div class="ai-tools-home">
    <div class="banner">
      <img src="" alt="AI工具集" class="logo" />
      <h1>AI工具集</h1>
      <div class="search-bar">
        <input placeholder="输入AI工具名称/关键词..." />
        <button>搜索</button>
      </div>
    </div>
    <div class="quick-links">
      <div class="quick-link" v-for="item in quickLinks" :key="item.text">
        <span>{{ item.text }}</span>
      </div>
    </div>
    <div class="card-grid">
      <div class="card" v-for="tool in tools" :key="tool.title">
        <div class="card-emoji">{{ tool.emoji }}</div>
        <div class="card-title">{{ tool.title }}</div>
        <div class="card-desc">{{ tool.desc }}</div>
        <a class="card-link" :href="tool.link" target="_blank">访问</a>
      </div>
    </div>
  </div>
</template>

<script setup>
const quickLinks = [
  { text: '每日快讯' },
  { text: '免费社群' },
  { text: '最新项目' },
  { text: '热门教程' }
]
const tools = [
  { emoji: '🤖', title: 'ChatGPT', desc: 'OpenAI 聊天机器人', link: 'https://chat.openai.com/' },
  { emoji: '🎨', title: 'AI 绘画', desc: 'AI 生成图片工具', link: '#' },
  { emoji: '📄', title: 'AI PPT', desc: 'AI 智能生成 PPT', link: '#' },
  // ...可继续扩展
]
</script>

<style scoped>
.ai-tools-home {
  padding: 32px 0 0 0;
}
.banner {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}
.logo {
  width: 56px;
  height: 56px;
}
.search-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}
.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #eee;
  font-size: 1rem;
}
.search-bar button {
  padding: 8px 16px;
  border-radius: 6px;
  background: #409eff;
  color: #fff;
  border: none;
  cursor: pointer;
}
.quick-links {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}
.quick-link {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 500;
  font-size: 1.05rem;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 20px 16px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s;
  min-height: 160px;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.card-emoji {
  font-size: 2.2rem;
  margin-bottom: 8px;
}
.card-title {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 6px;
}
.card-desc {
  color: #666;
  font-size: 0.98rem;
  margin-bottom: 12px;
  flex: 1;
}
.card-link {
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.98rem;
}
.card-link:hover {
  text-decoration: underline;
}
</style>