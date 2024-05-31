import React from "react";

import { Billboard } from "@/features/billboard";
import db from "@/db";
import { cache } from "@/lib/chace";

const getBillboard = cache(
  (section: string) => {
    return db.billboard.findFirst({
      where: { section },
    });
  },
  ["/product", "getBillboard"],
  { revalidate: 60 * 60 }
);

const Banner = async () => {
  const banner = await getBillboard("category");
  return (
    <>
      <Billboard data={banner} />
    </>
  );
};

export default Banner;
