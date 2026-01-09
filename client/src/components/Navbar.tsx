import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SvgLogo from "./SvgLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <motion.nav
        className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-8 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <Link to={"/"}>
          <SvgLogo
            className={"h-8 w-auto active:scale-95 transition-all duration-200"}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link
            to={"/"}
            className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
          >
            Home
          </Link>
          <Link
            to={"/generate"}
            className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
          >
            Generate
          </Link>
          <Link
            to={"/my-generation"}
            className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
          >
            My Generations
          </Link>
          <Link
            to={"#"}
            className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
          >
            My Contacts
          </Link>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="hidden md:block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all rounded-full"
        >
          Get Started!
        </button>
        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <MenuIcon size={26} className="active:scale-90 transition" />
        </button>
      </motion.nav>

      <div
        className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          onClick={() => setIsOpen(false)}
          to={"/"}
          className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
        >
          Home
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          to={"/generate"}
          className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
        >
          Generate
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          to={"/my-generation"}
          className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
        >
          My Generations
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          to={"#"}
          className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
        >
          My Contacts
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          to={"/login"}
          className="hover:text-blue-500 hover:font-medium active:scale-95 transition-all duration-200 overflow-hidden"
        >
          Login
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-blue-600 hover:bg-blue-700 transition text-white rounded-md flex"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
