import * as THREE from "./assets/vendor/three.module.min.js";
import { GLTFLoader } from "./assets/vendor/GLTFLoader.js";
const helloModelUrl = "./assets/reference/model/hello.glb";
const helloCompressedUrl = "./assets/reference/model/hello.glb.bin";
const cursorModelUrl = "./assets/reference/model/cursor.glb";
const sticker01Url = "./assets/reference/stickers/s_01.webp";
const sticker05Url = "./assets/reference/stickers/s_05.webp";
const sticker08Url = "./assets/reference/stickers/s_08.webp";
const sticker09Url = "./assets/reference/stickers/s_09.webp";
const sticker10Url = "./assets/reference/stickers/s_10.webp";
const sticker11Url = "./assets/reference/stickers/s_11.webp";
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const projects = [
  {title:"VOLVO EM90",year:"RECENT",type:"MEDIA EXPERIENCE",cover:"assets/portfolio/works/01-volvo-em90/cover.webp"},
  {title:"VOLVO S90",year:"2025",type:"LAUNCH EVENT",cover:"assets/portfolio/works/04-volvo-s90/cover.webp"},
  {title:"MCLAREN",year:"2025",type:"BRAND RALLY",cover:"assets/portfolio/works/06-mclaren/cover.webp",images:["assets/portfolio/works/06-mclaren/detail-01.webp","assets/portfolio/works/06-mclaren/detail-02.webp"]},
  {title:"ZONGHENG G700",year:"RECENT",type:"PRODUCT LAUNCH",cover:"assets/portfolio/works/05-jietu-zongheng/cover.webp"},
  {title:"VOYAH",year:"RECENT",type:"BRAND EVENT",cover:"assets/portfolio/works/07-voyah/cover.webp"},
  {title:"AVATR 07L",year:"2026",type:"MEDIA EXPERIENCE",cover:"assets/portfolio/works/08-avater-07l/cover.webp"},
  {title:"LYNK&CO 10TH ANNIVERSARY",year:"RECENT",type:"ANNIVERSARY VISUAL",cover:"assets/portfolio/works/09-lynk-10th/cover.webp",images:["assets/portfolio/works/09-lynk-10th/detail-01.webp","assets/portfolio/works/09-lynk-10th/detail-03.webp","assets/portfolio/works/09-lynk-10th/detail-05.webp"]},
  {title:"ZEEKR AUTO SHOW",year:"2026",type:"AUTO SHOW VISUAL",cover:"assets/portfolio/works/10-zeekr-auto-show/cover.webp"},
  {title:"TEDATONG",year:"RECENT",type:"BRAND VISUAL",cover:"assets/portfolio/works/03-tedatong/cover.webp"},
  {title:"UX STUDIO SHANGHAI",year:"RECENT",type:"BRAND EVENT",cover:"assets/portfolio/works/11-ux-studio-shanghai/cover.webp"},
  {title:"VOLVO EX30",year:"RECENT",type:"BRAND ACTIVATION",cover:"assets/portfolio/works/02-volvo-ex30/cover.webp"},
  {title:"LOTUS",year:"ARCHIVE",type:"TRACK DAY",cover:"assets/portfolio/project1/cover.webp",images:["assets/portfolio/project1/detail1.webp","assets/portfolio/project1/detail2.webp","assets/portfolio/project1/detail3.webp","assets/portfolio/project1/detail4.webp"]},
  {title:"VOLVO C40",year:"ARCHIVE",type:"CAMPAIGN VISUAL",cover:"assets/portfolio/project2/cover.webp",images:["assets/portfolio/project2/detail1.webp","assets/portfolio/project2/detail2.webp","assets/portfolio/project2/detail3.webp"]},
  {title:"VOLVO XC60",year:"ARCHIVE",type:"LAUNCH EVENT",cover:"assets/portfolio/project3/cover.webp",images:["assets/portfolio/project3/detail1.webp","assets/portfolio/project3/detail2.webp","assets/portfolio/project3/detail3.webp"]}
];

const workGrid = document.getElementById("work-grid");
projects.forEach((project, index) => {
  const article = document.createElement("article");
  article.className = "project";
  article.tabIndex = 0;
  const mobileCover = project.cover.replace(/\.webp$/, "-960.webp");
  article.innerHTML = `<div class="project-image"><span class="project-tag">${project.type}</span><img data-src="${project.cover}" data-srcset="${mobileCover} 960w, ${project.cover} 1800w" sizes="(max-width:760px) 50vw, 84vw" alt="${project.title}" decoding="async" fetchpriority="low"></div><div class="project-meta"><span>${project.title}</span><span>${project.year}</span></div>`;
  article.addEventListener("click", () => openProject(project));
  article.addEventListener("keydown", event => { if (event.key === "Enter") openProject(project); });
  workGrid.appendChild(article);
});

