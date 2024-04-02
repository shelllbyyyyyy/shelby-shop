import Container from "@/components/elements/Container";
import NavigationBar from "@/components/elements/Navigationbar";
import Footer from "@/components/elements/Footer";
import GuestRoute from "@/components/provider/guest-routes";
import {
  CustomerReviews,
  Hero,
  PopularProduct,
  Services,
} from "@/components/section";

export default function LandingPage() {
  return (
    <>
      {/* <GuestRoute> */}
      <NavigationBar />
      <main className="w-full">
        <Container>
          <section>
            <Hero />
          </section>
          <section>
            <PopularProduct />
          </section>
          <section>
            <Services />
          </section>
          <section>
            <CustomerReviews />
          </section>
        </Container>
      </main>

      <Footer />

      {/* </GuestRoute> */}
    </>
  );
}
