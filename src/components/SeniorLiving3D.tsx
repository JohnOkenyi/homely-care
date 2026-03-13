"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import gsap from "gsap";

interface SeniorLiving3DProps {
    scale?: number;
}

interface ServiceData {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    position: [number, number, number]; // Position on the base
    focusTarget: [number, number, number]; // Look at point
    focusCamera: [number, number, number]; // Camera point
}

const SERVICES: ServiceData[] = [
    {
        id: "home-care",
        title: "Home Care",
        description: "Personalised care in your sanctuary.",
        icon: "🏠",
        color: "#D6B36A",
        position: [8, 0.05, 0],
        focusTarget: [1, 2, 3.5],
        focusCamera: [22, 10, 30]
    },
    {
        id: "live-in",
        title: "Live-in Care",
        description: "24/7 companionship and support.",
        icon: "💜",
        color: "#5B2A86",
        position: [-8, 0.05, 0],
        focusTarget: [-4, 2, 0],
        focusCamera: [-30, 12, 18]
    },
    {
        id: "supported",
        title: "Supported Living",
        description: "Empowering independence every day.",
        icon: "🤝",
        color: "#7A4FB3",
        position: [0, 0.05, 8],
        focusTarget: [0, 1.5, 0],
        focusCamera: [0, 15, 35]
    },
    {
        id: "complex",
        title: "Complex Care",
        description: "Nurse-led clinical excellence.",
        icon: "🏥",
        color: "#F99D31",
        position: [0, 0.05, -8],
        focusTarget: [0, 3, 0],
        focusCamera: [28, 18, -28]
    }
];