const modal = document.getElementById("project-modal");
function openProject(project) {
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-description").textContent = `${project.title} is a ${project.type.toLowerCase()} project developed as one coherent system across image, typography, motion and space.`;
  document.getElementById("modal-meta").innerHTML = `YEAR / ${project.year}<br>TYPE / ${project.type}`;
  document.getElementById("modal-gallery").replaceChildren(...[project.cover, ...(project.images || [])].map((src, index) => {
    const image = document.createElement("img"); image.src = src; image.alt = `${project.title} project image ${index + 1}`; image.loading = "lazy"; return image;
  }));
  modal.hidden = false; document.body.classList.add("modal-open");
}
function closeProject() { modal.hidden = true; document.body.classList.remove("modal-open"); document.getElementById("modal-gallery").replaceChildren(); }
document.getElementById("modal-close").addEventListener("click", closeProject);
document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeProject(); });

function buildGrid(groupSelector, columns) {
  const group = document.querySelector(groupSelector), rows = [33.3, 67.8], namespace = "http://www.w3.org/2000/svg", gapX = 13 / innerWidth * 100, gapY = 13 / innerHeight * 100, crossX = 6 / innerWidth * 100, crossY = 6 / innerHeight * 100; group.replaceChildren();
  const path = (data, className = "") => { const element = document.createElementNS(namespace, "path"); element.setAttribute("d", data); if (className) element.setAttribute("class", className); group.appendChild(element); };
  columns.forEach(x => { let start = 0; rows.forEach(y => { path(`M${x} ${start}V${y - gapY}`); start = y + gapY; }); path(`M${x} ${start}V100`); });
  rows.forEach(y => { let start = 0; columns.forEach(x => { path(`M${start} ${y}H${x - gapX}`); start = x + gapX; }); path(`M${start} ${y}H100`); });
  columns.forEach(x => rows.forEach(y => path(`M${x - crossX} ${y}H${x + crossX}M${x} ${y - crossY}V${y + crossY}`, "grid-cross")));
}
function rebuildGrid() { buildGrid(".desktop-grid", [3.9, 34.7, 65.4, 96.1]); buildGrid(".mobile-grid", [4, 50, 96]); }
rebuildGrid();

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, isIOS ? 1 : innerWidth < 760 ? 1.25 : 1.5)); renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08;
const cursorRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("cursor-scene"), antialias: true, alpha: true, powerPreference: "high-performance" });
cursorRenderer.setPixelRatio(Math.min(devicePixelRatio, 1.15)); cursorRenderer.outputColorSpace = THREE.SRGBColorSpace; cursorRenderer.toneMapping = THREE.ACESFilmicToneMapping; cursorRenderer.toneMappingExposure = 1.08; cursorRenderer.setClearColor(0x000000, 0);
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x07144d);
const cursorScene = new THREE.Scene(); cursorScene.add(new THREE.HemisphereLight(0xffffff, 0x3867a8, 3.4)); const cursorLight = new THREE.DirectionalLight(0xffffff, 4.5); cursorLight.position.set(-3, 5, 6); cursorScene.add(cursorLight);
const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, .1, 100); camera.position.z = 8;
scene.add(new THREE.HemisphereLight(0xffffff, 0x699bd0, 3.2));
const keyLight = new THREE.DirectionalLight(0xffffff, 4); keyLight.position.set(-3, 5, 6); scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x449cff, 5); rimLight.position.set(4, -2, 3); scene.add(rimLight);

function createStudioEnvironment() {
  const environment = new THREE.Scene(); environment.background = new THREE.Color(0x061044);
  const panels = [
    { color: 0x86a7ff, scale: [5, 2, 1], position: [-4, 3, 1], rotation: [0, .72, 0] },
    { color: 0x7da4ff, scale: [4, 1.4, 1], position: [4, 1, 2], rotation: [0, -.82, 0] },
    { color: 0x274bff, scale: [7, 2, 1], position: [0, -4, 0], rotation: [-1.25, 0, 0] },
    { color: 0x9ab7ff, scale: [2, 6, 1], position: [0, 2, -4], rotation: [0, 0, 0] }
  ];
  panels.forEach(({ color, scale, position, rotation }) => { const panel = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })); panel.scale.set(...scale); panel.position.set(...position); panel.rotation.set(...rotation); environment.add(panel); });
  const pmrem = new THREE.PMREMGenerator(renderer); const target = pmrem.fromScene(environment, .06); pmrem.dispose(); environment.traverse(child => { child.geometry?.dispose(); child.material?.dispose(); }); return target.texture;
}
scene.environment = createStudioEnvironment();

