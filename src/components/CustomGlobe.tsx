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
        const geometry = new THREE.SphereGeometry(100, 64, 64);
        const textureLoader = new THREE.TextureLoader();
        // Using a more reliable and clearer texture URL
        const texture = textureLoader.load(
            "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg",
            () => console.log("🌍 Texture Loaded Successfully"),
            undefined,
            (err) => console.error("❌ Texture Load Error:", err)
        );

        const material = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            opacity: 1.0,
            shininess: 15, // Reduced for a more natural look
            color: 0xffffff, // White base color to show texture correctly
            specular: 0x333333,
        });

        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // --- ENHANCED LIGHTING ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 4);
        pointLight1.position.set(200, 100, 400);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xB9A3D3, 2);
        pointLight2.position.set(-200, -100, -100);
        scene.add(pointLight2);

        // --- CONTROLS ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 4.0;
        controls.minPolarAngle = Math.PI / 2;
        controls.maxPolarAngle = Math.PI / 2;

        // --- LABELS ---
        const labelContainer = document.createElement("div");
        labelContainer.style.position = "absolute";
        labelContainer.style.top = "0";
        labelContainer.style.left = "0";
        labelContainer.style.width = "100%";
        labelContainer.style.height = "100%";
        labelContainer.style.pointerEvents = "none";
        container.appendChild(labelContainer);

        const htmlLabels = SERVICE_DATA.map(data => {
            const el = document.createElement("div");
            const iconMarkup = renderToStaticMarkup(data.icon);
            el.innerHTML = `
                <div class="globe-label" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;pointer-events:auto;transition:all 0.3s ease;">
                    <div style="background:rgba(91,42,134,0.4);border:1px solid rgba(185,163,211,0.6);border-radius:12px;padding:8px;margin-bottom:6px;backdrop-filter:blur(8px);box-shadow:0 4px 15px rgba(0,0,0,0.3);">
                        <div style="color:#B9A3D3;">${iconMarkup}</div>
                    </div>
                    <span style="color:#F2F2F2;font-size:11px;font-weight:700;text-align:center;white-space:pre-line;text-shadow:0 2px 10px rgba(0,0,0,0.9);letter-spacing:0.05em;">${data.text}</span>
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

                if (dot > 0.1) {
                    el.style.display = "block";
                    const projected = pos.clone().project(camera);
                    const x = (projected.x * 0.5 + 0.5) * currentWidth;
                    const y = (projected.y * -0.5 + 0.5) * currentHeight;
                    el.style.left = `${x}px`;
                    el.style.top = `${y}px`;
                    el.style.opacity = `${Math.min(1, dot * 3)}`;
                    el.style.scale = `${0.8 + (dot * 0.4)}`;
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
