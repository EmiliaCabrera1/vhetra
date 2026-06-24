"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Servicio } from "@/app/model/servicio.type";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const CardGrande = ({
  servicio,
  onClose,
}: {
  servicio: Servicio;
  onClose: () => void;
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const t = useTranslations("common");
  const tWhatsapp = useTranslations("whatsapp");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  const handleWhatsApp = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5493875038714";
    const message = tWhatsapp("message", { service: servicio.displayName });
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const modalContent = (
    <div className={`fixed inset-0 z-30 flex justify-center items-center pt-10 bg-black/30 modal-overlay ${isClosing ? "closing" : ""}`} onClick={handleClose}>
      <div id={`detalle-${servicio.name}`} className={`mx-auto z-40 w-[80%] sm:w-[60%] min-[1800px]:!w-[52%] max-h-[80vh] flex flex-col bg-card-grande sm:bg-card-grande-transparente rounded-lg shadow-[5px_5px_5px_0px_rgba(0,0,0,0.55)] overflow-hidden p-4 sm:p-10 min-[1800px]:!p-14 modal-content ${isClosing ? "closing" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="ml-auto shrink-0" onClick={handleClose}>
          <Image
            className="w-3.5 h-3.5 min-[1800px]:!h-5 min-[1800px]:!w-5"
            src="/icons/cerrar.svg"
            alt={t("close")}
            height={14}
            width={14}
          />
        </button>
        <h2 className="text-center text-tiza text-xl sm:text-2xl min-[1800px]:!text-[2.4rem] sm:mb-4 min-[1800px]:!mb-6 font-normal shrink-0">
          {servicio.displayName}
        </h2>
        <div className="detail-scrollbar font-manrope flex-1 min-h-0 overflow-y-auto mt-2 text-tiza text-sm sm:text-lg min-[1800px]:!text-xl min-[1800px]:!leading-8 pr-2">
          {servicio.descripcionCompleta}
        </div>
        <button
          className="ripple-btn ml-auto mt-4 w-32 rounded-lg bg-tiza p-2 text-center text-[clamp(1rem,4vw,1.25rem)] min-[1800px]:!text-[1.55rem] font-normal text-azulo shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:w-40 min-[1800px]:!w-52 shrink-0"
          onClick={handleWhatsApp}
        >
          {t("contact")}
        </button>
      </div>
    </div>
  );

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(modalContent, document.body);
};
