import { ref, onMounted, onUnmounted } from "vue";

// Bayer matrix for ordered dithering (4x4 matrix)
const bayerMatrix = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

// Memoized dithering cache
const ditherCache = new Map();

function getDitherValue(x, y, intensity, gradientIntensity = 1.0) {
  const combinedIntensity = intensity * gradientIntensity;
  // Ensure modulo returns positive values (0-3) even for negative inputs
  const floorX = Math.floor(x);
  const floorY = Math.floor(y);
  const matrixX = ((floorX % 4) + 4) % 4;
  const matrixY = ((floorY % 4) + 4) % 4;
  const key = `${matrixX}_${matrixY}_${Math.floor(combinedIntensity * 16)}`;

  if (ditherCache.has(key)) {
    return ditherCache.get(key);
  }

  const threshold = bayerMatrix[matrixY][matrixX] / 16;
  const dithered = combinedIntensity > threshold ? 1 : 0;
  ditherCache.set(key, dithered);
  return dithered;
}

function getGradientIntensity(y, centerY, spread) {
  const distance = Math.abs(y - centerY);
  const normalizedDistance = Math.min(distance / spread, 1.0);
  const intensity = 1.0 - normalizedDistance * normalizedDistance;
  return Math.max(0.3, intensity);
}

class Particle {
  constructor(type, randomX, canvas, config) {
    this.type = type;
    this.canvas = canvas;
    this.config = config;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;

    if (type === "human") {
      this.y = Math.random() * (canvas.height * 0.13) + canvas.height * 0.35;
      this.centerY = canvas.height * 0.415;
      this.spread = canvas.height * 0.35;
    } else {
      this.y = Math.random() * (canvas.height * 0.13) + canvas.height * 0.52;
      this.centerY = canvas.height * 0.585;
      this.spread = canvas.height * 0.35;
    }

    this.x = randomX ? Math.random() * canvas.width : -10;

    if (type === "human") {
      this.pixelSize = Math.floor(Math.random() * 2) + 1;
      this.opacity = Math.random() * 0.4 + 0.7;
      this.baseColor = { r: 0, g: 120, b: 140 };
    } else {
      this.pixelSize = 1;
      this.opacity = Math.random() * 0.4 + 0.6;
      this.baseColor = { r: 0, g: 100, b: 120 };
    }

    if (type === "human") {
      this.baseSpeed = Math.random() * 0.5 + config.baseSpeed;
    } else {
      this.baseSpeed = Math.random() * 0.5 + config.baseSpeed * 1.6;
    }
    this.speed = this.baseSpeed;

    this.waveFreq = Math.random() * 0.003 + 0.002;
    this.waveAmp = Math.random() * 2.0 + 1.0;
    this.wavePhase = Math.random() * Math.PI * 2;
  }

  reset() {
    this.x = -10;
    if (this.type === "human") {
      this.centerY = this.canvas.height * 0.415;
      this.y =
        Math.random() * (this.canvas.height * 0.13) +
        (this.centerY - this.canvas.height * 0.065);
    } else {
      this.centerY = this.canvas.height * 0.585;
      this.y =
        Math.random() * (this.canvas.height * 0.13) +
        (this.centerY - this.canvas.height * 0.065);
    }
    this.spread = this.canvas.height * 0.35;
  }

  update(globalTime) {
    // Keep centerY fixed at initial positions
    this.centerY =
      this.type === "human"
        ? this.canvas.height * 0.415
        : this.canvas.height * 0.585;

    // Keep speed constant
    this.speed = this.baseSpeed;

    let angle = 0;
    const localWeave =
      Math.sin(this.x * this.waveFreq + this.wavePhase) * this.waveAmp;
    // Keep phase shift constant (agent has Math.PI phase shift, human has 0)
    const phaseShift = this.type === "agent" ? Math.PI : 0;
    const groupWeave =
      Math.sin(
        this.x * this.config.groupWaveFreq +
          globalTime * this.config.groupTimeSpeed +
          phaseShift
      ) * this.config.groupWaveAmp;

    angle += (groupWeave + localWeave) * 0.01;

    this.vx = Math.cos(angle) * this.speed;
    this.vy = Math.sin(angle) * this.speed;

    this.x += this.vx;
    this.y += this.vy;

    this.angle = Math.atan2(this.vy, this.vx);

    if (this.x > this.canvas.width + 10) {
      this.reset();
    }

    if (this.y < -10 || this.y > this.canvas.height + 10) {
      this.reset();
    }
  }

  draw(ctx) {
    const pixelX = Math.floor(this.x);
    const pixelY = Math.floor(this.y);
    const gradientIntensity = getGradientIntensity(
      pixelY,
      this.centerY,
      this.spread
    );
    const dithered = getDitherValue(
      pixelX,
      pixelY,
      this.opacity,
      gradientIntensity
    );

    if (dithered) {
      const intensity = this.opacity * gradientIntensity;
      const r = Math.floor(this.baseColor.r * intensity);
      const g = Math.floor(this.baseColor.g * intensity);
      const b = Math.floor(this.baseColor.b * intensity);

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

      const size = this.pixelSize;
      ctx.fillRect(
        pixelX - Math.floor(size / 2),
        pixelY - Math.floor(size / 2),
        size,
        size
      );
    }
  }
}

export function useParticleAnimation(canvasRef, options = {}) {
  const isAnimating = ref(false);
  let animationId = null;
  let particles = [];
  let ctx = null;

  const config = {
    baseSpeed: options.baseSpeed ?? 0.8,
    groupWaveAmp: options.groupWaveAmp ?? 45,
    groupWaveFreq: options.groupWaveFreq ?? 0.005,
    groupTimeSpeed: options.groupTimeSpeed ?? 0.001,
  };

  const humanCount = options.humanCount ?? 800;
  const agentCount = options.agentCount ?? 1200;

  function resizeCanvas() {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    if (ctx) {
      ctx.imageSmoothingEnabled = false;
    }
  }

  function initParticles() {
    const canvas = canvasRef.value;
    if (!canvas) return;

    particles = [];

    for (let i = 0; i < humanCount; i++) {
      particles.push(new Particle("human", true, canvas, config));
    }

    for (let i = 0; i < agentCount; i++) {
      particles.push(new Particle("agent", true, canvas, config));
    }
  }

  function animate() {
    const canvas = canvasRef.value;
    if (!canvas || !ctx) return;

    const globalTime = performance.now();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update(globalTime);
      particle.draw(ctx);
    });

    animationId = requestAnimationFrame(animate);
  }

  function start() {
    const canvas = canvasRef.value;
    if (!canvas) return;

    ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    resizeCanvas();
    initParticles();
    isAnimating.value = true;
    animate();
  }

  function stop() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    isAnimating.value = false;
  }

  function handleResize() {
    resizeCanvas();
    // Reinitialize particles for new canvas size
    initParticles();
  }

  onMounted(() => {
    window.addEventListener("resize", handleResize);
    start();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    stop();
  });

  return {
    isAnimating,
    start,
    stop,
    resize: handleResize,
  };
}

