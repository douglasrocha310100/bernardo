// Personalize os dados do convite nesta seção.
const CONFIG = {
  whatsapp: "5514996674814", // DDI 55 + DDD 14 + número
  whatsappMessage: "Olá! Gostaria de confirmar minha presença no primeiro aniversário do Bernardo, no dia 20/02/2027. 💚",
  // Cole aqui o link completo do Google Maps quando tiver o endereço.
  locationUrl: "https://maps.app.goo.gl/cG246U7oiLVSuCKVA",
  // Preencha quando tiver os dados do presente.
  pixKey: "ddaprocha@gmail.com"
};

const MUSIC_START = 7; // Começa em 35 segundos
const MUSIC_END = 178;   // Termina em 1 minuto e 35 segundos

const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const openInvite = document.getElementById("openInvite");
const giftModal = document.getElementById("giftModal");
const openGifts = document.getElementById("openGifts");
const closeGifts = document.getElementById("closeGifts");
const whatsappLink = document.getElementById("whatsappLink");
const locationLink = document.getElementById("locationLink");
const copyPix = document.getElementById("copyPix");

whatsappLink.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

if (CONFIG.locationUrl.trim()) {
  locationLink.href = CONFIG.locationUrl;
} else {
  locationLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("A localização será adicionada aqui assim que o endereço ou link do mapa estiver definido.");
  });
}

openInvite.addEventListener("click", async () => {

    const music = document.getElementById("backgroundMusic");

    music.volume = 0.35;

    music.currentTime = MUSIC_START;

    try {
        await music.play();
    } catch (error) {
        console.log("Erro ao iniciar música:", error);
    }

    opening.classList.add("opening-leaving");

    opening.style.transition = "opacity .65s ease, transform .65s ease";
    opening.style.opacity = "0";
    opening.style.transform = "scale(1.025)";

    window.setTimeout(() => {
        opening.hidden = true;
        invitation.classList.add("visible");
        invitation.setAttribute("aria-hidden", "false");
        window.scrollTo({ top: 0, behavior: "instant" });
    }, 620);

});

const music = document.getElementById("backgroundMusic");

music.addEventListener("timeupdate", () => {

    if (music.currentTime >= MUSIC_END) {
        music.pause();
        music.currentTime = MUSIC_END;
    }

});

function showModal() {
  giftModal.classList.add("open");
  giftModal.setAttribute("aria-hidden", "false");
  closeGifts.focus();
}
function hideModal() {
  giftModal.classList.remove("open");
  giftModal.setAttribute("aria-hidden", "true");
  openGifts.focus();
}
openGifts.addEventListener("click", showModal);
closeGifts.addEventListener("click", hideModal);
giftModal.addEventListener("click", (event) => {
  if (event.target === giftModal) hideModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && giftModal.classList.contains("open")) hideModal();
});

if (CONFIG.pixKey) {
  copyPix.disabled = false;
  copyPix.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.pixKey);
      copyPix.textContent = "Chave Pix copiada!";
    } catch {
      copyPix.textContent = "Copie a chave: " + CONFIG.pixKey;
    }
  });
}