const bgMaterial = new THREE.MeshBasicMaterial({ color: 0x07144d, transparent: true });
new THREE.TextureLoader().load("./assets/reference/brush-bg.jpg", texture => { texture.colorSpace = THREE.SRGBColorSpace; bgMaterial.map = texture; bgMaterial.color.set(0xffffff); bgMaterial.needsUpdate = true; });
const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(18, 12), bgMaterial); bgPlane.position.z = -4; scene.add(bgPlane);

const stickerGroups = { hero: [], end: [] }, stickerLoader = new THREE.TextureLoader();
function createSticker(group, src, x, scale, phase, speed) {
  if (group === "end") {
    const sticker = document.createElement("img");
    sticker.className = "end-sticker"; sticker.dataset.src = src; sticker.alt = ""; sticker.decoding = "async";
    sticker.style.setProperty("--sticker-x", `${50 + x * 12}%`);
    sticker.style.setProperty("--sticker-size", `${Math.round(scale * 112)}px`);
    sticker.style.setProperty("--sticker-duration", `${Math.round(17 + phase * .55)}s`);
    sticker.style.setProperty("--sticker-delay", `${(-phase * 2.1).toFixed(1)}s`);
    document.querySelector(".end-sticker-layer").appendChild(sticker); stickerGroups.end.push(sticker); return sticker;
  }
  const texture = stickerLoader.load(src, loaded => { loaded.colorSpace = THREE.SRGBColorSpace; loaded.needsUpdate = true; sticker.userData.aspect = loaded.image.width / Math.max(loaded.image.height, 1); });
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: false, opacity: 1, alphaTest: .075, depthWrite: true, depthTest: true, side: THREE.DoubleSide, toneMapped: false });
  const sticker = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material); sticker.scale.set(scale, scale, 1); sticker.position.set(x, 4, -.72); sticker.renderOrder = -2; sticker.visible = group === "hero"; sticker.userData = { x, phase, speed, baseScale: scale, aspect: 1 }; stickerGroups[group].push(sticker); scene.add(sticker); return sticker;
}
createSticker("hero", sticker05Url, -2.7, .72, .4, .00013);
createSticker("hero", sticker08Url, 1.75, .92, 3.1, .00011);
createSticker("hero", sticker10Url, 3.05, .68, 6.2, .000145);
createSticker("end", sticker01Url, -2.9, .72, 1.3, .00012);
createSticker("end", sticker09Url, .85, .66, 4.7, .00014);
createSticker("end", sticker11Url, 2.8, .9, 7.1, .000105);
function setStickerOpacity(group, opacity) {
  if (group === "end") { const visible = opacity > .06; document.querySelector(".end-sticker-layer").classList.toggle("is-visible", visible); if (visible) stickerGroups.end.forEach(sticker => { if (!sticker.src) sticker.src = sticker.dataset.src; }); return; }
  stickerGroups[group].forEach(sticker => { sticker.visible = opacity > .06; });
}

