"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ whatsapp, name }: { whatsapp: string; name: string }) {
  if (!whatsapp) return null;
  const message = encodeURIComponent(`Hello ${name.split(" ")[0]}, I visited your portfolio and would like to connect with you.`);
  const href = `https://wa.me/${whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Message on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={22} />
    </a>
  );
}
