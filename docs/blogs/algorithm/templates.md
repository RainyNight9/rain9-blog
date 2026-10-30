# 高频算法模板速查（JS 版）

> 面试算法的本质是「识别题型 → 套对模板 → 说清复杂度」。本文把出现频率最高的九类题各沉淀一个可直接背写的 JavaScript 模板，配「什么特征用这个」。刷题与复杂度基础见 [LeetCode 笔记](./leetcode.md)、[排序](./sort.md)、[链表](./lianbiao.md)。

---

## 0. 答题纪律（比模板更重要）

1. **先复述题意 + 给暴力解与复杂度**，再优化——直接上最优解反而显得背题
2. 写之前说一句「我用 XX 方法，时间 O(n)，空间 O(1)」
3. 边界主动过一遍：空输入、单元素、全相同、极值

---

## 1. 双指针（对撞）：有序数组的两数之和/回文

**特征**：有序 + 两端收缩。

```js
function twoSumSorted(arr, target) {
  let l = 0, r = arr.length - 1
  while (l < r) {
    const sum = arr[l] + arr[r]
    if (sum === target) return [l, r]
    sum < target ? l++ : r--
  }
  return [-1, -1]
}
```

## 2. 快慢指针：链表环 / 中点 / 倒数第 k 个

**特征**：链表找位置关系。

```js
function hasCycle(head) {
  let slow = head, fast = head
  while (fast?.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true      // 相遇即有环
  }
  return false
}
```

## 3. 滑动窗口：最长无重复子串 / 定长子数组

**特征**：连续子串/子数组 + 「最长/最短/计数」。

```js
function lengthOfLongestSubstring(s) {
  const window = new Map()              // char -> 出现次数
  let left = 0, ans = 0
  for (let right = 0; right < s.length; right++) {
    const c = s[right]
    window.set(c, (window.get(c) ?? 0) + 1)
    while (window.get(c) > 1) {         // 有重复 → 收缩左边界
      const d = s[left]
      window.set(d, window.get(d) - 1)
      left++
    }
    ans = Math.max(ans, right - left + 1)
  }
  return ans
}
```

> 万能心法：右指针扩张探索，约束被破坏时收缩左边界，窗口内维护需要的状态。

## 4. 二分查找：把边界写对是唯一难点

**特征**：有序/单调性 + 「找边界/最小满足」。

```js
// 找第一个 >= target 的下标（左闭右开写法，不会死循环）
function lowerBound(nums, target) {
  let l = 0, r = nums.length
  while (l < r) {
    const mid = (l + r) >> 1
    nums[mid] >= target ? (r = mid) : (l = mid + 1)
  }
  return l
}
```

> 口诀：左闭右开时 `r = mid` 不 `+1`、`l = mid + 1`；`while (l < r)` 退出时 `l === r` 即答案位置。求「最后一个 ≤」就转成「第一个 < target+1」复用同一模板。

## 5. BFS：层序遍历 / 最短步数（无权图）

**特征**：「最少步数/最短距离」+ 无权图、网格、二叉树层序。

```js
function bfs(grid, start) {
  const m = grid.length, n = grid[0].length
  const queue = [start]
  const visited = new Set([start.join(',')])
  let step = 0
  while (queue.length) {
    for (let size = queue.length; size > 0; size--) {   // 逐层处理
      const [x, y] = queue.shift()
      if (/* 到达终点 */ false) return step
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx = x + dx, ny = y + dy, key = nx + ',' + ny
        if (nx < 0 || ny < 0 || nx >= m || ny >= n) continue
        if (visited.has(key) || grid[nx][ny] === 1 /* 障碍 */) continue
        visited.add(key)
        queue.push([nx, ny])
      }
    }
    step++
  }
  return -1
}
```

## 6. DFS / 回溯：排列组合子集 / 岛屿数量

**特征**：「所有方案」→ 回溯；「连通块/标记」→ 网格 DFS。

