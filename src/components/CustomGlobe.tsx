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
        const container = containerRef.current;
        if (!container) return;

        console.log("🚀 GLOBAL ACTIVATION - V3.0");

        const scene = new THREE.Scene();
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
        const geometry = new THREE.SphereGeometry(100, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("//unpkg.com/three-globe/example/img/earth-night.jpg");

        const material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0, // Increased opacity for brightness
            shininess: 50,
        });

        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // --- ENHANCED LIGHTING FOR BRIGHTNESS ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.5); // Signficantly increased intensity
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 4); // Extra powerful front light
        pointLight1.position.set(200, 100, 400);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xB9A3D3, 1); // Subtle purple rim light
        pointLight2.position.set(-200, -100, -100);
        scene.add(pointLight2);

        // --- CONTROLS: HORIZONTAL ONLY ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 4.0; // Faster rotation

        // Restrict to horizontal rotation
        controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;

        // --- LABEL ORCHESTRATION ---
        const labelContainer = document.createElement("div");
        labelContainer.style.position = "absolute";
        labelContainer.style.top = "0";
        labelContainer.style.left = "0";
        labelContainer.style.pointerEvents = "none";
        container.appendChild(labelContainer);

        const htmlLabels = SERVICE_DATA.map(data => {
            const el = document.createElement("div");
            const iconMarkup = renderToStaticMarkup(data.icon);
            el.innerHTML = `
                <div class="globe-label" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;pointer-events:auto;transition:transform 0.3s ease;">
                    <div style="background:rgba(185,163,211,0.2);border:1px solid rgba(185,163,211,0.6);border-radius:8px;padding:6px;margin-bottom:4px;backdrop-filter:blur(4px);">
                        <div style="color:#B9A3D3;">${iconMarkup}</div>
                    </div>
                    <span style="color:#F2F2F2;font-size:10px;font-weight:600;text-align:center;white-space:pre-line;text-shadow:0 0 8px rgba(0,0,0,0.8);">${data.text}</span>
                </div>
            `;
            el.style.position = "absolute";
            el.style.transform = "translate(-50%, -50%)";
            labelContainer.appendChild(el);
            return { el, data };
        });

        const updateLabels = () => {
            const radius = 100;
            htmlLabels.forEach(({ el, data }) => {
                const phi = (90 - data.lat) * (Math.PI / 180);
                const theta = (data.lng + 180) * (Math.PI / 180);

                const pos = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
                pos.applyQuaternion(globe.quaternion);

                // Visibility check (is it facing the camera?)
                const normal = pos.clone().normalize();
                const camDir = camera.position.clone().sub(pos).normalize();
                const dot = normal.dot(camDir);

                if (dot > 0.2) {
                    el.style.display = "block";
                    pos.project(camera);
                    const x = (pos.x * 0.5 + 0.5) * width;
                    const y = (pos.y * -0.5 + 0.5) * height;
                    el.style.left = `${x}px`;
                    el.style.top = `${y}px`;
                    el.style.opacity = `${Math.min(1, dot * 2)}`;
                } else {
                    el.style.display = "none";
                }
            });
        };

        // --- ANIMATION LOOP ---
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            // Force manual rotation as a backup to autoRotate
            if (globe) {
                globe.rotation.y += 0.005;
            }

            controls.update();
            updateLabels();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            if (labelContainer) container.removeChild(labelContainer);
            if (renderer && container) {
                container.removeChild(renderer.domElement);
                renderer.dispose();
            }
            scene?.clear();
        };
    }, []);

    if (!isMounted) return null;

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-visible">
            <div
                ref={containerRef}
                className="w-full h-full min-h-[600px] flex items-center justify-center overflow-visible"
                style={{ cursor: 'grab' }}
            />

            {/* Rotation Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 pointer-events-none select-none">
                <div className="flex items-center gap-4 text-[#B9A3D3]">
                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Slide to rotate</span>
                </div>
                <div className="flex items-center gap-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B9A3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="m15 18-6-6 6-6" /></svg>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#B9A3D3] to-transparent" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B9A3D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="m9 18 6-6-6-6" /></svg>
                </div>
            </div>
        </div>
    );
}