const loader = new GLTFLoader();
function loadModel(url) { return new Promise((resolve, reject) => loader.load(url, model => resolve(model.scene), undefined, reject)); }
async function loadHelloModel() {
  if (!("DecompressionStream" in window)) return loadModel(helloModelUrl);
  try {
    const response = await fetch(helloCompressedUrl); if (!response.ok || !response.body) throw new Error("Compressed model unavailable");
    const stream = response.body.pipeThrough(new DecompressionStream("gzip")), buffer = await new Response(stream).arrayBuffer();
    return await new Promise((resolve, reject) => loader.parse(buffer, "./assets/reference/model/", model => resolve(model.scene), reject));
  } catch { return loadModel(helloModelUrl); }
}
function normalizeModel(object, targetWidth) { const box = new THREE.Box3().setFromObject(object), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3()); object.position.sub(center); object.scale.setScalar(targetWidth / Math.max(size.x, .001)); object.userData.baseScale = object.scale.x; return object; }
function createLiquidBumpTexture() {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 256; const context = canvas.getContext("2d"), image = context.createImageData(256, 256);
  for (let y = 0; y < 256; y++) for (let x = 0; x < 256; x++) { const wave = Math.sin(x * .075 + Math.sin(y * .031) * 2.2) + Math.sin(y * .061 + x * .018) + Math.sin((x + y) * .036); const value = Math.max(0, Math.min(255, 128 + wave * 26)), index = (y * 256 + x) * 4; image.data[index] = image.data[index + 1] = image.data[index + 2] = value; image.data[index + 3] = 255; }
  context.putImageData(image, 0, 0); const texture = new THREE.CanvasTexture(canvas); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(1.8, 1.25); return texture;
}
const liquidBump = createLiquidBumpTexture();
function createLiquidNormalTexture() {
  const size = 256, canvas = document.createElement("canvas"); canvas.width = canvas.height = size;
  const context = canvas.getContext("2d"), image = context.createImageData(size, size), height = new Float32Array(size * size);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) height[y * size + x] = Math.sin(x * .09 + Math.sin(y * .035) * 3.1) + .72 * Math.sin(y * .072 - x * .023) + .55 * Math.sin((x + y) * .045);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const left = height[y * size + (x + size - 1) % size], right = height[y * size + (x + 1) % size], up = height[((y + size - 1) % size) * size + x], down = height[((y + 1) % size) * size + x];
    const nx = (left - right) * 1.35, ny = (up - down) * 1.35, nz = 1, length = Math.hypot(nx, ny, nz), index = (y * size + x) * 4;
    image.data[index] = (nx / length * .5 + .5) * 255; image.data[index + 1] = (ny / length * .5 + .5) * 255; image.data[index + 2] = (nz / length * .5 + .5) * 255; image.data[index + 3] = 255;
  }
  context.putImageData(image, 0, 0); const texture = new THREE.CanvasTexture(canvas); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(2.15, 1.55); return texture;
}
const liquidNormal = createLiquidNormalTexture();
function applyWaterMaterial(object) {
  object.traverse(child => {
    if (!child.isMesh) return;
    child.material = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: false, opacity: 1, transmission: 1, thickness: 1.72, ior: 1.56, roughness: .018, metalness: 0, clearcoat: .025, clearcoatRoughness: .09, specularIntensity: .62, attenuationColor: new THREE.Color(0xeaf3ff), attenuationDistance: 58, dispersion: .88, envMapIntensity: 1.28, bumpMap: liquidBump, bumpScale: .41, normalMap: liquidNormal, normalScale: new THREE.Vector2(.98, .76), depthWrite: true, side: THREE.FrontSide });
  });
}
function setCursorOpacity(cursor, opacity) { if (!cursor) return; cursor.traverse(child => { if (child.isMesh) child.material.opacity = opacity; }); }
function styleCursor(cursor) { cursor.traverse(child => { if (child.isMesh) { child.material = child.material.clone(); child.material.color?.set(0x168dff); child.material.metalness = .08; child.material.roughness = .22; child.material.transparent = true; child.material.opacity = 1; child.material.depthWrite = false; } }); }
let hello, cursor3d, manifestoCursor;
const helloReady = loadHelloModel().then(model => { hello = normalizeModel(model, 5.1); applyWaterMaterial(hello); hello.position.set(.15, .15, 0); hello.rotation.set(-.08, -.12, -.03); scene.add(hello); document.body.classList.add("hello-ready"); });
const modelsReady = Promise.all([
  helloReady,
  loadModel(cursorModelUrl).then(model => { cursor3d = normalizeModel(model, .48); styleCursor(cursor3d); cursor3d.position.set(3.1, -1.7, .4); cursor3d.rotation.set(-.2, .2, -.18); manifestoCursor = cursor3d.clone(true); styleCursor(manifestoCursor); manifestoCursor.visible = false; cursorScene.add(cursor3d, manifestoCursor); })
]);

const starGeometry = new THREE.BufferGeometry(), starPoints = [], starColors = [], starAlphas = [], color = new THREE.Color();
for (let i = 0; i < 520; i++) { const angle = Math.random() * Math.PI * 2, inner = .35 + Math.random() * 1.2, outer = 5 + Math.random() * 9, z = (Math.random() - .5) * 2; starPoints.push(Math.cos(angle) * inner, Math.sin(angle) * inner, z, Math.cos(angle) * outer, Math.sin(angle) * outer, z); color.set([0x24f5ff, 0x4d84ff, 0xa13cff][i % 3]); for (let n = 0; n < 2; n++) starColors.push(color.r, color.g, color.b); starAlphas.push(1, 0); }
starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPoints, 3)); starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));
starGeometry.setAttribute("alpha", new THREE.Float32BufferAttribute(starAlphas, 1));
function trailMaterial() { return new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uOpacity: { value: 0 } }, vertexShader: `attribute vec3 color; attribute float alpha; varying vec3 vColor; varying float vAlpha; void main(){vColor=color;vAlpha=alpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`, fragmentShader: `uniform float uOpacity; varying vec3 vColor; varying float vAlpha; void main(){gl_FragColor=vec4(vColor,vAlpha*uOpacity);}` }); }
const stars = new THREE.LineSegments(starGeometry, trailMaterial()); stars.position.z = -1; scene.add(stars);
const starsNear = new THREE.LineSegments(starGeometry.clone(), trailMaterial()); starsNear.position.z = -.2; starsNear.scale.setScalar(.48); starsNear.rotation.z = .035; scene.add(starsNear);

