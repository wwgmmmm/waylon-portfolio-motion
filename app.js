import * as THREE from "./assets/vendor/three.module.min.js";
import { GLTFLoader } from "./assets/vendor/GLTFLoader.js";
import helloModelUrl from "./assets/reference/model/hello.gltf";
import cursorModelUrl from "./assets/reference/model/cursor.glb";
import contactModelUrl from "./assets/reference/model/cnt.gltf";
import sticker01Url from "./assets/reference/stickers/s_01.png";
import sticker05Url from "./assets/reference/stickers/s_05.png";
import sticker08Url from "./assets/reference/stickers/s_08.png";
import sticker09Url from "./assets/reference/stickers/s_09.png";
import sticker10Url from "./assets/reference/stickers/s_10.png";
import sticker11Url from "./assets/reference/stickers/s_11.png";

const projects = [
  {title:"VOLVO EM90",year:"RECENT",type:"MEDIA EXPERIENCE",cover:"assets/portfolio/works/01-volvo-em90/cover.jpg"},
  {title:"VOLVO S90",year:"2025",type:"LAUNCH EVENT",cover:"assets/portfolio/works/04-volvo-s90/cover.jpg"},
  {title:"MCLAREN",year:"2025",type:"BRAND RALLY",cover:"assets/portfolio/works/06-mclaren/cover.jpg",images:["assets/portfolio/works/06-mclaren/detail-01.jpg","assets/portfolio/works/06-mclaren/detail-02.jpg"]},
  {title:"ZONGHENG G700",year:"RECENT",type:"PRODUCT LAUNCH",cover:"assets/portfolio/works/05-jietu-zongheng/cover.jpg"},
  {title:"VOYAH",year:"RECENT",type:"BRAND EVENT",cover:"assets/portfolio/works/07-voyah/cover.jpg"},
  {title:"AVATR 07L",year:"2026",type:"MEDIA EXPERIENCE",cover:"assets/portfolio/works/08-avater-07l/cover.jpg"},
  {title:"LYNK&CO 10TH ANNIVERSARY",year:"RECENT",type:"ANNIVERSARY VISUAL",cover:"assets/portfolio/works/09-lynk-10th/cover.jpg",images:["assets/portfolio/works/09-lynk-10th/detail-01.jpg","assets/portfolio/works/09-lynk-10th/detail-03.jpg","assets/portfolio/works/09-lynk-10th/detail-05.jpg"]},
  {title:"ZEEKR AUTO SHOW",year:"2026",type:"AUTO SHOW VISUAL",cover:"assets/portfolio/works/10-zeekr-auto-show/cover.jpg"},
  {title:"TEDATONG",year:"RECENT",type:"BRAND VISUAL",cover:"assets/portfolio/works/03-tedatong/cover.jpg"},
  {title:"UX STUDIO SHANGHAI",year:"RECENT",type:"BRAND EVENT",cover:"assets/portfolio/works/11-ux-studio-shanghai/cover.jpg"},
  {title:"VOLVO EX30",year:"RECENT",type:"BRAND ACTIVATION",cover:"assets/portfolio/works/02-volvo-ex30/cover.jpg"},
  {title:"LOTUS",year:"ARCHIVE",type:"TRACK DAY",cover:"assets/portfolio/project1/cover.jpg",images:["assets/portfolio/project1/detail1.jpg","assets/portfolio/project1/detail2.jpg","assets/portfolio/project1/detail3.jpg","assets/portfolio/project1/detail4.jpg"]},
  {title:"VOLVO C40",year:"ARCHIVE",type:"CAMPAIGN VISUAL",cover:"assets/portfolio/project2/cover.jpg",images:["assets/portfolio/project2/detail1.jpg","assets/portfolio/project2/detail2.jpg","assets/portfolio/project2/detail3.jpg"]},
  {title:"VOLVO XC60",year:"ARCHIVE",type:"LAUNCH EVENT",cover:"assets/portfolio/project3/cover.jpg",images:["assets/portfolio/project3/detail1.jpg","assets/portfolio/project3/detail2.jpg","assets/portfolio/project3/detail3.jpg"]}
];

