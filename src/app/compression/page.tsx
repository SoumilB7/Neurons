import type { Metadata } from "next";
import { Header } from "@/components/header";
import { CompressionFlow } from "@/components/compression-flow";

export const metadata: Metadata = {
  title: "Compression & Intelligence",
  description:
    "Why making data smaller means predicting it, why predicting the unseen forces a model of the world, and why that model is what we mean by intelligence.",
};

export default function CompressionPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto w-full">
        <CompressionFlow />
      </main>
    </div>
  );
}
