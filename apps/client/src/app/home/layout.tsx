import Footer from "@/components/elements/Footer";
import NavigationBar from "@/components/elements/Navigationbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      <main className="mt-20 md:mt-32 h-screen">{children}</main>
      <Footer />
    </>
  );
}
