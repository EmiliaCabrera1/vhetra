export default function Servicios() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        id="card-servicios"
        className="
            relative 
            w-36 h-32 
            bg-blanco
            rounded-lg 
            shadow-[5px_5px_5px_0px_rgba(16,17,17,0.55)]
            overflow-visible
            transform
            hover:scale-105 
            hover:shadow-[10px_10px_20px_rgba(16,17,17,0.4)]
            hover:z-10
            transition-transform 
            duration-500 
            ease-[cubic-bezier(0.19,1,0.22,1)]
          "
      >
        <h3 className="absolute left-3 top-6 text-azul text-xl font-normal">
          LANDING PAGE
        </h3>

        <p className="absolute left-16 top-16 text-center text-gris text-8xl font-normal font-['Khand'] [text-shadow:_5px_5px_5px_rgb(53_59_66_/_0.55)]">
          07
        </p>
      </div>
      <div id="pop-up" className="w-80 h-96 relative rounded-lg">
        <div className="w-80 h-96 left-0 top-0 absolute bg-blanco rounded-lg shadow-[5px_5px_5px_0px_rgba(0,0,0,0.55)] overflow-hidden">
          <h2 className="left-[14px] top-[27px] absolute text-center justify-start text-azul text-xl font-normal font-['Khand']">
            E-COMMERCE
          </h2>
          <p className="left-[26px] top-[78px] absolute justify-start text-azul text-xl font-normal font-['Khand']">
            MINI DESCRIPCION , RANGO DE COSTOS, <br />
            BLA BLA
          </p>

          <button className="left-[100px] top-[189px] absolute w-36 h-7 left-[149px] top-[189px] absolute bg-azul rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] text-center justify-start text-neutral-100 text-xl font-normal font-['Khand']">
            CONTACTAR
          </button>
          <img
            className="w-3.5 h-3.5 left-[277px] top-[16px] absolute"
            src="/img/cerrar.svg"
            alt="Cerrar"
          />
        </div>
        <div className="w-24 h-32 left-[200px] top-[330px] absolute text-center justify-start text-gris text-8xl font-normal font-['Khand'] [text-shadow:_5px_5px_5px_rgb(53_59_66_/_0.55)]">
          02
        </div>
      </div>
    </div>
  );
}