const pointer = { x: 0, y: 0 };
addEventListener("pointermove", event => { pointer.x = event.clientX / innerWidth * 2 - 1; pointer.y = -(event.clientY / innerHeight * 2 - 1); });
function resize() { renderer.setPixelRatio(Math.min(devicePixelRatio, isIOS ? 1 : innerWidth < 760 ? 1.25 : 1.5)); renderer.setSize(innerWidth, innerHeight, false); cursorRenderer.setPixelRatio(Math.min(devicePixelRatio, isIOS ? 1 : 1.15)); cursorRenderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); bgPlane.scale.set(innerWidth / Math.max(innerHeight, 1), 1, 1); rebuildGrid(); if (hello?.userData.baseScale) { const mobileScale = .42 * (isIOS ? 1.1 : 1), scale = hello.userData.baseScale * (innerWidth < 760 ? mobileScale : 1); hello.scale.setScalar(scale); hello.position.x = innerWidth < 760 ? -.03 : .15; hello.position.y = innerWidth < 760 ? .05 : .15; } if (cursor3d?.userData.baseScale) { const scale = cursor3d.userData.baseScale * (innerWidth < 760 ? .72 : 1); cursor3d.scale.setScalar(scale); cursor3d.position.x = innerWidth < 760 ? .45 : 3.1; } }
addEventListener("resize", resize); resize();

const scroller = document.getElementById("scroller");
function loadProjectImage(image) { if (image.src) return; image.srcset = image.dataset.srcset; image.src = image.dataset.src; image.removeAttribute("data-src"); image.removeAttribute("data-srcset"); }
if ("IntersectionObserver" in window) { const imageObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; loadProjectImage(entry.target); imageObserver.unobserve(entry.target); }), { root: scroller, rootMargin: "600px 0px" }); document.querySelectorAll(".project-image img").forEach(image => imageObserver.observe(image)); } else document.querySelectorAll(".project-image img").forEach(loadProjectImage);
const manifestoWrap = document.querySelector(".manifesto-wrap"), manifestoTitle = document.querySelector(".statement-a");
const lenis = new Lenis({ wrapper: scroller, content: scroller.firstElementChild, duration: 1.15, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(time => lenis.raf(time * 1000)); gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger); ScrollTrigger.defaults({ scroller });
ScrollTrigger.scrollerProxy(scroller, { scrollTop(value) { if (arguments.length) lenis.scrollTo(value, { immediate: true }); return lenis.scroll; }, getBoundingClientRect() { return { top: 0, left: 0, width: innerWidth, height: innerHeight }; } });
const pixelTransition = document.querySelector(".pixel-transition");
function setPixelTransition(progress, color) { const p = Math.max(0, Math.min(1, progress)); pixelTransition.style.color = color; pixelTransition.style.setProperty("--dot-radius", `${p * 10.5}px`); pixelTransition.style.opacity = p > .001 ? "1" : "0"; }

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion) {
  if (innerWidth >= 760) {
    gsap.from(".hero-info > *", { y: 20, autoAlpha: 0, stagger: .1, duration: .9, ease: "power3.out", delay: .2 });
    gsap.from(".hero h1 span", { yPercent: 110, autoAlpha: 0, stagger: .08, duration: 1, ease: "power3.out", delay: .45 });
  }
  gsap.from(".signature-word", { autoAlpha: 0, scale: .78, rotation: -12, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: ".about", start: "top 78%" } });
  gsap.from(".about-copy p", { y: 55, autoAlpha: 0, stagger: .15, duration: .9, scrollTrigger: { trigger: ".about-copy", start: "top 82%" } });
  ScrollTrigger.batch(".project", { start: "top 88%", once: true, onEnter: batch => gsap.from(batch, { y: 55, autoAlpha: 0, stagger: .08, duration: .75, ease: "power3.out" }) });
}

