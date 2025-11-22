import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import HeroModel from './HeroModel';
import * as THREE from 'three';
import ScrollFollowCamera from './camera';

const HeroExp = () => {


    useEffect(() => {
        const canvast = document.querySelector('canvas');

        if (canvast) {
        canvast.style.background = 'linear-gradient(to bottom, #74ABE2, #5563DE)'
        }
    }, []);

    return (
        <Canvas camera={{ fov: 75 }}>
            <Suspense fallback={null}>
                <directionalLight position={[0, 0, 5]} color="#ffff" />
                <OrbitControls 
                    // enableRotate={false}
                    // enableZoom={false}
                    // enablePan={false}
                />
                <ScrollFollowCamera />
                <ambientLight intensity={1} />
                <hemisphereLight skyColor={0xffffbb} groundColor={0x080820} intensity={.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <HeroModel />
            </Suspense>
        </Canvas>
    )
}

export default HeroExp
