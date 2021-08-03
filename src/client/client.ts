import * as THREE from "three";
// import { GUI } from "/jsm/libs/dat.gui.module";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { Text } from "troika-three-text";

const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5));
// CAMERA

const camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3.5, 21.5);

// RENDERER
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// PICKABLE SET UP
const pickableObjects: THREE.Mesh[] = [];
const highlightedMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
});

// CONTROLS
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// LIGHTS
const light = new THREE.SpotLight();
light.position.set(0, 12, -200);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.mapSize.width = 4096;
light.shadow.mapSize.height = 4096;
light.shadow.camera.near = 150;
light.shadow.camera.far = 220;
light.angle = 0.1;
scene.add(light);
scene.add(light.target);
// const helper = new THREE.SpotLightHelper(light);
// const helper = new THREE.CameraHelper(light.shadow.camera);
// scene.add(helper);

// OBJECTS
// const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const sunGeometry = new THREE.IcosahedronGeometry(2, 4);
const groundPlaneGeometry = new THREE.PlaneGeometry(80, 80);
const portfolioSelectGeo = new THREE.BoxGeometry(1.1, 6.4, 0.1);
const aboutSelectGeo = new THREE.BoxGeometry(2, 8, 0.1);
const contactSelectGeo = new THREE.BoxGeometry(1.4, 6.6, 0.1);

// TROIKA TEXT OBJECTS
const portfolioTroi = new Text();
scene.add(portfolioTroi);
portfolioTroi.text = "PORTFOLIO";
portfolioTroi.fontSize = 1.09;
portfolioTroi.color = 0x000000;
portfolioTroi.fillOpacity = 0.7;
portfolioTroi.anchorY = "middle";
portfolioTroi.position.x = -5.2;
portfolioTroi.position.y = -0.06;
portfolioTroi.position.z = 3;
portfolioTroi.rotation.z = Math.PI / 2;
portfolioTroi.castShadow = true;
portfolioTroi.font = "./fonts/HelveticaLTStd-Bold.otf";
portfolioTroi.sync();

const aboutTroi = new Text();
scene.add(aboutTroi);
aboutTroi.text = "ABOUT";
aboutTroi.fontSize = 2.11;
aboutTroi.color = 0x000000;
aboutTroi.fillOpacity = 0.7;
aboutTroi.anchorY = "middle";
aboutTroi.position.x = 6.5;
aboutTroi.position.y = 0;
aboutTroi.position.z = -40;
aboutTroi.rotation.z = Math.PI / 2;
aboutTroi.castShadow = true;
aboutTroi.font = "./fonts/HelveticaLTStd-Bold.otf";
aboutTroi.sync();

const contactTroi = new Text();
scene.add(contactTroi);
contactTroi.text = "CONTACT";
contactTroi.fontSize = 1.35;
contactTroi.color = 0x000000;
contactTroi.fillOpacity = 0.7;
contactTroi.anchorY = "middle";
contactTroi.position.x = 5.7;
contactTroi.position.y = 0;
contactTroi.position.z = -7;
contactTroi.rotation.z = Math.PI / 2;
contactTroi.castShadow = true;
contactTroi.font = "./fonts/HelveticaLTStd-Bold.otf";
contactTroi.sync();

// MATERIALS
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  transparent: true,
});

const shadowMaterial = new THREE.ShadowMaterial({
  opacity: 0.25,
});

const selectionMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  visible: false,
});

// MESHES (OBJECT + MATERIAL)
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
sunMesh.position.set(0, 12, -200);
scene.add(sunMesh);

const groundPlane = new THREE.Mesh(groundPlaneGeometry, shadowMaterial);
groundPlane.position.set(0, 0, -30);
groundPlane.receiveShadow = true;
scene.add(groundPlane);
groundPlane.rotateX(-Math.PI / 2);

const portfolioSelectMesh = new THREE.Mesh(
  portfolioSelectGeo,
  selectionMaterial
);

portfolioSelectMesh.position.set(-5.45, 3.2, 2.8);
portfolioSelectMesh.name = "select-portfolio";
pickableObjects.push(portfolioSelectMesh);
scene.add(portfolioSelectMesh);

const aboutSelectMesh = new THREE.Mesh(aboutSelectGeo, selectionMaterial);
aboutSelectMesh.position.set(6.35, 4, -41);
aboutSelectMesh.name = "select-about";
pickableObjects.push(aboutSelectMesh);
scene.add(aboutSelectMesh);

const contactSelectMesh = new THREE.Mesh(contactSelectGeo, selectionMaterial);
contactSelectMesh.position.set(5.5, 3.3, -7.1);
contactSelectMesh.name = "select-contact";
pickableObjects.push(contactSelectMesh);
scene.add(contactSelectMesh);

