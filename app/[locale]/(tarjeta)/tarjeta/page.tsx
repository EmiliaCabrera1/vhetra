import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  params: Promise<{ locale: string }>;
};

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493875038714";
const CONTACTOS = [
  {
    id: 1,
    img: "/icons/instagramIco.svg",
    titleKey: "instagramTitle" as const,
    actionKey: "instagramAction" as const,
    href: "https://www.instagram.com/holavhetra/",
  },
  {
    id: 2,
    img: "/icons/gmailIco.svg",
    titleKey: "gmailTitle" as const,
    actionKey: "gmailAction" as const,
    href: "mailto:hola.vhetra@gmail.com",
  },
  {
    id: 3,
    img: "/icons/whatsappIco.svg",
    titleKey: "whatsappTitle" as const,
    actionKey: "whatsappAction" as const,
    href: "",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://vhetra.com.ar";

  return {
    alternates: {
      canonical: `${baseUrl}/${locale}/tarjeta`,
      languages: {
        es: `${baseUrl}/es/tarjeta`,
        en: `${baseUrl}/en/tarjeta`,
      },
    },
    openGraph: {
      url: `${baseUrl}/${locale}/tarjeta`,
    },
  };
}

export default async function TarjetaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tarjeta");
  const tContact = await getTranslations("contact");

  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    tContact("whatsappMessage"),
  )}`;
  const contactos = CONTACTOS.map((c) => ({
    ...c,
    href: c.titleKey === "whatsappTitle" ? whatsappHref : c.href,
    title: tContact(c.titleKey),
    action: tContact.rich(c.actionKey, { br: () => <br /> }),
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F7F7] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,40,17,0.1),transparent_42%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col justify-center gap-8 rounded-4xl border border-black/5 bg-white/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur sm:p-8 lg:flex-row lg:items-center lg:gap-12 lg:p-12">
        <div className="max-w-2xl flex-1">
          <p className="mb-4 font-manrope text-xs uppercase tracking-[0.2em] text-black/50 sm:mb-5">
            {tContact("eyebrow")}
          </p>

          <h1 className="font-khanda text-5xl font-light uppercase leading-[0.82] tracking-[-0.075em] text-black sm:text-6xl lg:text-[5.4rem]">
            VHETRA<span className="text-[#A82811]">.</span>
          </h1>

          <p className="mt-4 max-w-xl font-khanda text-2xl font-light uppercase leading-[0.95] tracking-[-0.04em] text-black sm:text-3xl">
            {t("tagline")}
          </p>

          <p className="mt-3 max-w-xl font-manrope text-sm leading-7 text-black/70 sm:text-base">
            {t("description")}
          </p>

          <Link
            href="https://www.vhetra.com.ar"
            className="mt-6 inline-flex items-center rounded-full border border-[#A82811]/20 bg-[#A82811]/10 px-4 py-2 font-manrope text-sm font-semibold uppercase tracking-[0.18em] text-[#A82811] transition-colors duration-300 hover:bg-[#A82811]/20"
          >
            {t("website")}
          </Link>
        </div>

        <div className="w-full max-w-xl">
          <div className="flex flex-col gap-3 sm:gap-4">
            {contactos.map((contacto, index) => (
              <Link
                key={contacto.titleKey}
                href={contacto.href}
                className={twMerge(
                  "group flex w-full items-center gap-3 rounded-2xl border border-black/10 bg-[#111111] p-4 text-[#F5F0EA] shadow-[4px_4px_16px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_24px_rgba(0,0,0,0.2)] sm:p-5",
                  index % 2 === 0 ? "sm:translate-x-3" : "sm:-translate-x-3",
                )}
              >
                <Image
                  src={contacto.img}
                  alt={contacto.title}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
                />
                <div className="flex min-w-0 flex-col">
                  <span className="text-base font-semibold uppercase leading-tight text-[#F5F0EA] sm:text-lg">
                    {contacto.title}
                  </span>
                  <span className="mt-1 text-sm leading-5 text-[#F5F0EA]/80 sm:text-[0.95rem]">
                    {contacto.action}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
