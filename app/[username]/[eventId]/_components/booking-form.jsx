// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { createBooking } from "@/actions/bookings";
// import { bookingSchema } from "@/app/lib/validators";
// import "react-day-picker/style.css";
// import useFetch from "@/hooks/use-fetch";

// export default function BookingForm({ event, availability }) {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm({
//     resolver: zodResolver(bookingSchema),
//   });

//   useEffect(() => {
//     if (selectedDate) {
//       setValue("date", format(selectedDate, "yyyy-MM-dd"));
//     }
//   }, [selectedDate, setValue]);

//   useEffect(() => {
//     if (selectedTime) {
//       setValue("time", selectedTime);
//     }
//   }, [selectedTime, setValue]);

//   const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

//   const onSubmit = async (data) => {
//     console.log("Form submitted with data:", data);

//     if (!selectedDate || !selectedTime) {
//       console.error("Date or time not selected");
//       return;
//     }

//     const startTime = new Date(
//       `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
//     );
//     const endTime = new Date(startTime.getTime() + event.duration * 60000);

//     const bookingData = {
//       eventId: event.id,
//       name: data.name,
//       email: data.email,
//       startTime: startTime.toISOString(),
//       endTime: endTime.toISOString(),
//       additionalInfo: data.additionalInfo,
//     };

//     await fnCreateBooking(bookingData);
//   };

//   const availableDays = availability.map((day) => new Date(day.date));

//   const timeSlots = selectedDate
//     ? availability.find(
//         (day) => day.date === format(selectedDate, "yyyy-MM-dd")
//       )?.slots || []
//     : [];

//   if (data) {
//     return (
//       <div className="text-center p-10 border bg-white">
//         <h2 className="text-2xl font-bold mb-4">Booking successful!</h2>
//         {data.meetLink && (
//           <p>
//             Join the meeting:{" "}
//             <a
//               href={data.meetLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               {data.meetLink}
//             </a>
//           </p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-8 p-10 border bg-white">
//       <div className="md:h-96 flex flex-col md:flex-row gap-5 ">
//         <div className="w-full">
//           <DayPicker
//             mode="single"
//             selected={selectedDate}
//             onSelect={(date) => {
//               setSelectedDate(date);
//               setSelectedTime(null); // Reset selected time when date changes
//             }}
//             disabled={[{ before: new Date() }]}
//             modifiers={{ available: availableDays }}
//             modifiersStyles={{
//               available: {
//                 background: "lightblue",
//                 borderRadius: 100,
//               },
//             }}
//           />
//         </div>
//         <div className="w-full h-full md:overflow-scroll no-scrollbar">
//           {/* add hide scroll bar code */}
//           {selectedDate && (
//             <div className="mb-4">
//               <h3 className="text-lg font-semibold mb-2">
//                 Available Time Slots
//               </h3>
//               <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
//                 {timeSlots.map((slot) => (
//                   <Button
//                     key={slot}
//                     variant={selectedTime === slot ? "default" : "outline"}
//                     onClick={() => setSelectedTime(slot)}
//                   >
//                     {slot}
//                   </Button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       {selectedTime && (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <Input {...register("name")} placeholder="Your Name" />
//             {errors.name && (
//               <p className="text-red-500 text-sm">{errors.name.message}</p>
//             )}
//           </div>
//           <div>
//             <Input
//               {...register("email")}
//               type="email"
//               placeholder="Your Email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>
//           <div>
//             <Textarea
//               {...register("additionalInfo")}
//               placeholder="Additional Information"
//             />
//           </div>
//           <Button type="submit" disabled={loading} className="w-full">
//             {loading ? "Scheduling..." : "Schedule Event"}
//           </Button>
          
//         </form>
//       )}
//     </div>
//   );
// }


"use client";
import { bookingSchema } from '@/app/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState,useEffect } from 'react'
import { DayPicker } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import "react-day-picker/style.css";
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { createBooking } from '@/actions/bookings';

const BookingForm = ({ event, availability  }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCalendar = () => {
    setShowMessage(true);

    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const availableDays = availability.map((day) => new Date(day.date));
  const timeSlots = selectedDate
  ? availability.find(
      (day) => day.date === format(selectedDate, "yyyy-MM-dd")
    )?.slots || []
  : [];


  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);

    if (!selectedDate || !selectedTime) {
      console.error("Date or time not selected");
      return;
    }

    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
    );
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };
    await fnCreateBooking(bookingData);
  }

  if (data) {
    console.log(data)
    return (
    <div className="text-center p-10 border bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold mb-4 text-blue-700">
        🎯 Booking Confirmed! 🎉
      </h2>

      {/* Display the meeting link */}
      {data.meetLink && (
        <div className="bg-white p-4 rounded-md shadow-md inline-block">
           <p className="text-lg font-semibold text-gray-800">
            🔗 <span className="text-balck-600">Join the meeting:</span>{" "}
             <a
               href={data.meetLink}
               target="_blank"
               rel="noopener noreferrer"
               className="text-blue-500 hover:text-blue-700 underline transition duration-300"
             >
               {data.meetLink}
             </a>
           </p>
         </div>
      )}

      <p className="mt-6 text-gray-700 leading-relaxed">
        ✅ <strong>Be prepared:</strong> Ensure you have a stable internet connection. <br />
        ⏰ <strong>Arrive on time:</strong> Join a few minutes early to avoid last-minute issues. <br />
        💡 <strong>Stay engaged:</strong> Take notes and participate actively. <br />
        🛠️ <strong>Need help?</strong> Reach out to support for any technical issues. 
      </p>

      <div className="mt-6">
        <button
          onClick={handleAddToCalendar}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
        >
          📅 Add to Google Calendar
        </button>
        
        {/* Message Display */}
        {showMessage && (
          <div className="mt-4 text-green-600 font-semibold animate-fade-in">
            ✅ Added to your Google Calendar!
          </div>
        )}
      </div>
    </div>

    );
  }

  return (
    <div className="flex flex-col gap-10 p-20 border bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg rounded-lg">
  
      {/* Date & Time Section */}
      <div className="md:h-96 flex flex-col md:flex-row gap-8">
        
        {/* Calendar Section */}
        <div className="w-full bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">📅 Select a Date</h3>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null); // Reset selected time when date changes
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              available: {
                background: "lightblue",
                borderRadius: "100%",
              },
            }}
          />
        </div>
  
        {/* Time Slots Section */}
        <div className="w-full h-full md:overflow-auto no-scrollbar bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
          {selectedDate && (
            <div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">⏰ Available Time Slots</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    className={`px-4 py-2 text-lg rounded-lg shadow-md transition-all 
                      ${
                        selectedTime === slot
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Form Section */}
      {selectedTime && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md transition-transform hover:scale-105 space-y-6">
  
          <h3 className="text-3xl font-extrabold text-purple-700">📝 Enter Your Details</h3>
  
          <div className="space-y-4">
            <div>
              <Input 
                {...register("name")} 
                placeholder="👤 Your Name" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400" 
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
  
            <div>
              <Input 
                {...register("email")} 
                type="email" 
                placeholder="📧 Your Email" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400" 
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
  
            <div>
              <Textarea 
                {...register("additionalInfo")} 
                placeholder="💬 Additional Information" 
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-400" 
              />
            </div>
          </div>
  
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            {loading ? "⏳ Scheduling..." : "✅ Schedule Event"}
          </Button>
        </form>
      )}
    </div>
  );
  
}

export default BookingForm

