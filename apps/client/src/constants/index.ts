import Support from "../assets/icon/support.svg";
import TruckFast from "../assets/icon/truck-fast.svg";
import ShieldTick from "../assets/icon/shield-tick.svg";
import {
  customer1,
  customer2,
  shoe4,
  shoe5,
  shoe6,
  shoe7,
} from "../assets/images/index";
import { facebook, shieldTick, truckFast, support } from "@/assets/icon";

export const statistics = [
  { value: "1k+", label: "Brands" },
  { value: "500+", label: "Shops" },
  { value: "250k+", label: "Customers" },
];

export const products = [
  {
    imgUrl: shoe4,
    name: "Nike Air Jordan-01",
    price: "$200.20",
  },
  {
    imgUrl: shoe5,
    name: "Nike Air Jordan-10",
    price: "$210.20",
  },
  {
    imgUrl: shoe6,
    name: "Nike Air Jordan-100",
    price: "$220.20",
  },
  {
    imgUrl: shoe7,
    name: "Nike Air Jordan-001",
    price: "$230.20",
  },
];

export const services = [
  {
    img: truckFast,
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    img: shieldTick,
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    img: support,
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
    title: "Products",
    links: [
      { name: "Air Force 1", link: "/" },
      { name: "Air Max 1", link: "/" },
      { name: "Air Jordan 1", link: "/" },
      { name: "Air Force 2", link: "/" },
      { name: "Nike Waffle Racer", link: "/" },
      { name: "Nike Cortez", link: "/" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "How it works", link: "/" },
      { name: "Privacy policy", link: "/" },
      { name: "Payment policy", link: "/" },
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
  { src: facebook, alt: "facebook logo" },
  // { src: twitter, alt: "twitter logo" },
  // { src: instagram, alt: "instagram logo" },
];
