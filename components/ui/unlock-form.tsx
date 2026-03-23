"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface UnlockFormProps {
  redirectTo: string;
}

export default function UnlockForm({ redirectTo }: UnlockFormProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await fetch("/api/unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin, redirect: redirectTo }),
        });

        if (res.ok) {
          const data = await res.json();
          window.location.href = data.redirect;
        } else {
          const data = await res.json().catch(() => ({}));
          setError(data.error ?? "Invalid PIN");
        }
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [pin, redirectTo],
  );

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="p-8 rounded-2xl border border-border bg-card shadow-lg">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-6 mx-auto">
            <Lock className="w-6 h-6 text-primary" />
          </div>

          <h1 className="text-xl font-bold text-center mb-2">
            Access Required
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Enter the PIN to view this portfolio.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="pin-input" className="sr-only">PIN</label>
              <input
                id="pin-input"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                autoFocus
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-center text-lg font-mono tracking-[0.3em] placeholder:tracking-normal placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            {error && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || pin.length === 0}
              className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Unlock"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
