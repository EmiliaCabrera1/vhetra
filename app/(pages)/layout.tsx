import Image from "next/image";
import { NavBar } from "../components/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="flex flex-col h-[calc(100vh-200px)] w-full relative">
        {children}
        <div className="absolute bottom-5 -right-6">
          <Image
            src="/img/medio-logo.png"
            alt="VHETRA"
            width={150}
            height={150}
            className="right-6"
          />
        </div></div>
    </>
  );
}
