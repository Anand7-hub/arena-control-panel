import React, { useState } from "react";
import { Routes, Route, NavLink, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  LogOut,
  Sparkles,
  Users,
  DollarSign,
  Clock,
  Computer,
  User,
  CheckCircle,
  XCircle,
  Shield,
  Target,
  BarChart3,
  Upload,
  Plus,
  Edit,
  Trash2,
  ImagePlus
} from "lucide-react";

// UI Components (simplified versions - replace with your actual UI library)
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-gaming-card border border-border rounded-lg ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Badge = ({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: string }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
);

const Button = ({ children, className = "", variant = "default", size = "default", onClick, ...props }: any) => (
  <button 
    className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${className}`} 
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", ...props }: any) => (
  <input className={`flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ${className}`} {...props} />
);

const Textarea = ({ className = "", ...props }: any) => (
  <textarea className={`flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ${className}`} {...props} />
);

const Dialog = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
const DialogContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}>
    <div className={`bg-gaming-card p-6 rounded-lg max-w-md w-full ${className}`}>{children}</div>
  </div>
);
const DialogHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>;
const DialogTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);
const DialogTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => <div>{children}</div>;

const Tabs = ({ children, defaultValue, className = "" }: { children: React.ReactNode; defaultValue: string; className?: string }) => (
  <div className={className}>{children}</div>
);
const TabsList = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex bg-gaming-card rounded-lg p-1 ${className}`}>{children}</div>
);
const TabsTrigger = ({ children, value, className = "" }: { children: React.ReactNode; value: string; className?: string }) => (
  <button className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${className}`}>{children}</button>
);
const TabsContent = ({ children, value, className = "" }: { children: React.ReactNode; value: string; className?: string }) => (
  <div className={`mt-4 ${className}`}>{children}</div>
);

const Select = ({ children, value, onValueChange }: { children: React.ReactNode; value: string; onValueChange: (value: string) => void }) => (
  <div>{children}</div>
);
const SelectTrigger = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <button className={`flex h-10 w-full items-center justify-between rounded-md border border-border px-3 py-2 text-sm ${className}`}>
    {children}
  </button>
);
const SelectValue = () => <span>Select option</span>;
const SelectContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`absolute top-full left-0 w-full bg-gaming-card border border-border rounded-md mt-1 ${className}`}>{children}</div>
);
const SelectItem = ({ children, value }: { children: React.ReactNode; value: string }) => (
  <div className="px-3 py-2 text-sm hover:bg-gaming-accent cursor-pointer">{children}</div>
);

// Chart components (simplified - replace with recharts)
const ResponsiveContainer = ({ children, width, height }: { children: React.ReactNode; width: string; height: string }) => (
  <div style={{ width, height }}>{children}</div>
);
const LineChart = ({ children, data }: { children: React.ReactNode; data: any[] }) => (
  <div className="w-full h-full bg-gaming-accent rounded flex items-center justify-center text-muted-foreground">
    Line Chart Placeholder
  </div>
);
const AreaChart = ({ children, data }: { children: React.ReactNode; data: any[] }) => (
  <div className="w-full h-full bg-gaming-accent rounded flex items-center justify-center text-muted-foreground">
    Area Chart Placeholder
  </div>
);
const BarChart = ({ children, data }: { children: React.ReactNode; data: any[] }) => (
  <div className="w-full h-full bg-gaming-accent rounded flex items-center justify-center text-muted-foreground">
    Bar Chart Placeholder
  </div>
);
const PieChart = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full bg-gaming-accent rounded flex items-center justify-center text-muted-foreground">
    Pie Chart Placeholder
  </div>
);

// Placeholder components
const Line = () => null;
const Area = () => null;
const Bar = () => null;
const Pie = () => null;
const Cell = () => null;
const XAxis = () => null;
const YAxis = () => null;
const CartesianGrid = () => null;
const Tooltip = () => null;

// Toast hook
const useToast = () => ({
  toast: ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    console.log(`Toast: ${title} - ${description}`);
  }
});

// Utility function
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// Admin Layout Component
const AdminLayout = () => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Bookings", href: "/admin/bookings", icon: Calendar },
    { name: "Events", href: "/admin/events", icon: Trophy },
    { name: "Revenue", href: "/admin/revenue", icon: TrendingUp },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gaming-black animate-fade-in">
      {/* Top Navigation */}
      <header className="bg-gaming-card border-b border-gaming-green/20 animate-slide-up">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8 text-gaming-green" />
                <h1 className="text-3xl font-bold text-gaming-green text-glow">GAME CENTRE</h1>
              </div>
              <div className="h-8 w-px bg-gaming-green/30"></div>
              <span className="text-sm text-foreground font-medium">Admin Portal</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              {navigation.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive: active }) =>
                    cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover-lift border-glow",
                      "hover:bg-gaming-accent hover:text-gaming-green",
                      active || isActive(item.href)
                        ? "bg-gaming-green text-gaming-black font-medium animate-glow"
                        : "text-foreground"
                    )
                  }
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* Logout */}
            <Button 
              variant="outline" 
              size="sm"
              className="border-status-error text-status-error hover:bg-status-error hover:text-gaming-black transition-all duration-200 hover-lift"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <Outlet />
      </main>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("week");
  const [chartType, setChartType] = useState("line");

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

  const weeklyData = [
    { period: "Mon", revenue: 1200 },
    { period: "Tue", revenue: 1800 },
    { period: "Wed", revenue: 1500 },
    { period: "Thu", revenue: 2200 },
    { period: "Fri", revenue: 3200 },
    { period: "Sat", revenue: 3800 },
    { period: "Sun", revenue: 2800 },
  ];

  const monthlyData = [
    { period: "Jan", revenue: 45000 },
    { period: "Feb", revenue: 52000 },
    { period: "Mar", revenue: 48000 },
    { period: "Apr", revenue: 61000 },
    { period: "May", revenue: 55000 },
    { period: "Jun", revenue: 58000 },
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

  const getCurrentData = () => {
    return timeframe === "month" ? monthlyData : weeklyData;
  };

  const renderChart = () => {
    const data = getCurrentData();
    
    switch (chartType) {
      case "area":
        return <AreaChart data={data}><Area /><XAxis /><YAxis /><CartesianGrid /><Tooltip /></AreaChart>;
      case "bar":
        return <BarChart data={data}><Bar /><XAxis /><YAxis /><CartesianGrid /><Tooltip /></BarChart>;
      default:
        return <LineChart data={data}><Line /><XAxis /><YAxis /><CartesianGrid /><Tooltip /></LineChart>;
    }
  };

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
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
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

// Bookings Component
const Bookings = () => {
  const [otpCode, setOtpCode] = useState("");
  const { toast } = useToast();

  const activeBookings = [
    {
      id: 1,
      user: "Mike Johnson",
      email: "mike@email.com",
      cafe: "Gaming Zone 3",
      computer: "PC-103 (RTX 3080, Intel i7-10700K)",
      timeRemaining: "1h 24m remaining",
      amount: "₹1200",
      status: "active"
    }
  ];

  const otpBookings = [
    {
      id: 2,
      user: "John Doe",
      email: "john@email.com", 
      cafe: "Gaming Zone 1",
      computer: "PC-101 (RTX 4090, Intel i9-13900K)",
      otp: "1234",
      amount: "₹1500",
      status: "pending"
    },
    {
      id: 3,
      user: "Alex Smith",
      email: "alex@email.com",
      cafe: "CyberCore Gaming Hub", 
      computer: "PC-105 (RTX 3070, AMD Ryzen 7 5800X)",
      otp: "5678",
      amount: "₹900",
      status: "pending"
    }
  ];

  const bookingHistory = [
    {
      id: 4,
      user: "Admin User",
      email: "admin@admin.com",
      cafe: "CyberCore Gaming Hub",
      computer: "CyberCore Ultra HTX-4500",
      date: "Jul 15, 2025",
      timeSlot: "1:00 PM - 4:00 PM",
      duration: "3h",
      status: "completed",
      amount: "₹75"
    },
    {
      id: 5,
      user: "arman01",
      email: "arman@exam.com",
      cafe: "LRG Language of Extraordinary Games",
      computer: "LRG Ultimate RTX-4090",
      date: "Jul 15, 2025",
      timeSlot: "1:00 PM - 2:00 PM",
      duration: "1h",
      status: "completed", 
      amount: "₹18"
    }
  ];

  const handleOtpVerification = (bookingId: number, providedOtp: string) => {
    const booking = otpBookings.find(b => b.id === bookingId);
    if (booking && booking.otp === providedOtp) {
      toast({
        title: "OTP Verified Successfully!",
        description: `Booking for ${booking.user} has been approved and started.`,
        variant: "default"
      });
      setOtpCode("");
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please check the OTP code and try again.",
        variant: "destructive"
      });
    }
  };

  const handleCancelBooking = (bookingId: number) => {
    toast({
      title: "Booking Cancelled",
      description: "The booking has been cancelled successfully.",
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-status-success text-black";
      case "pending": return "bg-status-warning text-black";
      case "completed": return "bg-gaming-accent text-white";
      case "cancelled": return "bg-status-error text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gaming-green mb-2">Booking Management</h1>
        <p className="text-muted-foreground">
          Manage active bookings, verify transactions, and booking history
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gaming-card">
          <TabsTrigger value="active" className="data-[state=active]:bg-gaming-green data-[state=active]:text-black">
            Current Active Bookings
          </TabsTrigger>
          <TabsTrigger value="otp" className="data-[state=active]:bg-gaming-green data-[state=active]:text-black">
            Upcoming Bookings
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gaming-green data-[state=active]:text-black">
            All Bookings History
          </TabsTrigger>
        </TabsList>

        {/* Active Bookings */}
        <TabsContent value="active" className="space-y-4">
          <Card className="bg-gaming-card border-border">
            <CardHeader>
              <CardTitle className="text-gaming-green flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Active Sessions ({activeBookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeBookings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active bookings</p>
              ) : (
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gaming-accent rounded-lg border border-border">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {booking.user}
                          </span>
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
                        <div className="text-center">
                          <div className="text-sm font-medium text-gaming-green">{booking.timeRemaining}</div>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                        <div className="text-right">
                          <span className="font-bold text-gaming-green">{booking.amount}</span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          End Session
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* OTP Verification */}
        <TabsContent value="otp" className="space-y-4">
          <Card className="bg-gaming-card border-border">
            <CardHeader>
              <CardTitle className="text-gaming-green flex items-center gap-2">
                <Shield className="h-5 w-5" />
                OTP Verification Required ({otpBookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {otpBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gaming-accent rounded-lg border border-border">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {booking.user}
                        </span>
                        <span className="text-sm text-muted-foreground">{booking.email}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-foreground">{booking.cafe}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Computer className="h-3 w-3" />
                          {booking.computer}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Expected OTP:</span>
                        <span className="text-sm font-mono text-gaming-green">{booking.otp}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <div className="text-right">
                        <span className="font-bold text-gaming-green">{booking.amount}</span>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-gaming-green text-black hover:bg-gaming-green-glow">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Verify & Start
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gaming-card border-border">
                            <DialogHeader>
                              <DialogTitle className="text-gaming-green">Verify OTP Code</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium text-foreground">
                                  Enter OTP provided by customer:
                                </label>
                                <Input
                                  type="text"
                                  placeholder="Enter 4-digit OTP"
                                  value={otpCode}
                                  onChange={(e: any) => setOtpCode(e.target.value)}
                                  className="mt-2 bg-gaming-accent border-border text-foreground"
                                  maxLength={4}
                                />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Expected OTP: <span className="font-mono text-gaming-green">{booking.otp}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleOtpVerification(booking.id, otpCode)}
                                  className="bg-gaming-green text-black hover:bg-gaming-green-glow"
                                >
                                  Verify & Start Session
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  Cancel Booking
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking History */}
        <TabsContent value="history" className="space-y-4">
          <Card className="bg-gaming-card border-border">
            <CardHeader>
              <CardTitle className="text-gaming-green flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                All Bookings History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gaming-accent rounded-lg border border-border">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {booking.user}
                        </span>
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
                        <div className="text-xs text-muted-foreground">{booking.timeSlot}</div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Events Component
const Events = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventImage, setEventImage] = useState<string | null>(null);
  const { toast } = useToast();

  const events = [
    {
      id: 1,
      title: "VALORANT Championship",
      description: "Join the ultimate VALORANT tournament with a prize pool of ₹50,000. Open for all skill levels.",
      date: "2025-08-15",
      time: "18:00",
      participants: 32,
      maxParticipants: 64,
      prizePool: "₹50,000",
      status: "upcoming",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "CS2 Battle Royale",
      description: "Counter-Strike 2 tournament featuring the best teams in the region.",
      date: "2025-08-22",
      time: "20:00",
      participants: 16,
      maxParticipants: 32,
      prizePool: "₹30,000",
      status: "upcoming",
      image: "/api/placeholder/300/200"
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEventImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateEvent = () => {
    toast({
      title: "Event Created",
      description: "New gaming event has been created successfully.",
      variant: "default"
    });
    setIsCreateDialogOpen(false);
    setEventImage(null);
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setEventImage(event.image);
    setIsEditDialogOpen(true);
  };

  const handleUpdateEvent = () => {
    toast({
      title: "Event Updated",
      description: "Event details have been updated successfully.",
      variant: "default"
    });
    setIsEditDialogOpen(false);
    setSelectedEvent(null);
    setEventImage(null);
  };

  const handleDeleteEvent = (eventId: number) => {
    toast({
      title: "Event Deleted",
      description: "Event has been removed successfully.",
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-status-warning text-black";
      case "ongoing": return "bg-status-success text-black";
      case "completed": return "bg-gaming-accent text-white";
      case "cancelled": return "bg-status-error text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gaming-green mb-2">Events Management</h1>
          <p className="text-muted-foreground">
            Create and manage gaming tournaments and events
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-gaming-green text-black hover:bg-gaming-green-glow"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="bg-gaming-card border-border overflow-hidden hover:border-gaming-green transition-colors">
            <div className="aspect-video bg-gaming-accent flex items-center justify-center">
              {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-muted-foreground">Event Image</div>
              )}
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-gaming-green">{event.title}</CardTitle>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditEvent(event)}
                    className="border-gaming-green text-gaming-green hover:bg-gaming-green hover:text-black"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time:</span>
                  <span className="text-foreground">{event.date} at {event.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participants:</span>
                  <span className="text-foreground">{event.participants}/{event.maxParticipants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prize Pool:</span>
                  <span className="text-gaming-green font-bold">{event.prizePool}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Event Dialog */}
      {isCreateDialogOpen && (
        <DialogContent className="bg-gaming-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gaming-green">Create New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Event Title</label>
              <Input 
                placeholder="Enter event title"
                className="mt-2 bg-gaming-accent border-border text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea 
                placeholder="Enter event description"
                className="mt-2 bg-gaming-accent border-border text-foreground"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Date</label>
                <Input 
                  type="date"
                  className="mt-2 bg-gaming-accent border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Time</label>
                <Input 
                  type="time"
                  className="mt-2 bg-gaming-accent border-border text-foreground"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Max Participants</label>
                <Input 
                  type="number"
                  placeholder="64"
                  className="mt-2 bg-gaming-accent border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Prize Pool</label>
                <Input 
                  placeholder="₹50,000"
                  className="mt-2 bg-gaming-accent border-border text-foreground"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Event Image</label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className="border-gaming-green text-gaming-green hover:bg-gaming-green hover:text-black"
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {eventImage && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setEventImage(null)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                {eventImage && (
                  <div className="relative w-full h-48 bg-gaming-accent rounded-lg overflow-hidden">
                    <img src={eventImage} alt="Event preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleCreateEvent}
                className="bg-gaming-green text-black hover:bg-gaming-green-glow"
              >
                Create Event
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setEventImage(null);
                }}
                className="border-border text-foreground"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      )}

      {/* Edit Event Dialog */}
      {isEditDialogOpen && selectedEvent && (
        <DialogContent className="bg-gaming-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gaming-green">Edit Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Event Title</label>
              <Input 
                defaultValue={selectedEvent.title}
                className="mt-2 bg-gaming-accent border-border text-foreground"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea 
                defaultValue={selectedEvent.description}
                className="mt-2 bg-gaming-accent border-border text-foreground"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Date</label>
                <Input 
                  type="date"
                  defaultValue={selectedEvent.date}
                  className="mt-2 bg-gaming-accent border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Time</label>
                <Input 
                  type="time"
                  defaultValue={selectedEvent.time}
                  className="mt-2 bg-gaming-accent border-border text-foreground"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Max Participants</label>
                <Input 
                  type="number"
                  defaultValue={selectedEvent.maxParticipants}
                  className="mt-2 bg-gaming-accent border-border text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Prize Pool</label>
                <Input 
                  defaultValue={selectedEvent.prizePool}
                  className="mt-2 bg-gaming-accent border-border text-foreground"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Event Image</label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('edit-image-upload')?.click()}
                    className="border-gaming-green text-gaming-green hover:bg-gaming-green hover:text-black"
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Change Image
                  </Button>
                  <input
                    id="edit-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {eventImage && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setEventImage(null)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                {eventImage && (
                  <div className="relative w-full h-48 bg-gaming-accent rounded-lg overflow-hidden">
                    <img src={eventImage} alt="Event preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleUpdateEvent}
                className="bg-gaming-green text-black hover:bg-gaming-green-glow"
              >
                Update Event
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedEvent(null);
                  setEventImage(null);
                }}
                className="border-border text-foreground"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </div>
  );
};

// Revenue Component
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
        return <AreaChart data={data}><Area /><XAxis /><YAxis /><CartesianGrid /><Tooltip /></AreaChart>;
      case "bar":
        return <BarChart data={data}><Bar /><XAxis /><YAxis /><CartesianGrid /><Tooltip /></BarChart>;
      default:
        return <LineChart data={data}><Line /><XAxis /><YAxis /><CartesianGrid /><Tooltip /></LineChart>;
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
                  <Pie />
                  <Cell />
                  <Tooltip />
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

// Main Admin Dashboard Component
const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="events" element={<Events />} />
        <Route path="revenue" element={<Revenue />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;