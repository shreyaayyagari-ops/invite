const BACKEND_URL = "http://localhost:5000";

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

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const summary = document.getElementById("summary");

function showQuestion() {
  const q = questions[index];
  questionEl.innerText = q.text;
  optionsEl.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => answer(q.text, opt);
    optionsEl.appendChild(btn);
  });
}

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

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  collected.forEach((a) => {
    summary.innerHTML += `
      <p><strong>${a.question}</strong><br/>💖 ${a.option}</p><hr/>
    `;
  });
}

showQuestion();

/* Confetti */
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

/* Floating Hearts */
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);
