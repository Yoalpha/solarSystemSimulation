import * as THREE from 'three';
import "./style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PI } from 'three/webgpu';

//scene
const scene = new THREE.Scene();

//sun
const sunGeo = new THREE.SphereGeometry( 16, 64, 64 );
const sunMat = new THREE.MeshBasicMaterial( { color: 0xFFDF22 } );
const sun = new THREE.Mesh( sunGeo, sunMat );
scene.add( sun );

//mercury
const mercury = createPlanet(3.2, 0x6E6E6E, 28);

//venus
const venus = createPlanet(5.8, 0xD9C27F, 44);

//earth
const earth = createPlanet(6, 0x2A79A2, 62);

//mars
const mars = createPlanet(4, 0xB23A07, 78);

//jupiter
const jupiter = createPlanet(12, 0xD18F62 , 100);

//saturn
const saturn = createPlanet(10, 0xF1E4C5, 138);

//uranus
const uranus = createPlanet(7, 0xAFDBF5, 176);

//neptune
const neptune = createPlanet(7, 0x2448B8, 200);

//pluto
const pluto = createPlanet(2.8, 0xC5B097, 216);


//uranusRing
const uranusRingGeo = new THREE.RingGeometry(9, 13, 64);
const uranusRingMat = new THREE.MeshBasicMaterial({ color: 0x404040 });
const uranusRing = new THREE.Mesh(uranusRingGeo, uranusRingMat);
uranus.planetObj.add(uranusRing);
uranusRing.position.x = 176;
uranusRing.rotation.x = -0.5 * Math.PI;

//saturnRing
const saturnRingGeo = new THREE.RingGeometry(14, 20, 64);
const saturnRingMat = new THREE.MeshBasicMaterial({ color: 0xe2bf7d });
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturn.planetObj.add(saturnRing);
saturnRing.position.x = 138;
saturnRing.rotation.x = -0.5 * Math.PI;

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//lighting
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.05);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
// scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 5, 300, 0);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

//camera
const camera = new THREE.PerspectiveCamera( 45, sizes.width/sizes.height);
camera.position.z = 100;
scene.add(camera);




//renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize( sizes.width, sizes.height );
renderer.render( scene, camera );

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.enablePan = false;
// controls.enableZoom = false;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;

//resize

window.addEventListener('resize', resize);

function resize(){
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height)
}

function animate(){
  sun.rotateY(0.004);

  mercury.planet.rotateY(0.004);
  mercury.planetObj.rotateY(0.04);

  venus.planet.rotateY(0.002);
  venus.planetObj.rotateY(0.015);

  earth.planet.rotateY(0.02);
  earth.planetObj.rotateY(0.01);

  mars.planet.rotateY(0.018);
  mars.planetObj.rotateY(0.008);

  jupiter.planet.rotateY(0.04);
  jupiter.planetObj.rotateY(0.002);

  saturn.planet.rotateY(0.038);
  saturn.planetObj.rotateY(0.0009);

  uranus.planet.rotateY(0.03)
  uranus.planetObj.rotateY(0.0004);

  neptune.planet.rotateY(0.032);
  neptune.planetObj.rotateY(0.0001);

  pluto.planet.rotateY(0.008);
  pluto.planetObj.rotateY(0.00007);

  renderer.render(scene, camera);
  controls.update();
  window.requestAnimationFrame(animate);

}

function createPlanet(size, color, position){

  //create planet function
  const planetObj = new THREE.Object3D();
  const planetGeo = new THREE.SphereGeometry(size, 64, 64);
  const planetMat = new THREE.MeshStandardMaterial({ color: color });
  const planet = new THREE.Mesh(planetGeo, planetMat);
  planetObj.add(planet);
  scene.add(planetObj);
  planet.position.x = position;
  return {planet, planetObj}
}


animate()