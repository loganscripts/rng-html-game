const titleDisplay = document.getElementById("titleDisplay");
const inventoryGrid = document.getElementById("inventory");
const equippedTitle = document.getElementById("equippedTitle");
let inventory = [];
let equipped = null;

function rollTitle() {
const chance = Math.random();
let pool = titles.filter(t => t.prob >= chance);
if (pool.length === 0) pool = titles.slice(0, 5); // Fallback

const chosen = pool[Math.floor(Math.random() * pool.length)];

titleDisplay.textContent = `"${chosen.name}" — ${chosen.rarity}`;
titleDisplay.style.color = chosen.color;
if (chosen.aura) triggerAura(chosen.color);

// Add to inventory if not already owned
if (!inventory.find(t => t.name === chosen.name)) {
inventory.push(chosen);
updateInventory();
}
}

function updateInventory() {
inventoryGrid.innerHTML = "";
inventory.forEach(title => {
const div = document.createElement("div");
div.className = "inventory-item";
div.textContent = title.name;
div.style.color = title.color;
div.onclick = () => equipTitle(title);
inventoryGrid.appendChild(div);
});
}

function equipTitle(title) {
equipped = title;
equippedTitle.textContent = `Equipped: "${title.name}"`;
// If title has effects, apply here (e.g. boost luck)
}

function triggerAura(color) {
const canvas = document.getElementById("auraCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({length: 50}, () => ({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
size: Math.random() * 3 + 1,
alpha: 1
}));

function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
particles.forEach(p => {
ctx.fillStyle = color;
ctx.globalAlpha = p.alpha;
ctx.beginPath();
ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
ctx.fill();
p.alpha -= 0.01;
});
particles = particles.filter(p => p.alpha > 0);
if (particles.length > 0) requestAnimationFrame(draw);
}

draw();
}