import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Computer, User, Calendar, CheckCircle, XCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    },
    {
      id: 6,
      user: "arman01",
      email: "arman@exam.com",
      cafe: "Youth Yard",
      computer: "Youth Boost RTX-3070",
      date: "Jul 13, 2025",
      timeSlot: "8:00 PM - 10:00 PM",
      duration: "2h",
      status: "completed",
      amount: "₹50"
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
                                  onChange={(e) => setOtpCode(e.target.value)}
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

export default Bookings;