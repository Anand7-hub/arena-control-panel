import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Calendar, Clock, Users, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    price: "",
    maxParticipants: ""
  });
  
  const { toast } = useToast();

  const events = [
    {
      id: 1,
      title: "Valorant Showdown",
      description: "Compete in a high-stakes Valorant tournament for glory and prizes! Teams of 5, double elimination.",
      date: "Jul 11, 2025",
      time: "16:00",
      duration: "4h",
      price: "₹500",
      participants: "8/32",
      status: "upcoming"
    },
    {
      id: 2,
      title: "FIFA 24 Weekend League",
      description: "Test your football skills in our FIFA 24 Weekend League. Open to all skill levels!",
      date: "Jul 14, 2025",
      time: "14:00",
      duration: "3h",
      price: "₹300",
      participants: "12/16",
      status: "upcoming"
    },
    {
      id: 3,
      title: "PC Building Workshop",
      description: "Learn to build your own gaming PC from scratch with expert guidance. Hands-on session!",
      date: "Jul 18, 2025",
      time: "11:00",
      duration: "2h",
      price: "₹200",
      participants: "5/10",
      status: "upcoming"
    },
    {
      id: 4,
      title: "Overwatch 2 LAN Party",
      description: "Join us for a fun Overwatch 2 LAN party! Bring your friends or join a team on the spot.",
      date: "Jul 21, 2025",
      time: "18:00",
      duration: "5h",
      price: "₹150",
      participants: "18/24",
      status: "upcoming"
    },
    {
      id: 5,
      title: "Fortnite Duo Cup",
      description: "Pair up and battle for the top spot in our Fortnite Duo Cup. Exciting prizes await!",
      date: "Jul 25, 2025",
      time: "15:00",
      duration: "3h",
      price: "₹400",
      participants: "6/20",
      status: "upcoming"
    },
    {
      id: 6,
      title: "Cosplay & Gaming Workshop",
      description: "Show off your best cosplay and enjoy a day of gaming, contests, and fun activities!",
      date: "Jul 29, 2025",
      time: "12:00",
      duration: "4h",
      price: "₹100",
      participants: "15/30",
      status: "upcoming"
    },
    {
      id: 7,
      title: "Minecraft Build-Off",
      description: "Creative minds unite! Join our Minecraft Build-Off and win cool merch.",
      date: "Aug 1, 2025",
      time: "13:00",
      duration: "2h",
      price: "₹250",
      participants: "8/12",
      status: "upcoming"
    },
    {
      id: 8,
      title: "Tekken 8 Fight Night",
      description: "Step into the ring for our Tekken 8 Fight Night. All skill levels welcome!",
      date: "Aug 5, 2025",
      time: "17:00",
      duration: "3h",
      price: "₹350",
      participants: "10/16",
      status: "upcoming"
    },
    {
      id: 9,
      title: "League of Legends Clash",
      description: "Gather your squad and compete in our League of Legends Clash event. Prizes for top 3 teams!",
      date: "Aug 8, 2025",
      time: "16:00",
      duration: "4h",
      price: "₹500",
      participants: "12/20",
      status: "upcoming"
    },
    {
      id: 10,
      title: "Retro Gaming Night",
      description: "Relive the classics! Play retro games, win spot prizes, and enjoy a nostalgic evening.",
      date: "Aug 13, 2025",
      time: "19:00",
      duration: "3h",
      price: "₹120",
      participants: "22/40",
      status: "upcoming"
    }
  ];

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Event Created Successfully!",
      description: `${newEvent.title} has been added to the events schedule.`,
      variant: "default"
    });

    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      price: "",
      maxParticipants: ""
    });
  };

  const handleDeleteEvent = (eventId: number, eventTitle: string) => {
    toast({
      title: "Event Deleted",
      description: `${eventTitle} has been removed from the schedule.`,
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-status-info text-white";
      case "ongoing": return "bg-status-success text-black";
      case "completed": return "bg-gaming-accent text-white";
      case "cancelled": return "bg-status-error text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getParticipantsColor = (participants: string) => {
    const [current, max] = participants.split('/').map(Number);
    const percentage = (current / max) * 100;
    
    if (percentage >= 80) return "text-status-error";
    if (percentage >= 60) return "text-status-warning";
    return "text-gaming-green";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gaming-green mb-2">Events Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage gaming events and tournaments
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gaming-green text-black hover:bg-gaming-green-glow">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gaming-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-gaming-green">Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-foreground">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="bg-gaming-accent border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter event description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="bg-gaming-accent border-border text-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-foreground">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="bg-gaming-accent border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-foreground">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="bg-gaming-accent border-border text-foreground"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration" className="text-foreground">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3h"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    className="bg-gaming-accent border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-foreground">Price</Label>
                  <Input
                    id="price"
                    placeholder="e.g., ₹500"
                    value={newEvent.price}
                    onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
                    className="bg-gaming-accent border-border text-foreground"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maxParticipants" className="text-foreground">Max Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  placeholder="e.g., 32"
                  value={newEvent.maxParticipants}
                  onChange={(e) => setNewEvent({...newEvent, maxParticipants: e.target.value})}
                  className="bg-gaming-accent border-border text-foreground"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCreateEvent}
                  className="bg-gaming-green text-black hover:bg-gaming-green-glow flex-1"
                >
                  Create Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="bg-gaming-card border-border hover:border-gaming-green transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-gaming-green text-lg leading-tight">
                {event.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {event.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-gaming-green" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <Clock className="h-4 w-4 mr-2 text-gaming-green" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <span className="w-4 h-4 mr-2 text-gaming-green">⏱</span>
                  {event.duration}
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <DollarSign className="h-4 w-4 mr-2 text-gaming-green" />
                  {event.price}
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-gaming-green" />
                  <span className={getParticipantsColor(event.participants)}>
                    {event.participants}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gaming-green text-gaming-green hover:bg-gaming-green hover:text-black"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id, event.title)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;