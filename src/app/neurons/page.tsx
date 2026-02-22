import { Header } from "@/components/header";
import { ConceptFlow } from "@/components/concept-flow";

export default function NeuronsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Header />
            <main className="mx-auto w-full">
                <ConceptFlow />
            </main>
        </div>
    );
}
