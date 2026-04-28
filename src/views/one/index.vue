<template>
  <div class="app-wrapper">
    <div class="graph-container" ref="graphContainer">
      <!-- canvas 指引线层 -->
      <canvas ref="lineCanvas" class="line-canvas"></canvas>

      <!-- 科技核心圆形：未来“人”形象 -->
      <div class="circle-person" ref="centerCircle">
        <i class="fas fa-microchip"></i>
        <span>AI 架构师</span>
      </div>
      <!-- 脉冲氛围 -->
      <div class="pulse-ring"></div>

      <!-- 四个科技信息卡 -->
      <div class="info-card card-top" ref="cardTop" @click="showDetail('top')">
        <div class="card-content">
          <i class="fas fa-brain"></i>
          <h4>神经界面</h4>
          <p>思维 · 超频</p>
        </div>
      </div>

      <div class="info-card card-bottom" ref="cardBottom" @click="showDetail('bottom')">
        <div class="card-content">
          <i class="fas fa-cloud-upload-alt"></i>
          <h4>云脑协作</h4>
          <p>分布式·共生</p>
        </div>
      </div>

      <div class="info-card card-left" ref="cardLeft" @click="showDetail('left')">
        <div class="card-content">
          <i class="fas fa-microchip"></i>
          <h4>量子核心</h4>
          <p>算力 · 极限</p>
        </div>
      </div>

      <div class="info-card card-right" ref="cardRight" @click="showDetail('right')">
        <div class="card-content">
          <i class="fas fa-dna"></i>
          <h4>数据基因</h4>
          <p>进化·永生</p>
        </div>
      </div>
    </div>
    <div class="design-footer">
      <i class="fas fa-satellite-dish"></i> 点击全息卡片 · 解锁核心协议
    </div>

    <!-- 详情模态框 -->
    <Teleport to="body">
      <div v-if="modalVisible" class="modal-mask" @click.self="closeModal">
        <div class="modal-container">
          <i :class="modalIcon"></i>
          <h3>{{ modalTitle }}</h3>
          <p>{{ modalDescription }}</p>
          <button class="close-modal-btn" @click="closeModal">⚡ 接入终端 ⚡</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"

// 模态框数据
const modalVisible = ref(false)
const modalTitle = ref("")
const modalDescription = ref("")
const modalIcon = ref("fas fa-microchip")

// DOM 元素引用
const graphContainer = ref(null)
const lineCanvas = ref(null)
const centerCircle = ref(null)
const cardTop = ref(null)
const cardBottom = ref(null)
const cardLeft = ref(null)
const cardRight = ref(null)

// 详情库
const detailsMap = {
  top: {
    title: "🧠 神经界面",
    desc: "通过脑机融合技术，实现思维流与数字世界的实时交互。拥有高带宽认知通道，直觉操控数据，重构人机边界，反应速度超越生物极限。",
    icon: "fas fa-brain",
  },
  bottom: {
    title: "☁️ 云脑协作",
    desc: "基于群智神经网络，与云端数百个AI节点共享意识频谱，知识同步、算力聚合。团队决策达到量子纠缠级协同效率，共创未知维度。",
    icon: "fas fa-cloud-upload-alt",
  },
  left: {
    title: "⚛️ 量子核心",
    desc: "集成光量子计算模块，毫秒级解析复杂模型。从密码破译到大气模拟，任意科学前沿皆可探索。核心算力峰值可达10^24 FLOPS。",
    icon: "fas fa-microchip",
  },
  right: {
    title: "🧬 数据基因",
    desc: "将自我意识编码为数据基因链，具备自适应进化算法。每一次交互都会迭代升级，解锁潜能。永久存储记忆，实现数字永生。",
    icon: "fas fa-dna",
  },
}

const showDetail = (position) => {
  const info = detailsMap[position]
  if (info) {
    modalTitle.value = info.title
    modalDescription.value = info.desc
    modalIcon.value = info.icon
    modalVisible.value = true
  }
}

const closeModal = () => {
  modalVisible.value = false
}

