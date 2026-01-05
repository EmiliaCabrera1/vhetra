'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Group } from 'three';

function Model({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene } = useGLTF(path); // path relative to /public
    console.log(useGLTF(path).materials);

    return <primitive object={scene} scale={scale} receiveShadow />;
}

export function RotatingModel({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene } = useGLTF(path)
    const ref = useRef<Group>(null!)

    const [dragging, setDragging] = useState(false)

    const onPointerDown = () => setDragging(true)
    const onPointerUp = () => setDragging(false)
    const onPointerMove = (e: React.PointerEvent) => {
        if (dragging && ref.current) {
            ref.current.rotation.y += e.movementX * 0.005
            ref.current.rotation.x += e.movementY * 0.005
        }
    }

    // Optional continuous rotation
    useFrame((_, delta) => {
        if (ref.current && !dragging) {
            ref.current.rotation.y += delta * 0.5
        }
    })

    return (
        <group
            ref={ref}
            scale={scale}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerMove={onPointerMove}
            receiveShadow
        >
            <primitive object={scene} receiveShadow />
        </group>
    )
}


function AnimatedSquares({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene, animations } = useGLTF(path);
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        if (actions && actions[Object.keys(actions)[0]]) {
            actions[Object.keys(actions)[0]]?.play();
        }
    }, [actions]);

    return <primitive object={scene} scale={scale} receiveShadow />;
}


export default function BlenderModel({ path, type = 'simple', scale }: { path: string, type: 'autoRotate' | 'simple' | 'animated', scale?: number }) {
    useGLTF.preload(path);

    const renderModel = () => {
        switch (type) {
            case 'simple':
                return <Model path={path} scale={scale} />;
            case 'autoRotate':
                return <RotatingModel path={path} scale={scale} />;
            case 'animated':
                return <AnimatedSquares path={path} scale={scale} />;
            default:
                break;
        }
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <spotLight position={[0, 0, 5]} intensity={40} castShadow />
                <Suspense fallback={null}>
                    {renderModel()}
                </Suspense>
            </Canvas>
        </div>
    );
}
