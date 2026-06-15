import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your ADIWEAR account.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
            Join ADIWEAR
          </h1>
          <p className="mt-3 text-sm text-brand-600">
            Create an account and start shopping
          </p>
        </div>
        <div className="border border-brand-200 bg-white px-8 py-10 sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
