
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-safetyblue-500 to-teal-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-safetyblue-500">ShieldFi</span>
            </a>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="/explore" className="text-gray-700 hover:text-teal-500 transition-colors">
              Insurance Options
            </a>
            <a href="/pools" className="text-gray-700 hover:text-teal-500 transition-colors">
              Capital Pools
            </a>
            <a href="/about" className="text-gray-700 hover:text-teal-500 transition-colors">
              About Us
            </a>
            <Button className="bg-gradient-safety text-white hover:opacity-90 transition-opacity">
              Connect Wallet
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-teal-500 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 shadow-lg">
          <a
            href="/explore"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-500"
          >
            Insurance Options
          </a>
          <a
            href="/pools"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-500"
          >
            Capital Pools
          </a>
          <a
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-500"
          >
            About Us
          </a>
          <div className="px-3 py-2">
            <Button className="w-full bg-gradient-safety text-white hover:opacity-90 transition-opacity">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
