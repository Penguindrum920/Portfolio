import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ScrollFloat from './ScrollFloat';
import './ProjectsScroll.css';

interface Project {
  image: string;
  title: string;
  description: string;
  techStack?: string[];
}

interface ProjectsScrollProps {
  projects: Project[];
}

const vertexShader = `
  precision highp float;
  
  varying vec2 vUv;
  
  uniform float uProgress;
  uniform float uDirection;
  uniform float uMaxRotation;
  
  float PI = 3.141592653589793238;
  
  void main() {
    vUv = uv;
    
    vec3 newpos = position;
    
    // Normalized Y: -1 at bottom, 0 at center, 1 at top
    float normalizedY = position.y * 2.0;
    float absNormY = abs(normalizedY);
    float sign = normalizedY >= 0.0 ? 1.0 : -1.0;
    
    // Cascading curl effect
    float firstFoldFactor = pow(absNormY, 1.2);
    float firstAngle = uProgress * uMaxRotation * firstFoldFactor * uDirection;
    
    float distFromCenter = abs(position.y);
    float cosA1 = cos(firstAngle);
    float sinA1 = sin(firstAngle);
    
    float y1 = sign * distFromCenter * cosA1;
    float z1 = distFromCenter * sinA1;
    
    // Second fold for outer portions
    float secondFoldThreshold = 0.5;
    if (absNormY > secondFoldThreshold) {
      float secondFoldProgress = (absNormY - secondFoldThreshold) / (1.0 - secondFoldThreshold);
      secondFoldProgress = pow(secondFoldProgress, 1.5);
      
      float secondAngle = uProgress * (uMaxRotation * 0.7) * secondFoldProgress * uDirection;
      
      float cosA2 = cos(secondAngle);
      float sinA2 = sin(secondAngle);
      
      float pivotY = sign * secondFoldThreshold * 0.5 * cosA1;
      float pivotZ = secondFoldThreshold * 0.5 * sinA1;
      
      float distFromPivot = (absNormY - secondFoldThreshold) * 0.5;
      
      float localY = sign * distFromPivot * cosA2;
      float localZ = distFromPivot * sinA2;
      
      y1 = pivotY + localY * cosA1 - sign * localZ * sinA1;
      z1 = pivotZ + sign * localY * sinA1 + localZ * cosA1;
    }
    
    newpos.y = y1;
    newpos.z = z1;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform sampler2D tMap;
  varying vec2 vUv;
  
  void main() {
    vec4 color = texture2D(tMap, vUv);
    gl_FragColor = color;
  }
`;

