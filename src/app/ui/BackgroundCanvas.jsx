"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundCanvas() {

  const containerRef = useRef(null);


  useEffect(() => {
  let animationId;
  let isMounted = true;

    /* =========================
       THREE STAR DEPTH
    ========================== */

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.appendChild(renderer.domElement);

    // stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1200;
    const starPos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 300;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.6,
      color: 0xf8c5ff,
      transparent: true,
      opacity: 0.2
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* =========================
       CURSOR PARALLAX
    ========================== */

    let mouseX = 0;
    let mouseY = 0;

    const handleMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 4;
    };

    window.addEventListener("mousemove", handleMouse);

    /* =========================
       CANVAS OVERLAY
    ========================== */

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = "none";

    containerRef.current.appendChild(canvas);

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resize);
    resize();

    /* =========================
       YOUR FRACTAL SYSTEM
    ========================== */

    let lines = [];
    let microFractals = [];
    const maxLines = 70;

    function spawnLine(x, y) {
      lines.push({
        x,
        y,
        angle: Math.random() * Math.PI * 2,
        length: Math.random() * 120 + 60,
        progress: 0,
        speed: 1.4,
        alpha: 1
      });
    }

    function spawnMicroFractal(x, y) {

      const roll = Math.random();
      let scale = 1;

      if (roll > 0.9) scale = 1.8;
      else if (roll > 0.7) scale = 0.6;

      const branches = [];

      for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) {
        branches.push({
          angle: Math.random() * Math.PI * 2,
          length: (12 + Math.random() * 18) * scale,
          progress: 0,
          thickness: 0.8 * scale
        });
      }

      microFractals.push({ x, y, branches, life: 1 });
    }

    spawnLine(window.innerWidth / 2, window.innerHeight / 2);

    function animate() {
       if (!isMounted) return;

  animationId = requestAnimationFrame(animate);


      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line, i) => {

        const dx = Math.cos(line.angle) * line.progress;
        const dy = Math.sin(line.angle) * line.progress;

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + dx, line.y + dy);



        //colors
       ctx.strokeStyle = `rgba(248,197,255,${0.22 * line.alpha})`;
        ctx.stroke();

        line.progress += line.speed;

        if (line.progress > line.length) {

          if (Math.random() > 0.65 && lines.length < maxLines) {
            spawnLine(line.x + dx, line.y + dy);
          }

          if (Math.random() > 0.85) {
            spawnMicroFractal(line.x + dx, line.y + dy);
          }

          line.alpha -= 0.015;

          if (line.alpha <= 0) lines.splice(i, 1);
        }
      });

      microFractals.forEach((f, i) => {

        f.life -= 0.02;

        f.branches.forEach(b => {
          b.progress += 1.2;
          const dx = Math.cos(b.angle) * b.progress;
          const dy = Math.sin(b.angle) * b.progress;

          ctx.beginPath();
          ctx.moveTo(f.x, f.y);
          ctx.lineTo(f.x + dx, f.y + dy);



          //colors
         ctx.strokeStyle = `rgba(248,197,255,${0.3 * f.life})`;
          ctx.lineWidth = b.thickness;
          ctx.stroke();
        });

        if (f.life <= 0) microFractals.splice(i, 1);
      });

      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;

      stars.rotation.y += 0.00025;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };

  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1
      }}
    />
  );
}