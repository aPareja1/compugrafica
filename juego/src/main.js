var scene = null,
    camera = null,
    renderer = null,
    controls = null,
    player = null,
    origin = new THREE.Vector3(0, 0, 0),
    figuresGeo = {},
    obj = null,
    count = 0,
    toAlter = null,
    prevTime = performance.now(),
    velocity = new THREE.Vector3();
var plane,
    modelLoad, stats,
    light;
var speed = 6;
var velocityY = 0.0;
var positionY = 0.0;
var gravity = 0.8;
var onGround = true;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();
var starJump = false;
var onJump = false;
var sound1;
var controls = null;
var boxes = {};
var puntos = 0;
function start() {
    window.onresize = onWindowResize;
    initScene();
    animate();

}


function initSound() {
    console.log("start sound");
    sound1 = new Sound(["./../songs/pumped.mp3"], 1000, scene, {   // radio(10)
        debug: true,
        position: { x: -486.52083659955065, y: -119, z: 490.550373211818 }
    });

}

function initScene() {


    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000); // aspecto - desde donde veo a donde (dende donde veo)
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
    renderer.setClearColor(0x0099ff); // 0x333333
    renderer.setSize(window.innerWidth, window.innerHeight - 4); // tamano total   window.innerWidth, window.innerHeight 
    document.body.appendChild(renderer.domElement); // agrego 
    loadCity();
    createFistModel('./modelos/obj/character/', 'advancedCharacter.mtl', 'advancedCharacter.obj');
    camera.position.set(220, 0, 600);
    createLight();
    initSound();
    loadSoldier();
}

function update() {

    var delta = clock.getDelta(); // seconds.
    var moveDistance = 200 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second
    if (keyboard.pressed("up")) {
        figuresGeo["personaje"].translateZ(moveDistance);
        //console.log(figuresGeo["personaje"].position);
        sound1.play();

    }
    if (keyboard.pressed("down"))
        figuresGeo["personaje"].translateZ(-moveDistance);
    var rotation_matrix = new THREE.Matrix4().identity();
    if (keyboard.pressed("left"))
        figuresGeo["personaje"].rotateOnAxis(new THREE.Vector3(0, 1, 0), rotateAngle);
    if (keyboard.pressed("right"))
        figuresGeo["personaje"].rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);
    if (keyboard.pressed("space")) {

        StartJump();
    }
    duringJump();
    var relativeCameraOffset = new THREE.Vector3(0, 30, -100);
    var cameraOffset = relativeCameraOffset.applyMatrix4(figuresGeo["personaje"].matrixWorld);
    camera.position.x = cameraOffset.x;
    camera.position.y = cameraOffset.y;
    camera.position.z = cameraOffset.z;

    //  boxes["personaje"].applyMatrix4(figuresGeo["personaje"].matrixWorld );
    camera.lookAt(figuresGeo["personaje"].position);
    boxes["personaje"].setFromObject(figuresGeo["personaje"]);
    camera.updateMatrix();

    //camera.updateProjectionMatrix();


}

function StartJump() {
    if (onGround && onJump == false) {
        //velocityY = -12.0;
        onGround = false;
        onJump = true;
    }

}

function duringJump() {
    if (onGround == false && onJump == true) {
        if (positionY < 100) {
            velocityY += gravity;
            positionY += velocityY;
        }
        if (positionY >= 100) {
            positionY = 100;
            velocityY = 0;
            onJump = false;
        }
    }
    if (onGround == false && onJump == false) {
        if (positionY > 5) {
            velocityY += gravity;
            positionY -= velocityY
        }
        if (positionY <= 5) {
            velocityY = 0;
            positionY = 0;
            onGround = true;
        }
    }

    figuresGeo["personaje"].position.y = -119 + positionY;
}




function go2Play() {
    document.getElementById('blocker').style.display = 'none';

}
function loadSoldier() {


    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath('./modelos/obj/present/');
    mtlLoader.setPath('./modelos/obj/present/');
    mtlLoader.load('present.mtl', function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./modelos/obj/present/');
        objLoader.load('present.obj', function (object) {
            object.scale.set(100, 100, 100);
            modelLoad = object;
            figuresGeo["present1"] = modelLoad;
            figuresGeo["present2"] = modelLoad.clone();
            figuresGeo["present3"] = modelLoad.clone();
            figuresGeo["present4"] = modelLoad.clone();
            figuresGeo["present5"] = modelLoad.clone();
            figuresGeo["present1"].name = "present1";
            figuresGeo["present2"].name = "present2";
            figuresGeo["present3"].name = "present3";
            figuresGeo["present4"].name = "present4";
            figuresGeo["present5"].name = "present5";
            scene.add(figuresGeo["present1"]);
            scene.add(figuresGeo["present2"]);
            scene.add(figuresGeo["present3"]);
            scene.add(figuresGeo["present4"]);
            scene.add(figuresGeo["present5"]);
            figuresGeo["present1"].position.set(-900, -119, 500);
            figuresGeo["present2"].position.set(-500, -119, 200);
            figuresGeo["present3"].position.set(-400, -119, 700);
            figuresGeo["present4"].position.set(200, 0, 490);
            figuresGeo["present5"].position.set(500, -119, 490);
            boxes["present1"] = new THREE.Box3().setFromObject(figuresGeo["present1"]);
            boxes["present2"] = new THREE.Box3().setFromObject(figuresGeo["present2"]);
            boxes["present3"] = new THREE.Box3().setFromObject(figuresGeo["present3"]);
            boxes["present4"] = new THREE.Box3().setFromObject(figuresGeo["present4"]);
            boxes["present5"] = new THREE.Box3().setFromObject(figuresGeo["present5"]);

            // colliders.push(new  THREEx.ColliderBox3(figuresGeo["present2"], boxes["present2"]));
            // colliders.push(new  THREEx.ColliderBox3(figuresGeo["present3"], boxes["present3"]));
            // colliders.push(new  THREEx.ColliderBox3(figuresGeo["present4"], boxes["present4"]));
            // colliders.push(new  THREEx.ColliderBox3(figuresGeo["present5"], boxes["present5"]));
            //collider.update();



        });



    });





}

