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
        className="relative flex flex-col w-full bg-black rounded border border-zinc-700
          hover:border-zinc-500 hover:-translate-y-1 hover:z-30
          transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group p-5 overflow-hidden"
        style={{ aspectRatio: "3/5" }}
      >
        <h3 className="text-left text-tiza text-base sm:text-lg md:text-xl lg:text-[1.75rem] font-extralight tracking-[0.15em] uppercase leading-[1.05] max-w-[75%]">
          {displayName}
        </h3>
        <p
          className="
    absolute right-3 bottom-[-8px]
    text-tiza text-[5.5rem] sm:text-[6rem] lg:text-[7rem] xl:text-[8rem]
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
