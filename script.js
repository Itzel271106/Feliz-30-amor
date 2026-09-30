const CONFIG = {
  nombre: "PABLO RICARDO MUÑOZ CASTILLO",
  fechaInicioRelacion: "2024-05-16T00:00:00",
  clave: "160524",

  cumpleMes: 11,
  cumpleDia: 10,

  debilidad: "NINGUNA, ERES PERFECTO TAL Y COMO ERES 😌",

  mensajeSecreto:
    "Amor, si encontraste esto, oficialmente desbloqueaste el archivo más importante: entre todos los mundos, campañas y rutas posibles, yo seguiría eligiendo encontrarte a ti. 💚"
};

// ------------------------------------------------------------
// NAVEGACIÓN
// ------------------------------------------------------------

const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "mission") startTyping();
  if (id === "game") drawGame();
}

document.querySelectorAll(".next-linear").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.next));
});

document.querySelectorAll(".open-menu").forEach(btn => {
  btn.addEventListener("click", () => showScreen("menu"));
});

document.querySelectorAll("[data-target]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.target));
});

document.getElementById("openMenuBtn").addEventListener("click", () => showScreen("menu"));
document.getElementById("returnIntroBtn").addEventListener("click", () => showScreen("intro"));
document.getElementById("restartBtn").addEventListener("click", () => {
  entered = "";
  refreshCode();
  showScreen("lockScreen");
});

// ------------------------------------------------------------
// CONTRASEÑA
// ------------------------------------------------------------

let entered = "";
const display = document.getElementById("codeDisplay");
const lockMessage = document.getElementById("lockMessage");

function refreshCode() {
  display.textContent = entered.length ? "•".repeat(entered.length) : "••••••";
}

document.querySelectorAll(".keypad button").forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.key;

    if (key === "clear") {
      entered = "";
      lockMessage.textContent = "Pista: DDMMYY";
    } else if (key === "ok") {
      if (entered === CONFIG.clave) {
        lockMessage.textContent = "ACCESO CONCEDIDO";
        setTimeout(() => showScreen("intro"), 450);
      } else {
        lockMessage.textContent = "ACCESO DENEGADO // INTENTA OTRA VEZ";
        entered = "";
      }
    } else if (entered.length < 6) {
      entered += key;
    }

    refreshCode();
  });
});

// ------------------------------------------------------------
// INICIO DE MISIÓN
// ------------------------------------------------------------

document.getElementById("startMissionBtn").addEventListener("click", () => {
  // Al comenzar la misión, ocultamos el acceso al Panel de Misiones
  // para que el recorrido continúe de forma lineal.
  document.body.classList.add("mission-started");
  showScreen("mission");
});

const missionText =
`Mi Amor...

Se supone que hoy debía regalarte un Hot Wheels.

Y sí, me hubiera encantado hacerlo.

Pero como ahorita no pude comprarte uno, pensé en darte algo que no estuviera en ninguna tienda, sino uno que tuviera un valor mas sentimental y personal.

Algo hecho por mí.
Algo programado especialmente para ti.

Y como sé cuánto te gusta Halo, quise convertir este detalle en una misión.

Objetivo:
recordarte que pienso en ti, que te amo muchísimo y que me encanta compartir mi vida contigo.

Así que, Spartan Pablo Ricardo Muñoz Castillo...

tu misión comienza ahora. 💚`;

let typingStarted = false;

function startTyping() {
  if (typingStarted) return;
  typingStarted = true;

  const target = document.getElementById("typedText");
  let i = 0;

  const timer = setInterval(() => {
    target.textContent += missionText[i];
    i++;
    if (i >= missionText.length) clearInterval(timer);
  }, 22);
}

// ------------------------------------------------------------
// PERFIL
// ------------------------------------------------------------

document.getElementById("personName").textContent = CONFIG.nombre;
document.getElementById("weakness").textContent = CONFIG.debilidad;
document.getElementById("secretText").textContent = CONFIG.mensajeSecreto;

// ------------------------------------------------------------
// CONTADOR
// ------------------------------------------------------------

function updateRelationshipCounter() {
  const start = new Date(CONFIG.fechaInicioRelacion);
  const now = new Date();

  let y = now.getFullYear() - start.getFullYear();
  let m = now.getMonth() - start.getMonth();
  let d = now.getDate() - start.getDate();

  if (d < 0) {
    m--;
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }

  let h = now.getHours() - start.getHours();
  let min = now.getMinutes() - start.getMinutes();
  let sec = now.getSeconds() - start.getSeconds();

  if (sec < 0) { sec += 60; min--; }
  if (min < 0) { min += 60; h--; }
  if (h < 0) h += 24;

  document.getElementById("years").textContent = y;
  document.getElementById("months").textContent = m;
  document.getElementById("days").textContent = d;
  document.getElementById("hours").textContent = h;
  document.getElementById("minutes").textContent = min;
  document.getElementById("seconds").textContent = sec;
}