export default function SeniorLiving3D({ scale = 1.3 }: SeniorLiving3DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        let cleanup = () => { };

        // Interaction state
        let isTransitioning = false;
        let activeService: ServiceData | null = null;
        let isUserInteracting = false;
        let startX = 0;
        let startY = 0;

        const timeoutId = setTimeout(() => {
            if (!containerRef.current) return;
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });

            const initialWidth = container.clientWidth || 800;
            const initialHeight = container.clientHeight || 500;

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(initialWidth, initialHeight, false);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.0;

            container.appendChild(renderer.domElement);

            const scene = new THREE.Scene();

            // --- CAMERA ---
            const isMobile = window.innerWidth < 768;
            const fov = isMobile ? 55 : 25;
            const camera = new THREE.PerspectiveCamera(fov, initialWidth / initialHeight, 0.1, 200);
            camera.position.set(40, 20, 40);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(6, 1.0, 0); // Shifted target right to move house left in frame
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 10;
            controls.maxDistance = 60;
            controls.maxPolarAngle = Math.PI / 2 - 0.1;
            controls.minPolarAngle = Math.PI / 6;

            if (isMobile) {
                controls.enableZoom = false;
            }

            // --- LIGHTING ---
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const sunLight = new THREE.DirectionalLight(0xfffae6, 1.0);
            sunLight.position.set(15, 20, 15);
            sunLight.castShadow = true;
            sunLight.shadow.mapSize.set(2048, 2048);
            sunLight.shadow.camera.left = -20;
            sunLight.shadow.camera.right = 20;
            sunLight.shadow.camera.top = 20;
            sunLight.shadow.camera.bottom = -20;
            scene.add(sunLight);

            // Refined materials
            const matHouseBody = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 1.0 });
            const matRoof = new THREE.MeshPhysicalMaterial({ color: 0xF99D31, roughness: 0.8 });
            const matBaseTrim = new THREE.MeshPhysicalMaterial({ color: 0xF99D31, roughness: 0.8 });
            const matSatinBase = new THREE.MeshPhysicalMaterial({ 
                color: 0x1a1a1a, 
                roughness: 0.1, 
                metalness: 0.8,
                clearcoat: 1.0
            });

            const diorama = new THREE.Group();
            scene.add(diorama);

            // 1. SATIN BASE
            const baseCircle = new THREE.Mesh(
                new THREE.CylinderGeometry(15, 15.2, 0.4, 64),
                matSatinBase
            );
            baseCircle.receiveShadow = true;
            diorama.add(baseCircle);

            const rimGlow = new THREE.Mesh(
                new THREE.TorusGeometry(15, 0.05, 16, 100),
                new THREE.MeshBasicMaterial({ color: 0xD6B36A, transparent: true, opacity: 0.3 })
            );
            rimGlow.rotation.x = Math.PI / 2;
            rimGlow.position.y = 0.21;
            diorama.add(rimGlow);

            // 2. HOUSE GROUP
            const houseGroup = new THREE.Group();
            houseGroup.scale.set(scale, scale, scale);
            houseGroup.position.y = 0.2; // Sit on base
            diorama.add(houseGroup);

            const houseW = 8.0;
            const houseH = 4.8;
            const houseD = 7.0;
            const wallThick = 0.15;

            const getRoundedBox = (w: number, h: number, d: number, r: number = 0.05) => {
                return new RoundedBoxGeometry(w, h, d, 4, r);
            };

            const baseTrimMesh = new THREE.Mesh(getRoundedBox(houseW + 0.4, 0.3, houseD + 0.4, 0.05), matBaseTrim);
            baseTrimMesh.position.set(0, 0.15, 0);
            baseTrimMesh.castShadow = true;
            baseTrimMesh.receiveShadow = true;
            houseGroup.add(baseTrimMesh);

            const wallFrontShape = new THREE.Shape();
            wallFrontShape.moveTo(-houseW / 2, 0);
            wallFrontShape.lineTo(houseW / 2, 0);
            wallFrontShape.lineTo(houseW / 2, houseH);
            wallFrontShape.lineTo(0, houseH + 2.5);
            wallFrontShape.lineTo(-houseW / 2, houseH);
            wallFrontShape.lineTo(-houseW / 2, 0);

            const wallFront = new THREE.Mesh(new THREE.ExtrudeGeometry(wallFrontShape, { depth: wallThick, bevelEnabled: false }), matHouseBody);
            wallFront.position.set(0, 0.3, houseD / 2 - wallThick);
            wallFront.castShadow = true;
            wallFront.receiveShadow = true;
            houseGroup.add(wallFront);

            const wallBack = new THREE.Mesh(new THREE.ExtrudeGeometry(wallFrontShape, { depth: wallThick, bevelEnabled: false }), matHouseBody);
            wallBack.position.set(0, 0.3, -houseD / 2);
            wallBack.castShadow = true;
            wallBack.receiveShadow = true;
            houseGroup.add(wallBack);

            const wallRight = new THREE.Mesh(new THREE.BoxGeometry(wallThick, houseH, houseD), matHouseBody);
            wallRight.position.set(houseW / 2, 0.3 + houseH / 2, 0);
            wallRight.castShadow = true;
            wallRight.receiveShadow = true;
            houseGroup.add(wallRight);

            const wallL_Top = new THREE.Mesh(new THREE.BoxGeometry(wallThick, 0.2, houseD), matHouseBody);
            wallL_Top.position.set(-houseW / 2, 0.3 + houseH - 0.1, 0);
            houseGroup.add(wallL_Top);

            const wallL_Side1 = new THREE.Mesh(new THREE.BoxGeometry(wallThick, houseH - 0.2, 0.8), matHouseBody);
            wallL_Side1.position.set(-houseW / 2, 0.3 + (houseH-0.2)/2, houseD/2 - 0.4);
            houseGroup.add(wallL_Side1);

            const wallL_Side2 = new THREE.Mesh(new THREE.BoxGeometry(wallThick, houseH - 0.2, 0.8), matHouseBody);
            wallL_Side2.position.set(-houseW / 2, 0.3 + (houseH-0.2)/2, -houseD/2 + 0.4);
            houseGroup.add(wallL_Side2);

            const peakY = 0.3 + houseH + 2.5;
            const slopeAngle = Math.atan(2.5 / 4);
            const slopeLen = Math.sqrt(4 * 4 + 2.5 * 2.5) + 0.6;
            const roofWidth = houseD + 1.2;

            const roofR = new THREE.Mesh(new THREE.BoxGeometry(slopeLen, 0.15, roofWidth), matRoof);
            roofR.position.set(slopeLen/2 - 0.2, peakY, 0);
            roofR.rotation.z = -slopeAngle;
            roofR.castShadow = true;
            houseGroup.add(roofR);

            const roofL = new THREE.Mesh(new THREE.BoxGeometry(slopeLen, 0.15, roofWidth), matRoof);
            roofL.position.set(-slopeLen/2 + 0.2, peakY, 0);
            roofL.rotation.z = slopeAngle;
            roofL.castShadow = true;
            houseGroup.add(roofL);

            const interior = new THREE.Group();
            interior.position.set(-1.5, 0.31, 0);
            houseGroup.add(interior);

            const textureLoader = new THREE.TextureLoader();
            const charTex = textureLoader.load('/images/char-helping.png');
            const charMat = new THREE.MeshPhysicalMaterial({ map: charTex, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
            const charPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.5), charMat);
            charPlane.rotation.y = Math.PI / 2;
            charPlane.position.y = 1.75;
            interior.add(charPlane);

            const intLight = new THREE.PointLight(0xffffff, 1.2, 8);
            intLight.position.set(0, 2, 0);
            interior.add(intLight);

            // --- BEACONS ---
            const beaconsGroup = new THREE.Group();
            beaconsGroup.position.y = 0.2; // Sit on base
            diorama.add(beaconsGroup);

            const beaconGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32);
            const ringGeo = new THREE.TorusGeometry(1.4, 0.05, 16, 64);
            const beaconMeshes: THREE.Mesh[] = [];

            SERVICES.forEach((svc) => {
                const group = new THREE.Group();
                group.position.set(...svc.position);
                group.userData = { service: svc };
                beaconsGroup.add(group);

                const disk = new THREE.Mesh(
                    beaconGeo,
                    new THREE.MeshPhysicalMaterial({ 
                        color: svc.color, 
                        emissive: svc.color, 
                        emissiveIntensity: 0.2, 
                        transparent: true, 
                        opacity: 0.6 
                    })
                );
                disk.castShadow = true;
                group.add(disk);

                const ring = new THREE.Mesh(
                    ringGeo,
                    new THREE.MeshBasicMaterial({ color: svc.color, transparent: true, opacity: 0.4 })
                );
                ring.rotation.x = Math.PI / 2;
                group.add(ring);

                const canvas = document.createElement("canvas");
                canvas.width = 512;
                canvas.height = 128;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.font = "bold 60px 'Inter', sans-serif";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.shadowColor = "rgba(0,0,0,0.5)";
                    ctx.shadowBlur = 10;
                    ctx.fillText(svc.title.toUpperCase(), 256, 80);
                }
                const tex = new THREE.CanvasTexture(canvas);
                const label = new THREE.Mesh(
                    new THREE.PlaneGeometry(3, 0.75),
                    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
                );
                label.position.y = 1.2;
                group.add(label);
                
                group.userData.label = label;
                beaconMeshes.push(disk);
            });

            // --- INTERACTION ---
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            const onMouseDown = (e: MouseEvent) => {
                startX = e.clientX;
                startY = e.clientY;
                isUserInteracting = true;
            };

            const onMouseMove = (e: MouseEvent) => {
                const rect = container.getBoundingClientRect();
                mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            };

            const onMouseUp = (e: MouseEvent) => {
                isUserInteracting = false;
                const dist = Math.sqrt(Math.pow(e.clientX - startX, 2) + Math.pow(e.clientY - startY, 2));
                if (dist < 5) handleInteraction();
            };

            const handleInteraction = () => {
                if (isTransitioning) return;
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(beaconMeshes);
                
                if (intersects.length > 0) {
                    const svc = intersects[0].object.parent?.userData.service as ServiceData;
                    if (svc) focusService(svc);
                } else if (activeService) {
                    resetView();
                }
            };

            const focusService = (svc: ServiceData) => {
                isTransitioning = true;
                activeService = svc;
                if (labelRef.current) {
                    labelRef.current.style.opacity = "1";
                    labelRef.current.innerHTML = `
                        <h3 style="color:${svc.color}; font-size: 24px; font-weight: 800; margin-bottom: 8px;">${svc.title}</h3>
                        <p style="color: white; font-size: 14px; font-weight: 300; opacity: 0.8;">${svc.description}</p>
                    `;
                }
                gsap.to(camera.position, { x: svc.focusCamera[0], y: svc.focusCamera[1], z: svc.focusCamera[2], duration: 2, ease: "power3.inOut" });
                gsap.to(controls.target, { x: svc.focusTarget[0], y: svc.focusTarget[1], z: svc.focusTarget[2], duration: 2, ease: "power3.inOut", onComplete: () => { isTransitioning = false; } });
            };

            const resetView = () => {
                isTransitioning = true;
                activeService = null;
                if (labelRef.current) labelRef.current.style.opacity = "0";
                gsap.to(camera.position, { x: 40, y: 20, z: 40, duration: 2, ease: "power2.inOut" });
                gsap.to(controls.target, { x: 6, y: 1.0, z: 0, duration: 2, ease: "power2.inOut", onComplete: () => { isTransitioning = false; } });
            };

            container.addEventListener("mousedown", onMouseDown);
            container.addEventListener("mousemove", onMouseMove);
            container.addEventListener("mouseup", onMouseUp);

            const updateSize = () => {
                const w = container.clientWidth;
                const h = container.clientHeight;
                if (w === 0 || h === 0) return;
                renderer.setSize(w, h, false);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            };
            window.addEventListener("resize", updateSize);

            const clock = new THREE.Clock();
            let frameId: number;
            
            function tick() {
                const t = clock.getElapsedTime();
                if (!activeService && !isTransitioning && !isUserInteracting) {
                    diorama.rotation.y += 0.005;
                    // Removed floating animation for realistic grounded view
                }
                beaconsGroup.children.forEach((b) => {
                    const label = b.userData.label;
                    if (label) label.lookAt(camera.position);
                    if (!isTransitioning) {
                        raycaster.setFromCamera(mouse, camera);
                        const intersects = raycaster.intersectObject(b.children[0]);
                        const isHovered = intersects.length > 0;
                        const targetScale = isHovered ? 1.2 : 1.0;
                        b.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
                        const mat = (b.children[0] as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
                        if (mat) mat.opacity = isHovered ? 0.9 : 0.6;
                    }
                });
                controls.update();
                renderer.render(scene, camera);
                frameId = requestAnimationFrame(tick);
            }
            tick();

            cleanup = () => {
                cancelAnimationFrame(frameId);
                window.removeEventListener("resize", updateSize);
                container.removeEventListener("mousedown", onMouseDown);
                container.removeEventListener("mousemove", onMouseMove);
                container.removeEventListener("mouseup", onMouseUp);
                renderer.dispose();
            };
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            cleanup();
        };

    }, [scale]);

    return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-[#5B2A86]/20 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-[50%] h-[50%] bg-[#D6B36A]/10 rounded-full blur-[100px]" />
            </div>
            <div ref={labelRef} className="absolute top-10 left-10 z-30 transition-all duration-700 pointer-events-none opacity-0 max-w-[280px]" />
            <div ref={containerRef} className="relative z-10 w-full h-[70vh] md:h-full max-w-[1000px] aspect-[4/3] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-700 opacity-60 group-hover:opacity-100">
                <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-premium-dark/90 border border-white/5 backdrop-blur-2xl shadow-2xl">
                    <div className="w-2 h-2 rounded-full bg-[#D6B36A] animate-pulse" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/70">Click beacons to explore services</span>
                </div>
            </div>
        </div>
    );
}
