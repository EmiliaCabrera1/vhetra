import BlenderModel from "./components/BlenderModel";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <main className="flex bg-[url(/bg.svg)] bg-no-repeat w-100.5 h-216">
        <div className='flex flex-col w-full mt-30'>
          <div className='w-[80%] h-[40%] mx-[10%]'>
            <BlenderModel path={'/vhetra-logo.glb'} rotate={true} scale={1.5} />
          </div>
          <div className='w-[90%] h-[25%] mx-[5%]'>
            <BlenderModel path={'/vhetra-texto.glb'} rotate={false} scale={3} />
          </div>
        </div>
      </main >
    </div >
  );
}
