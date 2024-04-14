import React from "react";

type ServiceCardProps = {
  img: any;
  label: string;
  subtext: string;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  img,
  label,
  subtext,
}) => {
  return (
    <div className="flex flex-col sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 items-center">
      {img}
      <h3 className="mt-5 font-palanquin text-3xl leading-normal font-bold">
        {label}
      </h3>
      <p className="mt-3 font-montserrat text-lg leading-normal text-slate-gray">
        {subtext}
      </p>
    </div>
  );
};
