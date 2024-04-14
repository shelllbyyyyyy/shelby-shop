import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Container from "../Container";
import { footerLinks, socialMedia } from "@/constants";

import { cn } from "@/lib/utils";

type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <>
      <footer
        className={cn(
          "flex flex-col h-auto w-full gap-10 bg-primary text-white",
          className
        )}
      >
        <Container className="w-full px-5 py-5 md:px-20 md:py-10">
          <section>
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-60">
              <div className="flex flex-col w-full">
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
                    <a
                      className="flex justify-center items-center w-11 h-11 bg-white rounded-full hover:scale-105 duration-300"
                      key={icon.alt}
                      href={icon.link}
                    >
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={32}
                        height={32}
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex w-full justify-between md:justify-end md:gap-5">
                {footerLinks.map((section) => (
                  <div key={section.title}>
                    <h4 className="font-montserrat text-2xl font-medium mb-6 text-accent">
                      {section.title}
                    </h4>
                    <ul>
                      {section.links.map((link) => (
                        <li
                          className="mt-3 font-montserrat text-base leading-normal text-white-400 hover:text-slate-gray"
                          key={link.name}
                        >
                          <a
                            href={link.link}
                            className="hover:scale-150 duration-300 hover:text-accent"
                          >
                            {link.name}
                          </a>
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
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-3/4">
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
