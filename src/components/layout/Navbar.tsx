import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Copy, Check, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WalletData {
  id: string;
  address: string;
  totalValue: number;
  tokens: any[];
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Load wallet data from localStorage on component mount
  useEffect(() => {
    const savedWalletData = localStorage.getItem('walletData');
    if (savedWalletData) {
      try {
        const parsedData = JSON.parse(savedWalletData);
        setWalletData(parsedData);
      } catch (error) {
        console.error("Error parsing saved wallet data:", error);
        localStorage.removeItem('walletData');
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.metal.build/holder/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_METAL_API_KEY || '',
        },
      });

      const data = await response.json();
      
      if (data && data.address) {
        setWalletData(data);
        // Save wallet data to localStorage
        localStorage.setItem('walletData', JSON.stringify(data));
        setIsLoginOpen(false);
        toast({
          title: "Wallet Connected",
          description: "Wallet connected successfully!",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to connect wallet",
          variant: "destructive",
        });
        console.error("Wallet connection failed:", data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while connecting wallet",
        variant: "destructive",
      });
      console.error("Wallet connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWalletData(null);
    setIsWalletOpen(false);
    // Remove wallet data from localStorage
    localStorage.removeItem('walletData');
    toast({
      title: "Wallet Disconnected",
      description: "You have been disconnected from your wallet.",
      variant: "default",
    });
  };

  const copyAddress = () => {
    if (walletData) {
      navigator.clipboard.writeText(walletData.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-safetyblue-500 to-teal-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-safetyblue-500">ShieldFi</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/explore" 
              className={`transition-colors ${isActive('/explore') 
                ? 'text-teal-500 font-medium' 
                : 'text-gray-700 hover:text-teal-500'}`}
            >
              Insurance Options
            </Link>
            <Link 
              to="/pools" 
              className={`transition-colors ${isActive('/pools') 
                ? 'text-teal-500 font-medium' 
                : 'text-gray-700 hover:text-teal-500'}`}
            >
              Capital Pools
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${isActive('/about') 
                ? 'text-teal-500 font-medium' 
                : 'text-gray-700 hover:text-teal-500'}`}
            >
              About Us
            </Link>
            {walletData ? (
              <div className="relative">
                <Button 
                  className="bg-gradient-safety text-white hover:opacity-90 transition-opacity flex items-center gap-2"
                  onClick={() => setIsWalletOpen(!isWalletOpen)}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  {`${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`}
                </Button>
                <div 
                  className={cn(
                    "absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4",
                    isWalletOpen ? "block" : "hidden"
                  )}
                >
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">ID</p>
                      <p className="font-medium">{walletData.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium break-all">{walletData.address}</p>
                        <button onClick={copyAddress} className="text-gray-500 hover:text-gray-700 shrink-0">
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Balance</p>
                      <p className="font-medium">{walletData.totalValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tokens</p>
                      <p className="font-medium">{walletData.tokens.length}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                      onClick={handleDisconnect}
                    >
                      <LogOut size={16} />
                      Disconnect Wallet
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                className="bg-gradient-safety text-white hover:opacity-90 transition-opacity"
                onClick={() => setIsLoginOpen(true)}
              >
                Connect Metal Wallet
              </Button>
            )}
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
          <Link
            to="/explore"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/explore') ? 'text-teal-500' : 'text-gray-700 hover:text-teal-500'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Insurance Options
          </Link>
          <Link
            to="/pools"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/pools') ? 'text-teal-500' : 'text-gray-700 hover:text-teal-500'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Capital Pools
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about') ? 'text-teal-500' : 'text-gray-700 hover:text-teal-500'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <div className="px-3 py-2">
            {walletData ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="font-medium">{`${walletData.address.slice(0, 6)}...${walletData.address.slice(-4)}`}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={handleDisconnect}
                >
                  <LogOut size={16} />
                  Disconnect Wallet
                </Button>
              </div>
            ) : (
              <Button 
                className="w-full bg-gradient-safety text-white hover:opacity-90 transition-opacity"
                onClick={() => setIsLoginOpen(true)}
              >
                Connect Metal Wallet
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Metal Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <Button 
              className="w-full bg-gradient-safety text-white"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
