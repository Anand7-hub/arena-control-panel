import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Calendar, Clock, Users, DollarSign, Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  participants: string;
  maxParticipants: number;
  status: string;
  image?: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Valorant Showdown",
      description: "Compete in a high-stakes Valorant tournament for glory and prizes! Teams of 5, double elimination.",
      date: "2025-07-11",
      time: "16:00",
      duration: "4h",
      price: "500",
      participants: "8/32",
      maxParticipants: 32,
      status: "upcoming",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "FIFA 24 Weekend League",
      description: "Test your football skills in our FIFA 24 Weekend League. Open to all skill levels!",
      date: "2025-07-14",
      time: "14:00",
      duration: "3h",
      price: "300",
      participants: "12/16",
      maxParticipants: 16,
      status: "upcoming"
    },
    {
      id: 3,
      title: "PC Building Workshop",
      description: "Learn to build your own gaming PC from scratch with expert guidance. Hands-on session!",
      date: "2025-07-18",
      time: "11:00",
      duration: "2h",
      price: "200",
      participants: "5/10",
      maxParticipants: 10,
      status: "upcoming"
    },
    {
      id: 4,
      title: "Overwatch 2 LAN Party",
      description: "Join us for a fun Overwatch 2 LAN party! Bring your friends or join a team on the spot.",
      date: "2025-07-21",
      time: "18:00",
      duration: "5h",
      price: "150",
      participants: "18/24",
      maxParticipants: 24,
      status: "upcoming"
    },
    {
      id: 5,
      title: "Fortnite Duo Cup",
      description: "Pair up and battle for the top spot in our Fortnite Duo Cup. Exciting prizes await!",
      date: "2025-07-25",
      time: "15:00",
      duration: "3h",
      price: "400",
      participants: "6/20",
      maxParticipants: 20,
      status: "upcoming"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    price: "",
    maxParticipants: "",
    image: ""
  });

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (isEdit && editingEvent) {
          setEditingEvent({ ...editingEvent, image: imageUrl });
        } else {
          setUploadedImage(imageUrl);
          setNewEvent({ ...newEvent, image: imageUrl });
        }
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded successfully!",
        description: "Your event image has been uploaded.",
        variant: "default"
      });
    }
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: events.length + 1,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      time: newEvent.time,
      duration: newEvent.duration,
      price: newEvent.price,
      participants: `0/${newEvent.maxParticipants}`,
      maxParticipants: parseInt(newEvent.maxParticipants) || 0,
      status: "upcoming",
      image: newEvent.image
    };

    setEvents([...events, event]);

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
      maxParticipants: "",
      image: ""
    });
    setUploadedImage("");
    setIsCreateDialogOpen(false);
  };

  const handleEditEvent = () => {
    if (!editingEvent || !editingEvent.title || !editingEvent.date || !editingEvent.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setEvents(events.map(event => 
      event.id === editingEvent.id ? editingEvent : event
    ));

    toast({
      title: "Event Updated Successfully!",
      description: `${editingEvent.title} has been updated.`,
      variant: "default"
    });

    setEditingEvent(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteEvent = (eventId: number, eventTitle: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: `${eventTitle} has been removed from the schedule.`,
      variant: "destructive"
    });
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent({ ...event });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-status-info text-gaming-black";
      case "ongoing": return "bg-status-success text-gaming-black";
      case "completed": return "bg-gaming-accent text-foreground";
      case "cancelled": return "bg-status-error text-gaming-black";
      default: return "bg-gaming-accent text-foreground";
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
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="animate-slide-in-right">
          <h1 className="text-4xl font-bold text-gaming-green text-glow mb-3">Events Management</h1>
          <p className="text-foreground/80 text-lg">
            Create, edit, and manage gaming events and tournaments
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gaming-green text-gaming-black hover:bg-gaming-green-bright transition-all duration-200 hover-lift animate-pulse-green">
              <Plus className="h-5 w-5 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gaming-card border-gaming-green/30 max-w-2xl animate-slide-up">
            <DialogHeader>
              <DialogTitle className="text-gaming-green text-xl text-glow">Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Event Image</Label>
                <div className="border-2 border-dashed border-gaming-green/30 rounded-lg p-6 text-center hover-glow transition-all duration-200">
                  {uploadedImage ? (
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Event preview" 
                        className="max-h-40 mx-auto rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setUploadedImage("");
                          setNewEvent({ ...newEvent, image: "" });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-gaming-green/50 mx-auto mb-4" />
                      <p className="text-foreground/70 mb-2">Click to upload event image</p>
                      <p className="text-sm text-foreground/50">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title" className="text-foreground font-medium">Event Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description" className="text-foreground font-medium">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="text-foreground font-medium">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-foreground font-medium">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div>
                  <Label htmlFor="duration" className="text-foreground font-medium">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 3h"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-foreground font-medium">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="500"
                    value={newEvent.price}
                    onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="maxParticipants" className="text-foreground font-medium">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="32"
                    value={newEvent.maxParticipants}
                    onChange={(e) => setNewEvent({...newEvent, maxParticipants: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
              </div>
              <Button
                onClick={handleCreateEvent}
                className="w-full bg-gaming-green text-gaming-black hover:bg-gaming-green-bright transition-all duration-200 hover-lift"
              >
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <Card 
            key={event.id} 
            className="bg-gaming-card border-gaming-green/20 hover-glow transition-all duration-300 hover-lift animate-slide-up group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Event Image */}
            {event.image && (
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gaming-black/20 group-hover:bg-gaming-black/10 transition-colors duration-300"></div>
              </div>
            )}
            
            <CardHeader className="pb-3">
              <CardTitle className="text-gaming-green text-lg leading-tight text-glow">
                {event.title}
              </CardTitle>
              <p className="text-sm text-foreground/70 line-clamp-3">
                {event.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-gaming-green" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <Clock className="h-4 w-4 mr-2 text-gaming-green" />
                  {event.time} ({event.duration})
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <DollarSign className="h-4 w-4 mr-2 text-gaming-green" />
                  ₹{event.price}
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
                  className="flex-1 border-gaming-green/50 text-gaming-green hover:bg-gaming-green hover:text-gaming-black transition-all duration-200"
                  onClick={() => openEditDialog(event)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="hover-lift transition-all duration-200"
                  onClick={() => handleDeleteEvent(event.id, event.title)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gaming-card border-gaming-green/30 max-w-2xl animate-slide-up">
          <DialogHeader>
            <DialogTitle className="text-gaming-green text-xl text-glow">Edit Event</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label className="text-foreground font-medium">Event Image</Label>
                <div className="border-2 border-dashed border-gaming-green/30 rounded-lg p-6 text-center hover-glow transition-all duration-200">
                  {editingEvent.image ? (
                    <div className="relative">
                      <img 
                        src={editingEvent.image} 
                        alt="Event preview" 
                        className="max-h-40 mx-auto rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setEditingEvent({ ...editingEvent, image: "" })}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Image className="h-12 w-12 text-gaming-green/50 mx-auto mb-4" />
                      <p className="text-foreground/70 mb-2">Click to upload event image</p>
                      <p className="text-sm text-foreground/50">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label className="text-foreground font-medium">Event Title *</Label>
                  <Input
                    placeholder="Enter event title"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-foreground font-medium">Description</Label>
                  <Textarea
                    placeholder="Enter event description"
                    value={editingEvent.description}
                    onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green min-h-[100px]"
                  />
                </div>
                <div>
                  <Label className="text-foreground font-medium">Date *</Label>
                  <Input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div>
                  <Label className="text-foreground font-medium">Time *</Label>
                  <Input
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div>
                  <Label className="text-foreground font-medium">Duration</Label>
                  <Input
                    placeholder="e.g., 3h"
                    value={editingEvent.duration}
                    onChange={(e) => setEditingEvent({...editingEvent, duration: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div>
                  <Label className="text-foreground font-medium">Price (₹)</Label>
                  <Input
                    type="number"
                    placeholder="500"
                    value={editingEvent.price}
                    onChange={(e) => setEditingEvent({...editingEvent, price: e.target.value})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-foreground font-medium">Max Participants</Label>
                  <Input
                    type="number"
                    placeholder="32"
                    value={editingEvent.maxParticipants.toString()}
                    onChange={(e) => setEditingEvent({...editingEvent, maxParticipants: parseInt(e.target.value) || 0})}
                    className="bg-gaming-accent border-gaming-green/30 text-foreground focus:border-gaming-green"
                  />
                </div>
              </div>
              <Button
                onClick={handleEditEvent}
                className="w-full bg-gaming-green text-gaming-black hover:bg-gaming-green-bright transition-all duration-200 hover-lift"
              >
                Update Event
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;