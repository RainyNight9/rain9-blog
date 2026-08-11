<template>
  <div class="ai-nav">
    <div class="card-grid">
      <a
        class="card"
        v-for="site in sites"
        :key="site.title"
        :href="site.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="card-emoji">{{ site.emoji }}</div>
        <div class="card-body">
          <div class="card-title">{{ site.title }}</div>
          <div class="card-desc">{{ site.desc }}</div>
        </div>
        <div class="card-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.ai-nav {
  margin-top: 1.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1.1rem 1.2rem;
  background: var(--c-bg-sidebar);
  border: 1px solid var(--c-border);
  border-radius: 14px;
  text-decoration: none;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 92px;
}

.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(99,102,241,0.08), transparent 60%);
  opacity: 0;
  transition: opacity 0.28s ease;
  pointer-events: none;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 12px 28px rgba(99, 102, 241, 0.16), 0 4px 10px rgba(99, 102, 241, 0.08);
}
.card:hover::before { transform: scaleX(1); }
.card:hover::after { opacity: 1; }

.card-emoji {
  font-size: 1.7rem;
  line-height: 1;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.08));
  transition: transform 0.28s ease;
}
.card:hover .card-emoji {
  transform: scale(1.12) rotate(-4deg);
}

.card-body { flex: 1; min-width: 0; }

.card-title {
  font-weight: 600;
  font-size: 0.98rem;
  color: var(--c-text);
  margin-bottom: 0.25rem;
  line-height: 1.3;
}

.card-desc {
  color: var(--c-text-lighter);
  font-size: 0.85rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-arrow {
  flex-shrink: 0;
  color: var(--c-text-lightest);
  transition: color 0.28s ease, transform 0.28s ease;
  align-self: center;
}
.card:hover .card-arrow {
  color: var(--c-brand);
  transform: translate(2px, -2px);
}

@media (max-width: 768px) {
  .card-grid { grid-template-columns: 1fr; }
}
</style>

<script setup lang="ts">
import { sites } from '../data/ai-sites.js';
</script>
