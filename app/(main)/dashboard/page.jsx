"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { usernameSchema } from "@/app/lib/validators";
import { getLatestUpdates } from "@/actions/dashboard";
import { format } from "date-fns";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  useEffect(() => {
    setValue("username", user?.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const {
    loading: loadingUpdates,
    data: upcomingMeetings,
    fn: fnUpdates,
  } = useFetch(getLatestUpdates);

  useEffect(() => {
    (async () => await fnUpdates())();
  }, []);

  const { loading, error, fn: fnUpdateUsername } = useFetch(updateUsername);

  const onSubmit = async (data) => {
    await fnUpdateUsername(data.username);
  };

  // return (
  //   <div className="space-y-8">
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Welcome, {user?.firstName}!</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         {!loadingUpdates ? (
  //           <div className="space-y-6 font-light">
  //             <div>
  //               {upcomingMeetings && upcomingMeetings?.length > 0 ? (
  //                 <ul className="list-disc pl-5">
  //                   {upcomingMeetings?.map((meeting) => (
  //                     <li key={meeting.id}>
  //                       {meeting.event.title} on{" "}
  //                       {format(
  //                         new Date(meeting.startTime),
  //                         "MMM d, yyyy h:mm a"
  //                       )}{" "}
  //                       with {meeting.name}
  //                     </li>
  //                   ))}
  //                 </ul>
  //               ) : (
  //                 <p>No upcoming meetings</p>
  //               )}
  //             </div>
  //           </div>
  //         ) : (
  //           <p>Loading updates...</p>
  //         )}
  //       </CardContent>
  //     </Card>

  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Your Unique Link</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  //           <div>
  //             <div className="flex items-center gap-2">
  //               <span>{window?.location.origin}/</span>
  //               <Input {...register("username")} placeholder="username" />
  //             </div>
  //             {errors.username && (
  //               <p className="text-red-500 text-sm mt-1">
  //                 {errors.username.message}
  //               </p>
  //             )}
  //             {error && (
  //               <p className="text-red-500 text-sm mt-1">{error?.message}</p>
  //             )}
  //           </div>
  //           {loading && (
  //             <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  //           )}
  //           <Button type="submit" disabled={loading}>
  //             Update Username
  //           </Button>
  //         </form>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-600">
            Welcome, {user?.firstName}!
          </CardTitle>
        </CardHeader>
        {/* Latest Update */}


<CardContent className="bg-white rounded-lg p-6 shadow-lg">
  {!loadingUpdates ? (
    <div className="space-y-6 font-light text-gray-700">
      <div>
        {upcomingMeetings && upcomingMeetings?.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {upcomingMeetings?.map((meeting) => (
              <li
                key={meeting.id}
                className="text-sm text-gray-800 hover:text-indigo-600 transition-colors duration-300"
              >
                <span className="font-semibold">{meeting.event.title}</span> on{" "}
                <span className="font-medium text-indigo-500">
                  {format(new Date(meeting.startTime), "MMM d, yyyy h:mm a")}
                </span>{" "}
                with{" "}
                <span className="text-indigo-600">{meeting.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming meetings</p>
        )}
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-600">Loading updates...</p>
  )}
</CardContent>



      </Card>
  
      {/* Unique Link Card */}
      <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-600">
            Your Unique Link
          </CardTitle>
        </CardHeader>
  
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">
                  {window?.location.origin}/
                </span>
                <Input
                  {...register("username")}
                  placeholder="Enter Username"
                  className="border-2 border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
  
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
  
              {error && (
                <p className="text-red-500 text-sm mt-1">{error?.message}</p>
              )}
            </div>
  
            {/* Loading State */}
            {loading && (
              <div className="mb-4">
                <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
              </div>
            )}
  
            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Update Username
            </Button>
          </form>
        </CardContent>
      </Card>
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-600">
            Dashboard Highlights
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mt-8">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500 text-xl">📅</span>
                Update your username to personalize your experience.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 text-xl">🔗</span>
                Create and share a unique link with others.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500 text-xl">⚙️</span>
                Customize your dashboard to suit your needs.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500 text-xl">⚡</span>
                Stay updated with real-time notifications and alerts.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

    </div>
  );

}
