import { useGLTF } from '@react-three/drei';


const HeroModel = () => {
    const { scene } = useGLTF('/models/models.glb');
    return (
        <mesh position={[0, -1, 60]}>
            <primitive object={scene} />
        </mesh>
    );
}

export default HeroModel