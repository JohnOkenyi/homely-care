"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function CustomGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!containerRef.current) return;

        console.log("🔥 ATTEMPTING NATIVE THREE.JS INITIALIZATION");

        let renderer: THREE.WebGLRenderer;
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let globe: THREE.Mesh;
        let frameId: number;

        const init = () => {
            try {
                const width = containerRef.current?.clientWidth || 800;
                const height = containerRef.current?.clientHeight || 800;

                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
                camera.position.z = 250;

                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setSize(width, height);
                renderer.setPixelRatio(window.devicePixelRatio);
                containerRef.current?.appendChild(renderer.domElement);

                // --- THE GLOBE ---
                const geometry = new THREE.SphereGeometry(100, 64, 64);
                const textureLoader = new THREE.TextureLoader();

                // Use a relative path to ensure Vercel can find it if hosted locally, 
                // or stay with the unpkg one for reliability
                const texture = textureLoader.load("//unpkg.com/three-globe/example/img/earth-night.jpg", () => {
                    console.log("✅ TEXTURE LOADED");
                });

                const material = new THREE.MeshPhongMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 0.9,
                });

                globe = new THREE.Mesh(geometry, material);
                scene.add(globe);

                // --- LIGHTING ---
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
                scene.add(ambientLight);

                const pointLight = new THREE.PointLight(0xffffff, 1);
                pointLight.position.set(200, 200, 200);
                scene.add(pointLight);

                // --- ANIMATION LOOP ---
                const animate = () => {
                    frameId = requestAnimationFrame(animate);

                    // NATIVE ROTATION - No OrbitControls dependency needed for simple rotation
                    if (globe) {
                        globe.rotation.y += 0.005; // Standard 2.0-like speed
                    }

                    renderer.render(scene, camera);
                };

                animate();
                console.log("🚀 NATIVE ANIMATION LOOP STARTED");

            } catch (error) {
                console.error("❌ THREE.JS INIT ERROR:", error);
            }
        };

        init();

        // Heartbeat to confirm component is alive
        const hb = setInterval(() => {
            console.log("💓 NATIVE GLOBE HEARTBEAT", {
                renderer: !!renderer,
                scene: !!scene,
                globe: !!globe,
                rotation: globe?.rotation?.y
            });
        }, 2000);

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            clearInterval(hb);
            if (renderer && containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
                renderer.dispose();
            }
            scene?.clear();
        };
    }, []);

    if (!isMounted) return null;

    return (
        <div
            ref={containerRef}
            className="w-full h-full min-h-[600px] flex items-center justify-center overflow-visible"
        />
    );
}
