import React from "react";
import Container from "../Container";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <>
      <nav className="bg-white-500 shadow px-20 py-10">
        <Container>
          <div className="flex justify-between gap-5">
            <div className="items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold uppercase">
                  <span className="text-red-500">S</span>helby.Shop
                </h1>
              </Link>
            </div>
            <div className="flex justify-center items-center gap-5 md:gap-8 text-sm font-bold">
              <Link href="/home">
                <h2 className="hover:text-accent">Home</h2>
              </Link>
              <Link href="/product">
                <h2 className="hover:text-accent">Our Product</h2>
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default NavigationBar;
