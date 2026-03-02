"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Home, UserCheck, ShieldCheck, Activity, Brain, HeartPulse, Clock, Stethoscope, Waves, HandHeart } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

const SERVICE_DATA = [
    { id: 1, text: "Home Care", lat: 25, lng: 10, icon: <Home size={18} /> },
    { id: 2, text: "Live-in Care", lat: 10, lng: 40, icon: <UserCheck size={18} /> },
    { id: 3, text: "Supported\nLiving", lat: 45, lng: -70, icon: <ShieldCheck size={18} /> },
    { id: 4, text: "Complex Care", lat: -10, lng: 20, icon: <Activity size={18} /> },
    { id: 5, text: "Dementia Care", lat: 35, lng: 140, icon: <Brain size={18} /> },
    { id: 6, text: "Palliative Care", lat: -30, lng: -40, icon: <HeartPulse size={18} /> },
    { id: 7, text: "Respite Care", lat: 15, lng: -140, icon: <Clock size={18} /> },
    { id: 8, text: "Nursing Care", lat: -45, lng: 100, icon: <Stethoscope size={18} /> },
    { id: 9, text: "End of Life", lat: 55, lng: 60, icon: <Waves size={18} /> },
    { id: 10, text: "Personal Care", lat: -20, lng: -110, icon: <HandHeart size={18} /> },
];

export default function CustomGlobe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [showHint, setShowHint] = useState(true);

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
        const width = container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 800);
        const height = container.clientHeight || 500;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = width < 768 ? 330 : 250; // Restored desktop (250) and slightly larger mobile (330)

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        // ACES Tone Mapping for realistic light blending - Luxury Exposure
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.95; // Slightly deeper for more cinematic weight

        container.appendChild(renderer.domElement);

        let frameId: number;

        // --- THE GLOBE ---
        const geometry = new THREE.SphereGeometry(108, 64, 64); // Scaled for snug fit
        const textureLoader = new THREE.TextureLoader();

        // High-quality textures
        const texture = textureLoader.load("https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg");
        const normalMap = textureLoader.load("https://raw.githubusercontent.com/vasturiano/earth-topology/master/topology.png");

        const material = new THREE.MeshPhysicalMaterial({
            map: texture,
            normalMap: normalMap,
            normalScale: new THREE.Vector2(0.4, 0.4), // Very soft topology
            transparent: false,
            opacity: 1.0,
            metalness: 0.0,
            roughness: 0.95, // Matte finish to match hand photography
            clearcoat: 0.0,
            reflectivity: 0.0,
        });

        const globe = new THREE.Mesh(geometry, material);
        // Africa/Europe initial view
        globe.rotation.y = Math.PI * 0.9;
        // PERSPECTIVE SQUASH: Match camera angle of hands photo
        globe.scale.set(1.0, 0.97, 1.0);
        scene.add(globe);

        // --- Interaction Restriction Logic ---
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onPointerDown = (event: PointerEvent) => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(globe);

            if (intersects.length > 0) {
                controls.enabled = true;
                controls.autoRotate = false; // Stop rotation during touch
                setShowHint(false); // Hide hint on interaction
            } else {
                controls.enabled = false;
            }
        };

        const onPointerUp = () => {
            controls.enabled = false; // Disable controls so page can scroll
            controls.autoRotate = true; // Resume auto-rotation
        };

        const onPointerLeave = () => {
            controls.enabled = false;
            controls.autoRotate = true;
        };

        // Attach to domElement for precise targeting
        renderer.domElement.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);
        renderer.domElement.addEventListener('pointerleave', onPointerLeave);

        // --- Lighting: Matching Hands Image (Warm, Top-Center Soft Light) ---
        const sunLight = new THREE.DirectionalLight(0xfff4e6, 1.2); // Warm Sunlight Tint
        sunLight.position.set(0, 500, 150); // From top-forward for natural shadowing
        scene.add(sunLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        // --- CONTROLS ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.08; // More premium weight
        controls.rotateSpeed = 0.8; // Controlled smoothness
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;
        controls.minPolarAngle = Math.PI / 2.2;
        controls.maxPolarAngle = Math.PI / 1.8;

        // FORCE LOCK DISTANCE TO PREVENT ZOOMING
        const dist = camera.position.z;
        controls.minDistance = dist;
        controls.maxDistance = dist;

        renderer.domElement.style.touchAction = 'pan-y';
        container.style.touchAction = 'pan-y'; // Force on container too

        // --- LABELS ---
        const labelContainer = document.createElement("div");
        labelContainer.className = "absolute top-0 left-0 w-full h-full pointer-events-none";
        container.appendChild(labelContainer);

        const htmlLabels = SERVICE_DATA.map(data => {
            const el = document.createElement("div");
            const iconMarkup = renderToStaticMarkup(data.icon);
            el.innerHTML = `
                <div class="globe-label group flex flex-col items-center cursor-pointer pointer-events-none lg:pointer-events-auto transition-all duration-300">
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
            if (!container) return;
            const newW = container.clientWidth;
            const newH = container.clientHeight;
            if (newW === 0 || newH === 0) return;

            renderer.setSize(newW, newH);
            camera.aspect = newW / newH;
            camera.position.z = newW < 768 ? 330 : 250;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        // Initial resize check after mount
        const resizeTimeout = setTimeout(handleResize, 100);

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            globe.rotation.y += 0.005;
            controls.update();
            updateLabels();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointerup', onPointerUp);
            renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
            if (frameId) cancelAnimationFrame(frameId);
            if (labelContainer && container.contains(labelContainer)) container.removeChild(labelContainer);
            if (renderer.domElement && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
            renderer.dispose();
            scene.clear();
        };
    }, [isMounted, setShowHint]);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-visible">
            <div
                ref={containerRef}
                className="w-full h-full relative overflow-visible"
                style={{ minHeight: '300px', cursor: 'grab' }} // Minimal safety height
            />

            {/* CREATIVE INTERACTION HINT */}
            {showHint && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-30">
                    <div className="flex flex-col items-center gap-4 animate-pulse-slow">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl">
                            <div className="w-5 h-5 flex items-center justify-center text-[#D6B36A]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce-horizontal">
                                    <path d="M18 8L22 12L18 16" />
                                    <path d="M2 12H22" />
                                </svg>
                            </div>
                            <span className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium pt-0.5">Drag to Explore</span>
                            <div className="w-5 h-5 flex items-center justify-center text-[#D6B36A] rotate-180">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce-horizontal">
                                    <path d="M18 8L22 12L18 16" />
                                    <path d="M2 12H22" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes bounceHorizontal {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(4px); }
                }
                .animate-bounce-horizontal {
                    animation: bounceHorizontal 2s infinite ease-in-out;
                }
                @keyframes pulseSlow {
                    0%, 100% { opacity: 0.6; scale: 1; }
                    50% { opacity: 1; scale: 1.05; }
                }
                .animate-pulse-slow {
                    animation: pulseSlow 3s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
}
