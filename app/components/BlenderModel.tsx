'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene } = useGLTF(path); // path relative to /public
    console.log(useGLTF(path).materials);

    return <primitive object={scene} scale={scale} />;
}

function RotatingModel({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene } = useGLTF(path); // path to your Blender export
    const ref = useRef<Mesh>(null);

    // Continuous rotation effect
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.5; // rotate around Y axis
        }
    });

    return <primitive object={scene} ref={ref} scale={scale} />;
}


export default function BlenderModel({ path, rotate, scale }: { path: string, rotate: boolean, scale?: number }) {
    useGLTF.preload(path);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    {rotate && <RotatingModel path={path} scale={scale} />}
                    {!rotate && <Model path={path} scale={scale} />}
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
