"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export default function SeniorLiving3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        let cleanup = () => { };

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
            const fov = isMobile ? 55 : 30;
            const camera = new THREE.PerspectiveCamera(fov, initialWidth / initialHeight, 0.1, 200);

            camera.position.set(18, 14, 18);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 2, 0);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 10;
            controls.maxDistance = 60;
            controls.maxPolarAngle = Math.PI / 2 - 0.1;

            if (isMobile) {
                controls.enableZoom = false;
            }

            // --- LIGHTING ---
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const sunLight = new THREE.DirectionalLight(0xfffae6, 0.8);
            sunLight.position.set(15, 20, 10);
            sunLight.castShadow = true;
            sunLight.shadow.mapSize.set(1024, 1024);
            sunLight.shadow.bias = -0.001;
            scene.add(sunLight);

            const fillLight = new THREE.DirectionalLight(0xe8f0cc, 0.4);
            fillLight.position.set(-15, 10, -15);
            scene.add(fillLight);

            // --- MATERIALS ---
            const matGrass = new THREE.MeshPhysicalMaterial({ color: 0x86a873, roughness: 0.9, clearcoat: 0.1 });
            const matHouseBody = new THREE.MeshPhysicalMaterial({ color: 0xfaf8f5, roughness: 0.9 });
            const matRoof = new THREE.MeshPhysicalMaterial({ color: 0x9c4a4a, roughness: 0.8 }); // Reddish warm roof
            const matDoor = new THREE.MeshPhysicalMaterial({ color: 0x5B2A86, roughness: 0.6 }); // Homely purple
            const matWindowGlass = new THREE.MeshPhysicalMaterial({ color: 0x90ccf2, transparent: true, opacity: 0.6, roughness: 0.1, metalness: 0.5 });
            const matWindowFrame = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.8 });
            const matPath = new THREE.MeshPhysicalMaterial({ color: 0xd9cbb8, roughness: 0.9 });
            const matTreeTrunk = new THREE.MeshPhysicalMaterial({ color: 0x5c4033, roughness: 0.9 });
            const matTreeLeaves = new THREE.MeshPhysicalMaterial({ color: 0x4a7c59, roughness: 0.8 });

            const diorama = new THREE.Group();

            // 1. CYLINDRICAL GRASS BASE
            const baseGeo = new THREE.CylinderGeometry(8, 8, 0.8, 64);
            const baseObj = new THREE.Mesh(baseGeo, matGrass);
            baseObj.position.y = -0.4;
            baseObj.receiveShadow = true;
            diorama.add(baseObj);

            // Soil under base
            const soilGeo = new THREE.CylinderGeometry(7.8, 7.5, 0.6, 64);
            const soilObj = new THREE.Mesh(soilGeo, new THREE.MeshStandardMaterial({ color: 0x3d2817 }));
            soilObj.position.y = -1.0;
            diorama.add(soilObj);

            // 2. PATHWAY
            const pathGeo = new THREE.BoxGeometry(2, 0.05, 5);
            const pathInfo = new THREE.Mesh(pathGeo, matPath);
            pathInfo.position.set(0, 0.02, 4.5);
            pathInfo.receiveShadow = true;
            diorama.add(pathInfo);

            // 3. HOUSE BODY
            const houseGroup = new THREE.Group();
            const houseW = 6;
            const houseH = 3.5;
            const houseD = 5;

            const getRoundedBox = (w: number, h: number, d: number, r: number = 0.05) => {
                return new RoundedBoxGeometry(w, h, d, 4, r);
            };

            const body = new THREE.Mesh(getRoundedBox(houseW, houseH, houseD, 0.2), matHouseBody);
            body.position.set(0, houseH / 2, 0);
            body.receiveShadow = true;
            body.castShadow = true;
            houseGroup.add(body);

            // 4. ROOF (Oversized pyramid/cone style)
            const roofShape = new THREE.ConeGeometry(5.2, 3.5, 4, 1, false, Math.PI / 4);
            const roof = new THREE.Mesh(roofShape, matRoof);
            roof.position.set(0, houseH + 1.75, 0);
            roof.castShadow = true;
            roof.receiveShadow = true;
            houseGroup.add(roof);

            // Chimney
            const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2, 0.8), new THREE.MeshStandardMaterial({ color: 0x8a3c3c }));
            chimney.position.set(1.5, houseH + 1.5, -1);
            chimney.castShadow = true;
            houseGroup.add(chimney);

            // 5. DOOR (Front)
            const doorW = 1.2;
            const doorH = 2.2;
            const door = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, 0.1), matDoor);
            door.position.set(0, doorH / 2, houseD / 2 + 0.02);
            door.castShadow = true;

            // Door Handle
            const handle = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshStandardMaterial({ color: 0xD6B36A, metalness: 0.8, roughness: 0.2 }));
            handle.position.set(0.4, 0, 0.08);
            door.add(handle);

            houseGroup.add(door);

            // 6. WINDOWS
            const createWindow = (wx: number, wy: number, wz: number, rotationY: number) => {
                const winGroup = new THREE.Group();
                const frame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.15), matWindowFrame);
                const glass = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.16), matWindowGlass);
                const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 0.18), matWindowFrame);
                const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0, 0.18), matWindowFrame);

                winGroup.add(frame, glass, crossH, crossV);
                winGroup.position.set(wx, wy, wz);
                winGroup.rotation.y = rotationY;
                return winGroup;
            };

            // Front windows
            houseGroup.add(createWindow(-1.8, 1.4, houseD / 2 + 0.02, 0));
            houseGroup.add(createWindow(1.8, 1.4, houseD / 2 + 0.02, 0));
            // Back windows
            houseGroup.add(createWindow(-1.5, 1.4, -houseD / 2 - 0.02, Math.PI));
            houseGroup.add(createWindow(1.5, 1.4, -houseD / 2 - 0.02, Math.PI));
            // Side windows
            houseGroup.add(createWindow(-houseW / 2 - 0.02, 1.4, 0, -Math.PI / 2));
            houseGroup.add(createWindow(houseW / 2 + 0.02, 1.4, 0, Math.PI / 2));

            diorama.add(houseGroup);

            // 7. EXTERIOR DETAILS (Trees, Bushes)
            const createTree = (tx: number, tz: number, scale: number) => {
                const treeGroup = new THREE.Group();
                // Trunk
                const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.5), matTreeTrunk);
                trunk.position.y = 0.75;
                trunk.castShadow = true;
                trunk.receiveShadow = true;

                // Leaves
                const leaves1 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), matTreeLeaves);
                leaves1.position.y = 2.0;
                leaves1.castShadow = true;
                leaves1.receiveShadow = true;

                const leaves2 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 16), matTreeLeaves);
                leaves2.position.set(0.5, 2.5, -0.2);
                leaves2.castShadow = true;

                const leaves3 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), matTreeLeaves);
                leaves3.position.set(-0.4, 2.3, 0.5);
                leaves3.castShadow = true;

                treeGroup.add(trunk, leaves1, leaves2, leaves3);
                treeGroup.position.set(tx, 0, tz);
                treeGroup.scale.set(scale, scale, scale);
                return treeGroup;
            };

            const createBush = (bx: number, bz: number, scale: number) => {
                const bush = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), matTreeLeaves);
                bush.position.set(bx, 0.3, bz);
                bush.scale.set(scale, scale, scale);
                bush.castShadow = true;
                bush.receiveShadow = true;
                return bush;
            };

            diorama.add(createTree(-5, -3, 1.2));
            diorama.add(createTree(4.5, -4, 0.9));
            diorama.add(createTree(5, 3, 1.0));

            diorama.add(createBush(-3.5, 3, 1.0));
            diorama.add(createBush(-2.8, 3.5, 0.7));
            diorama.add(createBush(4, 2, 0.9));
            diorama.add(createBush(3, 3, 1.2));

            scene.add(diorama);

            const updateSize = () => {
                if (!container) return;
                const w = container.clientWidth;
                const h = container.clientHeight;
                if (w === 0 || h === 0) return;
                renderer.setSize(w, h, false);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            };
            window.addEventListener("resize", updateSize);

            // Animate
            const clock = new THREE.Clock();
            let frameId: number;
            function tick() {
                const t = clock.getElapsedTime();

                // Bouncing elegant motion + continuous rotation
                diorama.position.y = 0.5 + Math.sin(t * 1.5) * 0.1;
                diorama.rotation.y = t * 0.15; // Like a globe

                controls.update();
                renderer.render(scene, camera);
                frameId = requestAnimationFrame(tick);
            }
            tick();

            // Progressive shadow quality upgrade: fast first render, then high quality after 2s
            const qualityUpgradeTimeout = setTimeout(() => {
                sunLight.shadow.mapSize.set(2048, 2048);
                sunLight.shadow.map?.dispose();
                (sunLight.shadow as THREE.LightShadow & { map: THREE.WebGLRenderTarget | null }).map = null;
                renderer.shadowMap.needsUpdate = true;
            }, 2000);

            cleanup = () => {
                cancelAnimationFrame(frameId);
                clearTimeout(qualityUpgradeTimeout);
                window.removeEventListener("resize", updateSize);
                if (scene.environment) scene.environment.dispose();
                if (container && renderer.domElement && container.contains(renderer.domElement)) {
                    container.removeChild(renderer.domElement);
                }
                renderer.dispose();
                scene.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                        object.geometry.dispose();
                        if (object.material.isMaterial) {
                            object.material.dispose();
                        } else if (Array.isArray(object.material)) {
                            object.material.forEach((mat: THREE.Material) => mat.dispose());
                        }
                    }
                });
            };
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            cleanup();
        };

    }, []);

    return (
        <div className="relative w-full h-full min-h-[450px] md:min-h-[500px] flex items-center justify-center p-0 md:p-4 group">
            {/* Ambient Background Glow match the hero section */}
            <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-75">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#5B2A86]/25 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[40%] w-[40%] h-[40%] bg-[#D6B36A]/15 rounded-full blur-[80px]" />
            </div>

            {/* 3D Canvas Container */}
            <div
                ref={containerRef}
                className="relative z-10 w-full h-[65vh] md:h-full max-w-[900px] md:aspect-[4/3] rounded-3xl md:rounded-[24px] overflow-hidden bg-transparent shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5"
                style={{ cursor: 'grab' }}
                onPointerDown={(e) => (e.currentTarget.style.cursor = 'grabbing')}
                onPointerUp={(e) => (e.currentTarget.style.cursor = 'grab')}
                onPointerOut={(e) => (e.currentTarget.style.cursor = 'grab')}
            />

            {/* Hint Widget */}
            <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#1A1A1A]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] animate-ping" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] opacity-50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] opacity-25" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/90">
                        Interactive 3D Exterior
                    </span>
                </div>
            </div>
        </div>
    );
}