const workGrid = document.getElementById("work-grid");
projects.forEach((project, index) => {
  const article = document.createElement("article");
  article.className = "project";
  article.tabIndex = 0;
  article.innerHTML = `<div class="project-image"><span class="project-tag">${project.type}</span><img src="${project.cover}" alt="${project.title}" loading="${index < 2 ? "eager" : "lazy"}" decoding="async"></div><div class="project-meta"><span>${project.title}</span><span>${project.year}</span></div>`;
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

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7)); renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08;
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x07144d);
const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, .1, 100); camera.position.z = 8;
scene.add(new THREE.HemisphereLight(0xffffff, 0x699bd0, 3.2));
const keyLight = new THREE.DirectionalLight(0xffffff, 4); keyLight.position.set(-3, 5, 6); scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x449cff, 5); rimLight.position.set(4, -2, 3); scene.add(rimLight);

function brushTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 1024; const x = c.getContext("2d");
  x.fillStyle = "#07144d"; x.fillRect(0, 0, 1024, 1024); x.save(); x.translate(520, 520); x.rotate(-.72); x.filter = "blur(22px)";
  [0, 110, 230, 355].forEach((offset, i) => { const g = x.createLinearGradient(-700, offset, 700, offset); g.addColorStop(0, "rgba(30,48,170,0)"); g.addColorStop(.23, "rgba(30,48,170,.42)"); g.addColorStop(.62, "rgba(62,98,220,.25)"); g.addColorStop(1, "rgba(30,48,170,0)"); x.strokeStyle = g; x.lineWidth = 110 - i * 8; x.lineCap = "round"; x.beginPath(); x.moveTo(-650, offset); x.bezierCurveTo(-180, offset - 80, 220, offset + 65, 700, offset - 20); x.stroke(); }); x.restore();
  const texture = new THREE.CanvasTexture(c); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}
const bgMaterial = new THREE.MeshBasicMaterial({ map: brushTexture(), transparent: true });
const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(18, 12), bgMaterial); bgPlane.position.z = -4; scene.add(bgPlane);

const stickerGroups = { hero: [], end: [] }, stickerLoader = new THREE.TextureLoader();
function createSticker(group, src, x, scale, phase, speed) {
  const texture = stickerLoader.load(src, loaded => { loaded.colorSpace = THREE.SRGBColorSpace; loaded.needsUpdate = true; });
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: group === "hero" ? .96 : 0, depthWrite: false, depthTest: true });
  const sprite = new THREE.Sprite(material); sprite.scale.set(scale, scale, 1); sprite.position.set(x, 4, -.72); sprite.userData = { x, phase, speed, baseScale: scale }; stickerGroups[group].push(sprite); scene.add(sprite); return sprite;
}
createSticker("hero", sticker05Url, -2.7, .72, .4, .00013);
createSticker("hero", sticker08Url, 1.75, .92, 3.1, .00011);
createSticker("hero", sticker10Url, 3.05, .68, 6.2, .000145);
createSticker("end", sticker01Url, -2.9, .72, 1.3, .00012);
createSticker("end", sticker09Url, .85, .66, 4.7, .00014);
createSticker("end", sticker11Url, 2.8, .9, 7.1, .000105);
function setStickerOpacity(group, opacity) { stickerGroups[group].forEach(sprite => { sprite.material.opacity = opacity; sprite.visible = opacity > .001; }); }

const loader = new GLTFLoader();
function loadModel(url) { return new Promise((resolve, reject) => loader.load(url, model => resolve(model.scene), undefined, reject)); }
function normalizeModel(object, targetWidth) { const box = new THREE.Box3().setFromObject(object), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3()); object.position.sub(center); object.scale.setScalar(targetWidth / Math.max(size.x, .001)); object.userData.baseScale = object.scale.x; return object; }
function applyWaterMaterial(object) {
  object.traverse(child => {
    if (!child.isMesh) return;
    child.material = new THREE.MeshPhysicalMaterial({ color: 0xd9e0ff, transparent: false, opacity: 1, transmission: .96, thickness: .92, ior: 1.33, roughness: .035, metalness: 0, clearcoat: 1, clearcoatRoughness: .018, specularIntensity: 1, attenuationColor: new THREE.Color(0x3658df), attenuationDistance: 4.4, envMapIntensity: 1.18, depthWrite: true });
  });
}
function setCursorOpacity(opacity) { if (!cursor3d) return; cursor3d.traverse(child => { if (child.isMesh) { child.material.transparent = true; child.material.opacity = opacity; child.material.depthWrite = opacity > .98; } }); }
let hello, cursor3d, contactModel;
const modelsReady = Promise.all([
  loadModel(helloModelUrl).then(model => { hello = normalizeModel(model, 5.1); applyWaterMaterial(hello); hello.position.set(.15, .15, 0); hello.rotation.set(-.08, -.12, -.03); scene.add(hello); }),
  loadModel(cursorModelUrl).then(model => { cursor3d = normalizeModel(model, .48); cursor3d.position.set(3.1, -1.7, .4); cursor3d.rotation.set(-.2, .2, -.18); cursor3d.traverse(child => { if (child.isMesh) { child.material = child.material.clone(); child.material.color?.set(0x168dff); child.material.metalness = .08; child.material.roughness = .22; child.material.transparent = true; child.material.opacity = 1; } }); scene.add(cursor3d); }),
  loadModel(contactModelUrl).then(model => { contactModel = normalizeModel(model, 3.75); applyWaterMaterial(contactModel); contactModel.position.set(.2, -1.55, -.15); contactModel.rotation.set(-.14, -.08, -.04); contactModel.visible = false; scene.add(contactModel); })
]);

