import Footer from "@/components/elements/Footer";
import NavigationBar from "@/components/elements/Navigationbar";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      <main className="relative flex flex-col min-h-screen max-sm:mb-16 mt-20 sm:mt-32 ">
        <div className="flex-grow flex-1">{children}</div>
      </main>
      <Footer />
    </>
  );
}
