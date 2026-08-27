<template>
  <div class="products-showcase">
    <!-- Hero 组织信息 -->
    <div class="org-hero">
      <div class="org-avatar" aria-hidden="true">
        <span class="org-emoji">🌗</span>
        <span class="org-ring"></span>
      </div>
      <div class="org-info">
        <div class="org-title">
          <span class="org-name">{{ organization.name }}</span>
          <a
            class="org-badge"
            :href="organization.url"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="访问 GitHub 组织"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
        <p class="org-tagline">{{ organization.tagline }}</p>
        <p class="org-desc">{{ organization.description }}</p>

        <div class="org-stats">
          <div class="stat-item">
            <span class="stat-value">{{ productStats.total }}</span>
            <span class="stat-label">开源项目</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ formatNumber(productStats.stars) }}</span>
            <span class="stat-label">累计 Star</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ productStats.languages }}</span>
            <span class="stat-label">技术栈</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具栏：搜索 + 排序 -->
    <div class="toolbar">
      <div class="search-input-wrap">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索产品名称、描述或标签..."
          class="search-input"
          aria-label="搜索产品"
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''" aria-label="清空搜索">✕</button>
      </div>

      <div class="sort-group" role="group" aria-label="排序方式">
        <button
          v-for="opt in sortOptions"
          :key="opt.id"
          :class="['sort-btn', { active: sortBy === opt.id }]"
          @click="sortBy = opt.id"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path :d="opt.icon"></path>
          </svg>
          <span>{{ opt.name }}</span>
        </button>
      </div>
    </div>

    <!-- 分类 Tab -->
    <div class="category-tabs">
      <button
        v-for="cat in productCategories"
        :key="cat.id"
        :class="['tab-btn', { active: activeCategory === cat.id }]"
        @click="activeCategory = cat.id"
      >
        <span class="tab-icon">{{ cat.icon }}</span>
        <span class="tab-name">{{ cat.name }}</span>
        <span class="tab-count">{{ getCategoryCount(cat.id) }}</span>
      </button>
    </div>

    <!-- 卡片网格 -->
    <div class="card-grid" v-if="filteredProducts.length > 0">
      <article
        v-for="p in filteredProducts"
        :key="p.id"
        :class="['product-card', { highlight: p.highlight }]"
      >
        <!-- 顶部色带 -->
        <div class="card-accent" aria-hidden="true"></div>

        <div class="card-body">
          <header class="card-head">
            <div class="card-icon" aria-hidden="true">{{ p.icon }}</div>
            <div class="card-title-wrap">
              <h3 class="card-title">{{ p.name }}</h3>
              <div class="card-meta">
                <span class="lang-badge">
                  <span class="lang-dot" :style="{ background: getLanguageColor(p.language) }"></span>
                  {{ p.language }}
                </span>
                <span class="star-badge" :title="`${p.stars} stars`">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.77l-5.88 3.09 1.12-6.55L2.48 9.88l6.58-.96L12 2z" />
                  </svg>
                  {{ formatNumber(p.stars) }}
                </span>
              </div>
            </div>
          </header>

          <p class="card-desc">{{ p.description }}</p>

          <div class="card-tags">
            <span v-for="tag in p.tags" :key="tag" class="tag-chip">{{ tag }}</span>
          </div>

          <footer class="card-actions">
            <a
              class="btn-link primary"
              :href="p.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
              </svg>
              源码
            </a>
            <a
              v-if="p.homepage"
              class="btn-link secondary"
              :href="p.homepage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              在线体验
            </a>
          </footer>
        </div>

        <span class="card-glow" aria-hidden="true"></span>
      </article>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-icon">🛰️</div>
      <div class="empty-text">没有匹配的产品</div>
      <button class="reset-btn" @click="resetFilters">重置筛选</button>
    </div>

    <!-- 底部统计 -->
    <div class="footer-stats">
      共 <strong>{{ products.length }}</strong> 个开源项目 · 当前显示
      <strong>{{ filteredProducts.length }}</strong> 个 ·
      <a :href="organization.url" target="_blank" rel="noopener noreferrer" class="view-all-link">
        查看全部 →
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  organization,
  productCategories,
  languageColors,
  products,
  productStats,
} from '../data/products.js'

const searchQuery = ref('')
const activeCategory = ref('all')
const sortBy = ref('stars')

const sortOptions = [
  { id: 'stars', name: '热度', icon: 'M12 2l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.77l-5.88 3.09 1.12-6.55L2.48 9.88l6.58-.96L12 2z' },
  { id: 'name', name: '名称', icon: 'M4 6h16M4 12h16M4 18h10' },
]