```js
// 回溯通用骨架：选择 → 递归 → 撤销
function backtrack(path, choices) {
  if (/* 满足终止条件 */ false) { res.push([...path]); return }
  for (const choice of choices) {
    if (/* 不合法(剪枝) */ false) continue
    path.push(choice)               // 做选择
    backtrack(path, nextChoices)
    path.pop()                      // 撤销选择（关键，别忘）
  }
}

// 网格岛屿：沉岛法
function numIslands(grid) {
  let count = 0
  const dfs = (x, y) => {
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) return
    if (grid[x][y] !== '1') return
    grid[x][y] = '0'                // 标记已访问（原地沉岛）
    dfs(x + 1, y); dfs(x - 1, y); dfs(x, y + 1); dfs(x, y - 1)
  }
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      if (grid[i][j] === '1') { count++; dfs(i, j) }
  return count
}
```

## 7. 单调栈：下一个更大元素 / 柱状图最大矩形

**特征**：「下一个更大/更小」+ O(n)。

```js
function nextGreater(nums) {
  const res = new Array(nums.length).fill(-1)
  const stack = []                    // 存下标，栈内值单调递减
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack.at(-1)]) {
      res[stack.pop()] = nums[i]      // 当前元素就是栈顶的「下一个更大」
    }
    stack.push(i)
  }
  return res
}
```

## 8. 堆 / TopK：第 K 大 / 前 K 高频

**特征**：「第 K 大/小」「前 K 个」+ 数据流。

```js
// JS 无内置堆，面试最省事的等价做法：小数据直接排序；
// 大数据流场景口述「维护大小为 K 的最小堆，扫一遍 O(n log k)」
function topK(arr, k) {
  return [...arr].sort((a, b) => b - a).slice(0, k)   // O(n log n)
  // 追问优化：快选 quickselect 平均 O(n)，或大小为 k 的最小堆 O(n log k)
}
```

## 9. 动态规划：从「状态定义」开始

**特征**：求最值/方案数 + 有重叠子问题 + 最优子结构。

```js
// 三步：定义状态 → 写转移方程 → 初始化与遍历顺序
// 例：打家劫舍（相邻不能偷）dp[i] = max(偷第 i 家: dp[i-2]+v[i], 不偷: dp[i-1])
function rob(nums) {
  const n = nums.length
  if (!n) return 0
  let prev2 = 0, prev1 = 0            // 滚动变量压缩到 O(1) 空间
  for (const v of nums) {
    const cur = Math.max(prev2 + v, prev1)
    prev2 = prev1
    prev1 = cur
  }
  return prev1
}
```

> 面试高频 DP 五件套：爬楼梯/斐波那契、打家劫舍、最长递增子序列（O(n²) 先写对再提 O(n log n)）、零钱兑换（完全背包）、最长公共子序列（双序列）。

---

## 10. 复杂度与题型对照表

| 看到什么 | 想到什么 | 目标复杂度 |
|----------|----------|------------|
| 有序数组 + 查找/两数 | 二分 / 对撞指针 | O(log n) / O(n) |
| 连续子串 + 最值 | 滑动窗口 | O(n) |
| 链表 + 环/中点/倒数第 k | 快慢指针 | O(n) O(1) |
| 最少步数（无权） | BFS | O(V+E) |
| 所有排列组合 | 回溯 | O(n!) 量级，靠剪枝 |
| 下一个更大元素 | 单调栈 | O(n) |
| 第 K 大 / 前 K | 堆 / 快选 | O(n log k) / O(n) |
| 求最值 + 可分解子问题 | 动态规划 | 视状态数 |

---

## 11. 刷题路线建议

```text
第 1 周  数组与双指针（热身）+ 链表全套
第 2 周  栈队列 + 滑动窗口 + 二分（把边界写到肌肉记忆）
第 3 周  树的 DFS/BFS + 网格题
第 4 周  回溯 + DP 五件套 + 单调栈/堆
之后    每周 3 题保持手感，按 [面试八股](/blogs/interview/) 与岗位方向（见 [AI 岗位知识库](/blogs/ai-jobs/)）分配时间
```

> 延伸：[排序算法](./sort.md) · [手写题](./js.md) · [数据处理题](./dealData.md) · [可视化动态图 visualgo](https://visualgo.net/zh)
