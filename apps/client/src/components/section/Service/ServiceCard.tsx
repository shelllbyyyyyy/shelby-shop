import React from "react";

type ServiceCardProps = {
  img: React.ReactElement;
  label: string;
  subtext: string;
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  img,
  label,
  subtext,
}) => {
  return (
    <div className="flex rounded-xl items-center gap-5">
      {img}
      <div className="flex flex-col text-start">
        <h3 className="font-bold">{label}</h3>
        <p className=" text-slate-gray">{subtext}</p>
      </div>
    </div>
  );
};