const filteredProducts = computed(() => {
  let result = [...products]

  // 分类
  if (activeCategory.value !== 'all') {
    result = result.filter((p) => p.category === activeCategory.value)
  }

  // 搜索（名称 / 描述 / 标签）
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  // 排序
  if (sortBy.value === 'stars') {
    result.sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name))
  } else if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans'))
  }

  // 高亮优先（在热度排序下保持稳定排序）
  if (sortBy.value === 'stars') {
    result.sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))
  }

  return result
})

function getCategoryCount(catId) {
  if (catId === 'all') return products.length
  return products.filter((p) => p.category === catId).length
}

function getLanguageColor(lang) {
  return languageColors[lang] || languageColors.Other
}

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

function resetFilters() {
  searchQuery.value = ''
  activeCategory.value = 'all'
  sortBy.value = 'stars'
}
</script>

<style scoped>
.products-showcase {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem 0 3rem;
}

/* ============ 组织 Hero ============ */
.org-hero {
  display: flex;
  gap: 1.75rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 1.75rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--c-bg-sidebar) 0%, var(--gradient-brand-soft) 100%);
  border: 1px solid var(--c-border);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}
.org-hero::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -10%;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%);
  filter: blur(30px);
  pointer-events: none;
}
.org-avatar {
  position: relative;
  width: 84px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--gradient-brand);
  border-radius: 22px;
  box-shadow: 0 10px 30px rgba(99,102,241,0.35);
}
.org-emoji {
  font-size: 2.6rem;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}
.org-ring {
  position: absolute;
  inset: -6px;
  border-radius: 26px;
  border: 2px solid rgba(99,102,241,0.35);
  animation: pulseRing 2.8s ease-in-out infinite;
  pointer-events: none;
}
@keyframes pulseRing {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.08); opacity: 0.2; }
}

.org-info { flex: 1; min-width: 260px; }
.org-title {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin-bottom: 0.35rem;
}
.org-name {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.org-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: var(--c-bg);
  color: var(--c-text-light);
  border: 1px solid var(--c-border);
  text-decoration: none;
  transition: all var(--transition-fast);
}
.org-badge:hover {
  color: var(--c-brand);
  border-color: rgba(99,102,241,0.4);
  transform: translateY(-1px);
}
.org-tagline {
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text);
  margin: 0 0 0.25rem;
}
.org-desc {
  font-size: 0.9rem;
  color: var(--c-text-lighter);
  margin: 0 0 0.9rem;
  line-height: 1.6;
}

.org-stats {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.5rem 1rem;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 14px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  min-width: 56px;
}
.stat-value {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--c-brand);
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}
.stat-label {
  font-size: 0.72rem;
  color: var(--c-text-lightest);
  letter-spacing: 0.04em;
}
.stat-divider {
  width: 1px;
  height: 26px;
  background: var(--c-border-dark);
}

/* ============ 工具栏 ============ */
.toolbar {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.1rem;
}
.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 240px;
  background: var(--c-bg-sidebar);
  border: 1.5px solid var(--c-border);
  border-radius: 14px;
  padding: 0 1rem;
  transition: all 0.25s ease;
}
.search-input-wrap:focus-within {
  border-color: var(--c-brand);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}
.search-icon {
  color: var(--c-text-lightest);
  flex-shrink: 0;
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.78rem 0.7rem;
  font-size: 0.95rem;
  color: var(--c-text);
  font-family: inherit;
  min-width: 0;
}
.search-input::placeholder { color: var(--c-text-lightest); }
.clear-btn {
  background: none;
  border: none;
  color: var(--c-text-lightest);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
}
.clear-btn:hover {
  background: var(--c-bg-light);
  color: var(--c-text);
}

.sort-group {
  display: inline-flex;
  background: var(--c-bg-sidebar);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  padding: 0.25rem;
  gap: 0.25rem;
}
.sort-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.8rem;
  border: none;
  background: transparent;
  color: var(--c-text-light);
  font-size: 0.82rem;
  font-weight: 500;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
}
.sort-btn:hover { color: var(--c-brand); }
.sort-btn.active {
  background: var(--gradient-brand);
  color: #fff;
  box-shadow: 0 3px 10px rgba(99,102,241,0.32);
}

/* ============ 分类 Tabs ============ */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--c-bg-sidebar);
  border: 1px solid var(--c-border);
  border-radius: 11px;
  padding: 0.5rem 0.95rem;
  font-size: 0.88rem;
  color: var(--c-text-light);
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  font-weight: 500;
}
.tab-btn:hover {
  color: var(--c-brand);
  border-color: rgba(99, 102, 241, 0.35);
  transform: translateY(-1px);
}
.tab-btn.active {
  background: var(--gradient-brand);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}
.tab-icon { font-size: 1rem; }
.tab-count {
  font-size: 0.74rem;
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
}
.tab-btn.active .tab-count { opacity: 0.9; }

