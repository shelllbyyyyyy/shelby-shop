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
        <section className="px-5 pt-10">
          <Hero />
        </section>
        <section>
          <Services />
        </section>
        <section>
          <PopularProduct />
        </section>
        <section>
          <NewDrop />
        </section>
        <section>
          <CustomerReviews />
        </section>
      </main>
      <Footer />
    </>
  );
}
