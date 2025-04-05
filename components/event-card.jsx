"use client";

import { deleteEvent } from "@/actions/events";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { Link, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventCard({ event, username, isPublic = false }) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window?.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent);

  const handleDelete = async () => {
    if (window?.confirm("Are you sure you want to delete this event?")) {
      await fnDeleteEvent(event.id);
      router.refresh();
    }
  };

  const handleCardClick = (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
      window?.open(
        `${window?.location.origin}/${username}/${event.id}`,
        "_blank"
      );
    }
  };

  
  return ( 
    <Card
      className="flex flex-col justify-between cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg rounded-xl p-4 bg-gradient-to-r from-blue-100 to-purple-200 hover:from-blue-200 hover:to-purple-300"
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800 hover:text-purple-600 transition-colors duration-300">{event.title}</CardTitle>
        <CardDescription className="flex justify-between text-sm text-gray-600 mt-2">
          <span>
            {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
          </span>
          <span>{event._count.bookings} Bookings</span>
        </CardDescription>
      </CardHeader>
  
      <CardContent className="text-gray-700 mt-2">
        <p className="text-lg">{event.description.substring(0, event.description.indexOf("."))}</p>
      </CardContent>
  
      {!isPublic && (
        <CardFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex items-center px-4 py-2 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
          >
            <Link className="mr-2 h-4 w-4" />
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-all"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );  
   
}
