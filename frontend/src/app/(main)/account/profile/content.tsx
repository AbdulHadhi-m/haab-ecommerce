"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { updateProfileSchema, type UpdateProfileFormValues } from "@/features/user/schemas";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useUpdateProfile } from "@/features/user/hooks/useUpdateProfile";

function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-48 bg-brand-200 rounded" />
      <div className="space-y-2">
        <div className="h-4 w-12 bg-brand-200 rounded" />
        <div className="h-10 w-full bg-brand-100 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-12 bg-brand-200 rounded" />
        <div className="h-10 w-full bg-brand-100 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-12 bg-brand-200 rounded" />
        <div className="h-10 w-full bg-brand-100 rounded" />
      </div>
      <div className="h-12 w-40 bg-brand-200 rounded" />
    </div>
  );
}

export function ProfilePageContent() {
  const { data: profile, isLoading } = useProfile();
  const { mutate, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: "", phone: "" },
  });

  useEffect(() => {
    if (profile) {
      reset({ name: profile.name, phone: profile.phone ?? "" });
    }
  }, [profile, reset]);

  const onSubmit = (values: UpdateProfileFormValues) => {
    mutate(values);
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-6" noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium uppercase tracking-wide text-brand-900">
          Name
        </label>
        <Input id="name" placeholder="Your name" disabled={isPending} {...register("name")} />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium uppercase tracking-wide text-brand-900">
          Email
        </label>
        <Input id="email" value={profile?.email ?? ""} disabled readOnly className="text-brand-500" />
        <p className="text-xs text-brand-500">Email cannot be changed.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium uppercase tracking-wide text-brand-900">
          Phone
        </label>
        <Input id="phone" placeholder="Your phone number" disabled={isPending} {...register("phone")} />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <Button type="submit" variant="black" size="lg" className="uppercase tracking-widest" disabled={isPending || !isDirty}>
        {isPending ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}
