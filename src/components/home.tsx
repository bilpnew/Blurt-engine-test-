import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Dashboard from "./Dashboard";
import TokenExchange from "./TokenExchange";
import WalletManager from "./WalletManager";
import TokenCreator from "./TokenCreator";

const Home = () => {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const handleLogin = () => {
    // In a real implementation, this would connect to a Blurt wallet
    // Prevent any MetaMask connection attempts
    try {
      setIsAuthenticated(true);
    } catch (error) {
      console.warn("Login error prevented:", error);
      setIsAuthenticated(true); // Still allow login for demo purposes
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-600">Blurt Engine</h1>
            <p className="text-sm text-gray-500 hidden md:block">
              Decentralized Token Exchange
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=blurt"
                        alt="User"
                      />
                      <AvatarFallback>BL</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">blurt_user</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {isAuthenticated ? (
          <Tabs
            defaultValue="dashboard"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b mb-6">
              <TabsList className="bg-transparent">
                <TabsTrigger value="dashboard" className="text-base py-3 px-6">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="exchange" className="text-base py-3 px-6">
                  Token Exchange
                </TabsTrigger>
                <TabsTrigger value="wallet" className="text-base py-3 px-6">
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="tokens" className="text-base py-3 px-6">
                  Token Creation
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>

            <TabsContent value="exchange">
              <TokenExchange />
            </TabsContent>

            <TabsContent value="wallet">
              <WalletManager />
            </TabsContent>

            <TabsContent value="tokens">
              <TokenCreator />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Card className="w-full max-w-3xl bg-white">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-blue-600">
                  Welcome to Blurt Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-6">
                  <p className="text-center text-gray-600">
                    Blurt Engine is a decentralized token exchange platform for
                    the Blurt ecosystem. Connect your Blurt wallet to start
                    trading, creating tokens, and managing your assets.
                  </p>
                  <img
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                    alt="Blurt Engine"
                    className="rounded-lg w-full max-w-md shadow-lg"
                  />
                  <Button
                    onClick={handleLogin}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
                  >
                    Connect Wallet to Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                &copy; 2023 Blurt Engine. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                About
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                Terms
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