let scenePhase = 0;
const skyColor = new THREE.Color(0x07144d), blackColor = new THREE.Color(0x000000);
ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom top", onEnterBack() { pixelTransition.classList.add("protect-content"); scene.background.copy(skyColor); bgMaterial.opacity = 1; setStickerOpacity("hero", .96); if (manifestoCursor) manifestoCursor.visible = false; if (cursor3d) cursor3d.visible = true; }, onUpdate(self) { pixelTransition.classList.add("protect-content"); const p = self.progress, fade = Math.max(0, Math.min(1, (p - .08) / .78)), stickerFade = Math.max(0, Math.min(1, (p - .12) / .7)), dots = Math.max(0, Math.min(1, (p - .58) / .42)); scene.background.copy(skyColor); bgMaterial.opacity = 1; setPixelTransition(dots, "#000000"); setStickerOpacity("hero", .96 * (1 - stickerFade)); if (hello) { hello.position.y = (innerWidth < 760 ? .05 : .15) + p * 2.7; hello.rotation.y = -.12 + p * .36; } if (cursor3d) { cursor3d.visible = fade < .999; setCursorOpacity(cursor3d, 1 - fade); cursor3d.position.y = -1.7 + p * 1.25; } }, onLeave() { scene.background.copy(blackColor); bgMaterial.opacity = 0; setPixelTransition(0, "#000000"); setStickerOpacity("hero", 0); if (cursor3d) { cursor3d.visible = false; setCursorOpacity(cursor3d, 1); } } });
ScrollTrigger.create({ trigger: ".about", start: "top 99%", onEnter() { scene.background.copy(blackColor); bgMaterial.opacity = 0; setPixelTransition(0, "#000000"); setStickerOpacity("hero", 0); if (cursor3d && scenePhase === 0) cursor3d.visible = false; }, onLeaveBack() { setPixelTransition(1, "#000000"); } });
ScrollTrigger.create({ trigger: ".work", start: "top bottom", end: "bottom top", onUpdate() { scene.background.copy(blackColor); bgMaterial.opacity = 0; } });
function titleCursorY() { const rect = manifestoTitle.getBoundingClientRect(), screenY = rect.top - (innerWidth < 760 ? 74 : 98), distance = camera.position.z - .4, worldHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov * .5)) * distance; return (.5 - screenY / innerHeight) * worldHeight; }
function setManifestoIntroCursor() { if (!manifestoCursor) return; cursorRenderer.domElement.style.opacity = "1"; const base = manifestoCursor.userData.baseScale * (innerWidth < 760 ? .72 : 1); manifestoCursor.visible = true; setCursorOpacity(manifestoCursor, 1); manifestoCursor.scale.setScalar(base * 1.18); manifestoCursor.position.set(0, titleCursorY(), .4); manifestoCursor.rotation.set(-.2, .2, .04); }
ScrollTrigger.create({ trigger: ".manifesto-wrap", start: "top bottom", end: "top top", onEnter: setManifestoIntroCursor, onEnterBack: setManifestoIntroCursor, onUpdate: setManifestoIntroCursor, onLeaveBack() { if (manifestoCursor) manifestoCursor.visible = false; } });
ScrollTrigger.create({ trigger: ".manifesto-wrap", start: "top top", end: () => ScrollTrigger.maxScroll(scroller), invalidateOnRefresh: true, onEnter: () => { scenePhase = 1; if (cursor3d) cursor3d.visible = false; if (manifestoCursor) manifestoCursor.visible = true; }, onEnterBack: () => { scenePhase = 1; if (cursor3d) cursor3d.visible = false; if (manifestoCursor) manifestoCursor.visible = true; }, onLeave: () => { scenePhase = 2; scene.background.copy(skyColor); bgMaterial.opacity = 1; setPixelTransition(0, "#07144d"); setStickerOpacity("end", .92); }, onLeaveBack: () => { scenePhase = 0; setStickerOpacity("end", 0); stars.material.uniforms.uOpacity.value = 0; starsNear.material.uniforms.uOpacity.value = 0; setManifestoIntroCursor(); }, onUpdate(self) {
  const p = self.progress;
  const endDots = Math.max(0, Math.min(1, (p - .91) / .055)), gradientReveal = Math.max(0, Math.min(1, (p - .965) / .035));
  pixelTransition.classList.toggle("protect-content", p >= .9); scene.background.lerpColors(blackColor, skyColor, gradientReveal); bgMaterial.opacity = gradientReveal; setPixelTransition(endDots, "#07144d"); if (endDots > 0) pixelTransition.style.opacity = String(1 - gradientReveal);
  const density = Math.max(0, Math.min(1, (p - .25) / .48)), visibleLines = Math.round(18 + density * 502), exit = Math.max(0, Math.min(1, (p - .76) / .16)), starOpacity = p < .22 ? 0 : p < .3 ? (p - .22) / .08 : 1 - exit, trailScale = THREE.MathUtils.lerp(1, .035, exit), farScale = (.24 + density * 2.95) * trailScale, nearScale = (.16 + density * 3.72) * trailScale; stars.geometry.setDrawRange(0, visibleLines * 2); starsNear.geometry.setDrawRange(0, Math.round(visibleLines * .58) * 2); stars.material.uniforms.uOpacity.value = Math.max(0, starOpacity); starsNear.material.uniforms.uOpacity.value = Math.max(0, starOpacity) * .38; stars.rotation.z = Math.sin(p * 8.7) * .023 + Math.sin(p * 3.1) * .031; starsNear.rotation.z = stars.rotation.z + .028 + Math.sin(p * 6.2) * .012; stars.scale.set(farScale * (1 + Math.sin(p * 9) * .025), farScale * (.97 + Math.cos(p * 7) * .02), farScale); starsNear.scale.set(nearScale * (.98 + Math.cos(p * 8) * .02), nearScale * (1 + Math.sin(p * 6) * .025), nearScale);
  if (manifestoCursor) { const base = manifestoCursor.userData.baseScale * (innerWidth < 760 ? .72 : 1), frontX = -.2, frontY = .2, frontZ = .04, anchorY = titleCursorY(), exitStart = .92; if (p < .11) { cursorRenderer.domElement.style.opacity = "1"; manifestoCursor.visible = true; setCursorOpacity(manifestoCursor, 1); manifestoCursor.scale.setScalar(base * 1.18); manifestoCursor.position.set(0, anchorY, .4); manifestoCursor.rotation.set(frontX, frontY, frontZ); } else if (p < .23) { const raw = (p - .11) / .12, flip = raw * raw * (3 - 2 * raw); cursorRenderer.domElement.style.opacity = "1"; manifestoCursor.visible = true; setCursorOpacity(manifestoCursor, 1); manifestoCursor.scale.setScalar(base * THREE.MathUtils.lerp(1.18, 34, flip)); manifestoCursor.position.set(0, anchorY, .4); manifestoCursor.rotation.set(frontX, frontY + Math.sin(flip * Math.PI) * .22, frontZ + flip * Math.PI * 2); } else if (p < .29) { const fade = (p - .23) / .06; cursorRenderer.domElement.style.opacity = "1"; manifestoCursor.visible = true; setCursorOpacity(manifestoCursor, 1 - fade); manifestoCursor.scale.setScalar(base * 34); manifestoCursor.position.set(0, anchorY, .4); manifestoCursor.rotation.set(frontX, frontY, frontZ + Math.PI * 2); } else if (p < exitStart) { cursorRenderer.domElement.style.opacity = "0"; manifestoCursor.visible = false; setCursorOpacity(manifestoCursor, 1); } else { const cursorExit = Math.max(0, Math.min(1, (p - exitStart) / .065)), smooth = cursorExit * cursorExit * (3 - 2 * cursorExit), fadeIn = Math.max(0, Math.min(1, (p - exitStart) / .018)); cursorRenderer.domElement.style.opacity = "1"; manifestoCursor.visible = fadeIn > .001; setCursorOpacity(manifestoCursor, fadeIn); manifestoCursor.scale.setScalar(base * THREE.MathUtils.lerp(34, 1, smooth)); manifestoCursor.position.set(0, 1.72, .4); manifestoCursor.rotation.set(frontX, frontY + Math.sin(smooth * Math.PI) * .2, frontZ + smooth * Math.PI * 2); } }
  gsap.set(".statement", { color: "#fff" });
  const set = (selector, opacity) => gsap.set(selector, { opacity, scale: .9 + opacity * .1 });
  set(".statement-a", p < .18 ? 1 - Math.max(0, Math.min(1, (p - .09) / .09)) : 0);
  set(".statement-b", p > .29 && p < .57 ? Math.min(1, (p - .29) * 10) * Math.min(1, (.59 - p) * 9) : 0);
  const valueOpacity = p > .52 && p < .74 ? Math.min(1, (p - .52) * 8) * Math.min(1, (.76 - p) * 8) : 0; gsap.set(".value", { opacity: valueOpacity });
  set(".statement-c", p > .69 && p < .9 ? Math.min(1, (p - .69) * 7) * Math.min(1, (.91 - p) * 12) : 0);
  const endReveal = Math.max(0, Math.min(1, (p - .93) / .07)); setStickerOpacity("end", endReveal * .92);
} });
ScrollTrigger.create({ start: 0, end: "max", onUpdate(self) { const rail = document.querySelector(".scroll-rail i"), ring = document.querySelector(".progress-value"), max = 168; gsap.set(rail, { y: self.progress * max }); ring.style.strokeDashoffset = String(1 - self.progress); document.getElementById("scroll-progress").setAttribute("aria-label", `Back to top, ${Math.round(self.progress * 100)}% viewed`); } });
document.getElementById("scroll-progress").addEventListener("click", () => lenis.scrollTo(0, { duration: 1.25 }));