const starGeometry = new THREE.BufferGeometry(), starPoints = [], starColors = [], starAlphas = [], color = new THREE.Color();
for (let i = 0; i < 520; i++) { const angle = Math.random() * Math.PI * 2, inner = .35 + Math.random() * 1.2, outer = 5 + Math.random() * 9, z = (Math.random() - .5) * 2; starPoints.push(Math.cos(angle) * inner, Math.sin(angle) * inner, z, Math.cos(angle) * outer, Math.sin(angle) * outer, z); color.set([0x24f5ff, 0x4d84ff, 0xa13cff][i % 3]); for (let n = 0; n < 2; n++) starColors.push(color.r, color.g, color.b); starAlphas.push(1, 0); }
starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPoints, 3)); starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));
starGeometry.setAttribute("alpha", new THREE.Float32BufferAttribute(starAlphas, 1));
function trailMaterial() { return new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uOpacity: { value: 0 } }, vertexShader: `attribute vec3 color; attribute float alpha; varying vec3 vColor; varying float vAlpha; void main(){vColor=color;vAlpha=alpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`, fragmentShader: `uniform float uOpacity; varying vec3 vColor; varying float vAlpha; void main(){gl_FragColor=vec4(vColor,vAlpha*uOpacity);}` }); }
const stars = new THREE.LineSegments(starGeometry, trailMaterial()); stars.position.z = -1; scene.add(stars);
const starsNear = new THREE.LineSegments(starGeometry.clone(), trailMaterial()); starsNear.position.z = -.2; starsNear.scale.setScalar(.48); starsNear.rotation.z = .035; scene.add(starsNear);

const pointer = { x: 0, y: 0 };
addEventListener("pointermove", event => { pointer.x = event.clientX / innerWidth * 2 - 1; pointer.y = -(event.clientY / innerHeight * 2 - 1); document.getElementById("coordinates").textContent = `${String(event.clientX).padStart(4,"0")} X ${String(event.clientY).padStart(4,"0")} Y`; });
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); bgPlane.scale.set(innerWidth / Math.max(innerHeight, 1), 1, 1); if (hello?.userData.baseScale) { const scale = hello.userData.baseScale * (innerWidth < 760 ? .54 : 1); hello.scale.setScalar(scale); hello.position.y = innerWidth < 760 ? .05 : .15; } if (cursor3d?.userData.baseScale) { const scale = cursor3d.userData.baseScale * (innerWidth < 760 ? .72 : 1); cursor3d.scale.setScalar(scale); cursor3d.position.x = innerWidth < 760 ? 1.2 : 3.1; } if (contactModel?.userData.baseScale) { const scale = contactModel.userData.baseScale * (innerWidth < 760 ? .62 : 1); contactModel.scale.setScalar(scale); } }
addEventListener("resize", resize); resize();