////
// let isSmallScreen = false;

// const setScreenCondition = () => {
//   if (window.innerWidth < 800 && !isSmallScreen) {
//     isSmallScreen = true;
//   } else if (window.innerWidth >= 800 && isSmallScreen) {
//     isSmallScreen = false;
//     animate();
//   }
// };
// setScreenCondition();

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  //   setScreenCondition();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

// //////
// const gui = new GUI();
// const userControl = gui.addFolder("UserControls");
// userControl.add(light.position, "y", 10, 35, 0.01);
// userControl.add(camera.position, "x", -10, 10, 0.01);
// userControl.open();
// ////

camera.lookAt(new THREE.Vector3(0, 3.5, -21.5));

let mouse = { x: 0, y: 0 };
const raycaster = new THREE.Raycaster();
let intersects;
renderer.domElement.addEventListener("mousemove", onMouseMove, true);
let sunMoving = false;

function onMouseMove(event: MouseEvent) {
  mouse = {
    x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
  };
  camera.position.x = mouse.x * 1.5;
  if (!sunMoving) {
    const translateY = (mouse.y + 1) * 24 + 10;
    sunMoving = true;
    new TWEEN.Tween(sunMesh.position)
      .to({ y: translateY }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(light.position)
      .to({ y: translateY }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete(() => {
        sunMoving = false;
      });
  }
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(pickableObjects, false);
  if (intersects.length > 0) {
    document.body.style.cursor = "pointer";
    switch (intersects[0].object.name) {
      case "select-portfolio":
        portfolioTroi.color = 0xffffff;
        // portfolioTroi.fillOpacity = 1;
        break;
      case "select-about":
        aboutTroi.color = 0xffffff;
        break;
      case "select-contact":
        contactTroi.color = 0xffffff;
        break;
      default:
        return;
    }
  } else {
    document.body.style.cursor = "default";
    portfolioTroi.color = 0x000000;
    aboutTroi.color = 0x000000;
    contactTroi.color = 0x000000;
    // portfolioTroi.fillOpacity = 0.7;
  }
}

renderer.domElement.addEventListener("mousedown", onMouseClick, false);
function onMouseClick(event: MouseEvent) {
  mouse = {
    x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
  };
  raycaster.setFromCamera(mouse, camera);
  intersects = raycaster.intersectObjects(pickableObjects, false);
  if (
    intersects.length > 0 &&
    intersects[0].object.name.split("-")[0] === "select"
  ) {
    goToNextPage(`/${intersects[0].object.name.split("-")[1]}`);
  }
}

function goToNextPage(link: string) {
  renderer.domElement.removeEventListener("mousemove", onMouseMove, true);
  document.body.style.cursor = "default";
  new TWEEN.Tween(groundPlane.material).to({ opacity: 0 }, 1000).start();
  new TWEEN.Tween(sunMesh.scale)
    .to(new THREE.Vector3(0, 0, 0), 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(aboutTroi.material)
    .to({ opacity: 0 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(contactTroi.material)
    .to({ opacity: 0 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(portfolioTroi.material)
    .to({ opacity: 0 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start()
    .onComplete(() => {
      window.location.href = link;
    });
}

renderer.domElement.addEventListener("touchstart", onTouchStart, false);
renderer.domElement.addEventListener("touchmove", onTouchMove, false);
renderer.domElement.addEventListener("touchend", onTouchEnd, false);

let prevX: any = null;

function onTouchStart(e: TouchEvent) {
  prevX = e.touches[0].clientX;

  if (!sunMoving) {
    const translateY =
      (e.touches[0].clientY / window.innerHeight + 1) * 12 + 10;
    sunMoving = true;
    new TWEEN.Tween(sunMesh.position)
      .to({ y: translateY }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(light.position)
      .to({ y: translateY }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onComplete(() => {
        sunMoving = false;
      });
  }
}

function onTouchMove(e: TouchEvent) {
  const differenceX = prevX - e.touches[0].clientX;
  if (e.touches[0].clientX < prevX && camera.position.x < 0.5) {
    camera.position.x = camera.position.x + differenceX * 0.01;
  }
  if (e.touches[0].clientX > prevX && camera.position.x > -3.5) {
    camera.position.x = camera.position.x + differenceX * 0.01;
  }
  prevX = e.touches[0].clientX;
}

function onTouchEnd() {
  prevX = null;
}

var animate = function () {
  //   if (isSmallScreen) return;
  requestAnimationFrame(animate);
  TWEEN.update();
  //   myText.sync();
  render();
};
function render() {
  renderer.render(scene, camera);
}
animate();
