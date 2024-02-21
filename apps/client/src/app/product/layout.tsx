import NavigationBar from "@/components/elements/Navigationbar";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      <main className="mt-16 md:mt-32">{children}</main>
    </>
  );
}
