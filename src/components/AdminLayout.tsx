import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  LogOut,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export default AdminLayout;