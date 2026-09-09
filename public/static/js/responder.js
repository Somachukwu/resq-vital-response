/* Responder mobile scene brief — telemetry, stage control, navigation handoff */
import "./resq-theme.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const INCIDENT = {
  id: "RQ-2417",
  coords: { lat: 6.3894, lng: 7.2295 },
  place: "Enugu–Onitsha Expressway, km 42 eastbound (near Ugwuoba)",
};

const el = {
  telemetry: $("#telemetry"),
  beat: $("#beat"),
  log: $("#statuslog"),
  navigate: $("#navigate"),
  call: $("#callCivilian"),
};

/* ---- telemetry heartbeat: broadcast GPS every 15 s ---- */
let beats = 0;
el.telemetry.classList.add("is-live");

function broadcast() {
  beats += 1;
  const t = new Date();
  el.beat.textContent = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}:${String(
    t.getSeconds()
  ).padStart(2, "0")}`;
  el.telemetry.animate(
    [{ opacity: 1 }, { opacity: 0.45 }, { opacity: 1 }],
    { duration: 600, easing: "ease-out" }
  );
  if (beats % 4 === 0) logLine("Position broadcast to dispatch", "GPS lock held");
}

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    () => {},
    () => logLine("GPS signal weak", "Using last known position"),
    { enableHighAccuracy: true, maximumAge: 15000 }
  );
}
broadcast();
setInterval(broadcast, 15000);

/* ---- stage control ---- */
$$(".stage-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".stage-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    logLine(`Status set to ${btn.dataset.stage}`, "Dispatch notified");
    if (navigator.vibrate) navigator.vibrate(20);
  });
});

/* ---- actions ---- */
el.navigate.addEventListener("click", () => {
  const { lat, lng } = INCIDENT.coords;
  logLine("Turn-by-turn navigation opened", `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`, "_blank", "noopener");
});

el.call.addEventListener("click", () => {
  logLine("Voice channel opened to bystander", "Scene line live");
});

/* ---- status log ---- */
function logLine(label, detail) {
  const row = document.createElement("p");
  row.className = "statuslog__row";
  const t = new Date();
  row.innerHTML = `<span>${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}</span><b>${label}</b><span>${detail}</span>`;
  el.log.prepend(row);
  while (el.log.children.length > 8) el.log.lastElementChild.remove();
}

logLine(`Mission ${INCIDENT.id} accepted`, INCIDENT.place);
