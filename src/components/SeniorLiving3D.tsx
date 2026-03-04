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
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });

        // Match aspect ratio exactly
        const initialWidth = container.clientWidth || 800;
        const initialHeight = container.clientHeight || 500;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(initialWidth, initialHeight, false);

        // High quality shadow configuration
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Very soft shadows like the image
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0; // Reset to standard exposure for visibility

        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        // Very tight isometric perspective
        const camera = new THREE.PerspectiveCamera(30, initialWidth / initialHeight, 0.1, 200);
        // Positioned top-right-front, looking perfectly at center
        camera.position.set(20, 18, 20);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 3.0, 0); // Reset target to match 1.5 baseline
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 15;
        controls.maxDistance = 60;
        controls.maxPolarAngle = Math.PI / 2 - 0.1;

        // --- IBL & Lighting ---
        // Removed PMREM RoomEnvironment for night mode stability

        // Balanced global lighting for full visibility
        const ambientLight = new THREE.AmbientLight(0xfff7e6, 0.4);
        scene.add(ambientLight); // Restored ambient

        // Clear daylight fill
        const sunLight = new THREE.DirectionalLight(0xfffaea, 0.8); // Restored sunlight
        sunLight.position.set(-15, 25, 10);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.set(4096, 4096);
        sunLight.shadow.camera.left = -10;
        sunLight.shadow.camera.right = 10;
        sunLight.shadow.camera.top = 10;
        sunLight.shadow.camera.bottom = -10;
        sunLight.shadow.bias = -0.0005;
        scene.add(sunLight);

        // Soft fill light from the front-right
        const fillLight = new THREE.DirectionalLight(0xd9e5ff, 0.4); // Restored fill light
        fillLight.position.set(15, 10, 15);
        scene.add(fillLight);

        // Warm lamp light - parented to diorama for local coordination
        const lampLight = new THREE.PointLight(0xfff0c2, 18, 15, 1.8);
        lampLight.position.set(1.8, 4.7, -2.5); // Local coords relative to diorama center
        lampLight.castShadow = true;
        lampLight.shadow.mapSize.set(2048, 2048);

        // Secondary dim light coming from the lamp pointing downwards
        const lampDownLight = new THREE.SpotLight(0xfff0c2, 8, 12, Math.PI / 3, 0.5, 1);
        lampDownLight.position.set(1.8, 4.0, -2.5); // Slightly below the PointLight
        lampDownLight.target.position.set(1.8, 0, -2.5); // Pointing at the rug/floor

        // These will be added to diorama later after diorama is defined

        // --- MATERIALS ---
        const matBaseDark = new THREE.MeshPhysicalMaterial({ color: 0x1f2122, roughness: 0.9, clearcoat: 0.1 });
        const matFloorWood = new THREE.MeshPhysicalMaterial({ color: 0xd4bc98, roughness: 0.4, clearcoat: 0.3 });
        const matTrimWood = new THREE.MeshPhysicalMaterial({ color: 0xdabf95, roughness: 0.5, clearcoat: 0.2 });
        const matWallBeige = new THREE.MeshPhysicalMaterial({ color: 0xf5f1e6, roughness: 1.0 });
        const matRugCream = new THREE.MeshPhysicalMaterial({ color: 0xf7f5f2, roughness: 1.0, sheen: 0.2 });
        const matWindowFrame = new THREE.MeshPhysicalMaterial({ color: 0x222222, roughness: 0.8 });
        const matGlass = new THREE.MeshPhysicalMaterial({ color: 0xcfe6ff, transparent: true, opacity: 0.3, roughness: 0.1, metalness: 0.1 });
        const matCurtain = new THREE.MeshPhysicalMaterial({ color: 0xe0d6cb, roughness: 0.9, sheen: 0.3 });
        const matBooks = [
            new THREE.MeshPhysicalMaterial({ color: 0x4a5d6e, roughness: 0.8 }),
            new THREE.MeshPhysicalMaterial({ color: 0x8a7065, roughness: 0.8 }),
            new THREE.MeshPhysicalMaterial({ color: 0xd1c1b2, roughness: 0.8 }),
            new THREE.MeshPhysicalMaterial({ color: 0x2c2c2c, roughness: 0.8 }),
        ];
        const matChair = new THREE.MeshPhysicalMaterial({ color: 0x56234b, roughness: 0.9, sheen: 1.0, sheenColor: new THREE.Color(0xb97ab5) });
        const matBlanket = new THREE.MeshPhysicalMaterial({ color: 0xe6e4e1, roughness: 1.0, sheen: 1.0 });
        const matLampBrass = new THREE.MeshPhysicalMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8, clearcoat: 1.0 });
        const matLampShade = new THREE.MeshPhysicalMaterial({
            color: 0xfff4cc,
            roughness: 0.4,
            transmission: 0.2,
            opacity: 1,
            transparent: true,
            emissive: 0xfff4cc,
            emissiveIntensity: 0.5
        });
        const matPlant = new THREE.MeshPhysicalMaterial({ color: 0x2b4f2c, roughness: 0.6, clearcoat: 0.1 });
        const matRollatorMetal = new THREE.MeshPhysicalMaterial({ color: 0xa4a4a4, metalness: 0.8, roughness: 0.3 });
        const matRollatorBlack = new THREE.MeshPhysicalMaterial({ color: 0x111111, roughness: 0.9 });
        const matArtCanvas = new THREE.MeshPhysicalMaterial({ color: 0xd3e0db, roughness: 1.0 });

        const diorama = new THREE.Group();

        // 1. CYLINDRICAL BASE
        const baseCyGeo = new THREE.CylinderGeometry(7, 7, 0.5, 64);
        const baseObj = new THREE.Mesh(baseCyGeo, matBaseDark);
        baseObj.position.y = -0.25;
        baseObj.receiveShadow = true;
        diorama.add(baseObj);

        // 2. SQUARE WOODEN FLOOR PLATFORM (rounded edges)
        const getRoundedBox = (w: number, h: number, d: number, r: number = 0.05) => {
            return new RoundedBoxGeometry(w, h, d, 4, r);
        };
        const floorGeo = getRoundedBox(8.4, 0.4, 8.4, 0.1);
        const floor = new THREE.Mesh(floorGeo, matFloorWood);
        floor.position.set(0, 0.2, 0);
        floor.receiveShadow = true;
        diorama.add(floor);

        // Beige edge trim around the floor
        const floorTrimGeo = getRoundedBox(8.6, 0.3, 8.6, 0.1);
        const floorTrim = new THREE.Mesh(floorTrimGeo, matWallBeige);
        floorTrim.position.set(0, 0.15, 0);
        diorama.add(floorTrim);

        // 3. L-SHAPED WALLS (Back Wall: Z=-4, Right Wall: X=4)
        const roomGroup = new THREE.Group();

        // Back Wall Main Sections
        // We need a hole for the window (X: -3.5 to -0.5, Y: 1.5 to 5)
        const bwBot = new THREE.Mesh(new THREE.BoxGeometry(8, 1.5, 0.4), matWallBeige);
        bwBot.position.set(0, 1.15, -4);
        bwBot.receiveShadow = true;
        bwBot.castShadow = true;

        const bwTop = new THREE.Mesh(new THREE.BoxGeometry(8, 1.0, 0.4), matWallBeige);
        bwTop.position.set(0, 5.5, -4);
        bwTop.receiveShadow = true;
        bwTop.castShadow = true;

        const bwLeft = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3.5, 0.4), matWallBeige);
        bwLeft.position.set(-3.75, 3.65, -4);
        bwLeft.receiveShadow = true;
        bwLeft.castShadow = true;

        const bwMid = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.5, 0.4), matWallBeige);
        bwMid.position.set(2.25, 3.65, -4); // Wall section behind the bookcase
        bwMid.receiveShadow = true;
        bwMid.castShadow = true;

        roomGroup.add(bwBot, bwTop, bwLeft, bwMid);

        // Right Wall (Solid)
        const rwMain = new THREE.Mesh(new THREE.BoxGeometry(0.4, 5.6, 7.6), matWallBeige); // 7.6 to avoid overlap at corner
        rwMain.position.set(4, 3.2, 0.2); // shifted slightly to connect corner
        rwMain.receiveShadow = true;
        rwMain.castShadow = true;
        roomGroup.add(rwMain);



        // 4. WOOD TRIMS AROUND WALLS
        // Top trim back
        const tbBack = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.15, 0.5), matTrimWood);
        tbBack.position.set(0, 6.075, -4);
        tbBack.castShadow = true;
        roomGroup.add(tbBack);

        // Top trim right
        const tbRight = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 8.4), matTrimWood);
        tbRight.position.set(4, 6.075, 0);
        tbRight.castShadow = true;
        roomGroup.add(tbRight);

        // Vertical trims (Left edge of back wall, Front edge of right wall)
        const tvLeft = new THREE.Mesh(new THREE.BoxGeometry(0.15, 5.6, 0.5), matTrimWood);
        tvLeft.position.set(-4.075, 3.2, -4);
        tvLeft.castShadow = true;
        roomGroup.add(tvLeft);

        const tvFront = new THREE.Mesh(new THREE.BoxGeometry(0.5, 5.6, 0.15), matTrimWood);
        tvFront.position.set(4, 3.2, 4.075);
        tvFront.castShadow = true;
        roomGroup.add(tvFront);

        // Corner joint trim (just to seal the top nicely)
        const tbCorner = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.5), matTrimWood);
        tbCorner.position.set(4, 6.075, -4);
        roomGroup.add(tbCorner);


        // 5. WINDOW DETAILS (Black frame, grid, glass, curtains)
        const windowGroup = new THREE.Group();
        const wx = -2.125, wy = 3.65, wz = -3.95; // slightly forward to protrude from wall

        // Frame outer
        const frameW = 3.0, frameH = 3.5, frameD = 0.5;
        const wtGeo = new THREE.BoxGeometry(frameW, 0.1, frameD);
        const wlGeo = new THREE.BoxGeometry(0.1, frameH, frameD);

        const wfTop = new THREE.Mesh(wtGeo, matWindowFrame); wfTop.position.set(wx, wy + frameH / 2, wz); wfTop.castShadow = true;
        const wfBot = new THREE.Mesh(wtGeo, matWindowFrame); wfBot.position.set(wx, wy - frameH / 2, wz); wfBot.castShadow = true;
        const wfLeft = new THREE.Mesh(wlGeo, matWindowFrame); wfLeft.position.set(wx - frameW / 2, wy, wz); wfLeft.castShadow = true;
        const wfRight = new THREE.Mesh(wlGeo, matWindowFrame); wfRight.position.set(wx + frameW / 2, wy, wz); wfRight.castShadow = true;

        // Grid lines (Mullions)
        const wmH = new THREE.Mesh(wtGeo, matWindowFrame); wmH.scale.set(1, 0.5, 0.3); wmH.position.set(wx, wy, wz); wmH.castShadow = true;
        const wmV = new THREE.Mesh(wlGeo, matWindowFrame); wmV.scale.set(0.5, 1, 0.3); wmV.position.set(wx, wy, wz); wmV.castShadow = true;
        // extra vertical lines
        const wmV2 = wmV.clone(); wmV2.position.x = wx - 0.75;
        const wmV3 = wmV.clone(); wmV3.position.x = wx + 0.75;

        // Glass
        const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(frameW - 0.1, frameH - 0.1, 0.05), matGlass);
        glassMesh.position.set(wx, wy, wz);

        windowGroup.add(wfTop, wfBot, wfLeft, wfRight, wmH, wmV, wmV2, wmV3, glassMesh);

        // Curtains
        const curtainGeo = new THREE.CylinderGeometry(0.2, 0.25, frameH + 0.5, 12, 1, false, 0, Math.PI);
        // Squash into wavy fabric look
        curtainGeo.scale(1, 1, 0.4);
        const curtainL = new THREE.Mesh(curtainGeo, matCurtain);
        curtainL.position.set(wx - frameW / 2 - 0.15, wy - 0.25, wz + 0.25);
        curtainL.castShadow = true;
        curtainL.receiveShadow = true;

        const curtainR = curtainL.clone();
        curtainR.position.x = wx + frameW / 2 + 0.15;

        // Curtain rod
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, frameW + 1.0, 8), matWindowFrame);
        rod.rotation.z = Math.PI / 2;
        rod.position.set(wx, wy + frameH / 2 + 0.15, wz + 0.2);
        rod.castShadow = true;

        windowGroup.add(curtainL, curtainR, rod);
        roomGroup.add(windowGroup);


        // 6. BUILT-IN BOOKCASE (Right side of back wall)
        const bcGroup = new THREE.Group();
        const bcW = 3.5, bcD = 0.8;
        const bx = 1.75, by = 0.4, bz = -3.6; // Sitting on the floor

        // Lower Cabinet
        const bcCab = new THREE.Mesh(new THREE.BoxGeometry(bcW, 1.5, bcD), matTrimWood);
        bcCab.position.set(bx, by + 0.75, bz);
        bcCab.castShadow = true;
        bcCab.receiveShadow = true;
        bcGroup.add(bcCab);

        // Upper Shelves panels
        const panelGeo = new THREE.BoxGeometry(0.1, 3.0, bcD - 0.1);
        const shelfGeo = new THREE.BoxGeometry(bcW, 0.1, bcD - 0.1);

        // Left, Center, Right vertical supports
        const spL = new THREE.Mesh(panelGeo, matTrimWood); spL.position.set(bx - bcW / 2 + 0.05, by + 1.5 + 1.5, bz); spL.castShadow = true;
        const spC = new THREE.Mesh(panelGeo, matTrimWood); spC.position.set(bx, by + 1.5 + 1.5, bz); spC.castShadow = true;
        const spR = new THREE.Mesh(panelGeo, matTrimWood); spR.position.set(bx + bcW / 2 - 0.05, by + 1.5 + 1.5, bz); spR.castShadow = true;

        // Horizontal shelves
        const sh1 = new THREE.Mesh(shelfGeo, matTrimWood); sh1.position.set(bx, by + 2.5, bz); sh1.castShadow = true;
        const sh2 = new THREE.Mesh(shelfGeo, matTrimWood); sh2.position.set(bx, by + 3.5, bz); sh2.castShadow = true;
        const sh3 = new THREE.Mesh(shelfGeo, matTrimWood); sh3.position.set(bx, by + 4.5, bz); sh3.castShadow = true; // Top

        bcGroup.add(spL, spC, spR, sh1, sh2, sh3);

        // Books and Decor on Shelves
        const createBook = (w: number, h: number, d: number, matIdx: number) => {
            const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matBooks[matIdx % matBooks.length]);
            b.castShadow = true;
            return b;
        };
        // Shelf 1 left
        for (let i = 0; i < 6; i++) {
            const b = createBook(0.15, 0.6 + Math.random() * 0.2, 0.5, i);
            b.position.set(bx - 1.5 + i * 0.16, by + 1.5 + Math.random() * 0.05 + 0.35, bz);
            if (i === 5) b.rotation.z = -0.2; // leaning book
            bcGroup.add(b);
        }
        // Small plant decor on Shelf 1 right
        const dPot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.2, 16), matWallBeige);
        dPot.position.set(bx + 1.0, by + 1.5 + 0.1, bz);
        dPot.castShadow = true;
        const dPlant = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), matPlant);
        dPlant.position.set(bx + 1.0, by + 1.5 + 0.3, bz);
        bcGroup.add(dPot, dPlant);

        roomGroup.add(bcGroup);


        // 7. RIGHT WALL DETAILS (Art & Grab bar)
        // Grab Bar (wood with metal mounts)
        const gbGroup = new THREE.Group();
        const gbRod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.5, 16), matTrimWood);
        gbRod.rotation.x = Math.PI / 2;
        gbRod.position.set(3.8, 2.5, 0);
        gbRod.castShadow = true;

        const gbMountGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.1, 16);
        const gbM1 = new THREE.Mesh(gbMountGeo, matLampBrass); gbM1.rotation.z = Math.PI / 2; gbM1.position.set(3.9, 2.5, -1.5);
        const gbM2 = new THREE.Mesh(gbMountGeo, matLampBrass); gbM2.rotation.z = Math.PI / 2; gbM2.position.set(3.9, 2.5, 1.5);
        gbGroup.add(gbRod, gbM1, gbM2);
        roomGroup.add(gbGroup);

        // Abstract Canvas Art on Side Wall
        const artCanvasGroup = new THREE.Group();
        const af = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.8, 1.4), matWindowFrame);
        af.castShadow = true;

        const acPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.6), new THREE.MeshPhysicalMaterial({
            color: 0xe8e4df,
            roughness: 0.9,
            sheen: 0.2
        }));
        acPlane.position.x = -0.045;
        acPlane.rotation.y = -Math.PI / 2;

        const acBacking = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.6, 1.2), matArtCanvas);
        artCanvasGroup.add(af, acBacking, acPlane);
        artCanvasGroup.position.set(3.9, 4.0, 1.0);
        roomGroup.add(artCanvasGroup);


        // 8. RUG
        const rug = new THREE.Mesh(getRoundedBox(6.5, 0.06, 5.0, 0.1), matRugCream);
        rug.position.set(0.5, 0.43, 0.5);
        rug.receiveShadow = true;
        diorama.add(rug);


        // 9. THE PURPLE ARMCHAIR
        const chairGroup = new THREE.Group();

        // Seat cushion (plush)
        const seat = new THREE.Mesh(getRoundedBox(1.5, 0.4, 1.5, 0.1), matChair);
        seat.position.set(0, 1.0, 0);
        seat.castShadow = true;
        seat.receiveShadow = true;
        chairGroup.add(seat);

        // Backrest (high back with ear wings)
        const chairBack = new THREE.Mesh(getRoundedBox(1.5, 1.8, 0.4, 0.1), matChair);
        chairBack.position.set(0, 1.9, -0.6);
        chairBack.rotation.x = -0.15;
        chairBack.castShadow = true;
        chairGroup.add(chairBack);

        // Wings
        const wingL = new THREE.Mesh(getRoundedBox(0.2, 0.8, 0.5, 0.05), matChair);
        wingL.position.set(-0.65, 2.3, -0.4);
        wingL.castShadow = true;
        chairGroup.add(wingL);
        const wingR = wingL.clone();
        wingR.position.x = 0.65;
        chairGroup.add(wingR);

        // Armrests
        const armL = new THREE.Mesh(getRoundedBox(0.35, 0.7, 1.4, 0.08), matChair);
        armL.position.set(-0.65, 1.2, 0.1);
        armL.castShadow = true;
        chairGroup.add(armL);
        const armR = armL.clone();
        armR.position.x = 0.65;
        chairGroup.add(armR);

        // Wooden Legs
        const legG = new THREE.CylinderGeometry(0.07, 0.04, 0.8, 16);
        const lg1 = new THREE.Mesh(legG, matTrimWood); lg1.position.set(-0.6, 0.4, -0.6); lg1.rotation.x = -0.1; chairGroup.add(lg1); lg1.castShadow = true;
        const lg2 = new THREE.Mesh(legG, matTrimWood); lg2.position.set(0.6, 0.4, -0.6); lg2.rotation.x = -0.1; chairGroup.add(lg2); lg2.castShadow = true;
        const lg3 = new THREE.Mesh(legG, matTrimWood); lg3.position.set(-0.6, 0.4, 0.6); lg3.rotation.x = 0.1; chairGroup.add(lg3); lg3.castShadow = true;
        const lg4 = new THREE.Mesh(legG, matTrimWood); lg4.position.set(0.6, 0.4, 0.6); lg4.rotation.x = 0.1; chairGroup.add(lg4); lg4.castShadow = true;

        // Blanket draped on right armrest
        const blanket = new THREE.Mesh(getRoundedBox(0.4, 0.8, 0.8, 0.05), matBlanket);
        blanket.position.set(0.65, 1.4, 0.1);
        blanket.rotation.z = -0.2;
        blanket.castShadow = true;
        chairGroup.add(blanket);

        chairGroup.position.set(1.5, 0.4, -0.5);
        chairGroup.rotation.y = -Math.PI / 4; // Angled towards corner
        diorama.add(chairGroup);


        // 10. WOODEN SIDE TABLE + CUP
        const tableGroup = new THREE.Group();
        const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32), matTrimWood);
        tableTop.position.set(0, 1.4, 0);
        tableTop.castShadow = true;
        tableTop.receiveShadow = true;
        tableGroup.add(tableTop);

        const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 0.1, 32), matTrimWood);
        tableBase.position.set(0, 0.05, 0);
        tableGroup.add(tableBase);

        const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.3, 16), matTrimWood);
        tableLeg.position.set(0, 0.75, 0);
        tableLeg.castShadow = true;
        tableGroup.add(tableLeg);

        // White Cup
        const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 0.3, 24), matRugCream);
        cup.position.set(0.2, 1.6, 0);
        cup.castShadow = true;
        tableGroup.add(cup);

        // Single Book
        const book = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.6), matBooks[0]);
        book.position.set(-0.2, 1.48, 0);
        book.rotation.y = 0.5;
        book.castShadow = true;
        tableGroup.add(book);

        tableGroup.position.set(3.2, 0.4, 1.0);
        diorama.add(tableGroup);


        // 11. TALL FLOOR LAMP
        const lampGroup = new THREE.Group();
        // Base
        const lrBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.06, 32), matLampBrass);
        lrBase.position.y = 0.03;
        lampGroup.add(lrBase);

        // Pole (straight then curved)
        const pole1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.8, 16), matLampBrass);
        pole1.position.y = 1.9;
        pole1.castShadow = true;
        lampGroup.add(pole1);

        const curveGeo = new THREE.TorusGeometry(0.5, 0.04, 16, 24, Math.PI / 2);
        const curve = new THREE.Mesh(curveGeo, matLampBrass);
        curve.position.set(-0.5, 3.8, 0);
        lampGroup.add(curve);

        // Shade
        const shadeGroup = new THREE.Group();
        const shadeGeo2 = new THREE.CylinderGeometry(0.25, 0.45, 0.6, 32, 1, true);
        const shadeMain = new THREE.Mesh(shadeGeo2, matLampShade);
        // Soft interior glow
        const shadeInner = new THREE.Mesh(shadeGeo2, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide, transparent: true, opacity: 0.8 }));
        shadeMain.position.y = -0.3;
        shadeInner.position.y = -0.3;
        shadeGroup.add(shadeMain, shadeInner);
        shadeGroup.position.set(-1.0, 4.3, 0);

        lampGroup.add(shadeGroup);
        lampGroup.position.set(2.8, 0.4, -2.5); // Place in the back corner
        diorama.add(lampGroup);


        // 12. POTTED PLANT
        const bigPlant = new THREE.Group();
        const bgPot = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.3, 0.8, 32), matWallBeige); // Light grey pot
        bgPot.position.y = 0.4;
        bgPot.castShadow = true;
        bigPlant.add(bgPot);

        const ptDirt = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.05, 32), new THREE.MeshStandardMaterial({ color: 0x111111 }));
        ptDirt.position.y = 0.78;
        bigPlant.add(ptDirt);

        // Tall fiddle-leaf looking branch
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 1.5, 8), matPlant);
        stem.position.y = 1.5;
        stem.castShadow = true;
        bigPlant.add(stem);

        // Large flat circular leaves
        const lLeafGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 16);
        lLeafGeo.scale(1, 1, 1.5); // Oval
        for (let i = 0; i < 12; i++) {
            const l = new THREE.Mesh(lLeafGeo, matPlant);
            const h = 0.9 + (i * 0.1);
            const a = i * 1.3;
            l.position.set(Math.cos(a) * 0.15, h, Math.sin(a) * 0.15);
            l.rotation.z = Math.cos(a) * 0.4;
            l.rotation.x = Math.sin(a) * 0.4;
            l.rotation.y = -a;
            l.castShadow = true;
            bigPlant.add(l);
        }

        bigPlant.position.set(-2.5, 0.4, 0); // Near window
        diorama.add(bigPlant);


        // 13. ROLLATOR WALKER (Simplified model for performance and aesthetics)
        const vWalker = new THREE.Group();
        const tubeMat = matRollatorMetal;
        const rubberMat = matRollatorBlack;

        // Legs/Frame
        const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8), tubeMat); leg1.position.set(-0.35, 0.45, -0.3); vWalker.add(leg1);
        const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8), tubeMat); leg2.position.set(0.35, 0.45, -0.3); vWalker.add(leg2);
        const leg3 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8), tubeMat); leg3.position.set(-0.35, 0.45, 0.3); vWalker.add(leg3);
        const leg4 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8), tubeMat); leg4.position.set(0.35, 0.45, 0.3); vWalker.add(leg4);

        // Handles
        const hBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8), tubeMat);
        hBar.rotation.z = Math.PI / 2;
        hBar.position.set(0, 1.0, 0);
        vWalker.add(hBar);

        // Wheels
        const whGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16);
        const w1 = new THREE.Mesh(whGeo, rubberMat); w1.rotation.z = Math.PI / 2; w1.position.set(-0.35, 0.06, -0.3); vWalker.add(w1);
        const w2 = new THREE.Mesh(whGeo, rubberMat); w2.rotation.z = Math.PI / 2; w2.position.set(0.35, 0.06, -0.3); vWalker.add(w2);
        const w3 = new THREE.Mesh(whGeo, rubberMat); w3.rotation.z = Math.PI / 2; w3.position.set(-0.35, 0.06, 0.3); vWalker.add(w3);
        const w4 = new THREE.Mesh(whGeo, rubberMat); w4.rotation.z = Math.PI / 2; w4.position.set(0.35, 0.06, 0.3); vWalker.add(w4);

        vWalker.position.set(-0.5, 0.4, 1.5);
        vWalker.rotation.y = 0.8;
        diorama.add(vWalker);

        diorama.add(roomGroup);

        // Finalize Lamp Lighting within diorama local space
        diorama.add(lampLight);
        diorama.add(lampDownLight);
        diorama.add(lampDownLight.target);

        scene.add(diorama);

        // Rotate entire diorama to exactly match the 45-degree corner-facing isometric view
        diorama.rotation.y = Math.PI / 4;


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
            // Elegant micro-float with stable baseline
            diorama.position.y = 1.5 + Math.sin(t * 1.5) * 0.05;

            controls.update();
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(tick);
        }
        tick();

        return () => {
            cancelAnimationFrame(frameId);
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

    }, []);

    return (
        <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center p-4 group">
            {/* Ambient Background Glow match the hero section */}
            <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-75">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#5B2A86]/25 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[40%] w-[40%] h-[40%] bg-[#D6B36A]/15 rounded-full blur-[80px]" />
            </div>

            {/* 3D Canvas Container */}
            <div
                ref={containerRef}
                className="relative z-10 w-full h-full max-w-[900px] aspect-[4/3] lg:aspect-[4/3] rounded-[24px] overflow-hidden bg-transparent shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5"
                style={{ cursor: 'grab' }}
                onPointerDown={(e) => (e.currentTarget.style.cursor = 'grabbing')}
                onPointerUp={(e) => (e.currentTarget.style.cursor = 'grab')}
                onPointerOut={(e) => (e.currentTarget.style.cursor = 'grab')}
            />

            {/* Hint Widget */}
            <div className="absolute left-6 bottom-6 lg:left-8 lg:bottom-10 pointer-events-none z-20 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                <div className="bg-black/40 backdrop-blur-xl px-4 py-3 rounded-[16px] text-white/90 text-[11px] md:text-[13px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/10 font-medium leading-[1.4] flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#D6B36A] animate-pulse">
                        <path d="M5 15l7-7 7 7" />
                        <path d="M12 2v10" />
                    </svg>
                    <span>Drag to rotate • Scroll to zoom • Right-drag to pan</span>
                </div>
            </div>
        </div>
    );
}
