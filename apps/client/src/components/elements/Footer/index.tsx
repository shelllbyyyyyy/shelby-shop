import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Container from "../Container";
import Wrapper from "../Wrapper";

const Footer = () => {
  return (
    <>
      <footer className="h-auto w-full bg-primary text-white py-5">
        <Container className="flex flex-col justify-center items-center w-full gap-5">
          <h3 className="text-2xl uppercase">Subscripe to our newsletter</h3>
          <Wrapper className="flex flex-col md:flex-row gap-2 w-3/4">
            <Input
              type="text"
              placeholder="Your email address"
              className="text-primary"
            />
            <Button>Join</Button>
          </Wrapper>
          Copyright &copy; 2024 Shelby.Shop. All right reserved
        </Container>
      </footer>
    </>
  );
};

export default Footer;
