"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Home, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

export default function CustomGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!containerRef.current) return;

        // --- THREE.JS SETUP ---
        const width = containerRef.current.clientWidth || 800;
        const height = containerRef.current.clientHeight || 800;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 250;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // --- GLOBE ---
        const geometry = new THREE.SphereGeometry(100, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({
            map: textureLoader.load("//unpkg.com/three-globe/example/img/earth-night.jpg"),
            transparent: true,
            opacity: 0.9,
        });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // --- LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(200, 200, 200);
        scene.add(pointLight);

        // --- CONTROLS ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.0;

        // --- ANIMATION LOOP ---
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        console.log("🚀 NATIVE THREE.JS GLOBE STARTED");

        // --- CLEANUP ---
        return () => {
            cancelAnimationFrame(frameId);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
        };
    }, []);

    if (!isMounted) return null;

    return (
        <div
            ref={containerRef}
            className="w-full h-full min-h-[600px] flex items-center justify-center overflow-visible"
            style={{ cursor: 'grab' }}
        />
    );
}
