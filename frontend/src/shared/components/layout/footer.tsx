import Link from "next/link";
import { SITE } from "@/constants";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  help: {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
  customerService: {
    title: "Customer Service",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Track Order", href: "/track-order" },
      { label: "Payment Options", href: "/payment-options" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand-black text-white">
      <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-400">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-800 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-2xl font-black tracking-tightest text-white">
              {SITE.name}
            </span>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-brand-400 hover:text-white transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-sm text-brand-400 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-sm text-brand-400 hover:text-white transition-colors">
                Facebook
              </Link>
              <Link href="#" className="text-sm text-brand-400 hover:text-white transition-colors">
                TikTok
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-brand-500 sm:text-left">
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
