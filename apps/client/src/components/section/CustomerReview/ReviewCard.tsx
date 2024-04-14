import React from "react";

import * as Icon from "lucide-react";

type ReviewCardProps = {
  imgUrl: {
    src: string;
    alt: string;
  };
  customerName: string;
  rating: number;
  feedback: string;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  imgUrl,
  customerName,
  rating,
  feedback,
}) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <img
        src={imgUrl.src}
        alt="customer"
        className="rounded-full object-cover w-[120px] h-[120px]"
      />
      <p className="mt-6 max-w-sm text-center info-text">{feedback}</p>
      <div className="mt-3 flex justify-center items-center gap-2.5">
        <Icon.StarIcon height={24} width={24} fill="orange" />
        <p className="text-xl font-montserrat text-slate-gray">({rating})</p>
      </div>
      <h3 className="mt-1 font-palanquin text-3xl text-center font-bold">
        {customerName}
      </h3>
    </div>
  );
};
