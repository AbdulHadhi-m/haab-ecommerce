"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Pencil, Trash2, Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { addressSchema, type AddressFormValues } from "@/features/user/schemas";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useAddAddress, useUpdateAddress, useRemoveAddress, useSetDefaultAddress } from "@/features/user/hooks/useAddresses";
import type { Address } from "@/features/user/types";

function AddressSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-lg border border-brand-200 p-4 space-y-2">
          <div className="h-5 w-32 bg-brand-200 rounded" />
          <div className="h-4 w-48 bg-brand-100 rounded" />
          <div className="h-4 w-64 bg-brand-100 rounded" />
          <div className="h-4 w-36 bg-brand-100 rounded" />
        </div>
      ))}
    </div>
  );
}

function AddressForm({ initialValues, onSubmit, isPending, onCancel }: {
  initialValues?: AddressFormValues;
  onSubmit: (values: AddressFormValues) => void;
  isPending: boolean;
  onCancel?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialValues ?? {
      label: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      isDefault: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-900">Label</label>
          <Input placeholder="e.g. Home, Office" disabled={isPending} {...register("label")} />
          {errors.label && <p className="text-xs text-red-500">{errors.label.message}</p>}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-900">First Name</label>
          <Input disabled={isPending} {...register("firstName")} />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-900">Last Name</label>
          <Input disabled={isPending} {...register("lastName")} />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-wide text-brand-900">Address</label>
        <Input disabled={isPending} {...register("address")} />
        {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-900">City</label>
          <Input disabled={isPending} {...register("city")} />
          {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-900">State</label>
          <Input disabled={isPending} {...register("state")} />
          {errors.state && <p className="text-xs text-red-500">{errors.state.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-900">ZIP Code</label>
          <Input disabled={isPending} {...register("zipCode")} />
          {errors.zipCode && <p className="text-xs text-red-500">{errors.zipCode.message}</p>}
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-wide text-brand-900">Phone</label>
        <Input disabled={isPending} {...register("phone")} />
        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" disabled={isPending} {...register("isDefault")} />
        Set as default address
      </label>
      <div className="flex gap-3">
        <Button type="submit" variant="black" disabled={isPending}>
          {isPending ? "Saving…" : "Save Address"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export function AddressPageContent() {
  const { data: profile, isLoading } = useProfile();
  const { mutate: addAddress, isPending: isAdding } = useAddAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();
  const { mutate: removeAddress, isPending: isRemoving } = useRemoveAddress();
  const { mutate: setDefaultAddress, isPending: isSettingDefault } = useSetDefaultAddress();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addresses = profile?.addresses ?? [];
  const editingAddress = editingId ? addresses.find((a) => a._id === editingId) : null;

  const handleAdd = (values: AddressFormValues) => {
    addAddress(values, { onSuccess: () => setShowAddForm(false) });
  };

  const handleEdit = (values: AddressFormValues) => {
    if (!editingId) return;
    updateAddress({ addressId: editingId, ...values } as any, { onSuccess: () => setEditingId(null) });
  };

  const handleRemove = (addressId: string) => {
    if (window.confirm("Are you sure you want to remove this address?")) {
      removeAddress(addressId);
    }
  };

  if (isLoading) return <AddressSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-500">
          {addresses.length} saved {addresses.length === 1 ? "address" : "addresses"}
        </p>
        <Button variant="black" size="sm" onClick={() => { setShowAddForm(true); setEditingId(null); }}>
          Add Address
        </Button>
      </div>

      {showAddForm && (
        <div className="rounded-lg border border-brand-200 p-4">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-900">New Address</h3>
          <AddressForm onSubmit={handleAdd} isPending={isAdding} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingAddress && (
        <div className="rounded-lg border border-brand-200 p-4">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-brand-900">Edit Address</h3>
          <AddressForm
            initialValues={{
              label: editingAddress.label,
              firstName: editingAddress.firstName,
              lastName: editingAddress.lastName,
              address: editingAddress.address,
              city: editingAddress.city,
              state: editingAddress.state,
              zipCode: editingAddress.zipCode,
              phone: editingAddress.phone,
              isDefault: editingAddress.isDefault,
            }}
            onSubmit={handleEdit}
            isPending={isUpdating}
            onCancel={() => setEditingId(null)}
          />
        </div>
      )}

      {addresses.length === 0 && !showAddForm ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-300 py-12 text-center">
          <MapPin className="mb-2 h-8 w-8 text-brand-400" />
          <p className="text-sm font-medium text-brand-600">No addresses saved yet</p>
          <p className="mt-1 text-xs text-brand-500">Add a shipping address to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => {
            const isEditing = editingId === address._id;
            if (isEditing) return null;

            return (
              <div key={address._id} className="relative rounded-lg border border-brand-200 p-4">
                {address.isDefault && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-900 px-2.5 py-0.5 text-xs font-medium text-white">
                    <Star className="h-3 w-3 fill-current" />
                    Default
                  </span>
                )}
                <p className="mb-1 text-sm font-semibold text-brand-900">{address.label}</p>
                <p className="text-sm text-brand-700">
                  {address.firstName} {address.lastName}
                </p>
                <p className="text-sm text-brand-600">{address.address}</p>
                <p className="text-sm text-brand-600">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-sm text-brand-600">{address.phone}</p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { setEditingId(address._id); setShowAddForm(false); }} disabled={isUpdating}>
                    <Pencil className="mr-1 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleRemove(address._id)} disabled={isRemoving}>
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Delete
                  </Button>
                  {!address.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => setDefaultAddress(address._id)} disabled={isSettingDefault}>
                      Set as Default
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
