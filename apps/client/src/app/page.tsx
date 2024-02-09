import Container from "@/components/elements/Container";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <Container className="flex flex-col h-screen w-full  justify-center items-center">
      <div className="text-center">
        <h3>Meet shelby</h3>
        <h1 className="text-5xl md:text-6xl">E-Commerce Simplified</h1>
        <Button size="lg">START SHOPPING</Button>
      </div>
    </Container>
  );
}
