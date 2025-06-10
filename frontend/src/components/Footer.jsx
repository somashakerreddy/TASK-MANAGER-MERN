import { useState } from 'react';

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Developer info section */}
        <div className="text-center mb-8">
          <div 
            className="inline-block group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Developed by SS REDDY
            </h2>
            <div className={`h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 transform transition-all duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>
        </div>

        {/* Social links section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          {/* GitHub Link */}
          <a
            href="https://github.com/somashakerreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-gray-700 hover:border-gray-500 transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">GitHub</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping group-hover:animate-pulse"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://www.linkedin.com/in/somashekar14"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-900 rounded-full border border-blue-700 hover:border-blue-500 transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="font-semibold text-blue-300 group-hover:text-white transition-colors duration-300">LinkedIn</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping group-hover:animate-pulse"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </a>
        </div>

        {/* Disclaimer section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-300 mb-2 animate-pulse">
                  📝 Important Note
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  This is a <span className="text-purple-400 font-semibold">personal web application</span> developed to enhance my skills in the 
                  <span className="text-blue-400 font-semibold"> MERN Tech Stack</span>. 
                  This project is <span className="text-red-400 font-semibold">not intended for commercial use</span> and 
                  <span className="text-yellow-400 font-semibold"> does not provide web hosting services</span>. 
                  Thank you for visiting and exploring my work! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'].map((tech, index) => (
            <span 
              key={tech}
              className={`px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full text-sm font-medium text-gray-300 border border-gray-700 hover:border-gray-500 transform transition-all duration-300 hover:scale-110 hover:shadow-lg animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom section with animated divider */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 SS REDDY. Made with ❤️ and lots of ☕
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-green-400 text-sm font-medium">Currently Learning & Building</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-8 right-8 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300 opacity-60"></div>
      <div className="absolute bottom-4 left-8 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-700 opacity-60"></div>
      <div className="absolute bottom-8 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-1000 opacity-60"></div>
    </footer>
  );
};

export default Footer;