/* ============ 卡片网格 ============ */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1.1rem;
}

/* ============ 产品卡片 ============ */
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--c-bg-sidebar);
  border: 1.5px solid var(--c-border);
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.32s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s ease;
}
.product-card:hover {
  transform: translateY(-6px);
  border-color: rgba(99, 102, 241, 0.45);
  box-shadow: 0 18px 38px rgba(99, 102, 241, 0.2),
    0 4px 12px rgba(0, 0, 0, 0.06);
}
.product-card.highlight {
  border-color: rgba(99, 102, 241, 0.38);
  background: linear-gradient(135deg, var(--c-bg-sidebar) 0%, rgba(99,102,241,0.05) 100%);
}
.product-card.highlight:hover {
  box-shadow: 0 22px 44px rgba(99, 102, 241, 0.28),
    0 6px 16px rgba(0, 0, 0, 0.08);
}

/* 顶部色带 */
.card-accent {
  height: 3px;
  background: var(--gradient-brand);
  opacity: 0.7;
  transition: opacity 0.3s ease;
}
.product-card:hover .card-accent { opacity: 1; }

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1.25rem 1.3rem 1.2rem;
  flex: 1;
}

.card-head {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
}
.card-icon {
  font-size: 1.85rem;
  line-height: 1;
  width: 46px;
  height: 46px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(139, 92, 246, 0.08));
  border-radius: 13px;
  flex-shrink: 0;
  transition: transform 0.32s ease;
}
.product-card:hover .card-icon {
  transform: scale(1.12) rotate(-5deg);
}
.card-title-wrap {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.card-title {
  font-size: 1.12rem;
  font-weight: 700;
  color: var(--c-text);
  margin: 0 !important;
  padding: 0 !important;
  letter-spacing: -0.01em;
  line-height: 1.3;
  word-break: break-word;
}
.card-meta {
  display: flex !important;
  align-items: center;
  gap: 0.55rem;
  flex-shrink: 0;
}
.lang-badge, .star-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--c-text-light);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background: var(--c-bg-light);
}
.lang-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.18);
}
.star-badge { color: #f59e0b; }
html.dark .star-badge { color: #fbbf24; }

.card-desc {
  color: var(--c-text-lighter);
  font-size: 0.88rem;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.tag-chip {
  font-size: 0.74rem;
  padding: 0.18rem 0.55rem;
  border-radius: 6px;
  background: var(--c-bg-light);
  color: var(--c-text-light);
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.card-actions {
  display: flex;
  gap: 0.55rem;
  margin-top: 0.15rem;
}
.btn-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: 9px;
  text-decoration: none;
  transition: all 0.22s ease;
  font-family: inherit;
}
.btn-link.primary {
  background: var(--gradient-brand);
  color: #fff;
  box-shadow: 0 4px 12px rgba(99,102,241,0.28);
}
.btn-link.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(99,102,241,0.42);
}
.btn-link.secondary {
  background: var(--c-bg-light);
  color: var(--c-brand);
  border: 1px solid rgba(99,102,241,0.25);
}
.btn-link.secondary:hover {
  border-color: var(--c-brand);
  background: var(--gradient-brand-soft);
  transform: translateY(-2px);
}

/* 光晕 */
.card-glow {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 80px;
  background: radial-gradient(ellipse at top, rgba(99,102,241,0.18), transparent 70%);
  opacity: 0;
  transition: opacity 0.32s ease;
  pointer-events: none;
}
.product-card:hover .card-glow { opacity: 1; }

/* ============ 空状态 ============ */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--c-text-lighter);
}
.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}
.empty-text {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
.reset-btn {
  background: var(--gradient-brand);
  color: #fff;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
}
.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

/* ============ 底部统计 ============ */
.footer-stats {
  text-align: center;
  margin-top: 2.25rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--c-border);
  color: var(--c-text-lightest);
  font-size: 0.9rem;
}
.footer-stats strong {
  color: var(--c-brand);
  font-weight: 700;
}
.view-all-link {
  color: var(--c-brand);
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s ease;
}
.view-all-link:hover { opacity: 0.75; }

/* ============ 响应式 ============ */
@media (max-width: 640px) {
  .org-hero {
    padding: 1.4rem 1.1rem;
    gap: 1rem;
  }
  .org-avatar { width: 64px; height: 64px; }
  .org-emoji { font-size: 2rem; }
  .org-name { font-size: 1.25rem; }
  .card-grid { grid-template-columns: 1fr; }
  .category-tabs { gap: 0.35rem; }
  .tab-btn { padding: 0.4rem 0.7rem; font-size: 0.82rem; }
  .tab-name { display: none; }
  .toolbar { flex-direction: column; align-items: stretch; }
  .sort-group { align-self: flex-start; }
}
</style>
