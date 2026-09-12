const CONFIG = {
  hasVideo: true,
  videoSrc: "assets/video-abertura.mp4",
  eventDate: "2026-11-07T20:30:00-03:00"
};

const welcome = document.querySelector("#welcome");
const openInvite = document.querySelector("#openInvite");
const invitation = document.querySelector("#invitation");
const music = document.querySelector("#music");
const soundToggle = document.querySelector("#soundToggle");
const soundIcon = document.querySelector("#soundIcon");
const videoLayer = document.querySelector("#videoLayer");
const openingVideo = document.querySelector("#openingVideo");
const skipVideo = document.querySelector("#skipVideo");
const afterVideo = document.querySelector("#afterVideo");
const enterInvite = document.querySelector("#enterInvite");

function revealInvitation() {
  videoLayer.hidden = true;
  afterVideo.hidden = true;
  invitation.setAttribute("aria-hidden", "false");
  invitation.classList.add("is-visible");
  soundToggle.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showAfterVideo() {
  videoLayer.hidden = true;
  afterVideo.hidden = false;
  afterVideo.classList.add("is-visible");
  enterInvite.focus({ preventScroll: true });
}

async function startExperience() {
  openInvite.disabled = true;
  try { await music.play(); } catch (_) { /* user can retry through the music control */ }
  welcome.classList.add("is-closing");

  if (CONFIG.hasVideo) {
    openingVideo.src = CONFIG.videoSrc;
    openingVideo.muted = true;
    videoLayer.hidden = false;
    try { await openingVideo.play(); } catch (_) { showAfterVideo(); }
  } else {
    setTimeout(showAfterVideo, 650);
  }
}

openInvite.addEventListener("click", startExperience);
enterInvite.addEventListener("click", revealInvitation);
openingVideo.addEventListener("ended", showAfterVideo);
skipVideo.addEventListener("click", showAfterVideo);

soundToggle.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); } catch (_) { return; }
    soundIcon.textContent = "♪";
    soundToggle.setAttribute("aria-label", "Pausar música");
    soundToggle.setAttribute("aria-pressed", "true");
  } else {
    music.pause();
    soundIcon.textContent = "×";
    soundToggle.setAttribute("aria-label", "Reproducir música");
    soundToggle.setAttribute("aria-pressed", "false");
  }
});

const countdownIds = ["days", "hours", "minutes", "seconds"];
function updateCountdown() {
  const difference = Math.max(0, new Date(CONFIG.eventDate).getTime() - Date.now());
  const values = [
    Math.floor(difference / 86400000),
    Math.floor((difference / 3600000) % 24),
    Math.floor((difference / 60000) % 60),
    Math.floor((difference / 1000) % 60)
  ];
  countdownIds.forEach((id, index) => {
    document.querySelector(`#${id}`).textContent = String(values[index]).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);
