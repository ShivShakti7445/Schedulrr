import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EventDetails({ event }) {
  const { user } = event;

  return (
    <div className="p-10 lg:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg transition-transform hover:scale-105">
  
      {/* Event Title */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6">{event.title}</h1>
  
      {/* User Info Section */}
      <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 text-lg">{user.email}</p>
        </div>
      </div>
  
      {/* Event Duration */}
      <div className="flex items-center gap-3 mb-4 bg-white p-3 rounded-lg shadow-md transition-transform hover:scale-105">
        <Clock className="text-blue-500" size={24} />
        <span className="text-lg font-medium text-gray-700">{event.duration} minutes</span>
      </div>
  
      {/* Event Platform */}
      <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-lg shadow-md transition-transform hover:scale-105">
        <Calendar className="text-green-500" size={24} />
        <span className="text-lg font-medium text-gray-700">Google Meet</span>
      </div>
  
      {/* Event Description */}
      <p className="text-lg text-gray-800 leading-relaxed bg-white p-4 rounded-lg shadow-md transition-transform hover:scale-105">
        {event.description}
      </p>
    </div>
  );
}
