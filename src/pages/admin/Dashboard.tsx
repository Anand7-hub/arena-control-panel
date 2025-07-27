import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, DollarSign, TrendingUp, Clock, Computer } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const stats = [
    { 
      title: "Total Bookings", 
      value: "49", 
      icon: Calendar, 
      change: "+12%",
      changeType: "positive" as const
    },
    { 
      title: "Total Users", 
      value: "5", 
      icon: Users, 
      change: "+3%",
      changeType: "positive" as const
    },
    { 
      title: "Total Revenue", 
      value: "₹2308", 
      icon: DollarSign, 
      change: "+18%",
      changeType: "positive" as const
    },
    { 
      title: "Recent Bookings (7 days)", 
      value: "0", 
      icon: TrendingUp, 
      change: "0%",
      changeType: "neutral" as const
    },
  ];

  const revenueData = [
    { day: "Mon", revenue: 1200 },
    { day: "Tue", revenue: 1800 },
    { day: "Wed", revenue: 1500 },
    { day: "Thu", revenue: 2200 },
    { day: "Fri", revenue: 3200 },
    { day: "Sat", revenue: 3800 },
    { day: "Sun", revenue: 2800 },
  ];

  const recentBookings = [
    {
      user: "Admin User",
      email: "admin@admin.com",
      cafe: "CyberCore Gaming Hub",
      computer: "CyberCore Ultra HTX-4500",
      date: "Jul 15, 2025",
      time: "5:00 PM - 8:00 PM",
      duration: "3h",
      status: "pending",
      amount: "₹75"
    },
    {
      user: "arman01",
      email: "arman@exam.com", 
      cafe: "LRG Language of Extraordinary Games",
      computer: "LRG Ultimate RTX-4090",
      date: "Jul 15, 2025",
      time: "1:00 PM - 2:00 PM",
      duration: "1h",
      status: "pending",
      amount: "₹18"
    },
    {
      user: "arman01",
      email: "arman@exam.com",
      cafe: "Youth Yard",
      computer: "Youth Boost RTX-3070",
      date: "Jul 13, 2025",
      time: "8:00 PM - 9:00 PM", 
      duration: "2h",
      status: "pending",
      amount: "₹50"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-status-warning text-black";
      case "active": return "bg-status-success text-black";
      case "completed": return "bg-gaming-accent text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gaming-green mb-2">Overview</h1>
        <p className="text-muted-foreground">
          Real-time insights and analytics for your gaming centre
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                <span className="text-xs text-muted-foreground ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Analytics */}
      <Card className="bg-gaming-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gaming-green">Revenue Analytics</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Track your gaming centre's revenue performance over time
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-status-success text-black">Week</Badge>
              <Badge variant="outline" className="border-gaming-green text-gaming-green">Month</Badge>
              <Badge variant="outline" className="border-gaming-green text-gaming-green">Year</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--gaming-card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--gaming-green))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--gaming-green))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--gaming-green))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card className="bg-gaming-card border-border">
        <CardHeader>
          <CardTitle className="text-gaming-green flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gaming-accent rounded-lg border border-border">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{booking.user}</span>
                    <span className="text-sm text-muted-foreground">{booking.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">{booking.cafe}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Computer className="h-3 w-3" />
                      {booking.computer}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-foreground">{booking.date}</div>
                    <div className="text-xs text-muted-foreground">{booking.time}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gaming-green">{booking.duration}</div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <div className="text-right">
                    <span className="font-bold text-gaming-green">{booking.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;