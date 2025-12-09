"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ===== RENDERER =====
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // ===== SCENE + CAMERA =====
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    camera.position.set(0, 0, 8);

    // ===== PARTICLES =====
    const COUNT = 3000; // keep it light + aesthetic
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      positions[i3 + 0] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = -1 + Math.random() * 0.6; // keep them LOW only
      positions[i3 + 2] = (Math.random() - 0.5) * 14;

      // random initial movement
      velocities[i3 + 0] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i3 + 2] = 0.02 + Math.random() * 0.02; // forward drift
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ===== ANIMATE =====
    function animate() {
      const pos = geometry.attributes.position.array;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;

        // Forward drift (like fish swimming)
        pos[i3 + 2] += velocities[i3 + 2];

        // Soft horizontal + vertical swarm behavior
        pos[i3 + 0] += Math.sin(pos[i3 + 2] * 0.25) * 0.008;
        pos[i3 + 1] += Math.cos(pos[i3 + 2] * 0.2) * 0.006;

        // keep them in the lower area ONLY
        if (pos[i3 + 1] > -0.4) pos[i3 + 1] = -1.1;
        if (pos[i3 + 1] < -1.6) pos[i3 + 1] = -1.1;

        // Reset when too close to camera
        if (pos[i3 + 2] > 7) {
          pos[i3 + 2] = -12;
          pos[i3 + 0] = (Math.random() - 0.5) * 12;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // ===== RESIZE =====
    const handleResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      {/* BACKGROUND */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* FOREGROUND */}
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="text-4xl tracking-widest font-bold">Something cool is OTW</h1>
      </div>
    </main>
  );
}