setInterval(updateRelationshipCounter, 1000);
updateRelationshipCounter();

// ------------------------------------------------------------
// CUENTAS REGRESIVAS
// ------------------------------------------------------------

function nextOccurrence(month, day) {
  const now = new Date();
  let target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0);
  if (target <= now) target = new Date(now.getFullYear() + 1, month - 1, day, 0, 0, 0);
  return target;
}

function nextAnniversary() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 4, 16, 0, 0, 0);
  if (target <= now) target = new Date(now.getFullYear() + 1, 4, 16, 0, 0, 0);
  return target;
}

function formatCountdown(target) {
  const now = new Date();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const mins = Math.floor(diff / 60000);
  diff %= 60000;
  const secs = Math.floor(diff / 1000);

  return `${days}d · ${hours}h · ${mins}m · ${secs}s`;
}

function updateCountdowns() {
  document.getElementById("birthdayCountdown").textContent =
    formatCountdown(nextOccurrence(CONFIG.cumpleMes, CONFIG.cumpleDia));

  document.getElementById("anniversaryCountdown").textContent =
    formatCountdown(nextAnniversary());
}

setInterval(updateCountdowns, 1000);
updateCountdowns();

// ------------------------------------------------------------
// RAZONES
// ------------------------------------------------------------

const reasonMessage = document.getElementById("reasonMessage");

document.querySelectorAll(".reason-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.add("unlocked");
    card.textContent = "DESBLOQUEADO ✓";
    reasonMessage.textContent = card.dataset.text;
  });
});

// ------------------------------------------------------------
// SI ME EXTRAÑAS
// ------------------------------------------------------------

const missYouMessages = [
  "Amor, mensaje recibido. También estoy pensando en ti. 💚",
  "Si estás leyendo esto, imagina que te estoy dando uno de esos abrazos que duran un poquito más.",
  "Protocolo activado: recordatorio oficial de que eres muy importante para mí.",
  "Aunque no esté contigo en este momento, hay una parte de mí que siempre termina pensando en ti.",
  "Nivel de extrañarme detectado. Solución recomendada: verme pronto 😌",
  "Spartan Pablo: misión secundaria desbloqueada → dejarte consentir por mí.",
  "Recordatorio del sistema: te quiero muchísimo, Ricardo. 💚"
];

document.getElementById("missYouBtn").addEventListener("click", () => {
  const msg = missYouMessages[Math.floor(Math.random() * missYouMessages.length)];
  document.getElementById("missYouMessage").textContent = msg;
  launchHearts(10);
});

// ------------------------------------------------------------
// TERMINAL
// ------------------------------------------------------------

const terminalOutput = document.getElementById("terminalOutput");

const terminalReplies = {
  buscar: [
    "> ejecutando buscar persona favorita...",
    "> escaneando archivos...",
    "> coincidencia encontrada: PABLO RICARDO MUÑOZ CASTILLO 💚",
    "> nivel de prioridad: MÁXIMO"
  ],
  compatibilidad: [
    "> calculando compatibilidad...",
    "> analizando risas...",
    "> analizando confianza...",
    "> analizando momentos juntos...",
    "> resultado: 100% // el sistema considera que se supera ese límite"
  ],
  pensamiento: [
    "> verificando si piensa en Pablo...",
    "> consulta en proceso...",
    "> respuesta: SÍ",
    "> frecuencia estimada: mucho más seguido de lo que imaginas 💚"
  ]
};

document.querySelectorAll("[data-command]").forEach(btn => {
  btn.addEventListener("click", () => {
    const lines = terminalReplies[btn.dataset.command];
    let delay = 0;

    lines.forEach(line => {
      setTimeout(() => {
        const p = document.createElement("p");
        p.textContent = line;
        terminalOutput.appendChild(p);
        terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
      }, delay);
      delay += 320;
    });
  });
});

// ------------------------------------------------------------
// MINI JUEGO
// ------------------------------------------------------------

const gameCanvas = document.getElementById("gameCanvas");
const g = gameCanvas.getContext("2d");
const statusEl = document.getElementById("gameStatus");

let player = { x: 325, y: 270, w: 50, h: 24 };
let obstacles = [];
let gameRunning = false;
let startTime = 0;
let spawnTimer = 0;
let moveLeft = false;
let moveRight = false;

function resetGame() {
  player.x = gameCanvas.width / 2 - player.w / 2;
  obstacles = [];
  startTime = performance.now();
  spawnTimer = 0;
  gameRunning = true;
  statusEl.textContent = "Estado: misión en curso...";
}

