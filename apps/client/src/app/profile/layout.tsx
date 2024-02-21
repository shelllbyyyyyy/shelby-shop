import Footer from "@/components/elements/Footer";
import NavigationBar from "@/components/elements/Navigationbar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      <main className="mt-16 md:mt-28">{children}</main>
      <Footer />
    </>
  );
}
