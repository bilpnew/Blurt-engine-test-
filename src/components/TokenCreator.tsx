import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info, Plus } from "lucide-react";

interface TokenCreatorProps {
  isAuthenticated?: boolean;
  walletBalance?: number;
}

const TokenCreator = ({
  isAuthenticated = true,
  walletBalance = 1000,
}: TokenCreatorProps) => {
  const [activeTab, setActiveTab] = useState("create");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenPrecision, setTokenPrecision] = useState("3");
  const [tokenMaxSupply, setTokenMaxSupply] = useState("1000000");
  const [tokenUrl, setTokenUrl] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [isTransferable, setIsTransferable] = useState(true);
  const [isStakeable, setIsStakeable] = useState(false);

  // Mock data for existing tokens
  const myTokens = [
    {
      name: "Blurt Power",
      symbol: "BP",
      supply: "1000000",
      maxSupply: "10000000",
      precision: 3,
    },
    {
      name: "Blurt Gold",
      symbol: "BGOLD",
      supply: "5000",
      maxSupply: "100000",
      precision: 2,
    },
    {
      name: "Blurt Shares",
      symbol: "BSHARE",
      supply: "25000",
      maxSupply: "50000",
      precision: 4,
    },
  ];

  const handleCreateToken = () => {
    // This would handle the token creation logic
    alert(`Creating token: ${tokenName} (${tokenSymbol})`);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please connect your Blurt wallet to create or manage tokens.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Connect Wallet</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Token Creator & Manager
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="create">Create New Token</TabsTrigger>
          <TabsTrigger value="manage">Manage My Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Token</CardTitle>
              <CardDescription>
                Fill out the form below to create your own token on the Blurt
                Engine.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertTitle>Creation Fee</AlertTitle>
                <AlertDescription>
                  Creating a new token costs 100 BLURT. Your current balance:{" "}
                  {walletBalance} BLURT
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tokenName">Token Name</Label>
                  <Input
                    id="tokenName"
                    placeholder="e.g. Blurt Gold"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenSymbol">Token Symbol</Label>
                  <Input
                    id="tokenSymbol"
                    placeholder="e.g. BGOLD"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenPrecision">
                    Precision (Decimal Places)
                  </Label>
                  <Select
                    value={tokenPrecision}
                    onValueChange={setTokenPrecision}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select precision" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenMaxSupply">Maximum Supply</Label>
                  <Input
                    id="tokenMaxSupply"
                    type="number"
                    placeholder="e.g. 1000000"
                    value={tokenMaxSupply}
                    onChange={(e) => setTokenMaxSupply(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenUrl">Website URL (Optional)</Label>
                  <Input
                    id="tokenUrl"
                    placeholder="https://"
                    value={tokenUrl}
                    onChange={(e) => setTokenUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2">
                  <Label htmlFor="tokenDescription">Description</Label>
                  <Textarea
                    id="tokenDescription"
                    placeholder="Describe your token and its purpose"
                    rows={4}
                    value={tokenDescription}
                    onChange={(e) => setTokenDescription(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="transferable"
                    checked={isTransferable}
                    onCheckedChange={setIsTransferable}
                  />
                  <Label htmlFor="transferable">Transferable</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="stakeable"
                    checked={isStakeable}
                    onCheckedChange={setIsStakeable}
                  />
                  <Label htmlFor="stakeable">Stakeable</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleCreateToken}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!tokenName || !tokenSymbol || !tokenMaxSupply}
              >
                Create Token
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage My Tokens</CardTitle>
              <CardDescription>
                View and manage tokens you've created on Blurt Engine.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myTokens.length > 0 ? (
                <div className="space-y-4">
                  {myTokens.map((token, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{token.name}</h3>
                          <p className="text-sm text-gray-500">
                            {token.symbol}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            Supply: {token.supply} / {token.maxSupply}
                          </p>
                          <p className="text-xs text-gray-500">
                            Precision: {token.precision} decimals
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Issue
                        </Button>
                        <Button variant="outline" size="sm">
                          Properties
                        </Button>
                        <Button variant="outline" size="sm">
                          Statistics
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    You haven't created any tokens yet.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("create")}
                    className="inline-flex items-center"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create Your First Token
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TokenCreator;
