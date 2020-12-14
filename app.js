// Creating a Landing page with THREE.JS 
// Note CDN for THREE.JS and TweenMax(Green sock animation plugin(GSAP)) must be provided in the index.html
// For you to load up the 3d models with GLTF extension you can download the THREE.JS file from https://threejs.org/ and after extracting the file get GLTFLoader.js from examples/js

// variables for setup 

let container;
let camera;
let renderer;
let scene;
let car;
let FOV;
let Aspect;
let near;
let far;
let loader;
let light;
let light2;

// This function initialises the 3D world for us

function init(){
    // getting the contianer with class name scene. You can also use other selectors too.
    container = document.querySelector('.scene');

    // Creating the scene 
    scene = new THREE.Scene();

    // Creating the camera. Note the camera object holds certain parameters 1) Field of View:- bascially how much the camera can see  2) Aspect ratio:- how much we want to see  3) clipping :- This can be considered as a range to view the 3D model
    FOV = 30;
    Aspect = container.clientWidth/ container.clientHeight;
    near = 0.1;
    far = 1000;

    camera = new THREE.PerspectiveCamera(FOV, Aspect, near, far);
    
    // we can position the camera in the 3 coordinates 
    camera.position.set(0, 1, 10);
       
    // creating Light. Note without a light source the object appears to be dark. parameters are color and the intensity of the light 
    light  = new THREE.AmbientLight(0x404040, 30);

    // add light to the scene
    scene.add(light);

    // optional to illuminate a section 
    light2 = new THREE.AmbientLight(0xffffff, 30);

    // changing the light position 
    light2.position.set(10, 5, 10);
    scene.add(light2)

    // Creating a renderer for our 3D model
    renderer = new THREE.WebGLRenderer({

        // Edges of the 3D models looks bland at times so adding anti alias fixes it
        antialias:true,
        // to set color 
        alpha:true

    });

    // setting size to renderer
    renderer.setSize(container.clientWidth, container.clientHeight);
    // setting pixel ratio to renderer
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append the renderer to the contianer. Basically injects a canvas to the html page so we can view the 3D objects 
    container.appendChild(renderer.domElement);

    // optional this is Controls provided by Three JS. Basically you can interact with the camera
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // loading up the model 
    loader = new THREE.GLTFLoader();

    loader.load('./3d/scene.gltf', function(gltf){
        
        // We need to add the model to the scene 
        scene.add(gltf.scene); 

        // get the car element fromt the scene 
        car = gltf.scene.children[0];

        animate();
  
    })
    


    // A simple animation 
    function animate(){
        requestAnimationFrame(animate);
        car.rotation.z -= 0.005;
        // pass in the scene and camera to the renderer so that it can use it to render the 3D model. Note the order should be same (scene, camera)
        renderer.render(scene, camera);
    }
}

init();