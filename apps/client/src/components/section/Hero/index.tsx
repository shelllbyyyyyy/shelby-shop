import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import db from "@/db";
import { Billboard } from "@/features/billboard";

const getBillboard = (section: string) => {
  return db.billboard.findFirst({
    where: { section },
  });
};

export const Hero = async () => {
  const billboard = await getBillboard("hero");
  return (
    <>
      <Billboard
        data={billboard}
        className="flex flex-col sm:flex-row gap-4 mt-6"
      >
        <Link href="/home" className={buttonVariants()}>
          start shopping
        </Link>

        <Button variant="outline" className="text-white">
          Our quality promise &rarr;
        </Button>
      </Billboard>
    </>
  );
};
