import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WalletManagerProps {
  username?: string;
  isConnected?: boolean;
}

interface Token {
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: string;
  symbol: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

const WalletManager: React.FC<WalletManagerProps> = ({
  username = "blurtuser",
  isConnected = false,
}) => {
  const [activeTab, setActiveTab] = useState("balances");
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  // Mock data
  const tokens: Token[] = [
    {
      symbol: "BLURT",
      name: "Blurt",
      balance: "1,245.32",
      usdValue: "$124.53",
    },
    {
      symbol: "BLT",
      name: "Blurt Token",
      balance: "5,000.00",
      usdValue: "$250.00",
    },
    {
      symbol: "SWAP.BTC",
      name: "Bitcoin",
      balance: "0.0125",
      usdValue: "$750.00",
    },
    {
      symbol: "SWAP.ETH",
      name: "Ethereum",
      balance: "0.5",
      usdValue: "$1,250.00",
    },
    {
      symbol: "SWAP.USDT",
      name: "Tether",
      balance: "500.00",
      usdValue: "$500.00",
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "tx123",
      type: "Deposit",
      amount: "100.00",
      symbol: "BLURT",
      timestamp: "2023-06-15 14:32",
      status: "completed",
    },
    {
      id: "tx124",
      type: "Withdraw",
      amount: "50.00",
      symbol: "BLT",
      timestamp: "2023-06-14 09:15",
      status: "completed",
    },
    {
      id: "tx125",
      type: "Deposit",
      amount: "0.005",
      symbol: "SWAP.BTC",
      timestamp: "2023-06-13 22:45",
      status: "completed",
    },
    {
      id: "tx126",
      type: "Withdraw",
      amount: "200.00",
      symbol: "SWAP.USDT",
      timestamp: "2023-06-12 11:20",
      status: "pending",
    },
    {
      id: "tx127",
      type: "Deposit",
      amount: "0.25",
      symbol: "SWAP.ETH",
      timestamp: "2023-06-10 16:05",
      status: "failed",
    },
  ];

  const handleDeposit = (token: Token) => {
    setSelectedToken(token);
    setDepositDialogOpen(true);
  };

  const handleWithdraw = (token: Token) => {
    setSelectedToken(token);
    setWithdrawDialogOpen(true);
  };

  const handleWithdrawSubmit = () => {
    // Handle withdraw submission logic here
    console.log("Withdraw", {
      token: selectedToken,
      amount: withdrawAmount,
      address: withdrawAddress,
    });
    setWithdrawDialogOpen(false);
    setWithdrawAmount("");
    setWithdrawAddress("");
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return null;
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-8 rounded-lg shadow">
        <AlertCircle className="h-16 w-16 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6 text-center">
          Please connect your Blurt account to access your wallet
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
              alt={username}
            />
            <AvatarFallback>
              {username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{username}'s Wallet</h2>
            <p className="text-sm text-gray-500">
              Manage your tokens and transactions
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="balances">
          <Card>
            <CardHeader>
              <CardTitle>Token Balances</CardTitle>
              <CardDescription>
                Manage your tokens and their balances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">USD Value</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow key={token.symbol}>
                      <TableCell className="font-medium">
                        {token.symbol}
                      </TableCell>
                      <TableCell>{token.name}</TableCell>
                      <TableCell className="text-right">
                        {token.balance}
                      </TableCell>
                      <TableCell className="text-right">
                        {token.usdValue}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleDeposit(token)}
                          >
                            <ArrowDownToLine className="h-3 w-3" /> Deposit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => handleWithdraw(token)}
                          >
                            <ArrowUpFromLine className="h-3 w-3" /> Withdraw
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View your recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.type === "Deposit" ? (
                            <ArrowDownToLine className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowUpFromLine className="h-4 w-4 text-blue-600" />
                          )}
                          {tx.type}
                        </div>
                      </TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>{tx.symbol}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          {tx.timestamp}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" size="sm">
                Load More
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Settings</CardTitle>
              <CardDescription>
                Configure your wallet preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-currency">Default Currency</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="bg-blue-50">
                    USD
                  </Button>
                  <Button variant="outline">EUR</Button>
                  <Button variant="outline">BTC</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notifications">Transaction Notifications</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="checkbox"
                    id="notifications"
                    className="w-4 h-4"
                    defaultChecked
                  />
                  <Label htmlFor="notifications">
                    Enable email notifications for transactions
                  </Label>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  For security reasons, some settings can only be changed after
                  email confirmation.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Deposit Dialog */}
      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit {selectedToken?.symbol}</DialogTitle>
            <DialogDescription>
              Use the address below to deposit {selectedToken?.name} to your
              wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <Label className="text-xs text-gray-500 mb-1 block">
                Deposit Address
              </Label>
              <div className="flex items-center justify-between">
                <code className="bg-gray-100 p-2 rounded text-sm font-mono break-all">
                  blurt-engine-{username}-{selectedToken?.symbol.toLowerCase()}
                </code>
                <Button variant="outline" size="sm">
                  Copy
                </Button>
              </div>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Only send {selectedToken?.symbol} to this address. Sending any
                other token may result in permanent loss.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDepositDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw {selectedToken?.symbol}</DialogTitle>
            <DialogDescription>
              Enter the amount and destination address to withdraw your{" "}
              {selectedToken?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="flex items-center">
                <Input
                  id="amount"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <Button
                  variant="ghost"
                  className="ml-2"
                  onClick={() =>
                    setWithdrawAmount(selectedToken?.balance || "")
                  }
                >
                  Max
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Available: {selectedToken?.balance} {selectedToken?.symbol}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Destination Address</Label>
              <Input
                id="address"
                placeholder="Enter destination address"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
              />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please double-check the address before confirming. Transactions
                cannot be reversed.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setWithdrawDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleWithdrawSubmit}
              disabled={!withdrawAmount || !withdrawAddress}
            >
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletManager;
