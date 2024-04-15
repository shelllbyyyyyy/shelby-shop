import Footer from "@/components/elements/Footer";
import NavigationBar from "@/components/elements/Navigationbar";
import {
  CustomerReviews,
  Hero,
  NewDrop,
  PopularProduct,
  Services,
} from "@/components/section";

export default function LandingPage() {
  return (
    <>
      <NavigationBar />
      <main className="relative flex flex-col min-h-screen sm:mb-10 max-sm:mb-16 mt-16 sm:mt-28 space-y-16">
        <section>
          <Hero />
        </section>
        <section>
          <PopularProduct />
        </section>
        <section>
          <NewDrop />
        </section>
        <section>
          <Services />
        </section>
        <section>
          <CustomerReviews />
        </section>
      </main>
      <Footer />
    </>
  );
}
