import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

const baseClasses = "w-full min-h-24 sm:min-h-[6.5rem] p-3 sm:p-4 gap-3 sm:gap-5 relative flex flex-row items-center text-tiza bg-card rounded-lg shadow-[5px_5px_5px_0px_rgba(16,17,17,0.55)] overflow-hidden";

const CardContacto = ({ id, img, title, action, href }: { id: number, img: string, title: string, action: ReactNode, href: string }) => {
    return (
        <Link href={href} id={`card-${id}`}
            className={twMerge(baseClasses, "ripple-btn", id % 2 === 0 && "sm:ml-[40px]")}>
            <Image className="flex h-11 w-12 shrink-0 sm:h-14 sm:w-16" src={img} alt={title} width={65} height={60} />
            <div className="flex min-w-0 flex-col">
                <div className="text-left justify-start text-[clamp(1rem,5vw,1.25rem)] leading-tight">{title}</div>
                <div className="text-left justify-start text-[clamp(0.82rem,3.8vw,1rem)] leading-tight">{action}</div>
            </div>
        </Link>)
}

export default CardContacto;
