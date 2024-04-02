import { services } from "@/constants";
import { ServiceCard } from "./ServiceCard";

export const Services = () => {
  return (
    <section className="flex justify-center flex-wrap gap-9 px-5 py-5 md:px-20 md:py-10">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          img={service.img}
          label={service.label}
          subtext={service.subtext}
        />
      ))}
    </section>
  );
};
