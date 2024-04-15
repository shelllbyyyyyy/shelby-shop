"use client";

import { services } from "@/constants";

import { ServiceCard } from "./ServiceCard";
import Container from "@/components/elements/Container";

export const Services = () => {
  return (
    <Container>
      <section className="flex justify-center items-center text-center flex-wrap gap-9 px-5 py-5 md:px-20 md:py-10 bg-slate-200 border border-slate-100 rounded-xl">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            img={<service.img size={40} />}
            label={service.label}
            subtext={service.subtext}
          />
        ))}
      </section>
    </Container>
  );
};
