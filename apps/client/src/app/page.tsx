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
      <GuestRoute>
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
      </GuestRoute>
    </>
  );
}
