import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

  const canvas = document.querySelector('#c');
  const white = new THREE.Color( 0xffffff );
  const black = new THREE.Color( 0x000000 );
  const red = new THREE.Color( 0xff0000 );
  const green = new THREE.Color( 0x00ff00 );
  const blue = new THREE.Color( 0x0000ff );
  let x = document.getElementById("x");
  let y = document.getElementById("y");
  let z = document.getElementById("z");
  let radioButtons = document.getElementsByName('color');


  // Renderer
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(900,900 / 16 * 9);
  renderer.shadowMap.enabled = true;

  // Camera
  const fov = 75;
  const aspect = 2; 
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 35;
  camera.position.y = 25;
  camera.position.x = 15;
  camera.lookAt(0,0,0);



  const control = new OrbitControls(camera, renderer.domElement);
  const scene = new THREE.Scene();

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.x +=20;
  directionalLight.position.y +=20;
  directionalLight.position.z +=20;
  directionalLight.castShadow = true;

  scene.add(directionalLight);

  let cube = buildCube(0, 11, 0, 20, 20, 20);
  cube.castShadow = true;
   scene.add(cube);
   buildPlane(0, 0, 0, 100, 100, Math.PI/2, 0, 0);
   buildPlane(0, 30, -50, 100, 60, 0, 0, 0);
   //changeColor();
   animate();
  // Orbital controls

let result = document.querySelector('#result');
document.body.addEventListener('change', function (e) {
  changeColor();
});

function changeColor() {
  let arr = [red, green, blue];
  for (var i = 0; i<radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      cube.material.color.set(arr[i]);
      break;
    }
  }  
}


export function animate() {
  requestAnimationFrame(animate);
  x.innerHTML = `X: ${camera.position.x.toPrecision(2)}`;
  y.innerHTML = `Y: ${camera.position.y.toPrecision(2)}`;
  z.innerHTML = `Z: ${camera.position.z.toPrecision(2)}`;


  renderer.render(scene, camera);
}

function buildCube(x, y, z, width, height, depth) {
  const boxWidth = width;
  const boxHeight = height;
  const boxDepth = depth;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const edges = new THREE.EdgesGeometry( geometry );
  const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
  
  const material = new THREE.MeshLambertMaterial({color: 0x44aa88});  // greenish blue
  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(x,y,z);
  line.position.set(x,y,z);

  scene.add( line );
  

  return cube
}

function buildPlane(x, y, z, width, height, angleX, angleY, angleZ) {
  var geo = new THREE.PlaneBufferGeometry(width, height, 8, 8);
  var mat = new THREE.MeshBasicMaterial({ color: 0x444444, side: THREE.DoubleSide });
  var plane1 = new THREE.Mesh(geo, mat);
  const edges = new THREE.EdgesGeometry( geo );
  const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );

  plane1.rotation.set(angleX,angleY,angleZ);
  plane1.position.set(x,y,z);
  plane1.receiveShadow = true;
  plane1.castShadow = true;
  line.position.set(x,y,z);
  line.rotation.set(angleX, angleY, angleZ);

  scene.add(plane1);
  scene.add( line );
}

