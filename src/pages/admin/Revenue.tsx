import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, DollarSign, Calendar, Users, Target, BarChart3 } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Revenue = () => {
  const [timeframe, setTimeframe] = useState("week");
  const [chartType, setChartType] = useState("line");

  const revenueStats = [
    {
      title: "Total Revenue",
      value: "₹2,308",
      change: "+18.2%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Monthly Target",
      value: "₹15,000",
      progress: "15.4%",
      changeType: "neutral" as const,
      icon: Target,
    },
    {
      title: "Active Customers",
      value: "127",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Avg. Revenue/Day",
      value: "₹192",
      change: "+8.1%",
      changeType: "positive" as const,
      icon: BarChart3,
    },
  ];

  const revenueData = [
    { period: "Mon", revenue: 1200, bookings: 8, customers: 15 },
    { period: "Tue", revenue: 1800, bookings: 12, customers: 22 },
    { period: "Wed", revenue: 1500, bookings: 10, customers: 18 },
    { period: "Thu", revenue: 2200, bookings: 15, customers: 28 },
    { period: "Fri", revenue: 3200, bookings: 22, customers: 35 },
    { period: "Sat", revenue: 3800, bookings: 28, customers: 42 },
    { period: "Sun", revenue: 2800, bookings: 20, customers: 32 },
  ];

  const monthlyData = [
    { period: "Jan", revenue: 45000, bookings: 320, customers: 180 },
    { period: "Feb", revenue: 52000, bookings: 380, customers: 210 },
    { period: "Mar", revenue: 48000, bookings: 350, customers: 195 },
    { period: "Apr", revenue: 61000, bookings: 420, customers: 245 },
    { period: "May", revenue: 55000, bookings: 390, customers: 220 },
    { period: "Jun", revenue: 58000, bookings: 410, customers: 235 },
  ];

  const revenueByCategory = [
    { name: "Gaming Sessions", value: 1650, color: "#00ff00" },
    { name: "Events & Tournaments", value: 420, color: "#00cc00" },
    { name: "Food & Beverages", value: 180, color: "#009900" },
    { name: "Merchandise", value: 58, color: "#006600" },
  ];

  const topPerformers = [
    { cafe: "CyberCore Gaming Hub", revenue: "₹890", bookings: 45, growth: "+22%" },
    { cafe: "Youth Yard Gaming", revenue: "₹750", bookings: 38, growth: "+18%" },
    { cafe: "LRG Extraordinary Games", revenue: "₹480", bookings: 28, growth: "+15%" },
    { cafe: "Gaming Zone Elite", revenue: "₹188", bookings: 12, growth: "+8%" },
  ];

  const getCurrentData = () => {
    return timeframe === "month" ? monthlyData : revenueData;
  };

  const renderChart = () => {
    const data = getCurrentData();
    
    switch (chartType) {
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{
              backgroundColor: "hsl(var(--gaming-card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))"
            }} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--gaming-green))" 
              fill="hsl(var(--gaming-green))" 
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{
              backgroundColor: "hsl(var(--gaming-card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))"
            }} />
            <Bar dataKey="revenue" fill="hsl(var(--gaming-green))" />
          </BarChart>
        );
      default:
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="period" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip contentStyle={{
              backgroundColor: "hsl(var(--gaming-card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))"
            }} />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--gaming-green))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--gaming-green))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--gaming-green))", strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gaming-green mb-2">Revenue Analytics</h1>
        <p className="text-muted-foreground">
          Track financial performance and analyze revenue trends
        </p>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueStats.map((stat, index) => (
          <Card key={index} className="bg-gaming-card border-border hover:border-gaming-green transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gaming-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center mt-2">
                {stat.change && (
                  <Badge 
                    variant="secondary" 
                    className={
                      stat.changeType === "positive" 
                        ? "bg-status-success text-black" 
                        : "bg-gaming-accent text-white"
                    }
                  >
                    {stat.change}
                  </Badge>
                )}
                {stat.progress && (
                  <Badge variant="secondary" className="bg-gaming-accent text-white">
                    {stat.progress} of target
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground ml-2">
                  {stat.change ? "vs last period" : ""}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart */}
      <Card className="bg-gaming-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gaming-green">Revenue Trends</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor your gaming centre's financial performance over time
              </p>
            </div>
            <div className="flex gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32 bg-gaming-accent border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gaming-card border-border">
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">6 Months</SelectItem>
                </SelectContent>
              </Select>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-32 bg-gaming-accent border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gaming-card border-border">
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <Card className="bg-gaming-card border-border">
          <CardHeader>
            <CardTitle className="text-gaming-green">Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByCategory}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{
                    backgroundColor: "hsl(var(--gaming-card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="bg-gaming-card border-border">
          <CardHeader>
            <CardTitle className="text-gaming-green">Top Performing Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gaming-accent rounded-lg border border-border">
                  <div>
                    <div className="font-medium text-foreground">{performer.cafe}</div>
                    <div className="text-sm text-muted-foreground">{performer.bookings} bookings</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gaming-green">{performer.revenue}</div>
                    <Badge className="bg-status-success text-black text-xs">
                      {performer.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Revenue;