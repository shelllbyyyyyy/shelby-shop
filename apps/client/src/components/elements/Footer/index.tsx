import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Container from "../Container";
import Wrapper from "../Wrapper";
import { footerLinks, socialMedia } from "@/constants";
import { footerLogo } from "@/assets/images";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col justify-center items-center h-auto w-full gap-10 bg-primary text-white px-5 py-5 md:px-20 md:py-10 mt-5">
        <Container>
          <section>
            <div className="flex flex-col md:flex-row justify-between items-start w-full gap-10 md:gap-20">
              <div className="flex flex-col items-start">
                <a href="/">
                  <h1 className="text-lg md:text-4xl font-bold uppercase">
                    <span className="text-red-500">S</span>helby.Shop
                  </h1>
                </a>
                <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
                  Get clothes ready at this store. Find Your perfect Outfit In
                  Store. Get Rewards
                </p>
                <div className="flex items-center gap-5 mt-8">
                  {socialMedia.map((icon) => (
                    <div
                      className="flex justify-center items-center w-12 h-12 bg-white rounded-full"
                      key={icon.alt}
                    >
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={24}
                        height={24}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 justify-items-end items-start gap-5 md:gap-10">
                {footerLinks.map((section) => (
                  <div key={section.title}>
                    <h4 className="font-montserrat text-2xl leading-normal font-medium mb-6 text-white">
                      {section.title}
                    </h4>
                    <ul>
                      {section.links.map((link) => (
                        <li
                          className="mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray"
                          key={link.name}
                        >
                          <a href={link.link}>{link.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="subscripe"
            className="flex flex-col w-full justify-center items-center gap-2 mt-8"
          >
            <h3 className="text-2xl uppercase">Subscripe to our newsletter</h3>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <Input
                type="text"
                placeholder="Your email address"
                className="text-primary"
              />
              <Button>Join</Button>
            </div>
            Copyright &copy; 2024 Shelby.Shop. All right reserved
          </section>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
