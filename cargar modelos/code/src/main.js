var scene    = null,
    camera   = null,
    renderer = null,
    controls = null,
    vectorU  = {x:null, y:null, z:null},
    vectorV  = {x:null, y:null, z:null},
    origin   = new THREE.Vector3(0,0,0),
    figuresGeo = [],
    obj = null,
    count = 0,
    toAlter = null;

var cantidadDePisos, 
    colorFlat, 
    isWireframe,
    cantidadDePisosT = [],
    colorFlatT = [],
    isWireframeT = [];


function start() {
    window.onresize = onWindowResize;
    initScene();
    animate();
}

function initScene(){
    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.1, 1000000 ); // aspecto - desde donde veo a donde (dende donde veo)

    // renderer = new THREE.WebGLRenderer();  // En donde la voy a poner
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
    renderer.setClearColor(0x13075C); // 0x333333
    renderer.setSize( window.innerWidth, window.innerHeight ); // tamano total
    document.body.appendChild( renderer.domElement ); // agrego 

    var geometry = new THREE.BoxGeometry( 10, 10, 10 ,4, 4, 4);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00,
                                                  wireframe: true} ); 

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.set(0,2,20);
    controls.update();

    var size = 50;
    var divisions = 50;

    var gridHelper = new THREE.GridHelper( size, divisions ,0x000000, 0xffffff );
    scene.add( gridHelper );

    createLight();
    crearFirstModel();
}

function crearFirstModel() {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath('./modelos/obj/');
    mtlLoader.load('./modelos/obj/ARC170.mtl',materials=>{
        materials.preload();
        var objLoader= new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./modelos/obj/');
        objLoader.load('ARC170.obj',object=>{
            scene.add(object);
            object.position.y -=60;
        })
    })
    
}

function createLight() {
    // Create a directional light
    const light = new THREE.DirectionalLight( 0xffffff, 5.0 );

    // move the light back and up a bit
    light.position.set( 10, 10, 10 );

    // remember to add the light to the scene
    scene.add( light );


    light2 = new THREE.DirectionalLight(0xffffff, 1.0, 1000);
    scene.add(light2);
}

function createAbuilding() {
    alert("Construir aqui");
}

//----------------------------------------------------
function createSpotlight( color ) {
    var newObj = new THREE.SpotLight( color, 2 );
    newObj.castShadow = true;
    newObj.angle = 0.3;
    newObj.penumbra = 0.2;
    newObj.decay = 2;
    newObj.distance = 50;
    return newObj;
}

function animate(){
	requestAnimationFrame(animate);
	renderer.render(scene,camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}





