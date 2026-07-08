import { motion } from "framer-motion";

import { navigationLinks, serviceLinks } from "./footerData";
import { fadeRight } from "./footerVariants";
import FooterLinkGroup from "./Footerlinkgroup";

function FooterLinks() {
  return (
    <motion.div
      variants={fadeRight}
      className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-20"
    >
      <FooterLinkGroup title="Navigation" links={navigationLinks} />
      <FooterLinkGroup title="Services" links={serviceLinks} />
    </motion.div>
  );
}

export default FooterLinks;