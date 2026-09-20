"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { submitContactForm, type ContactState } from "@/lib/actions/contact";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-signal disabled:opacity-60">
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

export default function Contact({
  email,
  location,
  whatsapp,
}: {
  email: string;
  location: string;
  whatsapp: string;
}) {
  const [state, formAction] = useFormState<ContactState, FormData>(submitContactForm, null);

  return (
    <section id="contact" className="rule bg-surface">
      <div className="container-page grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-ink">Let's Connect</h2>
          <p className="mt-4 max-w-prose text-muted">
            Whether you're interested in collaboration, technology, Data Science, AI, education, or a future
            project, I'd be happy to connect.
          </p>

          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3 text-ink">
              <Mail size={16} className="text-signal" /> {email}
            </li>
            <li className="flex items-center gap-3 text-ink">
              <MapPin size={16} className="text-signal" /> {location}
            </li>
            <li className="flex items-center gap-3 text-ink">
              <Phone size={16} className="text-signal" /> +{whatsapp}
            </li>
          </ul>
        </div>

        <form action={formAction} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm text-ink">Name</label>
              <input id="name" name="name" required className="field" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm text-ink">Email</label>
              <input id="email" name="email" type="email" required className="field" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="mb-1.5 block text-sm text-ink">Subject</label>
            <input id="subject" name="subject" className="field" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm text-ink">Message</label>
            <textarea id="message" name="message" rows={5} required className="field resize-none" />
          </div>

          {state && !state.ok && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
          {state && state.ok && <p className="text-sm text-signal">Thanks — your message has been sent.</p>}

          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
