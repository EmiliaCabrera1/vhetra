import { Servicio } from "../model/servicio.type";

interface CardChicaProps {
  servicio: Servicio;
  onClick?: () => void;
}

const CardChica = ({ servicio, onClick }: CardChicaProps) => {
  const { id, name, displayName } = servicio;

  return (
    <button onClick={onClick} className="z-20 w-full text-left">
      <div
        id={`card-${name}`}
        className="relative flex flex-col w-full bg-black bg-cover bg-center rounded border border-zinc-700
          hover:border-zinc-500 hover:-translate-y-1 hover:z-30
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group p-3 sm:p-4 lg:p-5 overflow-hidden"
        style={{
          aspectRatio: "3/4.35",
          backgroundImage: `url(${servicio.texture})`,
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/24" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28),transparent_45%,rgba(0,0,0,0.62))]" />
        <h3 className="relative z-10 text-left text-tiza text-sm sm:text-base md:text-lg lg:text-[1.45rem] xl:text-[1.6rem] font-extralight tracking-[0.12em] uppercase leading-[1.05] max-w-[82%]">
          {displayName}
        </h3>
        <p
          className="
    absolute z-10 right-3 bottom-[-8px]
    text-tiza text-[4rem] sm:text-[5rem] lg:text-[6rem] xl:text-[7rem]
    font-black leading-none select-none opacity-90
    translate-y-8 group-hover:translate-y-0
    transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
    group-hover:scale-105
  "
        >
          {Number(id).toString().padStart(2, "0")}
        </p>
      </div>
    </button>
  );
};

export default CardChica;
