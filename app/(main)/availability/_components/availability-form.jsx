

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { updateAvailability } from "@/actions/availability";
import { availabilitySchema } from "@/app/lib/validators";
import { timeSlots } from "../data";
import useFetch from "@/hooks/use-fetch";
import { useState } from "react";

export default function AvailabilityForm({ initialData }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  const {
    loading,
    error,
    fn: fnupdateAvailability,
  } = useFetch(updateAvailability);

  const [isUpdated, setIsUpdated] = useState(false);  // Track the update status

  const onSubmit = async (data) => {
    await fnupdateAvailability(data);
    setIsUpdated(true);  // Set to true after the update is successful
    reset();  // Reset the form to empty values

    // Hide the success message after a short delay
    setTimeout(() => {
      setIsUpdated(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2x1 mx-auto">
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => {
        const isAvailable = watch(`${day}.isAvailable`);

        return (
          <div key={day} className="flex items-center space-x-3 mb-3 border-b pb-3">
            <Controller
              name={`${day}.isAvailable`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    setValue(`${day}.isAvailable`, checked);
                    if (!checked) {
                      setValue(`${day}.startTime`, "09:00");
                      setValue(`${day}.endTime`, "17:00");
                    }
                  }}
                  className="transition-transform duration-200 transform hover:scale-105"
                />
              )}
            />
            <span className="w-20 text-lg font-medium text-gray-700">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </span>
            {isAvailable && (
              <>
                <div className="flex items-center space-x-3">
                  <Controller
                    name={`${day}.startTime`}
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-24 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Start Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-gray-600">to</span>
                  <Controller
                    name={`${day}.endTime`}
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-24 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="End Time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors[day]?.endTime && (
                    <span className="text-red-500 text-sm ml-2">
                      {errors[day].endTime.message}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        );
      })}

      <div className="flex items-center space-x-3 mt-4">
        <span className="w-44 text-lg font-medium text-gray-700">
          Minimum gap before booking (minutes):
        </span>

        <Input
          type="number"
          {...register("timeGap", {
            valueAsNumber: true,
          })}
          className="w-24 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        {errors.timeGap && (
          <span className="text-red-500 text-sm">{errors.timeGap.message}</span>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error?.message}</div>}
      
      <Button
        type="submit"
        disabled={loading}
        className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
      >
        {loading ? "Updating..." : "Update Availability"}
      </Button>

      {isUpdated && (
        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-800 text-lg font-semibold rounded-md shadow-md transform transition-all duration-300 ease-in-out scale-105">
           Availability Updated Successfully!
        </div>
      )}
    </form>
  );
}


