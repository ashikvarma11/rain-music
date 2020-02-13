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
      dropImage = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");
      rainMaterial = new THREE.PointsMaterial({
        color: 0x4b8094,
        size: 0.2,
        transparent: true
      });
      
      rain = new THREE.Points(rainGeo,rainMaterial);
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