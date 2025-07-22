import React from 'react';
import { Linkedin, Github, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "Shreya Gupta";

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shreya-gupta8697",
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/Shreya8697",
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/Shreyag09068957",
      icon: <Twitter className="w-4 h-4" />,
    },
  ];

  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} {companyName}. Build with 💘. 
            </p>
          </div>

          {/* Social links */}
          <div className="mt-4 md:mt-0">
            <div className="flex justify-center md:justify-end space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  aria-label={`${item.name} (opens in new tab)`}
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;