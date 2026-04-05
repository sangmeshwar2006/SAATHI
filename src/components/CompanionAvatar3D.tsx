import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment, ContactShadows } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

type CompanionState = "happy" | "playful" | "neutral" | "shy" | "hurt" | "distant" | "cold";

const stateColors: Record<CompanionState, string> = {
  happy: "#10B981",
  playful: "#F59E0B",
  neutral: "#8B5CF6",
  shy: "#EC4899",
  hurt: "#EF4444",
  distant: "#374151",
  cold: "#1E3A5F",
};

function CoreOrb({ state }: { state: CompanionState }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = stateColors[state];

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[0, 0.3, 0]}>
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  );
}

function InnerGlow({ state }: { state: CompanionState }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = stateColors[state];

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.8, 32, 32]} position={[0, 0.3, 0]}>
      <meshStandardMaterial
        color="#ffffff"
        emissive={color}
        emissiveIntensity={1.2}
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

function OrbitRings({ state }: { state: CompanionState }) {
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const color = stateColors[state];

  useFrame((_, delta) => {
    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.8;
    if (ringRef2.current) ringRef2.current.rotation.z -= delta * 0.5;
  });

  return (
    <>
      <mesh ref={ringRef1} position={[0, 0.3, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ringRef2} position={[0, 0.3, 0]} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.1, 0.015, 16, 100]} />
        <meshStandardMaterial color="#F4623A" emissive="#F4623A" emissiveIntensity={0.6} transparent opacity={0.4} />
      </mesh>
    </>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#A78BFA" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

interface CompanionAvatar3DProps {
  state?: CompanionState;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function CompanionAvatar3D({ state = "neutral", className = "", size = "md" }: CompanionAvatar3DProps) {
  const sizeMap = { sm: "h-32 w-32", md: "h-48 w-48", lg: "h-72 w-72" };

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#8B5CF6" />
          <pointLight position={[-5, -2, 3]} intensity={0.4} color="#F4623A" />
          <CoreOrb state={state} />
          <InnerGlow state={state} />
          <OrbitRings state={state} />
          <Particles />
          <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={5} blur={2} color="#6C3DE8" />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
