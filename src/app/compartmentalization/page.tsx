import { Header } from "@/components/header";
import { CompartmentalizationFlow } from "@/components/compartmentalization-flow";

export default function CompartmentalizationPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Header />
            <main className="mx-auto w-full">
                <CompartmentalizationFlow />
            </main>
        </div>
    );
}
