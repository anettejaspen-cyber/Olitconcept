import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // Specifications floating badges that sync with 3D model interaction
  const specs = [
    { title: 'Chassis', desc: 'Aerospace Gr.5 Titanium', color: 'border-cyber-cyan text-cyber-cyan', coords: 'top-[15%] left-[5%]' },
    { title: 'Processor', desc: 'A17 Pro / Snapdragon 8 Gen 3', color: 'border-cyber-green text-cyber-green', coords: 'top-[45%] right-[5%]' },
    { title: 'Display', desc: '120Hz LTPO Cyber-OLED', color: 'border-cyber-blue text-cyber-blue', coords: 'bottom-[20%] left-[8%]' },
  ];

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight || 500;

    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let phoneGroup: THREE.Group | null = null;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollPercent = 0;
    let animationFrameId: number | null = null;
    let baseTime = 0;

    let handleMouseMove: ((event: MouseEvent) => void) | null = null;
    let handleScroll: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    try {
      // Scene
      scene = new THREE.Scene();
      
      // Camera
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 8;

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Phone Group
      phoneGroup = new THREE.Group();
      scene.add(phoneGroup);

      // 1. Sleek Chassis Frame (Rounded Metallic Box)
      const chassisGeometry = new THREE.BoxGeometry(2.3, 4.6, 0.18);
      const chassisMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x16161c,
        roughness: 0.15,
        metalness: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
      });
      const chassisMesh = new THREE.Mesh(chassisGeometry, chassisMaterial);
      phoneGroup.add(chassisMesh);

      // 2. Front Screen Glass Panel
      const screenGeometry = new THREE.BoxGeometry(2.2, 4.5, 0.02);
      const screenMaterial = new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.25,
        shininess: 90,
      });
      const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.z = 0.095;
      phoneGroup.add(screenMesh);

      // 3. Cyber Titanium Outer Wireframe / Bezel
      const wireframeGeom = new THREE.EdgesGeometry(chassisGeometry);
      const wireframeMat = new THREE.LineBasicMaterial({
        color: 0x00f0ff,
        linewidth: 2,
      });
      const wireframeLine = new THREE.LineSegments(wireframeGeom, wireframeMat);
      phoneGroup.add(wireframeLine);

      // 4. Glowing Internal CPU Chip (Motherboard Schematic)
      const chipGeom = new THREE.BoxGeometry(0.8, 0.8, 0.05);
      const chipMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
      });
      const chipMesh = new THREE.Mesh(chipGeom, chipMat);
      chipMesh.position.set(0, 0.8, 0.01);
      phoneGroup.add(chipMesh);

      // CPU Wireframe Grid lines running outwards
      const cktGroup = new THREE.Group();
      const cktMat = new THREE.LineBasicMaterial({ color: 0x10b981 });
      const positions = [
        // Right branches
        [0.4, 0.8, 0.02, 0.9, 0.8, 0.02],
        [0.4, 0.9, 0.02, 0.8, 1.1, 0.02],
        // Left branches
        [-0.4, 0.8, 0.02, -0.9, 0.8, 0.02],
        [-0.4, 0.7, 0.02, -0.8, 0.5, 0.02],
        // Paths towards display/battery
        [0, -0.4, 0.01, 0, -1.8, 0.01]
      ];
      positions.forEach((coords) => {
        const geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
          coords[0], coords[1], coords[2],
          coords[3], coords[4], coords[5]
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        const line = new THREE.Line(geometry, cktMat);
        cktGroup.add(line);
      });
      phoneGroup.add(cktGroup);

      // 5. Triple Camera Cluster Structure
      const cameraBaseGeom = new THREE.BoxGeometry(0.9, 1.0, 0.05);
      const cameraBaseMat = new THREE.MeshStandardMaterial({
        color: 0x09090b,
        roughness: 0.3,
        metalness: 0.9,
      });
      const cameraBase = new THREE.Mesh(cameraBaseGeom, cameraBaseMat);
      cameraBase.position.set(-0.55, 1.4, -0.095);
      phoneGroup.add(cameraBase);

      // Individual Camera Lenses
      const lensRingGeom = new THREE.TorusGeometry(0.18, 0.04, 8, 24);
      const lensRingMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, metalness: 1 });
      const glassLensGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
      const glassLensMat = new THREE.MeshPhongMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.60 });

      const lensPositions = [
        { x: -0.55, y: 1.65, z: -0.11 },
        { x: -0.55, y: 1.15, z: -0.11 },
        { x: -0.28, y: 1.40, z: -0.11 }
      ];

      lensPositions.forEach((pos) => {
        const ring = new THREE.Mesh(lensRingGeom, lensRingMat);
        ring.position.set(pos.x, pos.y, pos.z);
        ring.rotation.x = Math.PI / 2;
        phoneGroup?.add(ring);

        const glass = new THREE.Mesh(glassLensGeom, glassLensMat);
        glass.position.set(pos.x, pos.y, pos.z - 0.01);
        glass.rotation.x = Math.PI / 2;
        phoneGroup?.add(glass);
      });

      // 6. Charging Port & Bottom grills
      const portGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 16);
      const portMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const port = new THREE.Mesh(portGeom, portMat);
      port.position.set(0, -2.3, 0);
      port.rotation.z = Math.PI / 2;
      phoneGroup.add(port);

      // 7. Internal Battery Block (Cyber Blue translucent)
      const batteryGeom = new THREE.BoxGeometry(0.95, 2.2, 0.1);
      const batteryMat = new THREE.MeshStandardMaterial({
        color: 0x1d4ed8,
        transparent: true,
        opacity: 0.4,
        roughness: 0.2,
      });
      const batteryMesh = new THREE.Mesh(batteryGeom, batteryMat);
      batteryMesh.position.set(0.4, -0.8, -0.015);
      phoneGroup.add(batteryMesh);

      // Ambient Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      // Directional Lighting
      const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.8);
      dirLight1.position.set(5, 5, 5);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x10b981, 1.2);
      dirLight2.position.set(-5, -5, -3);
      scene.add(dirLight2);

      const pointLight = new THREE.PointLight(0xffffff, 1.0, 10);
      pointLight.position.set(0, 0, 3);
      scene.add(pointLight);

      const windowHalfX = width / 2;
      const windowHalfY = height / 2;

      handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX) / 1500;
        mouseY = (event.clientY - windowHalfY) / 1500;
      };

      handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          scrollPercent = scrollTop / docHeight;
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);

      const animate = () => {
        baseTime += 0.005;
        animationFrameId = requestAnimationFrame(animate);

        targetX += (mouseX - targetX) * 0.08;
        targetY += (mouseY - targetY) * 0.08;

        const scrollRotationY = scrollPercent * Math.PI * 2.8;
        const scrollRotationX = scrollPercent * Math.PI * 0.7;

        if (phoneGroup && renderer && scene && camera) {
          phoneGroup.rotation.y = scrollRotationY + targetX + Math.sin(baseTime * 1.5) * 0.15;
          phoneGroup.rotation.x = scrollRotationX + targetY + 0.1 + Math.cos(baseTime * 0.8) * 0.1;
          phoneGroup.position.y = Math.sin(baseTime * 2) * 0.15;
          renderer.render(scene, camera);
        }
      };

      animate();

      const handleResize = () => {
        if (!containerRef.current || !canvasRef.current || !camera || !renderer) return;
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight || 500;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(containerRef.current);
    } catch (e) {
      console.warn("WebGL Renderer creation failed, running elegant SVG/CSS mock schematic.", e);
      setWebglSupported(false);
    }

    return () => {
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
      if (handleScroll) window.removeEventListener('scroll', handleScroll);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[380px] sm:h-[450px] md:h-[550px] relative select-none">
      
      {webglSupported ? (
        /* 3D WebGL Canvas */
        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Elegant 100%-reliable 2D Vector Schematic blueprint */
        <div className="w-full h-full flex items-center justify-center p-8 relative">
          <div className="w-[200px] h-[400px] rounded-[36px] bg-[#16161c]/80 border-2 border-cyber-cyan/50 p-4 relative shadow-2xl flex flex-col justify-between overflow-hidden animate-pulse">
            {/* Mirror reflection glow layer */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent -skew-y-12 pointer-events-none" />
            
            {/* Dynamic visual hardware markers */}
            <div className="w-3 h-3 rounded-full bg-cyber-blue/30 mx-auto mt-1 border border-cyber-cyan/30 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-cyber-cyan" />
            </div>

            {/* Glowing internal CPU Board */}
            <div className="w-16 h-16 bg-cyber-green/10 border border-cyber-green/50 rounded-2xl mx-auto flex flex-col items-center justify-center relative mt-6 hover:scale-105 transition-transform duration-300">
              <span className="font-mono text-[9px] text-cyber-green font-bold tracking-widest">A17 PRO</span>
              <span className="font-mono text-[6px] text-cyber-green/70">3n CHIP</span>
              <div className="absolute -inset-2 border border-cyber-green/20 rounded-xl pointer-events-none animate-ping opacity-45" />
            </div>

            {/* Micro schematic running wires */}
            <div className="flex-1 flex items-center justify-center py-4 opacity-75">
              <svg className="w-full h-20 text-cyber-green" viewBox="0 0 100 60">
                <path d="M 50 0 L 50 25 L 20 25 L 20 60 M 50 25 L 80 25 L 80 60" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="20" cy="60" r="2" fill="currentColor" />
                <circle cx="80" cy="60" r="2" fill="currentColor" />
              </svg>
            </div>

            {/* Blue Lithium Translucent Cell */}
            <div className="w-28 h-24 bg-cyber-blue/10 border border-cyber-blue/40 rounded-xl mx-auto mb-6 flex flex-col items-center justify-center">
              <span className="font-mono text-[9px] text-cyber-blue font-bold tracking-widest">LIPO_CELL</span>
              <span className="font-mono text-[7px] text-cyber-blue/60 mt-1">4500MAH PROTOCOL</span>
            </div>

            <div className="w-8 h-1.5 bg-cyber-cyan/40 mx-auto rounded-full" />
          </div>
        </div>
      )}

      {/* Floating Interface Holographic Indicators */}
      {specs.map((spec, idx) => (
        <div
          key={idx}
          className={`absolute ${spec.coords} z-10 transition-all duration-300 transform hover:scale-105 pointer-events-auto`}
          onMouseEnter={() => setHoveredSpec(spec.title)}
          onMouseLeave={() => setHoveredSpec(null)}
        >
          <div className="flex items-center space-x-2">
            {/* Pulsating glowing point */}
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                spec.title === 'Chassis' ? 'bg-cyber-cyan' : spec.title === 'Processor' ? 'bg-cyber-green' : 'bg-cyber-blue'
              }`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                spec.title === 'Chassis' ? 'bg-cyber-cyan' : spec.title === 'Processor' ? 'bg-cyber-green' : 'bg-cyber-blue'
              }`} />
            </span>

            {/* Blurred Glass Label */}
            <div className={`px-3 py-1.5 rounded-xl border glass-panel transition-colors duration-300 ${
              hoveredSpec === spec.title ? spec.color + ' border-current' : 'border-white/10 text-white/80'
            }`}>
              <div className="font-mono text-[9px] tracking-widest uppercase opacity-60">
                {spec.title}
              </div>
              <div className="font-display font-bold text-[11px] leading-tight">
                {spec.desc}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Futuristic Compass Coordinates overlay */}
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-white/30 text-right pointer-events-none self-end hidden sm:block">
        <div>MODEL ST-15.P (PRO DEV)</div>
        <div>AXIS R_COORD OUT_SCALE: 1.00</div>
        <div>WEBGL_STABLE: 60 FPS</div>
      </div>
    </div>
  );
}