function render() { requestAnimationFrame(render); const now = performance.now(), mobile = innerWidth < 760; liquidBump.offset.set(now * .000034 % 1, now * .000021 % 1); liquidNormal.offset.set(now * -.000019 % 1, now * .000027 % 1); liquidNormal.repeat.set(2.15 + Math.sin(now * .00042) * .12, 1.55 + Math.cos(now * .00037) * .1); stickerGroups.hero.forEach(sticker => { if (!sticker.visible) return; const travel = (now * sticker.userData.speed + sticker.userData.phase) % 9.2, size = sticker.userData.baseScale * (mobile ? .72 : 1); sticker.position.x = sticker.userData.x * (mobile ? .43 : 1) + Math.sin(now * .00035 + sticker.userData.phase) * (mobile ? .08 : .18); sticker.position.y = 4.35 - travel; sticker.scale.set(size * sticker.userData.aspect, size, 1); }); if (hello && scenePhase === 0) { hello.rotation.x += (pointer.y * .08 - hello.rotation.x) * .035; hello.rotation.y += (pointer.x * .14 - hello.rotation.y) * .035; } if (cursor3d?.visible) { cursor3d.position.x += (((mobile ? .45 : 3.05) + pointer.x * .16) - cursor3d.position.x) * .04; cursor3d.position.y += (((mobile ? -1.3 : -1.7) + pointer.y * .2) - cursor3d.position.y) * .04; } renderer.render(scene, camera); if (cursor3d?.visible || manifestoCursor?.visible) cursorRenderer.render(cursorScene, camera); else cursorRenderer.clear(); }
render();

