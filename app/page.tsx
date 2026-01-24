import BlenderModel from "./components/BlenderModel";
import { NavBar } from "./components/NavBar";

export default function Home() {

  return (
    <>
      <NavBar />
      <div className="flex flex-col h-[calc(100vh-200px)] w-full relative">
        <div className='w-[80%] h-[40%] mx-[10%]'>
          <BlenderModel path={'/vhetra-logo.glb'} type="animated" scale={2.5} />
        </div>
        <div className='w-[90%] h-[25%] mx-[5%]'>
          <BlenderModel path={'/vhetra-texto.glb'} type="simple" scale={1.8} />
        </div>
      </div>
    </>
  );
}
