import {
  ArrowUpRight,
} from "lucide-react";

import { CiInstagram } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";


const footerData = {
  brand: {
    name: "Liliums Glee",

    tagline: "Designing Spaces That Inspire.",

    description:
      "Liliums Glee transforms residential and commercial spaces through premium interior design, wall treatments, bespoke finishes, and construction solutions that combine timeless elegance with exceptional craftsmanship.",
  },

  newsletter: {
    title: "Stay Inspired",
    description:
      "Get the latest design ideas, project updates, and interior inspiration delivered to your inbox.",
    placeholder: "Enter your email",
    button: "Subscribe",
  },
};

export default footerData;

export const navigationLinks = [
  {
    name: "Home",
    href: "/",
  },

  {
    name: "About",
    href: "/about",
  },

  {
    name: "Projects",
    href: "/projects",
  },

  {
    name: "Services",
    href: "/services",
  },

  {
    name: "Collections",
    href: "/collections",
  },

  {
    name: "Contact",
    href: "/contact",
  },
];

export const serviceLinks = [
  {
    name: "Interior Design",
    href: "/services/interior-design",
  },

  {
    name: "Wall Treatments",
    href: "/services/wall-treatments",
  },

  {
    name: "Space Planning",
    href: "/services/space-planning",
  },

  {
    name: "Construction",
    href: "/services/construction",
  },

  {
    name: "Renovation",
    href: "/services/renovation",
  },
];

export const contactInfo = [
  {
    title: "Phone",
    value: "08058814841",
    href: "tel:+2348058814841",
  },

  {
    title: "Instagram",
    value: "@liliums_gleee",
    href: "https://www.instagram.com/liliums_gleee?igsh=c2V4eDMwdXhoczV3",
  },

  {
    title: "TikTok",
    value: "@Liliums glee",
    href: "https://www.tiktok.com/@liliumsgleeinterior?_r=1&_t=ZS-97txGiTclNc",
  },
];

export const socialLinks = [
  {
    name: "Instagram",
    icon: CiInstagram,
    href: "https://instagram.com/liliums_gleee",
  },

  {
    name: "TikTok",
    icon: FaTiktok,
    href: "https://tiktok.com/@liliumsglee",
  },


];

export const legalLinks = [
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },

  {
    name: "Terms & Conditions",
    href: "/terms",
  },
];

export const footerBottom = {
  copyright: `© ${new Date().getFullYear()} Liliums Glee. All rights reserved.`,

  credit: {
    text: "Crafted with excellence by BYTECODE",
    icon: ArrowUpRight,
    href: "#",
  },
};