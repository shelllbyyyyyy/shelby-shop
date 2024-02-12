import Container from "@/components/elements/Container";
import NavigationBar from "@/components/elements/Navigationbar";
import Footer from "@/components/elements/Footer";

import { Button } from "@/components/ui/button";
import GuestRoute from "@/components/provider/guest-routes";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <GuestRoute>
        <NavigationBar />
        <Container>
          <div className="flex flex-col w-full justify-center items-center h-screen text-center gap-2 md:gap-1">
            <h3 className="text-sm md:text-md">Meet shelby</h3>
            <h1 className="text-4xl md:text-6xl">E-Commerce Simplified</h1>
            <Link href="/home">
              <Button size="lg">START SHOPPING</Button>
            </Link>
          </div>
        </Container>
        <Footer />
      </GuestRoute>
    </>
  );
}