const scroller = document.getElementById("scroller");
const lenis = new Lenis({ wrapper: scroller, content: scroller.firstElementChild, duration: 1.15, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(time => lenis.raf(time * 1000)); gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger); ScrollTrigger.defaults({ scroller });
ScrollTrigger.scrollerProxy(scroller, { scrollTop(value) { if (arguments.length) lenis.scrollTo(value, { immediate: true }); return lenis.scroll; }, getBoundingClientRect() { return { top: 0, left: 0, width: innerWidth, height: innerHeight }; } });
const pixelTransition = document.querySelector(".pixel-transition");
function setPixelTransition(progress, color) { const p = Math.max(0, Math.min(1, progress)); pixelTransition.style.color = color; pixelTransition.style.setProperty("--dot-radius", `${p * 10.5}px`); pixelTransition.style.opacity = p > .001 ? "1" : "0"; }

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion) {
  gsap.from(".hero-info > *", { y: 20, autoAlpha: 0, stagger: .1, duration: .9, ease: "power3.out", delay: .2 });
  gsap.from(".hero h1 span", { yPercent: 110, autoAlpha: 0, stagger: .08, duration: 1, ease: "power3.out", delay: .45 });
  gsap.from(".signature-word", { autoAlpha: 0, scale: .78, rotation: -12, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: ".about", start: "top 78%" } });
  gsap.from(".about-copy p", { y: 55, autoAlpha: 0, stagger: .15, duration: .9, scrollTrigger: { trigger: ".about-copy", start: "top 82%" } });
  ScrollTrigger.batch(".project", { start: "top 88%", once: true, onEnter: batch => gsap.from(batch, { y: 55, autoAlpha: 0, stagger: .08, duration: .75, ease: "power3.out" }) });
}

