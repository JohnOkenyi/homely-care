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

            // Moved camera further back and slightly higher
            camera.position.set(16, 14, 16);

            const controls = new OrbitControls(camera, renderer.domElement);
            // Increased target Y to bring house down, shifted target X positive to move house left
            controls.target.set(2.0, 2.0, 0);
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

            const matHouseBody = new THREE.MeshPhysicalMaterial({ color: 0xfdfcfb, roughness: 0.9 });
            const matRoof = new THREE.MeshPhysicalMaterial({ color: 0xF99D31, roughness: 0.8 }); // Orange roof to match sample
            const matBaseTrim = new THREE.MeshPhysicalMaterial({ color: 0xF99D31, roughness: 0.8 }); // Orange base trim
            const matDoor = new THREE.MeshPhysicalMaterial({ color: 0x8F8F8F, roughness: 0.6 }); // Grey door
            const matWindowGlass = new THREE.MeshPhysicalMaterial({
                color: 0x87CEFA,
                transparent: true,
                opacity: 0.25, // Very transparent
                roughness: 0.1,
                metalness: 0.9,
                envMapIntensity: 1.0,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1
            }); // Highly reflective and see-through glass
            const matDarkInterior = new THREE.MeshBasicMaterial({ color: 0x050a14 });

            const diorama = new THREE.Group();

            // 3. HOUSE BODY & TRIM
            const houseGroup = new THREE.Group();
            const houseW = 6.0;
            const houseH = 3.8;
            const houseD = 5.0;

            const getRoundedBox = (w: number, h: number, d: number, r: number = 0.05) => {
                return new RoundedBoxGeometry(w, h, d, 4, r);
            };

            // Base Trim
            const baseTrim = new THREE.Mesh(getRoundedBox(houseW + 0.6, 0.4, houseD + 0.6, 0.05), matBaseTrim);
            baseTrim.position.set(0, 0.2, 0);
            baseTrim.receiveShadow = true;
            baseTrim.castShadow = true;
            houseGroup.add(baseTrim);

            // Body
            const body = new THREE.Mesh(getRoundedBox(houseW, houseH, houseD, 0.05), matHouseBody);
            body.position.set(0, 0.4 + houseH / 2, 0);
            body.receiveShadow = true;
            body.castShadow = true;
            houseGroup.add(body);

            // 4. PITCHED ROOF
            const roofW = houseW + 1.2;
            const roofH = 2.8;
            const roofShape = new THREE.Shape();
            roofShape.moveTo(-roofW / 2, 0);
            roofShape.lineTo(roofW / 2, 0);
            roofShape.lineTo(0, roofH);
            roofShape.lineTo(-roofW / 2, 0);

            const exSettings = { depth: houseD + 1.4, bevelEnabled: false };
            const roofGeo = new THREE.ExtrudeGeometry(roofShape, exSettings);
            roofGeo.center();
            const roof = new THREE.Mesh(roofGeo, matRoof);
            roof.position.set(0, 0.4 + houseH + roofH / 2, 0);
            roof.castShadow = true;
            roof.receiveShadow = true;
            houseGroup.add(roof);

            // Chimney (on +X right slope)
            const chimney = new THREE.Mesh(new THREE.BoxGeometry(1.0, 3.0, 1.2), matRoof);
            chimney.position.set(1.4, 0.4 + houseH + 1.2, -0.6);
            chimney.castShadow = true;
            houseGroup.add(chimney);

            // 5. DOOR (Front +Z)
            const doorGroup = new THREE.Group();
            const doorW = 1.4;
            const doorH = 2.4;

            // Door Frame
            const frameMat = new THREE.MeshPhysicalMaterial({ color: 0x555555, roughness: 0.8 });
            const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(doorW + 0.2, doorH + 0.1, 0.3), frameMat);
            doorFrame.position.set(1.0, 0.4 + (doorH + 0.1) / 2, houseD / 2 - 0.05);
            doorGroup.add(doorFrame);

            // Door panel
            const door = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, 0.2), matDoor);
            door.position.set(1.0, 0.4 + doorH / 2, houseD / 2 + 0.05);
            door.castShadow = true;

            // Door Handle
            const handle = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshStandardMaterial({ color: 0xD6B36A, roughness: 0.2, metalness: 0.8 }));
            handle.position.set(0.5, 0, 0.12);
            door.add(handle);

            // Door groove/panel detail
            const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 0.21), new THREE.MeshPhysicalMaterial({ color: 0x7A7A7A, roughness: 0.7 }));
            doorPanel.position.set(0, 0.1, 0);
            door.add(doorPanel);

            doorGroup.add(door);
            houseGroup.add(doorGroup);

            // 6. WINDOW (Left side -X) - Realistic see-through Glass
            const winGroup = new THREE.Group();

            // Window Frame
            const winFrameMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.8 });
            const winFrame = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.6, 0.2), winFrameMat);
            winFrame.position.set(-houseW / 2 - 0.02, 0.4 + 1.6, 0);
            winFrame.rotation.y = -Math.PI / 2;
            winGroup.add(winFrame);

            // Dark interior behind the glass (placed slightly off the wall so it isn't hidden inside the solid block)
            const interiorRoom = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 2.3), matDarkInterior);
            interiorRoom.position.set(-houseW / 2 - 0.04, 0.4 + 1.6, 0);
            interiorRoom.rotation.y = -Math.PI / 2;
            winGroup.add(interiorRoom);

            // The Glass
            const glassGeo = new THREE.BoxGeometry(2.0, 2.4, 0.02);
            const glass = new THREE.Mesh(glassGeo, matWindowGlass);
            glass.position.set(-houseW / 2 - 0.1, 0.4 + 1.6, 0);
            glass.rotation.y = -Math.PI / 2;
            winGroup.add(glass);

            houseGroup.add(winGroup);

            diorama.add(houseGroup);

            // 7. WALL TEXT (Homely Health Care & Services)

            // Front Wall Text (Above Door)
            const frontCanvas = document.createElement("canvas");
            frontCanvas.width = 1024;
            frontCanvas.height = 256;
            const fCtx = frontCanvas.getContext("2d");
            if (fCtx) {
                fCtx.fillStyle = "#fdfcfb"; // Match house body
                fCtx.fillRect(0, 0, 1024, 256);
                fCtx.font = "bold 75px 'Inter', sans-serif";
                fCtx.fillStyle = "#e58a22"; // Slightly darker orange text to look painted
                fCtx.textAlign = "center";
                fCtx.textBaseline = "middle";
                fCtx.fillText("HOMELY HEALTH CARE", 512, 128);
            }
            const frontTex = new THREE.CanvasTexture(frontCanvas);
            frontTex.anisotropy = 16;
            frontTex.colorSpace = THREE.SRGBColorSpace;
            const frontMat = new THREE.MeshPhysicalMaterial({ map: frontTex, roughness: 0.9, clearcoat: 0.1 });
            const frontTextPlane = new THREE.Mesh(new THREE.PlaneGeometry(4, 1), frontMat);
            // Position above door, centered
            frontTextPlane.position.set(0, 0.4 + 3.2, houseD / 2 + 0.01);
            houseGroup.add(frontTextPlane);

            // Side Wall Text (Services) - Right side only (+X), because left is window
            const sideCanvas = document.createElement("canvas");
            sideCanvas.width = 1024;
            sideCanvas.height = 1024;
            const sCtx = sideCanvas.getContext("2d");
            if (sCtx) {
                sCtx.fillStyle = "#fdfcfb";
                sCtx.fillRect(0, 0, 1024, 1024);

                sCtx.font = "bold 80px 'Inter', sans-serif";
                sCtx.fillStyle = "#e58a22";
                sCtx.textAlign = "center";
                sCtx.fillText("OUR SERVICES", 512, 180);

                sCtx.strokeStyle = "#D6B36A";
                sCtx.lineWidth = 6;
                sCtx.beginPath();
                sCtx.moveTo(200, 240);
                sCtx.lineTo(824, 240);
                sCtx.stroke();

                sCtx.font = "bold 60px 'Inter', sans-serif";
                sCtx.fillStyle = "#222222";
                const svcs = ["Home Care", "Live-in Care", "Supported Living", "Complex Care"];
                svcs.forEach((svc, i) => {
                    sCtx.fillText(svc, 512, 380 + (i * 125));
                });
            }
            const sideTex = new THREE.CanvasTexture(sideCanvas);
            sideTex.anisotropy = 16;
            sideTex.colorSpace = THREE.SRGBColorSpace;
            const sideMat = new THREE.MeshPhysicalMaterial({ map: sideTex, roughness: 0.9, clearcoat: 0.1 });

            const rightTextPlane = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 3.5), sideMat);
            rightTextPlane.position.set(houseW / 2 + 0.01, 0.4 + houseH / 2, 0);
            rightTextPlane.rotation.y = Math.PI / 2;
            houseGroup.add(rightTextPlane);

            // Back Wall
            const backCanvas = document.createElement("canvas");
            backCanvas.width = 1024;
            backCanvas.height = 1024;
            const bCtx = backCanvas.getContext("2d");
            if (bCtx) {
                bCtx.fillStyle = "#fdfcfb";
                bCtx.fillRect(0, 0, 1024, 1024);
                bCtx.font = "bold 80px 'Inter', sans-serif";
                bCtx.fillStyle = "#e58a22";
                bCtx.textAlign = "center";
                bCtx.fillText("HOMELY HEALTH CARE", 512, 300);

                bCtx.font = "bold 45px 'Inter', sans-serif";
                bCtx.fillStyle = "#222222";
                bCtx.fillText("PROVIDING EXCEPTIONAL CARE", 512, 450);
                bCtx.fillText("SINCE 2016", 512, 530);
            }
            const backTex = new THREE.CanvasTexture(backCanvas);
            backTex.anisotropy = 16;
            backTex.colorSpace = THREE.SRGBColorSpace;
            const backMat = new THREE.MeshPhysicalMaterial({ map: backTex, roughness: 0.9, clearcoat: 0.1 });
            const backTextPlane = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), backMat);
            backTextPlane.position.set(0, 0.4 + houseH / 2, -houseD / 2 - 0.01);
            backTextPlane.rotation.y = Math.PI;
            houseGroup.add(backTextPlane);

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