function spawnObstacle() {
  obstacles.push({
    x: Math.random() * (gameCanvas.width - 28),
    y: -30,
    w: 28,
    h: 28,
    speed: 2.5 + Math.random() * 2.2
  });
}

function hit(a, b) {
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

function drawGame() {
  g.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  for (let i = 0; i < 40; i++) {
    const x = (i * 97) % gameCanvas.width;
    const y = (i * 53) % gameCanvas.height;
    g.fillStyle = "rgba(160,255,200,.35)";
    g.fillRect(x, y, 2, 2);
  }

  g.fillStyle = "#8dffb5";
  g.fillRect(player.x, player.y, player.w, player.h);
  g.fillStyle = "#63e6ff";
  g.fillRect(player.x + 18, player.y - 10, 14, 10);

  g.fillStyle = "#ff9f9f";
  obstacles.forEach(o => g.fillRect(o.x, o.y, o.w, o.h));

  if (!gameRunning) return;

  if (moveLeft) player.x -= 5;
  if (moveRight) player.x += 5;
  player.x = Math.max(0, Math.min(gameCanvas.width - player.w, player.x));

  spawnTimer++;
  if (spawnTimer > 28) {
    spawnObstacle();
    spawnTimer = 0;
  }

  obstacles.forEach(o => o.y += o.speed);
  obstacles = obstacles.filter(o => o.y < gameCanvas.height + 40);

  for (const o of obstacles) {
    if (hit(player, o)) {
      gameRunning = false;
      statusEl.textContent = "Misión fallida 😭 Inténtalo otra vez.";
      return;
    }
  }

  const elapsed = (performance.now() - startTime) / 1000;
  const remaining = Math.max(0, 15 - elapsed);
  statusEl.textContent = `Estado: sobrevive ${remaining.toFixed(1)} s`;

  if (elapsed >= 15) {
    gameRunning = false;
    statusEl.textContent = "MISIÓN COMPLETADA ✓ Archivo secreto habilitado.";
    document.getElementById("secretModal").classList.remove("hidden");
    return;
  }

  requestAnimationFrame(drawGame);
}

document.getElementById("startGameBtn").addEventListener("click", () => {
  resetGame();
  requestAnimationFrame(drawGame);
});

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") moveLeft = true;
  if (e.key === "ArrowRight") moveRight = true;
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") moveLeft = false;
  if (e.key === "ArrowRight") moveRight = false;
});

function bindHold(btn, direction) {
  btn.addEventListener("pointerdown", () => direction(true));
  btn.addEventListener("pointerup", () => direction(false));
  btn.addEventListener("pointerleave", () => direction(false));
}

bindHold(document.getElementById("leftBtn"), v => moveLeft = v);
bindHold(document.getElementById("rightBtn"), v => moveRight = v);

// ------------------------------------------------------------
// CORAZONES + SECRETO
// ------------------------------------------------------------

const heartsLayer = document.getElementById("heartsLayer");

function launchHearts(amount = 30) {
  const symbols = ["💚","♡","✦","💫"];

  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = (18 + Math.random() * 24) + "px";
      heart.style.animationDuration = (2.2 + Math.random() * 1.8) + "s";
      heartsLayer.appendChild(heart);

      setTimeout(() => heart.remove(), 4200);
    }, i * 55);
  }
}

document.getElementById("heartBtn").addEventListener("click", () => launchHearts(34));

let secretClicks = 0;
const secretModal = document.getElementById("secretModal");

document.getElementById("secretTrigger").addEventListener("click", () => {
  secretClicks++;
  if (secretClicks >= 5) {
    secretModal.classList.remove("hidden");
    secretClicks = 0;
  }
});

document.getElementById("closeSecret").addEventListener("click", () => {
  secretModal.classList.add("hidden");
});

// ------------------------------------------------------------
// FONDO
// ------------------------------------------------------------

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);

  const count = Math.min(180, Math.floor(window.innerWidth * window.innerHeight / 7000));
  stars = Array.from({length:count},()=>({
    x:Math.random()*window.innerWidth,
    y:Math.random()*window.innerHeight,
    r:Math.random()*1.3+.2,
    a:Math.random()*.7+.2,
    s:Math.random()*.08+.02
  }));
}

function drawStars() {
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

  for (const s of stars) {
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(190,255,220,${s.a})`;
    ctx.fill();

    s.y+=s.s;
    if(s.y>window.innerHeight+2){
      s.y=-2;
      s.x=Math.random()*window.innerWidth;
    }
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize",resizeCanvas);
resizeCanvas();
drawStars();
