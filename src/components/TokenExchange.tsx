import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownUp, ChevronDown, ChevronUp } from "lucide-react";

interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
}

interface MarketHistoryEntry {
  time: string;
  type: "buy" | "sell";
  price: number;
  quantity: number;
  total: number;
}

interface TokenExchangeProps {
  selectedToken?: string;
  userBalance?: {
    blurt: number;
    tokens: Record<string, number>;
  };
}

const TokenExchange: React.FC<TokenExchangeProps> = ({
  selectedToken = "BLURT",
  userBalance = { blurt: 1000, tokens: { BLURT: 500, BTC: 0.05, ETH: 1.2 } },
}) => {
  // Prevent any MetaMask connection attempts
  React.useEffect(() => {
    // Override any global ethereum object to prevent MetaMask connection
    if (typeof window !== "undefined" && (window as any).ethereum) {
      console.log("MetaMask detected but not used in Blurt Engine");
    }
  }, []);
  const [activeTab, setActiveTab] = useState<string>("buy");
  const [buyPrice, setBuyPrice] = useState<string>("0.1");
  const [buyAmount, setBuyAmount] = useState<string>("10");
  const [sellPrice, setSellPrice] = useState<string>("0.11");
  const [sellAmount, setSellAmount] = useState<string>("10");
  const [selectedPair, setSelectedPair] = useState<string>("BLURT");

  // Mock data for order book
  const buyOrders: OrderBookEntry[] = [
    { price: 0.095, quantity: 1000, total: 95 },
    { price: 0.09, quantity: 2000, total: 180 },
    { price: 0.085, quantity: 3000, total: 255 },
    { price: 0.08, quantity: 5000, total: 400 },
    { price: 0.075, quantity: 8000, total: 600 },
  ];

  const sellOrders: OrderBookEntry[] = [
    { price: 0.105, quantity: 800, total: 84 },
    { price: 0.11, quantity: 1500, total: 165 },
    { price: 0.115, quantity: 2000, total: 230 },
    { price: 0.12, quantity: 3000, total: 360 },
    { price: 0.125, quantity: 5000, total: 625 },
  ];

  // Mock data for market history
  const marketHistory: MarketHistoryEntry[] = [
    { time: "12:30:45", type: "buy", price: 0.105, quantity: 500, total: 52.5 },
    {
      time: "12:28:32",
      type: "sell",
      price: 0.102,
      quantity: 1000,
      total: 102,
    },
    { time: "12:25:18", type: "buy", price: 0.104, quantity: 750, total: 78 },
    { time: "12:20:05", type: "sell", price: 0.1, quantity: 2000, total: 200 },
    { time: "12:15:59", type: "buy", price: 0.098, quantity: 1500, total: 147 },
    {
      time: "12:10:22",
      type: "sell",
      price: 0.097,
      quantity: 3000,
      total: 291,
    },
    {
      time: "12:05:11",
      type: "buy",
      price: 0.095,
      quantity: 2500,
      total: 237.5,
    },
  ];

  // Available token pairs
  const tokenPairs = ["BLURT", "BTC", "ETH", "LTC", "DOGE"];

  const handleBuyOrder = () => {
    // Placeholder for buy order functionality
    alert(
      `Buy order placed: ${buyAmount} ${selectedPair} at ${buyPrice} BLURT each`,
    );
  };

  const handleSellOrder = () => {
    // Placeholder for sell order functionality
    alert(
      `Sell order placed: ${sellAmount} ${selectedPair} at ${sellPrice} BLURT each`,
    );
  };

  const calculateBuyTotal = () => {
    return (parseFloat(buyPrice) * parseFloat(buyAmount || "0")).toFixed(4);
  };

  const calculateSellTotal = () => {
    return (parseFloat(sellPrice) * parseFloat(sellAmount || "0")).toFixed(4);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Token Exchange</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Select Token Pair:</span>
            <Select value={selectedPair} onValueChange={setSelectedPair}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {tokenPairs.map((token) => (
                  <SelectItem key={token} value={token}>
                    {token}/BLURT
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Book */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Order Book</CardTitle>
              <CardDescription>Current buy and sell orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-green-600 mb-1">
                    Buy Orders
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Price</TableHead>
                        <TableHead className="w-1/3">Quantity</TableHead>
                        <TableHead className="w-1/3">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {buyOrders.map((order, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-green-50 cursor-pointer"
                        >
                          <TableCell className="text-green-600">
                            {order.price.toFixed(4)}
                          </TableCell>
                          <TableCell>
                            {order.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell>{order.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded">
                  <div className="flex items-center">
                    <span className="text-lg font-semibold">0.100</span>
                    <span className="text-sm text-gray-500 ml-2">
                      Last Price
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ChevronUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">+2.5%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-red-600 mb-1">
                    Sell Orders
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Price</TableHead>
                        <TableHead className="w-1/3">Quantity</TableHead>
                        <TableHead className="w-1/3">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sellOrders.map((order, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-red-50 cursor-pointer"
                        >
                          <TableCell className="text-red-600">
                            {order.price.toFixed(4)}
                          </TableCell>
                          <TableCell>
                            {order.quantity.toLocaleString()}
                          </TableCell>
                          <TableCell>{order.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Interface */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                Trade {selectedPair}/BLURT
              </CardTitle>
              <CardDescription>Place buy or sell orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy">Buy {selectedPair}</TabsTrigger>
                  <TabsTrigger value="sell">Sell {selectedPair}</TabsTrigger>
                </TabsList>
                <TabsContent value="buy" className="space-y-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (BLURT)
                    </label>
                    <Input
                      type="number"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      placeholder="0.00"
                      step="0.0001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount ({selectedPair})
                    </label>
                    <Input
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Total (BLURT)</span>
                      <span className="font-medium">{calculateBuyTotal()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-600">Available Balance</span>
                      <span className="font-medium">
                        {userBalance.blurt.toFixed(4)} BLURT
                      </span>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleBuyOrder}
                    >
                      Buy {selectedPair}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="sell" className="space-y-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (BLURT)
                    </label>
                    <Input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      placeholder="0.00"
                      step="0.0001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount ({selectedPair})
                    </label>
                    <Input
                      type="number"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Total (BLURT)</span>
                      <span className="font-medium">
                        {calculateSellTotal()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-600">Available Balance</span>
                      <span className="font-medium">
                        {userBalance.tokens[selectedPair]?.toFixed(4) ||
                          "0.0000"}{" "}
                        {selectedPair}
                      </span>
                    </div>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={handleSellOrder}
                    >
                      Sell {selectedPair}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Market History */}
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Market History</CardTitle>
              <CardDescription>
                Recent trades for {selectedPair}/BLURT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/5">Time</TableHead>
                    <TableHead className="w-1/5">Type</TableHead>
                    <TableHead className="w-1/5">Price</TableHead>
                    <TableHead className="w-1/5">Amount</TableHead>
                    <TableHead className="w-1/5">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketHistory.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs">{entry.time}</TableCell>
                      <TableCell
                        className={
                          entry.type === "buy"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {entry.type.toUpperCase()}
                      </TableCell>
                      <TableCell>{entry.price.toFixed(4)}</TableCell>
                      <TableCell>{entry.quantity.toLocaleString()}</TableCell>
                      <TableCell>{entry.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Open Orders */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Open Orders</CardTitle>
            <CardDescription>Active buy and sell orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Pair</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Filled</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-gray-500"
                  >
                    No open orders
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TokenExchange;
