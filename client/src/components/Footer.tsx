import { Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { footerData } from "../data/footer";
import type { IFooterLink } from "../types";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-center md:justify-between overflow-hidden gap-10 md:gap-20 mt-40 py-6 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
      <motion.div
        className="flex flex-wrap items-start gap-10 md:gap-35"
        initial={{ x: -150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        <Link to={"/"}>
          <img
            className="size-8 aspect-square"
            src="/FrameGen-favicon.svg"
            alt="footer logo"
            width={32}
            height={32}
          />
        </Link>
        {footerData.map((section, index) => (
          <div key={index}>
            <p className="text-slate-100 font-semibold">{section.title}</p>
            <ul className="mt-2 space-y-2">
              {section.links.map((link: IFooterLink, index: number) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="hover:text-blue-600 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
      <motion.div
        className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end"
        initial={{ x: 150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
      >
        <p className="max-w-60">
          Making every customer feel valued—no matter the size of your audience.
        </p>
        <div className="flex items-center gap-4 mt-3">
          <a
            href="https://www.linkedin.com/in/dakshyadav0"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="size-5 hover:text-blue-500" />
          </a>
          <a href="https://x.com/DXKSH_X" target="_blank" rel="noreferrer">
            <Twitter className="size-5 hover:text-blue-500" />
          </a>
          <a href="https://github.com/0dux" target="_blank" rel="noreferrer">
            <Github className="size-5 hover:text-blue-500" />
          </a>
        </div>
        <p className="mt-3 text-center">
          &copy; {new Date().getFullYear()} <Link to={"/"}>Frame Gen</Link>
        </p>
      </motion.div>
    </footer>
  );
}
