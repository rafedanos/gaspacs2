import './style.css';
import * as THREE from 'three';
// import { GLTFLoader} from 'three/addons/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene; 
let camera; 
let renderer;
const canvas = document.querySelector('.webgl');



scene =new THREE.Scene();
//the camera takes three arguments, fov, aspect ratio(which can be calculated by doing window width/window height), view frustum
camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1,1000 );



const texture1 = new THREE.TextureLoader().load( 'textures/earthmap8k.jpg' );    
const texture2 = new THREE.TextureLoader().load( 'textures/earthbump3k.jpg' );    
const earthGeometry = new THREE.SphereGeometry(0.6,32,32);
const earthMaterial = new THREE.MeshPhongMaterial( { map: texture1, bumpMap: texture2, bumpScale: 0.03 } );
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const cloudTexture = new THREE.TextureLoader().load( 'textures/cloud8k.jpg' );
const cloudGeometry = new THREE.SphereGeometry(0.61, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({ map: cloudTexture, transparent: true, opacity: 0.4});
const cloudMesh = new THREE.Mesh( cloudGeometry, cloudMaterial );
scene.add(cloudMesh);

const starTexture = new THREE.TextureLoader().load( 'textures/starfield.jpg' );
const starGeometry = new THREE.SphereGeometry(20,64,44);
const starMaterial = new THREE.MeshBasicMaterial({ map: starTexture, side: THREE.BackSide });
const starMesh = new THREE.Mesh( starGeometry, starMaterial);
scene.add(starMesh);

const cubeGeomerty = new THREE.BoxGeometry(0.01,0.01,0.01);
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0x777777});
const cube = new THREE.Mesh( cubeGeomerty, cubeMaterial);
cube.translateX(0.9);
scene.add(cube);

// const gltfLoader = new GLTFLoader();
// gltfLoader.load( '3d_models/gaspac.glb' ), (gltfScene) => {
//   gltfScene.scene.position.X(.9);


//   scene.add(gltfScene.scene);
// };





renderer = new THREE.WebGLRenderer({
  canvas: canvas, antialias:true 
});


window.addEventListener ('resize', function()
  {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

camera.position.set(5,0,0);
let z;
const zFinal = 1.3;
window.addEventListener('load', function()
{
  
  z = camera.position.x;
});





//this is for lighting, the point light is more of a trad light in and ambient light is like a flood light and lights everything
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(1,0,0.5);
scene.add(ambientLight,pointLight);

//helpers are for showing stuff on the screen to help you, this one shows where the ponitLight is  
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)
//adding orbit controls to move around the screen 
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(cube.position);
controls.update();
// camera.position.set(1.3,0,0)

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene,camera);

//this is a loop for animating the page everytime someone goes to it 
function animate(){
  requestAnimationFrame(animate);
  earthMesh.rotation.y -= 0.00018;
  earthMesh.rotation.x += 0.00000018;
  cloudMesh.rotation.y -= 0.00018;
  cloudMesh.rotation.x += 0.00000018;
  starMesh.rotation.y -= 0.00019;
  starMesh.rotation.x += 0.00000019;
  z -= 0.01;
  if (z> zFinal)
      camera.position.x = z;

  controls.update();
  renderer.render(scene, camera);
}
animate();