let scenePhase = 0, cursorLocked = false;
const skyColor = new THREE.Color(0x07144d), blackColor = new THREE.Color(0x000000);
ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom top", onEnterBack() { scene.background.copy(skyColor); bgMaterial.opacity = 1; setStickerOpacity("hero", .96); if (cursor3d) cursor3d.visible = true; }, onUpdate(self) { const p = self.progress, fade = Math.max(0, Math.min(1, (p - .08) / .78)), stickerFade = Math.max(0, Math.min(1, (p - .12) / .7)), dots = Math.max(0, Math.min(1, (p - .58) / .42)); scene.background.copy(skyColor); bgMaterial.opacity = 1; setPixelTransition(dots, "#000000"); setStickerOpacity("hero", .96 * (1 - stickerFade)); if (hello) { hello.position.y = .15 + p * 2.7; hello.rotation.y = -.12 + p * .36; } if (cursor3d) { cursor3d.visible = fade < .999; setCursorOpacity(1 - fade); cursor3d.position.y = -1.7 + p * 1.25; } }, onLeave() { scene.background.copy(blackColor); bgMaterial.opacity = 0; setPixelTransition(0, "#000000"); setStickerOpacity("hero", 0); if (cursor3d) { cursor3d.visible = false; setCursorOpacity(1); } } });
ScrollTrigger.create({ trigger: ".about", start: "top 99%", onEnter() { scene.background.copy(blackColor); bgMaterial.opacity = 0; setPixelTransition(0, "#000000"); }, onLeaveBack() { setPixelTransition(1, "#000000"); } });
ScrollTrigger.create({ trigger: ".work", start: "top bottom", end: "bottom top", onUpdate() { scene.background.copy(blackColor); bgMaterial.opacity = 0; } });
ScrollTrigger.create({ trigger: ".manifesto-wrap", start: "top bottom+=1200", end: "top top", onEnter() { if (cursor3d) cursor3d.visible = true; }, onUpdate() { scene.background.copy(blackColor); bgMaterial.opacity = 0; setPixelTransition(0, "#000000"); if (!cursor3d) return; const base = cursor3d.userData.baseScale * (innerWidth < 760 ? .72 : 1); cursorLocked = true; cursor3d.visible = true; setCursorOpacity(1); cursor3d.scale.setScalar(base * 1.18); cursor3d.position.set(0, 1.72, .4); cursor3d.rotation.set(-.2, .2, .04); }, onLeaveBack() { cursorLocked = false; if (cursor3d) cursor3d.visible = false; } });
ScrollTrigger.create({ trigger: ".manifesto-wrap", start: "top top", end: "bottom bottom", onEnter: () => { scenePhase = 1; cursorLocked = true; }, onEnterBack: () => { scenePhase = 1; cursorLocked = true; }, onLeave: () => { scenePhase = 2; cursorLocked = true; scene.background.copy(skyColor); bgMaterial.opacity = .38; setPixelTransition(0, "#07144d"); setStickerOpacity("end", .92); }, onLeaveBack: () => { scenePhase = 0; cursorLocked = false; setStickerOpacity("end", 0); }, onUpdate(self) {
  const p = self.progress;
  scene.background.copy(blackColor); bgMaterial.opacity = 0; const endDots = Math.max(0, Math.min(1, (p - .94) / .06)); setPixelTransition(endDots, "#07144d");
  const density = Math.max(0, Math.min(1, (p - .18) / .54)), visibleLines = Math.round(18 + density * 502), exit = Math.max(0, Math.min(1, (p - .84) / .128)), starOpacity = p < .18 ? 0 : p < .24 ? (p - .18) / .06 : 1 - exit, trailScale = THREE.MathUtils.lerp(1, .035, exit), farScale = (.24 + density * 2.95) * trailScale, nearScale = (.16 + density * 3.72) * trailScale; stars.geometry.setDrawRange(0, visibleLines * 2); starsNear.geometry.setDrawRange(0, Math.round(visibleLines * .58) * 2); stars.material.uniforms.uOpacity.value = starOpacity; starsNear.material.uniforms.uOpacity.value = starOpacity * .38; stars.rotation.z = Math.sin(p * 8.7) * .023 + Math.sin(p * 3.1) * .031; starsNear.rotation.z = stars.rotation.z + .028 + Math.sin(p * 6.2) * .012; stars.scale.set(farScale * (1 + Math.sin(p * 9) * .025), farScale * (.97 + Math.cos(p * 7) * .02), farScale); starsNear.scale.set(nearScale * (.98 + Math.cos(p * 8) * .02), nearScale * (1 + Math.sin(p * 6) * .025), nearScale);
  if (cursor3d) { const base = cursor3d.userData.baseScale * (innerWidth < 760 ? .72 : 1), frontX = -.2, frontY = .2, frontZ = .04; if (p < .065) { cursor3d.visible = true; setCursorOpacity(1); cursor3d.scale.setScalar(base * 1.18); cursor3d.position.set(0, 1.72, .4); cursor3d.rotation.set(frontX, frontY, frontZ); } else if (p < .16) { const raw = (p - .065) / .095, flip = raw * raw * (3 - 2 * raw); cursor3d.visible = true; setCursorOpacity(1); cursor3d.scale.setScalar(base * THREE.MathUtils.lerp(1.18, 34, flip)); cursor3d.position.set(0, THREE.MathUtils.lerp(1.72, 0, flip), .4); cursor3d.rotation.set(frontX, frontY + Math.sin(flip * Math.PI) * .22, frontZ + flip * Math.PI * 2); } else if (p < .22) { const fade = (p - .16) / .06; cursor3d.visible = true; setCursorOpacity(1 - fade); cursor3d.scale.setScalar(base * 34); cursor3d.position.set(0, 0, .4); cursor3d.rotation.set(frontX, frontY, frontZ + Math.PI * 2); } else if (p < .84) { cursor3d.visible = false; setCursorOpacity(1); } else { const raw = (p - .84) / .128, shrink = Math.max(0, Math.min(1, raw)), smooth = shrink * shrink * (3 - 2 * shrink); cursor3d.visible = true; setCursorOpacity(1); cursor3d.scale.setScalar(base * THREE.MathUtils.lerp(34, 1, smooth)); cursor3d.position.set(0, 0, .4); cursor3d.rotation.set(frontX, frontY + Math.sin(smooth * Math.PI) * .2, frontZ + smooth * Math.PI * 2); } }
  gsap.set(".statement", { color: "#fff" });
  const set = (selector, opacity) => gsap.set(selector, { opacity, scale: .9 + opacity * .1 });
  set(".statement-a", p < .3 ? Math.min(1, p * 8 + .15) * Math.min(1, (.34 - p) * 9) : 0);
  set(".statement-b", p > .25 && p < .58 ? Math.min(1, (p - .25) * 10) * Math.min(1, (.6 - p) * 9) : 0);
  const valueOpacity = p > .53 && p < .78 ? Math.min(1, (p - .53) * 8) * Math.min(1, (.8 - p) * 8) : 0; gsap.set(".value", { opacity: valueOpacity });
  set(".statement-c", p > .74 ? Math.min(1, (p - .74) * 7) * Math.min(1, (1 - p) * 15) : 0);
  const endReveal = Math.max(0, Math.min(1, (p - .962) / .038)); setStickerOpacity("end", endReveal * .92);
  if (contactModel) { const reveal = endReveal; contactModel.visible = reveal > .08; const base = contactModel.userData.baseScale * (innerWidth < 760 ? .54 : .94); contactModel.scale.setScalar(base * (.7 + reveal * .3)); contactModel.position.y = -1.95 + reveal * .5; contactModel.rotation.y = -.75 + reveal * .67; }
} });
ScrollTrigger.create({ start: 0, end: "max", onUpdate(self) { const rail = document.querySelector(".scroll-rail i"), ring = document.querySelector(".progress-value"), max = 168; gsap.set(rail, { y: self.progress * max }); ring.style.strokeDashoffset = String(1 - self.progress); document.getElementById("scroll-progress").setAttribute("aria-label", `Back to top, ${Math.round(self.progress * 100)}% viewed`); } });
document.getElementById("scroll-progress").addEventListener("click", () => lenis.scrollTo(0, { duration: 1.25 }));

