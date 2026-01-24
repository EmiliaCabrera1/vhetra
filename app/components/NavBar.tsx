'use client'
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import Link from "next/link";

const pageSections = [
    { displayName: "Inicio", location: "/" },
    { displayName: "Servicios", location: "servicios" },
    { displayName: "Proyectos", location: "proyectos" },
    { displayName: "Filosofía", location: "filosofia" },
    { displayName: "Contacto", location: "contacto" }
]

const menuClassNames = "text-lg font-ligth opacity-80 transition-all duration-300 ease-out hover:scale-150 hover:font-medium hover:opacity-100"
const menuClassNamesSelected = "text-lg scale-150 font-medium opacity-100"

export const NavBar = () => {

    const pathname = usePathname();
    const home = pathname === "/";

    return (
        <nav className="w-full h-50 py-6 text-blanco">
            {!home && < Link
                href="/"
                className="block text-center my-6 h-16"
                aria-label="Ir al inicio"
            >
                <div className="w-full mx-10">
                    <Image
                        src="/img/vhetra.png"
                        alt="VHETRA"
                        width={300}
                        height={50}
                    />
                </div>
            </Link>}
            <ul className={twMerge(home ? 'mt-18' : '', "flex justify-center gap-6 items-center")}>
                {pageSections.map((section) => (
                    <li key={section.location} className="flex items-center">
                        <Link
                            href={section.location}
                            className={twMerge(pathname === `/${section.location}` ? menuClassNamesSelected : menuClassNames)}
                        >
                            {section.displayName}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav >
    )
}





