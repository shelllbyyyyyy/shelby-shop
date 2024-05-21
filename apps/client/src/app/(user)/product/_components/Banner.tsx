import React from "react";

import { Billboard } from "@/features/billboard";
import db from "@/db";

const getBillboard = async (section: string) => {
  return await db.billboard.findFirst({
    where: { section },
  });
};

const Banner = async () => {
  const banner = await getBillboard("category");
  return (
    <>
      <Billboard data={banner} />
    </>
  );
};

export default Banner;
