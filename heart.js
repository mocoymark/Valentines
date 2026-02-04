const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");

let offsetX = 0;
let offsetY = 0;

document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();

  const distX = e.clientX - (rect.left + rect.width / 2);
  const distY = e.clientY - (rect.top + rect.height / 2);

  const distance = Math.sqrt(distX * distX + distY * distY);

  if (distance < 200) {
    // RUN AWAY
    offsetX -= distX * 0.18;
    offsetY -= distY * 0.18;

    offsetX = Math.max(-250, Math.min(250, offsetX));
    offsetY = Math.max(-150, Math.min(150, offsetY));
  } else {
    // GO BACK TO ORIGINAL POSITION SMOOTHLY
    offsetX *= 0.9;
    offsetY *= 0.9;

    // snap to zero when very close
    if (Math.abs(offsetX) < 0.5) offsetX = 0;
    if (Math.abs(offsetY) < 0.5) offsetY = 0;
  }

  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

yesBtn.addEventListener("click", () => {
  result.style.display = "block";

  startHearts();
  startDisco();
});
function startHearts() {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "0px";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
}

function startDisco() {
  document.body.classList.add("party");

  // stop disco after 6 seconds
  setTimeout(() => {
    document.body.classList.remove("party");
  }, 6000);
}