function createLight() {
    var light2 = new THREE.AmbientLight(0xffffff); // soft white light
    light2.position.set(10, 10, 10);
    scene.add(light2);
    light = new THREE.DirectionalLight(0xffffff, 1.0, 1000);
    scene.add(light);
}

function createSpotlight(color) {
    var newObj = new THREE.SpotLight(color, 2);
    newObj.castShadow = true;
    newObj.angle = 0.3;
    newObj.penumbra = 0.2;
    newObj.decay = 2;
    newObj.distance = 50;
    return newObj;
}
var time = Date.now() * 0.0005;
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    sound1.update(figuresGeo["personaje"]);
    update();
    detectarColisiones();

}
function detectarColisiones() {
    if (boxes["personaje"].intersectsBox(boxes["present1"]) == true) {
        // var selectedObject = scene.getObjectByName(object.name);
        scene.remove(figuresGeo["present1"]);
        console.log("fig1");
        puntos++;
        document.getElementById("points").innerHTML = puntos;
        boxes["present1"].makeEmpty();
    }
    if (boxes["personaje"].intersectsBox(boxes["present2"]) == true) {
        // var selectedObject = scene.getObjectByName(object.name);
        scene.remove(figuresGeo["present2"]);
        console.log("fig2");
        puntos++;
        document.getElementById("points").innerHTML = puntos;
        boxes["present2"].makeEmpty();
    }
    if (boxes["personaje"].intersectsBox(boxes["present3"]) == true) {
        // var selectedObject = scene.getObjectByName(object.name);
        scene.remove(figuresGeo["present3"]);
        console.log("fig3");
        puntos++;
        document.getElementById("points").innerHTML = puntos;
        boxes["present3"].makeEmpty();
    }
    if (boxes["personaje"].intersectsBox(boxes["present4"]) == true) {
        // var selectedObject = scene.getObjectByName(object.name);
        console.log("fig4");
        scene.remove(figuresGeo["present4"]);
        puntos++;
        document.getElementById("points").innerHTML = puntos;
        boxes["present4"].makeEmpty();
    }
    if (boxes["personaje"].intersectsBox(boxes["present5"]) == true) {
        // var selectedObject = scene.getObjectByName(object.name);
        scene.remove(figuresGeo["present5"]);
        //  boxes["present5"]
        puntos++;
        document.getElementById("points").innerHTML = puntos;
        console.log("fig5");
        boxes["present5"].makeEmpty();
    }
}




function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function createFistModel(generalPath, pathMtl, pathObj) {
    // alert("Aqui se van a crear los modelos");
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath(generalPath);
    mtlLoader.setPath(generalPath);
    mtlLoader.load(pathMtl, function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(generalPath);
        objLoader.load(pathObj, function (object) {

            modelLoad = object;
            figuresGeo["personaje"] = modelLoad;
            figuresGeo["personaje"].name = "personaje";
            scene.add(figuresGeo["personaje"]);
            figuresGeo["personaje"].rotation.y = Math.PI * 0.5;
            figuresGeo["personaje"].scale.set(3, 3, 3);
            figuresGeo["personaje"].position.set(220, -119, 400);

            boxes["personaje"] = new THREE.Box3().setFromObject(figuresGeo["personaje"]);
            //  boxes["personaje"].name="personaje";

            //   controls = new THREE.PlayerControls( camera , figuresGeo["personaje"] );



        });

    });
}

function loadCity() {

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setTexturePath('./modelos/obj/city/');
    mtlLoader.setPath('./modelos/obj/city/');
    mtlLoader.load('Lowpoly_City_Free_Pack.mtl', function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('./modelos/obj/city/');
        objLoader.load('Lowpoly_City_Free_Pack.obj', function (object) {

            modelLoad = object;
            figuresGeo["ciudad"] = modelLoad;
            scene.add(object);
            object.scale.set(1, 1, 1);
            object.position.y = 0;
            object.position.x = 0;
            object.position.z = 0;

        });

    });

}





