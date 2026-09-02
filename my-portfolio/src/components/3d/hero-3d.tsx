"use client";

import { useRef } from "react";
import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function SceneInfo() {
  const { viewport } = useThree();

  console.log(viewport.width);
  console.log(viewport.height);

  return null;
}

function RotatingSphere() {
  return (
    <>
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={1}
      >
        <mesh position={[-2, 0, 0]}>
          <sphereGeometry args={[0.5, 64, 64]} />
          <MeshTransmissionMaterial
            backside={true}
            color="white"
            thickness={0.5}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.04}
          />
        </mesh>
      </Float>

      <Float>
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[0.5, 64, 64]} />
          <MeshTransmissionMaterial
            backside={true}
            color="white"
            thickness={0.5}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.04}
          />
        </mesh>
      </Float>

      <Float>
        <mesh position={[-3, 0, 1]}>
          <torusKnotGeometry args={[0.5, 0.2, 128, 32]} />
          <MeshTransmissionMaterial
            backside={true}
            color="black"
            thickness={0.5}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.04}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-screen w-full">
      <Canvas dpr={[1, 2]}>
        <SceneInfo />
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, -5]} color="#a855f7" intensity={2} />
      
        
        {/* We wrap the Model in Suspense so it doesn't crash while downloading */}
        <React.Suspense fallback={null}>
         <Environment preset="studio" />
        <RotatingSphere />
        </React.Suspense>
        
       <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
