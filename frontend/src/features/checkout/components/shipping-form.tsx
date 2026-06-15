"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { shippingSchema, type ShippingFormData } from "../schemas";

interface ShippingFormProps {
  defaultValues: ShippingFormData;
  onNext: (data: ShippingFormData) => void;
}

export function ShippingForm({ defaultValues, onNext }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Full Name
          </label>
          <Input placeholder="John Doe" {...register("fullName")} />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Email
          </label>
          <Input type="email" placeholder="john@example.com" {...register("email")} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Phone
          </label>
          <Input placeholder="+1 (555) 000-0000" {...register("phone")} />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Address
          </label>
          <Input placeholder="123 Main Street" {...register("address")} />
          {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            City
          </label>
          <Input placeholder="New York" {...register("city")} />
          {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            State
          </label>
          <Input placeholder="NY" {...register("state")} />
          {errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Postal Code
          </label>
          <Input placeholder="10001" {...register("postalCode")} />
          {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Country
          </label>
          <Input placeholder="United States" {...register("country")} />
          {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" variant="black" size="lg" className="uppercase tracking-widest">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
}
