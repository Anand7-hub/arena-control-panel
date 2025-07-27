import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Users, Calendar, Trophy, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const adminFeatures = [
    {
      icon: Shield,
      title: "Dashboard Overview",
      description: "Real-time metrics and business insights"
    },
    {
      icon: Calendar,
      title: "Booking Management", 
      description: "Manage bookings with OTP verification"
    },
    {
      icon: Trophy,
      title: "Events Manager",
      description: "Create and manage gaming tournaments"
    },
    {
      icon: TrendingUp,
      title: "Revenue Analytics",
      description: "Track financial performance and trends"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gaming-card border-b border-border p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gaming-green">GAME CENTRE</h1>
          <Link to="/admin">
            <Button className="bg-gaming-green text-black hover:bg-gaming-green-glow">
              <Shield className="h-4 w-4 mr-2" />
              Admin Portal
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-gaming-green mb-6">
            GAME CENTRE
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience the ultimate gaming destination with cutting-edge equipment, epic tournaments, 
            and a community of legends. Your next victory starts here.
          </p>
          <Link to="/admin">
            <Button size="lg" className="bg-gaming-green text-black hover:bg-gaming-green-glow text-lg px-8 py-6">
              ACCESS ADMIN DASHBOARD
            </Button>
          </Link>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-gaming-green text-center mb-12">
            Admin Management Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminFeatures.map((feature, index) => (
              <Card key={index} className="bg-gaming-card border-border hover:border-gaming-green transition-colors">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-gaming-green mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-6 bg-gaming-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gaming-green mb-2">49</div>
              <div className="text-muted-foreground">Total Bookings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gaming-green mb-2">₹2,308</div>
              <div className="text-muted-foreground">Total Revenue</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gaming-green mb-2">10+</div>
              <div className="text-muted-foreground">Upcoming Events</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
