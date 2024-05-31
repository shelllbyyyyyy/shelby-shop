import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import db from "@/db";
import { Billboard } from "@/features/billboard";
import { cache } from "@/lib/chace";

const getBillboard = cache(
  async (section: string) => {
    return await db.billboard.findFirst({
      where: { section },
    });
  },
  ["/", "getBillboard"],
  { revalidate: 60 * 60 }
);

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
