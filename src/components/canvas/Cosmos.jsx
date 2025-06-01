import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import CanvasLoader from '../Loader';

const Cosmos = (props) => {

    //useRef - hook to preserve value between renders / keep track of things without changing
    const ref = useRef();

    //sphere =  generating a set of 5000 random points within a sphere. The sphere is centered at the origin (0, 0, 0) with a radius of 1.2 units. 
    const sphere = random.inCircle(new Float32Array(1000), { radius: 4 })

    //useFrame allows you to execute code on every rendered frame
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    })
    //store current rotation and decrement it constantly by delta / 10 to get rotation

    //The group element is used to define a group of elements to be used in complex type definitions.
    return (
        //whole group rotating
        <group rotation={[0.01, 0.01, Math.PI / 4]}>
            <Points                     //Helper to get Points on screen
                ref={ref}               //ref keeps track of Cosmos 
                positions={sphere}      //put these spheres in positions
                stride={3}              //gap between each point
                frustumCulled           //if point is outside screen - get rid of it
                {...props}              //passing props
            >
            <PointMaterial              //Helper to get Material to Points
                transparent             //transparent
                color="red"         //color
                size={0.03}            //size of points
                sizeAttenuation={true}  //things get smaller as they get farther away from you
                depthWrite={false}      //don't draw on top of other things
            />
            </Points>
        </group>
    )
}

//Putting Cosmos into Canvas
const CosmosCanvas = () => {
    return (
        //Suspense makes sure everything is ready(loaded) before showing canvas.
        //Preload gathers Points and Point Material beforehand, and assigns them to Cosmos
        <div className='absolute inset-0'>
            <Canvas>
                <Suspense fallback={<CanvasLoader />}>
                    <Cosmos />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}

export default CosmosCanvas