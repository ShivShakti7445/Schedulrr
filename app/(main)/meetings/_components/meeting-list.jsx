import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import CancelMeetingButton from "./cancel-meeting";

export default function MeetingList({ meetings, type }) {
  if (meetings.length === 0) {
    return <p>No {type} meetings found.</p>;
  }


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <Card
          key={meeting.id}
          className="flex flex-col justify-between shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-4 rounded-t-lg">
            <CardTitle className="text-xl font-semibold">{meeting.event.title}</CardTitle>
            <CardDescription className="text-sm text-black font-bold"> Meeting name : {meeting.name}</CardDescription>
            <CardDescription className="text-sm text-gray-300  text-lg">
              &quot;{meeting.additionalInfo}&quot;
            </CardDescription>
         </CardHeader>

          <CardContent className="p-4 bg-gray-50 rounded-b-lg">
            <div className="flex items-center mb-4">
              <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">{format(new Date(meeting.startTime), "MMMM d, yyyy")}</span>
            </div>
  
            <div className="flex items-center mb-4">
              <Clock className="mr-2 h-5 w-5 text-indigo-600" />
              <span className="text-gray-700">
                {format(new Date(meeting.startTime), "h:mm a")} - {format(new Date(meeting.endTime), "h:mm a")}
              </span>
            </div>
  
            {meeting.meetLink && (
              <div className="flex items-center mt-2">
                <Video className="mr-2 h-5 w-5 text-indigo-600" />
                <a
                  href={meeting.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-indigo-700 hover:underline transition-all duration-300"
                >
                  Join Meeting
                </a>
              </div>
            )}
          </CardContent>
  
          {type === "upcoming" && (
            <CardFooter className="flex justify-between items-center bg-indigo-50 p-4 rounded-b-lg">
              <CancelMeetingButton meetingId={meeting.id} />
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