// ---------- 绘制统一直线指引线 ----------
const getRelativeCenter = (element, containerRect) => {
  if (!element || !containerRect) return { x: 0, y: 0 }
  const rect = element.getBoundingClientRect()
  const centerX = (rect.left + rect.right) / 2
  const centerY = (rect.top + rect.bottom) / 2
  return {
    x: centerX - containerRect.left,
    y: centerY - containerRect.top,
  }
}

const drawLines = () => {
  if (!lineCanvas.value || !graphContainer.value) return
  const container = graphContainer.value
  const canvas = lineCanvas.value
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const containerRect = container.getBoundingClientRect()
  const width = containerRect.width
  const height = containerRect.height
  if (width === 0 || height === 0) return

  canvas.width = width
  canvas.height = height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.clearRect(0, 0, width, height)

  const circleEl = centerCircle.value
  if (!circleEl) return
  const circleCenter = getRelativeCenter(circleEl, containerRect)

  const cards = [
    { el: cardTop.value },
    { el: cardBottom.value },
    { el: cardLeft.value },
    { el: cardRight.value },
  ]
  const points = []
  for (let card of cards) {
    if (card.el) {
      points.push(getRelativeCenter(card.el, containerRect))
    }
  }

  // 绘制直线指引线（横纵统一风格）
  for (let i = 0; i < points.length; i++) {
    const end = points[i]
    if (!end) continue
    const start = circleCenter

    const dx = end.x - start.x
    const dy = end.y - start.y
    const distance = Math.hypot(dx, dy)
    if (distance < 8) continue

    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)

    // 流光渐变主线
    const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y)
    gradient.addColorStop(0, "#0ff")
    gradient.addColorStop(0.5, "#f0f")
    gradient.addColorStop(1, "#3cc")
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.strokeStyle = gradient
    ctx.stroke()

    // 亮边光晕
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.lineWidth = 1.5
    ctx.strokeStyle = "rgba(200, 250, 255, 0.9)"
    ctx.stroke()

    // 终点能量粒子
    ctx.beginPath()
    ctx.arc(end.x, end.y, 7, 0, Math.PI * 2)
    ctx.fillStyle = "#00ccff"
    ctx.shadowBlur = 10
    ctx.shadowColor = "#0ff"
    ctx.fill()
    ctx.beginPath()
    ctx.arc(end.x, end.y, 3.2, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.shadowBlur = 0

    // 起点能量环
    ctx.beginPath()
    ctx.arc(start.x, start.y, 12, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0, 255, 200, 0.2)"
    ctx.fill()

    // 沿线流动粒子
    for (let s = 1; s <= 3; s++) {
      const t = s / 4
      const midX = start.x * (1 - t) + end.x * t
      const midY = start.y * (1 - t) + end.y * t
      ctx.beginPath()
      ctx.arc(midX, midY, 2.8, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 230, 255, ${0.7 - s * 0.15})`
      ctx.fill()
    }
  }

  // 中心核心强化
  if (circleCenter) {
    ctx.beginPath()
    ctx.arc(circleCenter.x, circleCenter.y, 22, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0, 180, 220, 0.25)"
    ctx.fill()
    ctx.beginPath()
    ctx.arc(circleCenter.x, circleCenter.y, 12, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0, 255, 210, 0.5)"
    ctx.fill()
  }
}

// 窗口尺寸变化重绘
let resizeObserver = null
const handleResize = () => {
  requestAnimationFrame(() => {
    if (graphContainer.value && lineCanvas.value) drawLines()
  })
}

onMounted(async () => {
  await nextTick()
  // 确保 DOM 完全渲染后再绘制
  if (
    graphContainer.value &&
    lineCanvas.value &&
    centerCircle.value &&
    cardTop.value &&
    cardBottom.value &&
    cardLeft.value &&
    cardRight.value
  ) {
    drawLines()
  } else {
    setTimeout(() => drawLines(), 60)
  }
  window.addEventListener("resize", handleResize)
  if (graphContainer.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(graphContainer.value)
  }
  // 多次保险绘制
  setTimeout(() => drawLines(), 180)
  setTimeout(() => drawLines(), 500)
  window.addEventListener("scroll", () => requestAnimationFrame(() => drawLines()), true)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
  if (resizeObserver && graphContainer.value) {
    resizeObserver.unobserve(graphContainer.value)
    resizeObserver.disconnect()
  }
})
</script>

<style>
/* 全局样式 — 铺满全屏且背景美观 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  /* 深邃星云渐变 + 微动态效果 */
  background: radial-gradient(circle at 20% 30%, #0a0f2a, #030614);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Segoe UI", "Poppins", "Orbitron", "Share Tech Mono", system-ui, monospace;
  padding: 1.5rem;
  overflow-x: hidden;
  width: 100%;
  /* 增加科技网格纹路（可选） */
  /* background-image:
    repeating-linear-gradient(
      0deg,
      rgba(0, 255, 255, 0.03) 0px,
      rgba(0, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 40px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0, 255, 255, 0.03) 0px,
      rgba(0, 255, 255, 0.03) 1px,
      transparent 1px,
      transparent 40px
    ); */
}
</style>

<style scoped>
.app-wrapper {
  width: 100%;
  max-width: 1300px;
  background: rgba(12, 20, 35, 0.45);
  backdrop-filter: blur(12px);
  border-radius: 3rem;
  box-shadow:
    0 25px 45px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.2);
  padding: 2rem 1rem;
  overflow-x: hidden;
  margin: 0 auto;
}

.graph-container {
  position: relative;
  width: 100%;
  min-height: 620px;
  margin: 0 auto;
  background: radial-gradient(circle at 50% 45%, rgba(0, 30, 60, 0.4) 0%, rgba(0, 0, 0, 0.3) 100%);
  border-radius: 48px;
  transition: all 0.2s;
  overflow: hidden;
}

.line-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  z-index: 5;
}

/* 科技圆形人物 */
.circle-person {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(circle at 30% 20%, #162b3c, #030e1a);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
  cursor: default;
  box-shadow:
    0 0 0 4px rgba(0, 255, 255, 0.3),
    0 0 20px rgba(0, 212, 255, 0.6),
    inset 0 0 20px rgba(0, 255, 255, 0.2);
  backdrop-filter: blur(1px);
  border: 1px solid rgba(0, 255, 255, 0.7);
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  background-image:
    repeating-linear-gradient(
      45deg,
      rgba(0, 255, 255, 0.05) 0px,
      rgba(0, 255, 255, 0.05) 2px,
      transparent 2px,
      transparent 8px
    ),
    radial-gradient(circle at 30% 20%, #0a2a3b, #010510);
}

.circle-person::before {
  content: "";
  position: absolute;
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #00ffff, #ff00cc, #00ffff);
  opacity: 0.5;
  z-index: -1;
  animation: spinRing 6s linear infinite;
  filter: blur(5px);
}

.circle-person::after {
  content: "";
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border-radius: 50%;
  border: 1.5px dashed rgba(0, 255, 255, 0.8);
  animation: reverseSpin 8s linear infinite;
  box-shadow: 0 0 8px cyan;
  pointer-events: none;
}

@keyframes spinRing {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes reverseSpin {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.circle-person i {
  font-size: 4.2rem;
  color: #8afbff;
  filter: drop-shadow(0 0 8px #00ccff) drop-shadow(0 0 2px #0ff);
  text-shadow: 0 0 8px cyan;
  margin-bottom: 4px;
}

.circle-person span {
  margin-top: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  background: rgba(0, 20, 40, 0.85);
  backdrop-filter: blur(4px);
  padding: 3px 12px;
  border-radius: 30px;
  color: #bbf0ff;
  letter-spacing: 1.5px;
  font-family: "Orbitron", monospace;
  border: 1px solid rgba(0, 255, 255, 0.6);
  box-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
}

/* 脉冲光环 */
.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 19;
  overflow: visible;
}
.pulse-ring::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.2), transparent);
  transform: translate(-50%, -50%);
  animation: pulseExpand 2.2s infinite ease-out;
  max-width: 300%;
  max-height: 300%;
}
@keyframes pulseExpand {
  0% {
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  100% {
    width: 180%;
    height: 180%;
    opacity: 0;
  }
}

/* 信息卡 — 无缩放，彻底消除抖动 */
.info-card {
  position: absolute;
  background: rgba(12, 25, 45, 0.75);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 12px 20px;
  min-width: 130px;
  text-align: center;
  cursor: pointer;
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.2s ease;
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(0, 255, 255, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.4);
  z-index: 25;
  font-weight: 600;
  will-change: background, box-shadow;
}

.info-card:hover {
  background: rgba(20, 45, 75, 0.95);
  box-shadow:
    0 0 22px rgba(0, 230, 250, 0.7),
    0 0 0 2px rgba(0, 255, 255, 0.8);
  border-color: cyan;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.card-content i {
  font-size: 2rem;
  color: #3efffa;
  text-shadow: 0 0 4px cyan;
  transition: text-shadow 0.2s;
}

.info-card:hover .card-content i {
  text-shadow: 0 0 10px cyan;
}

.card-content h4 {
  font-size: 1.1rem;
  color: #eef5ff;
  margin: 0;
  letter-spacing: 1px;
  font-family: "Orbitron", monospace;
}

.card-content p {
  font-size: 0.7rem;
  color: #aad0ff;
  font-weight: normal;
  margin-top: 4px;
  font-family: monospace;
}

/* 卡片定位 */
.card-top {
  top: 6%;
  left: 50%;
  transform: translateX(-50%);
}
.card-bottom {
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
}
.card-left {
  left: 4%;
  top: 50%;
  transform: translateY(-50%);
}
.card-right {
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
}

/* PC 端优化 */
@media (min-width: 1200px) {
  .info-card {
    min-width: 150px;
    padding: 14px 24px;
  }
  .card-content i {
    font-size: 2.3rem;
  }
}

/* 移动端适配 */
@media (max-width: 760px) {
  .graph-container {
    min-height: 560px;
  }
  .info-card {
    padding: 8px 12px;
    min-width: 95px;
  }
  .card-content i {
    font-size: 1.6rem;
  }
  .card-content h4 {
    font-size: 0.85rem;
  }
  .circle-person {
    width: 120px;
    height: 120px;
  }
  .circle-person i {
    font-size: 3rem;
  }
  .card-top {
    top: 3%;
  }
  .card-bottom {
    bottom: 3%;
  }
  .card-left {
    left: 1%;
  }
  .card-right {
    right: 1%;
  }
}

/* 模态框样式 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.2s ease;
}

.modal-container {
  background: rgba(10, 20, 35, 0.95);
  backdrop-filter: blur(20px);
  width: 90%;
  max-width: 440px;
  border-radius: 48px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.6),
    0 0 0 2px rgba(0, 255, 255, 0.4),
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  padding: 2rem 1.8rem;
  text-align: center;
  animation: modalPop 0.3s cubic-bezier(0.34, 1.2, 0.64, 1);
  border: 1px solid cyan;
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-container i {
  font-size: 3rem;
  color: #4efff5;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 6px cyan);
}

.modal-container h3 {
  font-size: 1.9rem;
  margin-bottom: 1rem;
  color: #bbf5ff;
  font-family: "Orbitron", monospace;
}

.modal-container p {
  font-size: 1rem;
  line-height: 1.5;
  color: #cce7ff;
  margin-bottom: 1.8rem;
  padding: 0 0.5rem;
}

.close-modal-btn {
  background: linear-gradient(95deg, #0a3952, #021a2b);
  border: 1px solid #0ff;
  color: #0ff;
  padding: 10px 28px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 0 6px cyan;
  font-family: monospace;
}

.close-modal-btn:hover {
  background: #0a4c6e;
  color: white;
  box-shadow: 0 0 14px cyan;
  transform: scale(0.96);
}

.design-footer {
  text-align: center;
  margin-top: 32px;
  font-size: 0.75rem;
  color: #5f9be0;
  letter-spacing: 1.5px;
  font-family: monospace;
  border-top: 1px dashed rgba(0, 255, 255, 0.3);
  padding-top: 18px;
}

.design-footer i {
  margin-right: 6px;
}
</style>
