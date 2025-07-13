<template>
  <div>
    <h2>🚀 AI 导航 - 卡片式网站集合</h2>
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

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 24px;
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

<script setup lang="ts">
import { sites } from '../data/ai-sites.js';
</script>