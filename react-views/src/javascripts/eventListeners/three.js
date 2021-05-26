import '../../style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
//const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const width = .0008;

const height = .0008;

const depth = .0008;

const geometry = new THREE.BoxGeometry(width, height, depth);



// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xffffff)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const labelGeometry = new THREE.PlaneGeometry(1, 1);

function makeLabelCanvas(size, name) {
    const borderSize = 2;
    const ctx = document.createElement('canvas').getContext('2d');
    const font = '22px Arial';
    ctx.font = font;

    // measure how long the name will be
    const doubleBorderSize = borderSize * 2;
    const width = ctx.measureText(name).width + doubleBorderSize;
    const height = size + doubleBorderSize;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // need to set font again after resizing canvas
    ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillText(name, borderSize, borderSize);

    return ctx.canvas;
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Mesh
//const sphere = new THREE.Mesh(geometry,material)
//scene.add(sphere)
let squares = [];
let max = 1,
    min = -1;
for (let i = 0; i < 1000; i++) {
    const square = new THREE.Mesh(geometry, material)
    square.position.x = Math.random(Math.random() * (max - min) + min) * (max - min) + min;
    square.position.y = Math.random(Math.random() * (max - min) + min) * (max - min) + min;
    square.position.z = Math.random(Math.random() * (max - min) + min) * (max - min) + min;
    squares.push(square)
    scene.add(square)
}

for (let i = 0; i < 3000; i++) {
    let text = Math.floor(Math.random() * (29) + 1).toString() + ' ' + months[Math.floor(Math.random() * (months.length))];
    const cnvs = makeLabelCanvas(35, text);
    const texture = new THREE.CanvasTexture(cnvs);
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
    });
    const root = new THREE.Object3D();
    //root.position.x = Math.random(Math.random() * (max - min) + min) * (max - min) + min;
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    root.add(label);
    label.position.x = Math.random(Math.random() * (max - min) + min) * (max - min) + min;
    label.position.y = Math.random(Math.random() * (max - min) + min) * (max - min) + min;
    label.position.z = Math.random(Math.random() * (max - min) + min) * (max - min) + min;
    //if(i%9===0){
    //console.log(label.position.x )
    //console.log(square.position.x )
    //}
    const labelBaseScale = 0.000040;
    label.scale.x = canvas.width * labelBaseScale;
    label.scale.y = canvas.height * labelBaseScale;

    scene.add(root);
}
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 0.5
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color("#15181a"), 0.8);


/**
 * Animate
 */
var angle = 90;
var rad = 0.5;

export default function tick() {
    camera.position.y = camera.position.y > 1 || camera.position.y < -1 ? camera.position.y = 0 : camera.position.y;
    camera.position.x = rad * Math.cos(angle);
    camera.position.z = rad * Math.sin(angle);
    angle += 0.001;
    // Update objects
    //square.rotation.y = .5 * elapsedTime
    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

