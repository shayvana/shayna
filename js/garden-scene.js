let scene, camera, renderer, flowers = [], clouds = [];
let isRaining = false;

function initScene() {
    const container = document.getElementById('garden-scene');
    const aspect = container.clientWidth / container.clientHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.set(0, 1, 4);
    camera.lookAt(0, 0, 0);

    createGround();
    createFlowers(50);
    createClouds(3);
    createSunOrRain();

    animate();
}

function createGround() {
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x7cfc00, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);
}

function createFlower() {
    const flowerGroup = new THREE.Group();

    // Stem
    const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x00FF00 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 0.25;
    flowerGroup.add(stem);

    // Petals
    const petalGeometry = new THREE.ConeGeometry(0.1, 0.2, 32);
    const petalMaterial = new THREE.MeshLambertMaterial({ color: 0xFFC0CB }); // Pink color
    for (let i = 0; i < 6; i++) {
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        petal.position.y = 0.5;
        petal.rotation.z = (Math.PI / 3) * i;
        petal.rotation.x = Math.PI / 4;
        flowerGroup.add(petal);
    }

    // Center
    const centerGeometry = new THREE.SphereGeometry(0.05, 32, 32);
    const centerMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });
    const center = new THREE.Mesh(centerGeometry, centerMaterial);
    center.position.y = 0.55;
    flowerGroup.add(center);

    flowerGroup.position.x = Math.random() * 7 - 3.5;
    flowerGroup.position.z = Math.random() * 3 - 1.5;
    flowerGroup.position.y = -0.55;
    flowerGroup.rotation.y = Math.random() * Math.PI * 2;

    scene.add(flowerGroup);
    flowers.push(flowerGroup);
}

function createFlowers(count) {
    for (let i = 0; i < count; i++) {
        createFlower();
    }
}

function createCloud() {
    const geometry = new THREE.SphereGeometry(0.2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cloud = new THREE.Group();
    for (let i = 0; i < 5; i++) {
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = Math.random() * 0.4 - 0.2;
        sphere.position.y = Math.random() * 0.2;
        cloud.add(sphere);
    }
    cloud.position.x = Math.random() * 8 - 4;
    cloud.position.y = 2;
    cloud.position.z = -2;
    scene.add(cloud);
    clouds.push(cloud);
}

function createClouds(count) {
    for (let i = 0; i < count; i++) {
        createCloud();
    }
}

function createSunOrRain() {
    if (isRaining) {
        createRain();
    } else {
        createSun();
    }
}

function createSun() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(geometry, material);
    sun.position.set(2, 2, -3);
    scene.add(sun);
}

function createRain() {
    const rainCount = 500;
    const rainGeometry = new THREE.BufferGeometry();
    const rainPositions = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount * 3; i += 3) {
        rainPositions[i] = Math.random() * 10 - 5;
        rainPositions[i + 1] = Math.random() * 5;
        rainPositions[i + 2] = Math.random() * 10 - 5;
    }

    rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rainMaterial = new THREE.PointsMaterial({ color: 0x9999ff, size: 0.1, transparent: true });
    const rain = new THREE.Points(rainGeometry, rainMaterial);
    scene.add(rain);
}

function animate() {
    requestAnimationFrame(animate);

    flowers.forEach(flower => {
        flower.rotation.y += 0.01;
    });

    clouds.forEach(cloud => {
        cloud.position.x += 0.01;
        if (cloud.position.x > 5) cloud.position.x = -5;
    });

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    const container = document.getElementById('garden-scene');
    const aspect = container.clientWidth / container.clientHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Initialize the scene
initScene();