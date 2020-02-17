let scene,camera, renderer, cloudParticles = [], flash, rain, rainGeo, rainCount = 15000,dropImage;


    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 104.5;
      camera.rotation.x = 1.16;
      camera.rotation.y = -0.12;
      camera.rotation.z = 0.27;
      ambient = new THREE.AmbientLight(0x9c324e);
      scene.add(ambient);
      directionalLight = new THREE.DirectionalLight(0x9c324e);
      directionalLight.position.set(0,0,1);
      scene.add(directionalLight);
      flash = new THREE.PointLight(0x062d89, 30, 300 ,1.7);
      flash.position.set(200,300,100);
      console.log(flash)
      scene.add(flash);
      renderer = new THREE.WebGLRenderer();
      scene.fog = new THREE.FogExp2(0x1b1c29, 0.002);
      renderer.setClearColor(scene.fog.color);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      rainGeo = new THREE.Geometry();

      for(let i=0;i<rainCount;i++) {
        rainDrop = new THREE.Vector3(
          Math.random() * 400 -200,
          Math.random() * 500 - 250,
          Math.random() * 400 - 200
        );
        rainDrop.velocity = {};
        rainDrop.velocity = 0;
        rainGeo.vertices.push(rainDrop);
      }
        var dropletTexture = new THREE.TextureLoader().load( './bubble.png' );
         rainMaterial = new THREE.PointsMaterial({
        size:0.2,
        transparent: true,
        map:dropletTexture
      });
      
      rain = new THREE.Points(rainGeo,rainMaterial);
      console.log(rain)
      scene.add(rain);
   
      let loader = new THREE.TextureLoader();
      
      loader.load("assets/images/smoke.png", function(texture){
        cloudGeo = new THREE.PlaneBufferGeometry(500,500);
        cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });
        for(let p=0; p<25; p++) {
          let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
          cloud.position.set(
            Math.random()*800 -400,
            500,
            Math.random()*500 - 450
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random()*360;
          cloud.material.opacity = 0.6;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
        animate();
      });
    }
    function animate() {
      cloudParticles.forEach(p => {
        p.rotation.z -=0.002;
      });
      rainGeo.vertices.forEach(p => {
        p.velocity -= 0.1 + Math.random() * 0.1;
        p.y += p.velocity;
        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
      });
      rainGeo.verticesNeedUpdate = true;
      rain.rotation.y +=0.002;
      if(Math.random() > 0.93 || flash.power > 100) {
        if(flash.power < 100) 
          flash.position.set(
            Math.random()*400,
            300 + Math.random() *200,
            100
          );
        flash.power = 50 + Math.random() * 500;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    init();







    // AddOn.js




var song = new Howl({
  src: ['lovespell.mp3'],
  autoplay:true,
  loop:true,
  volume:0.5,
});

// Clear listener after first call.
song.once('load', function(){
  song.play();
});

var rainSound = new Howl({
  src: ['rain-01.mp3'],
  autoplay:true,

  loop:true
});

// Clear listener after first call.
rainSound.once('load', function(){
  rainSound.play();
});
colors = [0x062d89,0xfcba03,0xf1bf702,0xde1b48];
idx=0
var myElement = document.getElementById('body');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// listen to events...
mc.on("swiperight", function(ev) {

   changeColor();
});


function changeColor(){
  if(idx==colors.length-1){
    idx=-1;
  }
flash.color.setHex(colors[idx+1]);
ambient.color.setHex(colors[idx+1]);
directionalLight.color.setHex(colors[idx+1]);
idx=idx+1
}


//Slider Color Change

var inputRange = document.getElementsByClassName('range')[0],
    maxValue = 100, // the higher the smoother when dragging
    speed = 5,
    currValue, rafID;

// set min/max value
inputRange.min = 0;
inputRange.max = maxValue;

// listen for unlock
function unlockStartHandler() {
    // clear raf if trying again
    window.cancelAnimationFrame(rafID);
    
    // set to desired value
    currValue = +this.value;
}

function unlockEndHandler() {
    
    // store current value
    currValue = +this.value;
    
    // determine if we have reached success or not
    if(currValue >= maxValue) {
        successHandler();
    }
    else {
        rafID = window.requestAnimationFrame(animateHandler);
    }
}

// handle range animation
function animateHandler() {

    // calculate gradient transition
    var transX = currValue - maxValue;
    
    // update input range
    inputRange.value = currValue;

    //Change slide thumb color on mouse up
    if (currValue < 20) {
        inputRange.classList.remove('ltpurple');
    }
    if (currValue < 40) {
        inputRange.classList.remove('purple');
    }
    if (currValue < 60) {
        inputRange.classList.remove('pink');
    }
    
    // determine if we need to continue
    if(currValue > -1) {
      window.requestAnimationFrame(animateHandler);   
    }
    
    // decrement value
    currValue = currValue - speed;
}

// handle successful unlock
function successHandler() {
  alert('Unlocked');
};

// bind events
// inputRange.addEventListener('mousedown', unlockStartHandler, false);
// inputRange.addEventListener('mousestart', unlockStartHandler, false);
// inputRange.addEventListener('mouseup', unlockEndHandler, false);
// inputRange.addEventListener('touchend', unlockEndHandler, false);

// move gradient
var defaultRainCount = 1500;
var totalDroplets = rain.geometry.vertices;
console.log(totalDroplets)
inputRange.addEventListener('input', function() {
  // console.log(defaultRainCount,this.value)
    //Change slide thumb color on way up    

    if (this.value > 20) {
        inputRange.classList.add('ltpurple');
    }
    if (this.value > 40) {
        inputRange.classList.add('purple');
    }
    if (this.value > 60) {
        console.log(">60", rain.geometry.vertices)
        inputRange.classList.add('pink');
    }

    //Change slide thumb color on way down
    if (this.value < 20) {
        inputRange.classList.remove('ltpurple');
    }
    if (this.value < 40) {
        inputRange.classList.remove('purple');
    }
    if (this.value < 60) {
        inputRange.classList.remove('pink');
    }
});