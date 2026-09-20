"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { Lock, Mail, KeyRound, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import { signIn } from "@/lib/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-signal w-full justify-center py-2.5 text-sm font-semibold transition-all disabled:opacity-60"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Signing in…
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Lock size={15} />
          Sign in to Dashboard
        </span>
      )}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(signIn, null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("farhatullahtajak@gmail.com");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4 py-12 selection:bg-signal selection:text-signal-ink">
      <div className="w-full max-w-md">
        {/* Back link */}
        <div className="mb-6 flex justify-start">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to public portfolio
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-line bg-surface p-8 shadow-sm">
          {/* Header */}
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-signal/10 text-signal">
              <ShieldCheck size={26} />
            </div>
            <h1 className="font-display text-2xl font-bold text-ink">Admin Control Panel</h1>
            <p className="mt-1 text-sm text-muted">
              Sign in to edit your projects, skills, images, and settings.
            </p>
          </div>

          {/* Error Banner */}
          {state?.error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-600 dark:text-red-400">
              <p className="font-medium">{state.error}</p>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                <Mail size={13} />
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                required
                placeholder="you@example.com"
                className="field"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted">
                <KeyRound size={13} />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="field pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>

          {/* Footer note */}
          <div className="mt-6 border-t border-line pt-4 text-center">
            <p className="text-xs text-muted">
              Protected area for <strong>Farhat Ullah</strong>. All edits synchronize directly to your portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
