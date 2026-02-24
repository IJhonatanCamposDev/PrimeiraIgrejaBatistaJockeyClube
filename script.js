document.addEventListener("DOMContentLoaded", () => {

  /* ================= MENU MOBILE ================= */
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll("#menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  /* ================= ANIMAÇÃO DOS CARDS ================= */
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("show"), i * 150);
      }
    });
  });

  cards.forEach(card => observer.observe(card));

  /* ================= ANIMAÇÃO SEÇÕES ================= */
  const sections = document.querySelectorAll(".fade-section");

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ================= CONTADOR ================= */
  const countdownEl = document.getElementById("countdown");

  function getProximoCulto() {
    const agora = new Date();
    const dia = agora.getDay();
    const proximo = new Date(agora);

    if (dia <= 4) {
      proximo.setDate(agora.getDate() + ((4 - dia + 7) % 7));
      proximo.setHours(19, 30, 0);
    } else {
      proximo.setDate(agora.getDate() + ((7 - dia) % 7));
      proximo.setHours(18, 30, 0);
    }

    return proximo;
  }

  function atualizarContador() {
    const destino = getProximoCulto();
    const agora = new Date();
    const diff = destino - agora;

    if (diff <= 0) {
      countdownEl.textContent = "Culto começando agora 🙏";
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

  setInterval(atualizarContador, 1000);
  atualizarContador();

  /* ================= AO VIVO BADGE ================= */
  const badge = document.querySelector(".live-badge");
  const btnLive = document.querySelector(".btn-live");

  function estaAoVivoAgora() {
    const agora = new Date();
    const dia = agora.getDay();
    const minutos = agora.getHours() * 60 + agora.getMinutes();

    if (dia === 4 && minutos >= 1170 && minutos <= 1260) return true;
    if (dia === 0 && minutos >= 1110 && minutos <= 1230) return true;

    return false;
  }

  function verificarAoVivo() {
    const aoVivo = estaAoVivoAgora();
    badge.style.display = aoVivo ? "inline-block" : "none";
    btnLive.style.display = aoVivo ? "inline-block" : "none";
  }

  verificarAoVivo();
  setInterval(verificarAoVivo, 60000);

  

});

/* ================= YOUTUBE HERO PLAYER ================= */

let heroPlayer;

window.onYouTubeIframeAPIReady = function () {
  heroPlayer = new YT.Player("player-anuncios", {
    videoId: "Nzc02WBjrEs",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      mute: 1,
      playsinline: 1,
      start: 2
    },
    events: {
      onReady: (event) => {
        event.target.mute();
        event.target.playVideo();
        controlarLoop();
      }
    }
  });
};

function controlarLoop() {
  if (!heroPlayer) return;

  const tempo = heroPlayer.getCurrentTime();

  if (tempo >= 140) {
    heroPlayer.seekTo(2);
  }

  requestAnimationFrame(controlarLoop);
}