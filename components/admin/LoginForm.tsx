"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/admin/actions";
import type { FormState } from "@/lib/form";
import { Icon } from "@/components/Icons";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full" disabled={pending}>
      {pending ? "Checking…" : "Sign in"}
    </button>
  );
}

export function LoginForm({ from }: { from: string }) {
  const [state, formAction] = useFormState<FormState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="from" value={from} />
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="w-full rounded-xl2 border border-hair bg-transparent px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {state.error && (
        <p className="flex items-center gap-2 rounded-xl2 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <Icon name="close" width={16} height={16} />
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
