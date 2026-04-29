import { Header } from "@/components/header";
import { HumanLearningFlow } from "@/components/human-learning-flow";

export default function HumanLearningPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="mx-auto w-full">
        <HumanLearningFlow />
      </main>
    </div>
  );
}
