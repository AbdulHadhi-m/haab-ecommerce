import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your HAAB account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
            Welcome Back
          </h1>
          <p className="mt-3 text-sm text-brand-600">
            Sign in to your account to continue
          </p>
        </div>
        <div className="border border-brand-200 bg-white px-8 py-10 sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