function render() { requestAnimationFrame(render); const now = performance.now(), mobile = innerWidth < 760; Object.values(stickerGroups).flat().forEach(sprite => { if (!sprite.visible) return; const travel = (now * sprite.userData.speed + sprite.userData.phase) % 9.2, size = sprite.userData.baseScale * (mobile ? .72 : 1); sprite.position.x = sprite.userData.x * (mobile ? .43 : 1) + Math.sin(now * .00035 + sprite.userData.phase) * (mobile ? .08 : .18); sprite.position.y = 4.35 - travel; sprite.scale.set(size, size, 1); }); if (hello && scenePhase === 0) { hello.rotation.x += (pointer.y * .08 - hello.rotation.x) * .035; hello.rotation.y += (pointer.x * .14 - hello.rotation.y) * .035; } if (cursor3d && !cursorLocked && cursor3d.visible) { cursor3d.position.x += (((mobile ? 1.2 : 3.05) + pointer.x * .25) - cursor3d.position.x) * .04; cursor3d.position.y += (((mobile ? -1.3 : -1.7) + pointer.y * .2) - cursor3d.position.y) * .04; } if (contactModel?.visible) contactModel.rotation.z = Math.sin(now * .00035) * .025; renderer.render(scene, camera); }
render();

const themeButton = document.getElementById("theme-button"), mobileTheme = document.getElementById("mobile-theme"); let themeIndex = 0;
function cycleTheme() { themeIndex = (themeIndex + 1) % 3; document.body.classList.toggle("theme-paper", themeIndex === 1); document.body.classList.toggle("theme-dark", themeIndex === 2); const color = themeIndex === 0 ? 0x07144d : themeIndex === 1 ? 0xf2f0ea : 0x000000; if (scenePhase !== 1) scene.background.set(color); themeButton.textContent = `THEME[${["A","B","C"][themeIndex]}]`; if (mobileTheme) mobileTheme.textContent = themeButton.textContent; }
themeButton.onclick = cycleTheme; if (mobileTheme) mobileTheme.onclick = cycleTheme;
const audio = document.getElementById("bgm"), soundButton = document.getElementById("sound-button"), mobileSound = document.getElementById("mobile-sound");
async function toggleSound() { if (audio.paused) { await audio.play(); soundButton.textContent = "SOUND[\\]"; soundButton.setAttribute("aria-pressed", "true"); } else { audio.pause(); soundButton.textContent = "SOUND[ ]"; soundButton.setAttribute("aria-pressed", "false"); } if (mobileSound) mobileSound.textContent = soundButton.textContent; }
soundButton.onclick = toggleSound; if (mobileSound) mobileSound.onclick = toggleSound;
const menuButton = document.querySelector(".menu-button"), mobileMenu = document.querySelector(".mobile-menu"); menuButton.onclick = () => { const open = mobileMenu.classList.toggle("open"); mobileMenu.setAttribute("aria-hidden", String(!open)); };
document.querySelectorAll("[data-scroll]").forEach(button => button.addEventListener("click", () => { lenis.scrollTo(`#${button.dataset.scroll}`); mobileMenu.classList.remove("open"); }));
function updateClock() { const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Shanghai" }); document.getElementById("clock").textContent = `${innerWidth < 760 ? "" : "GMT+8 BJ "}${time}`; } updateClock(); setInterval(updateClock, 30000); document.getElementById("year").textContent = new Date().getFullYear();

modelsReady.then(resize).catch(console.error).finally(() => { gsap.to("#loader", { autoAlpha: 0, duration: .55, delay: .25, onComplete() { document.getElementById("loader").remove(); ScrollTrigger.refresh(); } }); });
