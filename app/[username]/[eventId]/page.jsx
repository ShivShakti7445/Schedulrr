// app/[username]/[eventId]/page.jsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getEventDetails } from "@/actions/events";
import { getEventAvailability } from "@/actions/availability"
import EventDetails from "./_components/event-details";
import BookingForm from "./_components/booking-form";



export async function generateMetadata({ params }) {
  const event = await getEventDetails(params.username, params.eventId);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `Book ${event.title} with ${event.user.name} | Schedulrr`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };
}

export default async function EventBookingPage({ params }) {
  try {
    // Fetch data concurrently for better performance
    const [event, availability] = await Promise.all([
      getEventDetails(params.username, params.eventId),
      getEventAvailability(params.eventId)
    ]);

    if (!event) {
      notFound();
    }

    return (
      <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
        <EventDetails event={event} />
        <Suspense fallback={<div>Loading booking form...</div>}>
          <BookingForm event={event} availability={availability} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error loading event:", error);
    notFound();
  }
}