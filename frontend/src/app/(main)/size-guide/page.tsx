import type { Metadata } from "next";
import { PageContainer } from "@/shared/components/elements/page-container";
import { SectionHeader } from "@/shared/components/elements/section-header";
import { SITE } from "@/constants";

export const metadata: Metadata = {
  title: "Size Guide",
  description: `${SITE.name} size guide and fit recommendations for men, women, and kids.`,
};

const sizeChart = [
  { size: "XS", chest: "34-36", waist: "28-30", hips: "34-36", inseam: "30" },
  { size: "S", chest: "36-38", waist: "30-32", hips: "36-38", inseam: "31" },
  { size: "M", chest: "38-40", waist: "32-34", hips: "38-40", inseam: "32" },
  { size: "L", chest: "40-42", waist: "34-36", hips: "40-42", inseam: "33" },
  { size: "XL", chest: "42-44", waist: "36-38", hips: "42-44", inseam: "34" },
  { size: "XXL", chest: "44-46", waist: "38-40", hips: "44-46", inseam: "34" },
];

export default function SizeGuidePage() {
  return (
    <PageContainer as="main" className="py-16 sm:py-24">
      <SectionHeader title="Size Guide" subtitle="Find your perfect fit" align="center" />
      <div className="mx-auto mt-12 max-w-3xl space-y-6 text-base leading-relaxed text-brand-700 sm:text-lg">
        <p className="text-brand-600">
          Measurements are in inches. If you are between sizes, we recommend sizing up for a
          more relaxed fit or sizing down for a slim fit.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-brand-200 bg-brand-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-brand-600">Size</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-brand-600">Chest</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-brand-600">Waist</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-brand-600">Hips</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-brand-600">Inseam</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr key={row.size} className="border-b border-brand-100">
                  <td className="px-4 py-3 font-semibold text-brand-900">{row.size}</td>
                  <td className="px-4 py-3 text-brand-600">{row.chest}</td>
                  <td className="px-4 py-3 text-brand-600">{row.waist}</td>
                  <td className="px-4 py-3 text-brand-600">{row.hips}</td>
                  <td className="px-4 py-3 text-brand-600">{row.inseam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-brand-500">
          Note: This is a general guide. Fit may vary slightly between product styles. Refer
          to individual product descriptions for specific fit notes.
        </p>
      </div>
    </PageContainer>
  );
}
