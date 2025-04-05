"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import EventForm from "./event-form";

export default function CreateEventDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);


  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window?.location.pathname);
    }
  };


  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <DrawerContent className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl transition-all hover:shadow-2xl">
  
        {/* Drawer Header */}
        <DrawerHeader className="flex items-center justify-between p-6 bg-blue-600 text-white rounded-t-xl">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            📅 Create New Event
          </h2>
          <button
            onClick={handleClose}
            className="text-black hover:text-red-400 transition-transform hover:scale-110"
          >
            ✖️
          </button>
        </DrawerHeader>
  
        {/* Event Form */}
        <div className="p-6 bg-white rounded-b-xl">
          <EventForm
            onSubmitForm={() => {
              handleClose();
            }}
          />
        </div>
  
        {/* Drawer Footer */}
        <DrawerFooter className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-b-xl shadow-md">
          <DrawerClose asChild>
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex items-center gap-2 px-5 py-2 border-2 border-gray-500 text-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-300 rounded-md shadow-sm"
            >
              ❌ Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
  
      </DrawerContent>
    </Drawer>
  );
}
