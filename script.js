const info = document.getElementById('info');
const openBtn = document.getElementById('info-open');
const closeBtn = document.getElementById('info-close');

function openInfo() {
  info.hidden = false;
  void info.offsetWidth; // force reflow so the transition runs
  info.classList.add('is-open');
}

function closeInfo() {
  info.classList.remove('is-open');
  info.addEventListener('transitionend', function onDone(e) {
    if (e.target !== info) return;
    info.hidden = true;
    info.removeEventListener('transitionend', onDone);
  });
}

openBtn.addEventListener('click', openInfo);
closeBtn.addEventListener('click', closeInfo);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !info.hidden) closeInfo();
});

const landing = document.getElementById('landing');
const bgLayers = Array.from(document.querySelectorAll('.landing-bg__layer'));
const DESKTOP_MIN_WIDTH = 724;
let activeZone = 0;

function setActiveZone(zone) {
  if (zone === activeZone || !bgLayers[zone]) return;
  bgLayers[activeZone].classList.remove('is-active');
  bgLayers[zone].classList.add('is-active');
  activeZone = zone;
}

window.addEventListener('mousemove', (e) => {
  if (bgLayers.length === 0 || window.innerWidth <= DESKTOP_MIN_WIDTH) return;

  const zone = Math.min(
    bgLayers.length - 1,
    Math.floor((e.clientX / window.innerWidth) * bgLayers.length)
  );
  setActiveZone(zone);
});

landing.addEventListener('click', (e) => {
  if (bgLayers.length === 0 || window.innerWidth > DESKTOP_MIN_WIDTH) return;
  if (e.target.closest('.link')) return;

  setActiveZone((activeZone + 1) % bgLayers.length);
});
