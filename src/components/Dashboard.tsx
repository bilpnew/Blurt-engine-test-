import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Wallet,
  Coins,
  BarChart3,
} from "lucide-react";

interface TokenData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

const Dashboard = () => {
  // Mock data for demonstration
  const tokenMarketData: TokenData[] = [
    {
      name: "Blurt Token",
      symbol: "BLT",
      price: 0.0125,
      change24h: 5.2,
      volume24h: 24500,
      marketCap: 1250000,
    },
    {
      name: "Blurt Dollars",
      symbol: "BLD",
      price: 1.02,
      change24h: -0.5,
      volume24h: 15600,
      marketCap: 560000,
    },
    {
      name: "Blurt Power",
      symbol: "BLP",
      price: 0.0315,
      change24h: 2.8,
      volume24h: 8900,
      marketCap: 420000,
    },
    {
      name: "Community Token",
      symbol: "CMT",
      price: 0.0042,
      change24h: 12.5,
      volume24h: 3400,
      marketCap: 84000,
    },
    {
      name: "Blurt NFT",
      symbol: "BNFT",
      price: 0.0078,
      change24h: -3.2,
      volume24h: 1200,
      marketCap: 39000,
    },
  ];

  const priceChartData = [
    { name: "Jan", BLT: 0.008, BLD: 0.98, BLP: 0.025 },
    { name: "Feb", BLT: 0.009, BLD: 0.99, BLP: 0.027 },
    { name: "Mar", BLT: 0.011, BLD: 1.01, BLP: 0.029 },
    { name: "Apr", BLT: 0.01, BLD: 1.0, BLP: 0.028 },
    { name: "May", BLT: 0.012, BLD: 1.02, BLP: 0.03 },
    { name: "Jun", BLT: 0.0125, BLD: 1.02, BLP: 0.0315 },
  ];

  const volumeChartData = [
    { name: "Jan", volume: 18000 },
    { name: "Feb", volume: 20500 },
    { name: "Mar", volume: 19200 },
    { name: "Apr", volume: 21000 },
    { name: "May", volume: 23400 },
    { name: "Jun", volume: 24500 },
  ];

  return (
    <div className="bg-white p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700">
          Blurt Engine Dashboard
        </h1>
        <p className="text-gray-600">
          Token market statistics and trading metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Market Cap
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,353,000</div>
            <p className="text-xs text-gray-500">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              24h Trading Volume
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$53,600</div>
            <p className="text-xs text-gray-500">+4.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tokens</CardTitle>
            <Coins className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-gray-500">+3 new this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Price Charts</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="BLT">
              <TabsList>
                <TabsTrigger value="BLT">BLT</TabsTrigger>
                <TabsTrigger value="BLD">BLD</TabsTrigger>
                <TabsTrigger value="BLP">BLP</TabsTrigger>
              </TabsList>
              <TabsContent value="BLT" className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="BLT"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="BLD" className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="BLD"
                      stroke="#10b981"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="BLP" className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="BLP"
                      stroke="#8b5cf6"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trading Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="volume" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Tokens by Market Cap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Symbol</th>
                  <th className="text-right py-3 px-4">Price</th>
                  <th className="text-right py-3 px-4">24h Change</th>
                  <th className="text-right py-3 px-4">24h Volume</th>
                  <th className="text-right py-3 px-4">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {tokenMarketData.map((token, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{token.name}</td>
                    <td className="py-3 px-4">{token.symbol}</td>
                    <td className="text-right py-3 px-4">
                      ${token.price.toFixed(4)}
                    </td>
                    <td className="text-right py-3 px-4">
                      <div
                        className={`flex items-center justify-end ${token.change24h >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {token.change24h >= 0 ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(token.change24h)}%
                      </div>
                    </td>
                    <td className="text-right py-3 px-4">
                      ${token.volume24h.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4">
                      ${token.marketCap.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Token Exchange</CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Trade tokens on the Blurt Engine exchange with real-time order
              book and market history.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Go to Exchange
            </button>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Wallet</CardTitle>
            <Wallet className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Manage your Blurt Engine wallet, view balances, and track
              transaction history.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Open Wallet
            </button>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Create Token</CardTitle>
            <Coins className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Launch your own token on Blurt Engine with customizable parameters
              and properties.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Create Token
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