const ProjectsScroll: React.FC<ProjectsScrollProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef({ current: 0, target: 0, ease: 0.05 });
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const textRefsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setClearColor(0xFFF8E7, 1);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scroll = scrollRef.current;
    const meshes: THREE.Mesh[] = [];
    const textElements = textRefsRef.current;

    // Load textures and create planes
    const loader = new THREE.TextureLoader();
    const planeGeometry = new THREE.PlaneGeometry(1, 1, 100, 50);
    
    const fov = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * camera.position.z;
    const width = height * camera.aspect;

    const planeWidth = width * 0.35;
    const planeHeight = height * 0.5;
    const spacing = height * 0.1;

    projects.forEach((project, index) => {
      loader.load(project.image, (texture) => {
        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            tMap: { value: texture },
            uProgress: { value: 0 },
            uDirection: { value: 1 },
            uMaxRotation: { value: Math.PI / 2.5 }
          },
          transparent: true,
          side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(planeGeometry, material);
        mesh.scale.set(planeWidth, planeHeight, 1);
        
        const xOffset = width * 0.30;
        mesh.position.x = index % 2 === 0 ? -xOffset : xOffset;
        mesh.position.y = -((planeHeight + spacing) * index);
        
        scene.add(mesh);
        meshes.push(mesh);
      });
    });

    meshesRef.current = meshes;

    // Animation loop
    const animate = () => {
      scroll.current += (scroll.target - scroll.current) * scroll.ease;

      meshes.forEach((mesh, index) => {
        const material = mesh.material as THREE.ShaderMaterial;
        const baseY = -index * (planeHeight + spacing);
        const y = baseY + scroll.current;
        
        mesh.position.y = y;

        // Calculate curl progress
        const distanceFromCenter = Math.abs(y) / (height * 0.3);
        const progress = Math.min(distanceFromCenter, 1);
        const direction = y < 0 ? 1 : -1;

        material.uniforms.uProgress.value = progress;
        material.uniforms.uDirection.value = direction;

        // Update text position and visibility
        if (textElements[index]) {
          const screenY = container.clientHeight / 2 + (y / height) * container.clientHeight;
          const isLeft = index % 2 === 0;
          
          // Calculate mesh screen position
          const meshScreenX = container.clientWidth / 2 + (mesh.position.x / width) * container.clientWidth;
          
          // Image dimensions on screen
          const imageWidthScreen = (planeWidth / width) * container.clientWidth;
          const imageHeightScreen = (planeHeight / height) * container.clientHeight;
          
          // Position text beside image with 20px margin
          const margin = 20;
          const textX = isLeft ? meshScreenX + (imageWidthScreen / 2) + margin : meshScreenX - (imageWidthScreen / 2) - margin;
          
          // Set height to match image height
          textElements[index].style.height = `${imageHeightScreen}px`;
          textElements[index].style.left = `${textX}px`;
          textElements[index].style.top = `${screenY}px`;
          textElements[index].style.transform = isLeft ? 'translateY(-50%)' : 'translate(-100%, -50%)';
          
          // Only show text when project is centered and fully visible
          const isVisible = Math.abs(y) < height * 0.4 && progress < 0.4;
          textElements[index].style.opacity = isVisible ? '1' : '0';
          textElements[index].style.pointerEvents = isVisible ? 'auto' : 'none';
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Scroll handler - only capture when hovering
    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    const handleWheel = (e: WheelEvent) => {
      // Calculate scroll boundaries
      const maxScroll = (planeHeight + spacing) * (projects.length - 1);
      const minScroll = 0;
      
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      
      // Check if at boundaries with larger tolerance
      const atBottom = scroll.target >= maxScroll - 1;
      const atTop = scroll.target <= minScroll + 1;
      
      // If not hovering OR at boundaries, allow page scroll
      if (!isHovering || (atBottom && scrollingDown) || (atTop && scrollingUp)) {
        return; // Don't preventDefault - allow natural page scroll
      }
      
      // Capture scroll within container
      e.preventDefault();
      e.stopPropagation();
      scroll.target += e.deltaY * 0.005;
      
      // Clamp scroll to boundaries
      scroll.target = Math.max(minScroll, Math.min(maxScroll, scroll.target));
    };

    // Mouse drag
    let isDragging = false;
    let startY = 0;
    let startScroll = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (!isHovering) return;
      isDragging = true;
      startY = e.clientY;
      startScroll = scroll.target;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      scroll.target = startScroll - (e.clientY - startY) * 0.01;
    };

    const handleMouseUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
    };

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      meshes.forEach(mesh => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
    };
  }, [projects]);

  return (
    <div ref={containerRef} className="projects-scroll-container">
      <canvas ref={canvasRef} className="projects-canvas" />
      <div className="projects-text-container">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={el => { if (el) textRefsRef.current[index] = el; }}
            className={`project-text-wrapper ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
            style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
          >
            <div className="project-text">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.techStack && project.techStack.length > 0 && (
                <div className="project-tech-stack">
                  <h4 className="tech-stack-title">Tech Stack</h4>
                  <div className="tech-stack-items">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-item">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="scroll-hint">
        <div className="scroll-hint-text">Scroll to explore</div>
        <div className="scroll-arrow">↓</div>
      </div>
    </div>
  );
};

export default ProjectsScroll;
