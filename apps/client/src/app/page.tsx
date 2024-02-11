import Container from "@/components/elements/Container";
import NavigationBar from "@/components/elements/Navigationbar";
import Footer from "@/components/elements/Footer";

import { Button } from "@/components/ui/button";
import AuthRoutes from "@/components/provider/auth-routes";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <AuthRoutes>
        <NavigationBar />
        <Container className="flex flex-col h-screen w-full  justify-center items-center">
          <div className="text-center">
            <h3>Meet shelby</h3>
            <h1 className="text-5xl md:text-6xl">E-Commerce Simplified</h1>
            <Link href="/home">
              <Button size="lg">START SHOPPING</Button>
            </Link>
          </div>
        </Container>
        <Footer />
      </AuthRoutes>
    </>
  );
}
