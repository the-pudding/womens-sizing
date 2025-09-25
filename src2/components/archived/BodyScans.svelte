<!-- <script>
    import * as THREE from "three";
    import { onMount } from "svelte";
    import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
  
    let container;
    let scene, camera, renderer;
  
    onMount(() => {
      console.log("🚀 Scene initializing...");
  
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 1, 3);
  
      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
  
      const loader = new OBJLoader();
      
      console.log("📂 Loading OBJ model...");
      loader.load("/models/base_mesh.obj", (obj) => {
        console.log("✅ OBJ Model Loaded!", obj);
        
        obj.scale.set(1, 1, 1); // Scale it normally
        obj.position.set(0, 0, 0); // Center it
        
        // 🔹 Apply Default Material if Missing
        obj.traverse((child) => {
          if (child.isMesh) {
            console.log("🟢 Found Mesh:", child.name);
            if (!child.material) {
              console.log("🔵 Applying Default Material...");
              child.material = new THREE.MeshBasicMaterial({ color: "blue", wireframe: true });
            }
          }
        });
  
        scene.add(obj);
        animate();
      }, 
      (xhr) => console.log(`🔄 Loading: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`), 
      (error) => console.error("❌ Error loading OBJ:", error));
  
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
    });
  </script>
  
  <div bind:this={container} style="width: 100vw; height: 100vh;"></div>
   -->