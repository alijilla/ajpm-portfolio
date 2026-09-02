"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PresentationControls, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

// A single reusable glass material so we don't repeat code 4 times!
const GlassMaterial = () => (
  <MeshTransmissionMaterial
    backside={true}
    thickness={1}
    roughness={0}
    transmission={1}
    ior={1.5}
    chromaticAberration={0.4}
  />
);

function ResponsiveScene() {
  // size.width gives us the EXACT pixel width of the screen!
  const { size } = useThree();
  const isMobile = size.width < 768; // Anything smaller than an iPad

  // Refs for spinning the objects
  const knotRef = useRef<THREE.Mesh>(null);
  const sphereGroupRef = useRef<THREE.Group>(null);

  // Slowly rotate the objects every frame for that premium feel
  useFrame((state, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.2;
      knotRef.current.rotation.y += delta * 0.3;
    }
    if (sphereGroupRef.current) {
      sphereGroupRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <>
      {/* 1. THE TORUS KNOT (Left side) */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh 
          ref={knotRef}
          // On mobile: move closer to center (X: 0). On desktop: push left (X: -5)
          position={isMobile ? [0, 2, -2] : [-5, 0, -2]} 
          // Scale it down slightly on mobile so it fits
          scale={isMobile ? 1.2 : 2}
        >
          <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
          <GlassMaterial />
        </mesh>
      </Float>

      {/* 2. THE SPHERES (Right side) */}
      <group ref={sphereGroupRef}>
        {/* Sphere 1 */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={isMobile ? [1.5, -2, 0] : [3, 1, 0]}>
            <sphereGeometry args={[0.5, 64, 64]} />
            <GlassMaterial />
          </mesh>
        </Float>

        {/* Sphere 2 (Spaced out properly) */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <mesh position={isMobile ? [-1.5, -3, -1] : [4, -1.5, -1]}>
            <sphereGeometry args={[0.3, 64, 64]} />
            <GlassMaterial />
          </mesh>
        </Float>

        {/* Sphere 3 (Spaced out properly) */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
          <mesh position={isMobile ? [2, 1, -2] : [5, 2, -2]}>
            <sphereGeometry args={[0.4, 64, 64]} />
            <GlassMaterial />
          </mesh>
        </Float>
      </group>
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full">
      <Canvas dpr={[1, 2]}>
        {/* Pure white background for the glass to refract */}
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, -5]} color="#a855f7" intensity={2} />
      
        <React.Suspense fallback={null}>
          <Environment preset="studio" />
          
          {/* PresentationControls makes the whole scene tilt when the user drags it! */}
          <PresentationControls 
            global // Applies to the whole canvas
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]} // Restricts vertical tilt
            azimuth={[-Math.PI / 2, Math.PI / 2]} // Restricts horizontal tilt
          >
            <ResponsiveScene />
          </PresentationControls>

        </React.Suspense>
      </Canvas>
    </div>
  );
}