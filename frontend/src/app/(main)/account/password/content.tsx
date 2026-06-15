"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { changePasswordSchema, type ChangePasswordFormValues } from "@/features/user/schemas";
import { useChangePassword } from "@/features/user/hooks/useChangePassword";

export function PasswordPageContent() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (values: ChangePasswordFormValues) => {
    mutate(
      { currentPassword: values.currentPassword, newPassword: values.newPassword },
      { onSuccess: () => reset() },
    );
  };

  const inputProps = (field: keyof ChangePasswordFormValues, show: boolean) => ({
    type: show ? "text" : "password",
    ...register(field),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-6" noValidate>
      <div className="space-y-2">
        <label htmlFor="currentPassword" className="text-sm font-medium uppercase tracking-wide text-brand-900">
          Current Password
        </label>
        <div className="relative">
          <Input id="currentPassword" placeholder="Enter current password" autoComplete="current-password" disabled={isPending} {...inputProps("currentPassword", showCurrent)} />
          <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm uppercase tracking-wider text-brand-600 hover:text-brand-900 transition-colors" tabIndex={-1}>
            {showCurrent ? "Hide" : "Show"}
          </button>
        </div>
        {errors.currentPassword && <p className="text-xs text-red-500">{errors.currentPassword.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="newPassword" className="text-sm font-medium uppercase tracking-wide text-brand-900">
          New Password
        </label>
        <div className="relative">
          <Input id="newPassword" placeholder="Enter new password" autoComplete="new-password" disabled={isPending} {...inputProps("newPassword", showNew)} />
          <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm uppercase tracking-wider text-brand-600 hover:text-brand-900 transition-colors" tabIndex={-1}>
            {showNew ? "Hide" : "Show"}
          </button>
        </div>
        {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium uppercase tracking-wide text-brand-900">
          Confirm New Password
        </label>
        <div className="relative">
          <Input id="confirmPassword" placeholder="Confirm new password" autoComplete="new-password" disabled={isPending} {...inputProps("confirmPassword", showConfirm)} />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm uppercase tracking-wider text-brand-600 hover:text-brand-900 transition-colors" tabIndex={-1}>
            {showConfirm ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" variant="black" size="lg" className="uppercase tracking-widest" disabled={isPending}>
        {isPending ? "Changing…" : "Change Password"}
      </Button>
    </form>
  );
}
