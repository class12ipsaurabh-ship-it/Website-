/*
==================================================
       ABHISHEK COMPUTERS - BUSINESS SETTINGS
==================================================

Edit ONLY this section to update your business
information.

You normally do not need to edit the HTML.

==================================================
*/

// ---- 1. BUSINESS DETAILS ---------------------------------------------
const businessSettings = {
  businessName: "Abhishek Computers",          // Shown in navbar, hero, About, footer, page title
  tagline: "Your Trusted Digital Service Centre", // Small line under the name

  phone: "YOUR_PHONE_NUMBER",        // e.g. "9876543210" (used for Call Now)
  whatsapp: "YOUR_WHATSAPP_NUMBER",  // With country code, digits only: "919876543210"
  email: "YOUR_EMAIL",               // e.g. "hello@example.com"

  address: "YOUR_FULL_ADDRESS",      // Street / shop address
  city: "YOUR_CITY",
  state: "YOUR_STATE",

  openingHours: "YOUR_OPENING_HOURS", // e.g. "Mon-Sat, 9:00 AM - 8:00 PM"

  googleMapsLink: "YOUR_GOOGLE_MAPS_LINK", // Paste the Share link from Google Maps

  year: "2026",                      // Copyright year

  // Optional: paste full page links. Leave "" to hide the icon.
  instagram: "",
  facebook: "",
  youtube: ""
};

// ---- 2. SERVICES (cards are created automatically) -------------------
// To add a service: copy one block and edit it. To remove: delete the block.
// icon = Font Awesome class. Browse free icons at https://fontawesome.com/icons
const services = [
  { title: "Money Transfer", description: "Send money quickly and conveniently with assistance from our centre.", icon: "fa-solid fa-money-bill-transfer" },
  { title: "Money Withdrawal", description: "Get assistance with cash withdrawal through available digital banking services.", icon: "fa-solid fa-money-bill-1-wave" },
  { title: "Aadhaar Services", description: "Assistance with available Aadhaar-related update and online services.", icon: "fa-solid fa-id-card" },
  { title: "PAN Card Services", description: "Apply for and get assistance with PAN card-related online services.", icon: "fa-solid fa-address-card" },
  { title: "Online Form Filling", description: "Assistance with government, education, examination and other online forms.", icon: "fa-solid fa-file-pen" },
  { title: "Printing & Scanning", description: "Printing, scanning and document-related computer services.", icon: "fa-solid fa-print" },
  { title: "Online Applications", description: "Assistance with various online applications and registrations.", icon: "fa-solid fa-laptop-file" },
  { title: "Other Digital Services", description: "Get assistance with various computer and internet-based services.", icon: "fa-solid fa-globe" }
];

// ---- 3. THEME COLOURS (control the whole website) --------------------
const themeSettings = {
  primaryColor: "#155EEF",    // Buttons, icons, links
  secondaryColor: "#0B1F3A",  // Dark blue: headings, hero, footer
  accentColor: "#12B76A",     // Highlight buttons and badges
  backgroundColor: "#F8FAFC"  // Page background
};

/* ================== END OF SETTINGS - code below ================== */

(function () {
  const s = businessSettings;
  const $ = (id) => document.getElementById(id);
  const isSet = (v) => v && !String(v).startsWith("YOUR_");
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const digits = (v) => String(v).replace(/[^\d]/g, "");

  // Theme
  const root = document.documentElement.style;
  root.setProperty("--primary", themeSettings.primaryColor);
  root.setProperty("--secondary", themeSettings.secondaryColor);
  root.setProperty("--accent", themeSettings.accentColor);
  root.setProperty("--bg", themeSettings.backgroundColor);

  // Text settings
  document.title = s.businessName + " | Digital & Computer Services";
  document.querySelectorAll("[data-setting]").forEach((el) => { el.textContent = s[el.dataset.setting] || ""; });
  $("year").textContent = s.year;

  // Contact details
  const place = [s.address, s.city, s.state].filter(isSet).join(", ");
  $("cAddress").textContent = place || s.address;
  $("cPhone").textContent = s.phone;
  $("cEmail").textContent = s.email;
  $("cHours").textContent = s.openingHours;

  // Buttons
  const missing = (what) => (e) => { e.preventDefault(); alert("Please add your " + what + " in the Business Settings at the top of script.js."); };
  const waLink = (text) => "https://wa.me/" + digits(s.whatsapp) + (text ? "?text=" + encodeURIComponent(text) : "");

  if (isSet(s.phone)) $("callBtn").href = "tel:" + s.phone.replace(/[^\d+]/g, ""); else $("callBtn").addEventListener("click", missing("phone number"));
  if (isSet(s.googleMapsLink)) $("mapBtn").href = s.googleMapsLink; else $("mapBtn").addEventListener("click", missing("Google Maps link"));
  ["waBtn", "waFloat"].forEach((id) => {
    if (isSet(s.whatsapp)) $(id).href = waLink("Hello " + s.businessName + ", I need some information.");
    else $(id).addEventListener("click", missing("WhatsApp number"));
  });
  if (isSet(s.email)) $("cEmail").innerHTML = '<a href="mailto:' + esc(s.email) + '">' + esc(s.email) + "</a>";
  if (isSet(s.phone)) $("cPhone").innerHTML = '<a href="tel:' + esc(s.phone.replace(/[^\d+]/g, "")) + '">' + esc(s.phone) + "</a>";

  // Social links (only shown when filled in)
  [["instagram", "fa-instagram"], ["facebook", "fa-facebook-f"], ["youtube", "fa-youtube"]].forEach(([k, icon]) => {
    if (s[k]) $("social").insertAdjacentHTML("beforeend", '<a href="' + esc(s[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '"><i class="fa-brands ' + icon + '"></i></a>');
  });

  // Service cards + form dropdown
  $("serviceGrid").innerHTML = services.map((v) =>
    '<article class="card reveal"><span class="ico"><i class="' + esc(v.icon) + '"></i></span><h3>' + esc(v.title) + "</h3><p>" + esc(v.description) + "</p></article>").join("");
  $("fService").innerHTML = '<option value="">Select a service</option>' +
    services.map((v) => "<option>" + esc(v.title) + "</option>").join("") + "<option>Other</option>";

  // Contact form -> opens WhatsApp (no backend needed)
  // To use a form service later (e.g. Formspree), replace this handler with a normal form action.
  $("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("fName").value.trim(), phone = $("fPhone").value.trim(), svc = $("fService").value, msg = $("fMsg").value.trim();
    const err = $("formError");
    if (!name || !phone || !svc) { err.textContent = "Please fill in your name, phone number and the service you need."; return; }
    if (!isSet(s.whatsapp)) { err.textContent = "WhatsApp number is not set yet. Add it in script.js."; return; }
    err.textContent = "";
    const text = "Hello " + s.businessName + ",\nName: " + name + "\nPhone: " + phone + "\nService: " + svc + (msg ? "\nMessage: " + msg : "");
    window.open(waLink(text), "_blank", "noopener");
  });

  // Mobile menu
  const burger = $("burger"), menu = $("menu");
  const setMenu = (open) => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); burger.innerHTML = '<i class="fa-solid ' + (open ? "fa-xmark" : "fa-bars") + '"></i>'; };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  // Fade-in on scroll
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("show"); io.unobserve(x.target); } }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
  } else items.forEach((i) => i.classList.add("show"));
})();
