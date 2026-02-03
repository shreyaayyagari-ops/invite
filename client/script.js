const BACKEND_URL = "https://invite-52oz.onrender.com";

const questions = [
  {
    text: "On a scale of 1–10 💖 how much do you love me?",
    options: ["7 😏", "8 😊", "9 🥰", "10 😍", "too much i can't stop it😘😁"],
  },
  {
    text: "Describe your girlfriend in ONE cute word 💕",
    options: ["Angel 😇", "Cutie 🧸", "Princess 👑", "Mine 💖", "my buddi❤️😘🧿"],
  },
  {
    text: "In a day 😘 how many kisses can you give me?",
    options: ["10 💋", "50 😍", "Unlimited 💖", "Till you get tired 😏", "till you turn red 🤣"],
  },
  {
    text: "Will you come on a date with me tonight? 💖🌙",
    options: ["YES 💖💖💖", "Of course 😍", "How can I say no 🥹"],
  },
];

let index = 0;
let collected = [];

const startPage = document.getElementById("startPage");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const finalLove = document.getElementById("finalLove");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const summary = document.getElementById("summary");
const countdownEl = document.getElementById("countdown");

const videoOverlay = document.getElementById("videoOverlay");
const loveVideo = document.getElementById("loveVideo");

/* START QUIZ */
function startQuiz() {
  startPage.classList.add("hidden");
  countdownEl.classList.remove("hidden");

  let count = 3;
  countdownEl.innerText = count;

  const timer = setInterval(() => {
    count--;
    countdownEl.innerText = count;

    if (count === 0) {
      clearInterval(timer);
      countdownEl.classList.add("hidden");
      quiz.classList.remove("hidden");
      showQuestion();
    }
  }, 1000);
}

/* SHOW QUESTION */
function showQuestion() {
  quiz.classList.remove("fade");
  void quiz.offsetWidth;
  quiz.classList.add("fade");

  const q = questions[index];
  questionEl.innerText = q.text;
  optionsEl.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "heartbeat";
    btn.innerText = opt;
    btn.onclick = () => answer(q.text, opt);
    optionsEl.appendChild(btn);
  });
}

/* HANDLE ANSWER */
async function answer(question, option) {
  collected.push({ question, option });

  await fetch(`${BACKEND_URL}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, option }),
  });

  if (option.includes("YES")) startConfetti();

  index++;
  index < questions.length ? showQuestion() : showResult();
}

/* SHOW RESULT */
function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  summary.innerHTML = "";
  collected.forEach((a) => {
    summary.innerHTML += `
      <p><strong>${a.question}</strong><br/>💖 ${a.option}</p><hr/>
    `;
  });

  setTimeout(() => {
    result.classList.add("hidden");
    finalLove.classList.remove("hidden");
  }, 4000);
}

/* 💍 FINAL YES → PLAY VIDEO */
function foreverYes() {
  startConfetti();

  // show overlay
  videoOverlay.classList.remove("hidden");

  // reset video
  loveVideo.pause();
  loveVideo.currentTime = 0;

  // play safely (mobile + desktop)
  const playPromise = loveVideo.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      loveVideo.muted = true;
      loveVideo.play();
    });
  }
}

/* CONFETTI */
function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dy: Math.random() * 4 + 2,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      ctx.fillStyle = "#ff69b4";
      ctx.fillRect(p.x, p.y, 6, 6);
      p.y += p.dy;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

function replayVideo() {
  loveVideo.currentTime = 0;
  loveVideo.play();
}

/* FLOATING HEARTS */
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);
