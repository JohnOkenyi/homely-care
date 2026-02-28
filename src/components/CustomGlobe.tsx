"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Home, UserCheck, ShieldCheck, Activity } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

const SERVICE_DATA = [
    { id: 1, text: "Home Care", lat: 25, lng: 10, icon: <Home size={18} /> },
    { id: 2, text: "Live-in Care", lat: 10, lng: 40, icon: <UserCheck size={18} /> },
    { id: 3, text: "Supported\nLiving", lat: 45, lng: -20, icon: <ShieldCheck size={18} /> },
    { id: 4, text: "Complex Care", lat: -10, lng: 20, icon: <Activity size={18} /> },
];

export default function CustomGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const container = containerRef.current;
        if (!container) return;

        console.log("🚀 GLOBE INITIALIZING - V3.2");

        const scene = new THREE.Scene();

        // Use container dimensions or fallback
        const width = container.clientWidth || 800;
        const height = container.clientHeight || 800;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 250;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        let frameId: number;

        // --- THE GLOBE ---
        const geometry = new THREE.SphereGeometry(100, 128, 128);
        const textureLoader = new THREE.TextureLoader();

        // High-quality textures from three-globe repository
        const texture = textureLoader.load("https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg");
        const normalMap = textureLoader.load("https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-topology.png");

        const material = new THREE.MeshPhysicalMaterial({
            map: texture,
            normalMap: normalMap,
            normalScale: new THREE.Vector2(0.85, 0.85),
            transparent: false,
            opacity: 1.0,
            metalness: 0.15,
            roughness: 0.52,
            clearcoat: 0.25,
            clearcoatRoughness: 0.65,
            reflectivity: 0.5,
        });

        const globe = new THREE.Mesh(geometry, material);
        // Initially rotate to show Europe/Africa
        globe.rotation.y = Math.PI * 0.9;
        scene.add(globe);

        // --- PREMIUM LIGHTING ---
        // 1. Key Light (Warm White)
        const keyLight = new THREE.DirectionalLight(0xfff5e6, 3.0);
        keyLight.position.set(300, 200, 500);
        scene.add(keyLight);

        // 2. Fill Light (Soft Purple)
        const fillLight = new THREE.PointLight(0x5B2A86, 1.5);
        fillLight.position.set(-300, -100, 200);
        scene.add(fillLight);

        // 3. Rim Light (Golden)
        const rimLight = new THREE.SpotLight(0xD6B36A, 8.0);
        rimLight.position.set(-200, 300, -300);
        rimLight.angle = 0.5;
        scene.add(rimLight);

        // 4. Subtle Ambient
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        // --- CONTROLS ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5; // Slower, more luxury rotation
        controls.minPolarAngle = Math.PI / 2.2;
        controls.maxPolarAngle = Math.PI / 1.8;

        // --- LABELS ---
        const labelContainer = document.createElement("div");
        labelContainer.className = "absolute top-0 left-0 w-full h-full pointer-events-none";
        container.appendChild(labelContainer);

        const htmlLabels = SERVICE_DATA.map(data => {
            const el = document.createElement("div");
            const iconMarkup = renderToStaticMarkup(data.icon);
            el.innerHTML = `
                <div class="globe-label group flex flex-col items-center cursor-pointer pointer-events-auto transition-all duration-300">
                    <div class="bg-purple-900/40 border border-[#B9A3D3]/60 rounded-xl p-2 mb-1.5 backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform">
                        <div class="text-[#B9A3D3]">${iconMarkup}</div>
                    </div>
                    <span class="text-white text-[11px] font-bold text-center leading-tight drop-shadow-lg tracking-wider">${data.text}</span>
                </div>
            `;
            el.style.position = "absolute";
            el.style.transform = "translate(-50%, -50%)";
            labelContainer.appendChild(el);
            return { el, data };
        });

        const updateLabels = () => {
            const currentWidth = container.clientWidth || 800;
            const currentHeight = container.clientHeight || 800;
            const radius = 100;

            htmlLabels.forEach(({ el, data }) => {
                const phi = (90 - data.lat) * (Math.PI / 180);
                const theta = (data.lng + 180) * (Math.PI / 180);

                const pos = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
                pos.applyQuaternion(globe.quaternion);

                const normal = pos.clone().normalize();
                const camDir = camera.position.clone().sub(pos).normalize();
                const dot = normal.dot(camDir);

                if (dot > 0.15) {
                    el.style.display = "block";
                    const projected = pos.clone().project(camera);
                    const x = (projected.x * 0.5 + 0.5) * currentWidth;
                    const y = (projected.y * -0.5 + 0.5) * currentHeight;
                    el.style.left = `${x}px`;
                    el.style.top = `${y}px`;
                    el.style.opacity = `${Math.min(1, dot * 4)}`;
                    el.style.scale = `${0.75 + (dot * 0.5)}`;
                } else {
                    el.style.display = "none";
                }
            });
        };

        const handleResize = () => {
            const newW = container.clientWidth;
            const newH = container.clientHeight;
            renderer.setSize(newW, newH);
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            globe.rotation.y += 0.005;
            controls.update();
            updateLabels();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (frameId) cancelAnimationFrame(frameId);
            if (labelContainer && container.contains(labelContainer)) container.removeChild(labelContainer);
            if (renderer.domElement && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
            renderer.dispose();
            scene.clear();
        };
    }, [isMounted]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-visible">
            <div
                ref={containerRef}
                className="w-full h-full min-h-[500px] flex items-center justify-center overflow-visible"
                style={{ cursor: 'grab' }}
            />

            {/* Rotation Hint */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none select-none">
                <div className="flex items-center gap-4 text-[#B9A3D3]">
                    <span className="text-[9px] tracking-[0.4em] uppercase font-bold">Slide to rotate</span>
                </div>
                <div className="flex items-center gap-6">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B9A3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="m15 18-6-6 6-6" /></svg>
                    <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#B9A3D3] to-transparent" />
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B9A3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </div>
        </div>
    );
}
