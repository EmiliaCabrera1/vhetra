import BlenderModel from "./components/BlenderModel";

export default function Home() {

  return (
    <>
      <div className='w-[80%] h-[40%] mx-[10%]'>
        <BlenderModel path={'/vhetra-logo.glb'} type="autoRotate" scale={2.5} />
      </div>
      <div className='w-[90%] h-[25%] mx-[5%]'>
        <BlenderModel path={'/vhetra-texto.glb'} type="simple" scale={1.8} />
      </div>
    </>
  );
}