const themeButton = document.getElementById("theme-button"), mobileTheme = document.getElementById("mobile-theme"); let themeIndex = 0;
function cycleTheme() { themeIndex = (themeIndex + 1) % 3; document.body.classList.toggle("theme-paper", themeIndex === 1); document.body.classList.toggle("theme-dark", themeIndex === 2); const color = themeIndex === 0 ? 0x07144d : themeIndex === 1 ? 0xf2f0ea : 0x000000; if (scenePhase !== 1) scene.background.set(color); themeButton.textContent = `THEME[${["A","B","C"][themeIndex]}]`; if (mobileTheme) mobileTheme.textContent = themeButton.textContent; }
themeButton.onclick = cycleTheme; if (mobileTheme) mobileTheme.onclick = cycleTheme;
const audio = document.getElementById("bgm"), soundButton = document.getElementById("sound-button"), mobileSound = document.getElementById("mobile-sound");
let soundEnabled = true; audio.volume = .46;
function updateSoundButton() { soundButton.textContent = soundEnabled ? "SOUND[\\]" : "SOUND[ ]"; soundButton.setAttribute("aria-pressed", String(soundEnabled)); if (mobileSound) mobileSound.textContent = soundButton.textContent; }
async function startSound() { if (!soundEnabled || !audio.paused) return; try { await audio.play(); } catch {} }
function toggleSound() { soundEnabled = !soundEnabled; if (soundEnabled) startSound(); else audio.pause(); updateSoundButton(); }
async function unlockSound() { await startSound(); if (!audio.paused) { removeEventListener("pointerdown", unlockSound, true); removeEventListener("keydown", unlockSound, true); } }
updateSoundButton(); if (!isIOS) startSound(); addEventListener("pointerdown", unlockSound, true); addEventListener("keydown", unlockSound, true);
soundButton.onclick = toggleSound; if (mobileSound) mobileSound.onclick = toggleSound;
const menuButton = document.querySelector(".menu-button"), mobileMenu = document.querySelector(".mobile-menu"); menuButton.onclick = () => { const open = mobileMenu.classList.toggle("open"); mobileMenu.setAttribute("aria-hidden", String(!open)); };
document.querySelectorAll("[data-scroll]").forEach(button => button.addEventListener("click", () => { lenis.scrollTo(`#${button.dataset.scroll}`); mobileMenu.classList.remove("open"); }));
function updateClock() { const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Shanghai" }); document.getElementById("clock").textContent = `${innerWidth < 760 ? "" : "GMT+8 BJ "}${time}`; } updateClock(); setInterval(updateClock, 30000); document.getElementById("year").textContent = new Date().getFullYear();

function dismissLoader() { const loadingScreen = document.getElementById("loader"); if (!loadingScreen) return; gsap.to(loadingScreen, { autoAlpha: 0, duration: .45, onComplete() { loadingScreen.remove(); ScrollTrigger.refresh(); } }); }
modelsReady.then(() => { resize(); ScrollTrigger.refresh(); }).catch(console.error);
Promise.race([helloReady, new Promise(resolve => setTimeout(resolve, 6000))]).finally(dismissLoader);
