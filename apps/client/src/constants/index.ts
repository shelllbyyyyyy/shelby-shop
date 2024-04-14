import { customer1, customer2 } from "../assets/images/index";
import { facebook, github, instagram } from "@/assets/icon";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";

export const services = [
  {
    img: ArrowDownToLine,
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    img: CheckCircle,
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    img: Leaf,
    label: "Love to help you",
    subtext: "Our dedicated team is here to assist you every step of the way.",
  },
];

export const reviews = [
  {
    imgUrl: customer1,
    customerName: "Morich Brown",
    rating: 4.5,
    feedback:
      "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!",
  },
  {
    imgUrl: customer2,
    customerName: "Lota Mongeskar",
    rating: 4.5,
    feedback:
      "The product not only met but exceeded my expectations. I'll definitely be a returning customer!",
  },
];

export const footerLinks = [
  {
    title: "Help",
    links: [
      { name: "About us", link: "/about" },
      { name: "FAQs", link: "/faqs" },
      { name: "How it works", link: "/help" },
      { name: "Privacy policy", link: "/privacy-policy" },
      { name: "Payment policy", link: "/payment-policy" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      {
        name: "ariframdani210@gmail.com",
        link: "mailto:ariframdani210@gmail.com",
      },
      { name: "+6281380747343", link: "tel:+6281380747343" },
    ],
  },
];

export const socialMedia = [
  {
    src: facebook,
    alt: "facebook logo",
    link: "https://www.facebook.com/profile.php?id=100004435728850",
  },
  {
    src: github,
    alt: "twitter logo",
    link: "https://github.com/shelllbyyyyyy",
  },
  {
    src: instagram,
    alt: "instagram logo",
    link: "https://instagram.com/ariframdaniiiiii",
  },
];
