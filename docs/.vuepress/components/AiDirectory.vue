<template>
  <div class="ai-directory">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <div class="search-input-wrap">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索 AI 工具名称或功能..."
          class="search-input"
        />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
      </div>
    </div>

    <!-- 分类 Tab -->
    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['tab-btn', { active: activeCategory === cat.id }]"
        @click="activeCategory = cat.id"
      >
        <span class="tab-icon">{{ cat.icon }}</span>
        <span class="tab-name">{{ cat.name }}</span>
        <span class="tab-count">{{ getCategoryCount(cat.id) }}</span>
      </button>
    </div>

    <!-- 标签筛选 -->
    <div v-if="activeTags.length > 0" class="active-filters">
      <span class="filter-label">已选标签：</span>
      <span
        v-for="tag in activeTags"
        :key="tag"
        class="active-tag"
        @click="toggleTag(tag)"
      >
        {{ tag }} ✕
      </span>
      <button v-if="activeTags.length > 0" class="clear-all" @click="activeTags = []">
        清除全部
      </button>
    </div>

    <!-- 卡片网格 -->
    <div class="card-grid" v-if="filteredTools.length > 0">
      <a
        v-for="tool in filteredTools"
        :key="tool.id"
        :href="tool.url"
        target="_blank"
        rel="noopener noreferrer"
        :class="['tool-card', { highlight: tool.highlight }]"
      >
        <div class="card-top">
          <div class="tool-icon">{{ tool.icon }}</div>
          <div class="tool-name">{{ tool.name }}</div>
          <span :class="['price-badge', { free: tool.price === '免费' }]">
            {{ tool.price }}
          </span>
        </div>
        <div class="tool-desc">{{ tool.description }}</div>
        <div class="tool-tags">
          <span
            v-for="tag in tool.tags"
            :key="tag"
            :class="['tag-chip', { active: activeTags.includes(tag) }]"
            @click.stop="toggleTag(tag)"
          >
            {{ tag }}
          </span>
        </div>
        <div class="card-glow"></div>
      </a>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <div class="empty-text">没有找到匹配的 AI 工具</div>
      <button class="reset-btn" @click="resetFilters">重置筛选</button>
    </div>

    <!-- 统计 -->
    <div class="stats-bar">
      共 <strong>{{ aiTools.length }}</strong> 个 AI 工具，当前显示
      <strong>{{ filteredTools.length }}</strong> 个
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categories, aiTools } from '../data/ai-directory.js'

const searchQuery = ref('')
const activeCategory = ref('all')
const activeTags = ref([])

const filteredTools = computed(() => {
  let result = [...aiTools]

  // 分类筛选
  if (activeCategory.value !== 'all') {
    result = result.filter((t) => t.category === activeCategory.value)
  }

  // 标签筛选
  if (activeTags.value.length > 0) {
    result = result.filter((t) =>
      activeTags.value.every((tag) => t.tags.includes(tag))
    )
  }

  // 搜索筛选
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    )
  }

  // 高亮优先
  return result.sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0))
})

function getCategoryCount(catId) {
  if (catId === 'all') return aiTools.length
  return aiTools.filter((t) => t.category === catId).length
}

function toggleTag(tag) {
  const idx = activeTags.value.indexOf(tag)
  if (idx === -1) {
    activeTags.value.push(tag)
  } else {
    activeTags.value.splice(idx, 1)
  }
}

function resetFilters() {
  searchQuery.value = ''
  activeCategory.value = 'all'
  activeTags.value = []
}
</script>

<style scoped>
.ai-directory {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0 3rem;
}

/* 搜索栏 */
.search-bar {
  margin-bottom: 1.25rem;
}
.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
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
  padding: 0.85rem 0.75rem;
  font-size: 1rem;
  color: var(--c-text);
  font-family: inherit;
  min-width: 0;
}
.search-input::placeholder {
  color: var(--c-text-lightest);
}
.clear-btn {
  background: none;
  border: none;
  color: var(--c-text-lightest);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
}
.clear-btn:hover {
  background: var(--c-bg-light);
  color: var(--c-text);
}

/* 分类 Tabs */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--c-bg-sidebar);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  padding: 0.5rem 0.9rem;
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
.tab-icon {
  font-size: 1rem;
}
.tab-count {
  font-size: 0.75rem;
  opacity: 0.75;
  margin-left: 0.15rem;
}
.tab-btn.active .tab-count {
  opacity: 0.9;
}

/* 已选筛选 */
.active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
}
.filter-label {
  color: var(--c-text-lightest);
  font-weight: 500;
}
.active-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.12));
  color: var(--c-brand);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 8px;
  padding: 0.25rem 0.65rem;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.active-tag:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}
.clear-all {
  background: none;
  border: none;
  color: var(--c-text-lightest);
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0 0.25rem;
}
.clear-all:hover {
  color: #ef4444;
}

/* 卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

/* 工具卡片 */
.tool-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: var(--c-bg-sidebar);
  border: 1.5px solid var(--c-border);
  border-radius: 16px;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s ease;
  overflow: hidden;
}
.tool-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 16px 36px rgba(99, 102, 241, 0.18),
    0 4px 12px rgba(0, 0, 0, 0.06);
}
.tool-card.highlight {
  border-color: rgba(99, 102, 241, 0.35);
  background: linear-gradient(135deg, var(--c-bg-sidebar) 0%, rgba(99, 102, 241, 0.04) 100%);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.tool-icon {
  font-size: 1.8rem;
  line-height: 1;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(139, 92, 246, 0.08));
  border-radius: 12px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.tool-card:hover .tool-icon {
  transform: scale(1.12) rotate(-4deg);
}
.tool-name {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-text);
  letter-spacing: -0.01em;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price-badge {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
  white-space: nowrap;
}
.price-badge.free {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.tool-desc {
  color: var(--c-text-lighter);
  font-size: 0.88rem;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.tag-chip {
  font-size: 0.75rem;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  background: var(--c-bg-light);
  color: var(--c-text-light);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.tag-chip:hover {
  color: var(--c-brand);
  border-color: rgba(99, 102, 241, 0.3);
  background: rgba(99, 102, 241, 0.08);
}
.tag-chip.active {
  background: rgba(99, 102, 241, 0.15);
  color: var(--c-brand);
  border-color: rgba(99, 102, 241, 0.4);
  font-weight: 600;
}

/* 空状态 */
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

/* 统计 */
.stats-bar {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--c-border);
  color: var(--c-text-lightest);
  font-size: 0.9rem;
}
.stats-bar strong {
  color: var(--c-brand);
  font-weight: 700;
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
  .category-tabs {
    gap: 0.35rem;
  }
  .tab-btn {
    padding: 0.4rem 0.7rem;
    font-size: 0.82rem;
  }
  .tab-name {
    display: none;
  }
  .tab-btn .tab-name {
    display: none;
  }
  .tool-card {
    padding: 1rem;
  }
}
</style>
