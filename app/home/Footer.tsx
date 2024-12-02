/* Footer.tsx*/
import React from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 text-center">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 hover:scale-105 transition ease-in-out duration-300">
          <FaLinkedin size={24} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 hover:scale-105 transition ease-in-out duration-300">
          <FaGithub size={24} />
        </a>
        <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 hover:scale-105 transition ease-in-out duration-300">
          <FaGlobe size={24} />
        </a>
      </div>
      <p className="text-sm">Developed by Azmain Morshed</p>
    </footer>
  );
};

export default Footer;
