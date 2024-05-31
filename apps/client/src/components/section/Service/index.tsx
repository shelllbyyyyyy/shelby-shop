"use client";

import { services } from "@/constants";

import { ServiceCard } from "./ServiceCard";
import Container from "@/components/elements/Container";

export const Services = () => {
  return (
    <Container>
      <section className="grid sm:grid-cols-3 grid-cols-1 w-full bg-slate-200 border border-accent rounded-xl p-8 text-center gap-5">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            img={<service.img size={40} className="text-accent" />}
            label={service.label}
            subtext={service.subtext}
          />
        ))}
      </section>
    </Container>
  );
};
