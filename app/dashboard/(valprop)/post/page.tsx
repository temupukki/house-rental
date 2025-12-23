"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { setDate, setMonth } from "date-fns";
import {
  Building,
  Building2,
  CalendarIcon,
  House,
  Minus,
  Plus,
  Store,
} from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { date } from "zod";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { select } from "framer-motion/client";
import { toast } from "sonner";
function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}
const { data: session, error } = await authClient.getSession();

export default function owner() {
  const [step, setStep] = useState(1);
  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [price, setPrice] = useState(3000);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));
  const [selected, setSelected] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shared, setShared] = useState(false);
  const [condate, setCondate] = useState("");
  const [ownpro, setOwnpro] = useState({
    name: "",
    email: "",
  });
  const [ownphone, setOwnphone] = useState("");
  const [area, setArea] = useState("");
  const propertydata = {
    selected,
    status,
    title,
    description,
    shared,
    condate,
    ownname: ownpro.name,
    ownemail: ownpro.email,
    ownphone,
    area,
    price,
    bedroom,
    bathroom
  };
  const ppost = async () => {
    try {
      const res = await fetch("api/propost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertydata),
      });
      
      if (!res.ok) throw new Error("Failed to submit");
      const data = await res.json();
      rou.push("/dashboard")
      toast.success("The property is saved successfully");
    } catch (err: any) {
      toast.error(err);
    }
  };

  const rou = useRouter();
  useEffect(() => {
    if (session?.user) {
      setOwnpro({
        name: session.user.name ?? "",
        email: session.user.email ?? "",
      });
    }
  }, [session]);

  const nextStep = () => {
  setStep((prev)=>prev+1)
  };
  const backStep = () => {
    setStep((prev) => prev - 1);
  };
  const plusBed = () => {
    setBedroom((prev) => prev + 1);
  };
  const minusBed = () => {
    setBedroom((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const plusBath = () => {
    setBathroom((prev) => prev + 1);
  };
  const minusBath = () => {
    setBathroom((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const plusPrice = () => {
    setPrice((prev) => prev + 1000);
  };
  const minusPrice = () => {
    setPrice((prev) => (prev > 4000 ? prev - 500 : 3000));
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h1 className=" mt-13 text-5xl font-semibold text-gray-800 flex flex-col items-center ">
            Which of these best describes your place?
          </h1>

          <div className="grid grid-cols-3 mx-90 mt-12.5">
            <div className="mx-3">
              <Card
                onClick={() => setSelected("house")}
                className={`px-5 py-7 hover:bg-gray-200 hover:border-black ${
                  selected === "house" ? "bg-gray-200 border-black" : ""
                }`}
              >
                <House className="text-gray-800 w-20 h-14 " />
                <p className="text-gray-700 text-xl ml-4 -mt-5">House</p>
              </Card>
            </div>
            <div className="mx-3">
              <Card
                onClick={() => setSelected("apartment")}
                className={`px-5 py-7 hover:bg-gray-200 hover:border-black ${
                  selected === "apartment" ? "bg-gray-200 border-black" : ""
                }`}
              >
                <Building className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">Apartment</p>
              </Card>
            </div>
            <div className="mx-3">
              <Card
                onClick={() => setSelected("condo")}
                className={`px-5 py-7 hover:bg-gray-200 hover:border-black ${
                  selected === "condo" ? "bg-gray-200 border-black" : ""
                }`}
              >
                <Building2 className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">Condo</p>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-3 mx-90 mt-6">
            <div className="mx-3">
              <Card
                onClick={() => setSelected("shop")}
                className={`px-5 py-7 hover:bg-gray-200 hover:border-black ${
                  selected === "shop" ? "bg-gray-200 border-black" : ""
                }`}
              >
                <Store className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">Shop</p>
              </Card>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h1 className=" mt-13 text-5xl font-semibold text-gray-800 flex flex-col items-center ">
            Is this property for sale or for rent?
          </h1>
          <div className="space-y-3 mx-90 mt-12.5">
            <Card
              onClick={() => setStatus("for-rent")}
              className={`text-2xl font-semibold  hover:border-black border-gray-300 hover:bg-gray-200 pl-10 py-17 ${
                status === "for-rent" ? "bg-gray-200 border-black" : ""
              }`}
            >
              For rent
            </Card>
            <Card
              onClick={() => setStatus("for-sale")}
              className={`text-2xl font-semibold  hover:border-black border-gray-300 hover:bg-gray-100 pl-10 py-17 ${
                status === "for-sale" ? "bg-gray-200 border-black" : ""
              }`}
            >
              For sale
            </Card>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h1 className=" mt-13 text-5xl font-semibold text-gray-800 flex flex-col items-center ">
            Where is your place located?
          </h1>
          <div className="space-y-3 mx-90 mt-12.5"></div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h1 className=" mt-13 text-5xl font-semibold text-gray-800 flex flex-col items-center ">
            Property detail
          </h1>
          <div className="space-y-3 mx-90 mt-12.5">
            <Label className="text-xl text-medium">Property title</Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="py-7 "
              placeholder="Enter your property title"
            />
            <Label className="text-xl text-medium">Property description </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="py-3 h-80 "
              placeholder="Enter your property description"
            />
          </div>
        </div>
      )}
      {step === 5 && (
        <div>
          <h1 className=" mt-13 text-5xl font-semibold text-gray-800 flex flex-col items-center ">
            Property Details
          </h1>
          <div className="space-y-6 mx-90 mt-12.5 ">
            <Label className="text-xl text-medium">Bedrooms</Label>
            <div className="flex flex-row ">
              <button
                onClick={minusBed}
                className="bg-red-500 mx-1 rounded-sm text-white px-1.5"
              >
                <Minus />
              </button>
              <Input
                className="py-4  w-20"
                placeholder="Enter property Number of Bedrooms"
                value={bedroom}
                type="number"
                min="0"
                onChange={(e) => setBedroom(Number(e.target.value))}
              />

              <button
                onClick={plusBed}
                className="bg-green-500 mx-1 rounded-sm text-white px-1.5"
              >
                <Plus />
              </button>
            </div>

            <Label className="text-xl text-medium">Bathrooms </Label>
            <div className="flex flex-row">
              <button
                onClick={minusBath}
                className="bg-red-500 mx-1 rounded-sm text-white px-1.5"
              >
                <Minus />
              </button>
              <Input
                className="py-4 w-20 "
                placeholder="Enter property Number of Bathrooms"
                value={bathroom}
                type="number"
                min="0"
                onChange={(e) => setBathroom(Number(e.target.value))}
              />
              <button
                onClick={plusBath}
                className="bg-green-500 mx-1 rounded-sm text-white px-1.5"
              >
                <Plus />
              </button>
            </div>
            <div className="flex items-center gap-3 pl-3">
              <Checkbox
                id="shared"
                checked={shared}
                onCheckedChange={(checked) => setShared(!!checked)}
              />
              <Label htmlFor="shared" className="text-black ">
                Shared
              </Label>
            </div>
            <p className="italic pl-3 ">
              <span className="font-bold">NB</span>: If property bathroom is
              shared check shared box .{" "}
            </p>

            <Label className="text-xl text-medium">Property price</Label>
            <div className="flex flex-row">
              <button
                onClick={minusPrice}
                className="bg-red-500 mx-1 rounded-sm text-white px-1.5"
              >
                <Minus />
              </button>
              <Input
                className="py-4 w-30 "
                placeholder="Enter property price"
                type="number"
                min="3000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <button
                onClick={plusPrice}
                className="bg-green-500 mx-1 rounded-sm text-white px-1.5"
              >
                <Plus />
              </button>
            </div>
            <p className="italic pl-3 ">
              <span className="font-bold">NB</span>: If the property is for rent
              enter the price per month
            </p>
            <Label className="px-1"> Area</Label>
            <Input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="py-4 w-30 "
              placeholder="Enter property area in m²"
              type="number"
              min="10"
            />
            <div className="flex flex-col gap-3">
              <Label htmlFor="date" className="px-1">
                Construction Date
              </Label>
              <div className="relative flex gap-2">
                <Input
                  id="date"
                  value={condate}
                  placeholder="June 01, 2025"
                  className="bg-background py-3"
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setValue(e.target.value);
                    if (isValidDate(date)) {
                      setDate(date);
                      setMonth(date);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setOpen(true);
                    }
                  }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-picker"
                      className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                      <CalendarIcon className="size-3.5" />
                      <span className="sr-only">Select date</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      month={month}
                      onMonthChange={setMonth}
                      onSelect={(date) => {
                        setDate(date);
                        setValue(formatDate(date));
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 6 && (
        <div>
          <h1 className=" mt-13 text-5xl font-semibold text-gray-800 flex flex-col items-center ">
            Property Owner(Agent) Details
          </h1>
          <div className="space-y-3 mx-90 mt-12.5">
            <Label className="text-xl text-medium">Owner(Agent) Name</Label>
            <Input
              value={ownpro.name}
              onChange={(e) => setOwnpro({ ...ownpro, name: ownpro.name })}
              className="py-7  "
              placeholder="Enter Owner(Agent) Name"
            />
            <Label className="text-xl text-medium">
              Owner(Agent) Phone number{" "}
            </Label>
            <Input
              value={ownphone}
              onChange={(e) => setOwnphone(e.target.value)}
              className="py-7 "
              placeholder="Enter Owner(Agent) phone number"
              type="number"
            />
            <Label className="text-xl text-medium">Owner(Agent) Email</Label>
            <Input
              value={ownpro.email}
              onChange={(e) => setOwnpro({ ...ownpro, email: ownpro.email })}
              className="py-7 "
              placeholder="Enter Owner(Agent) Email"
              type="email"
            />
          </div>
        </div>
      )}
      <hr className="w-[1680px] mt-16" />
      <div className="flex flex-row justify-between ">
        <button
          onClick={backStep}
          className="text-black underline font-semibold ml-28 my-10 text-2xl "
        >
          Back
        </button>
        {step < 6 && (
          <button
            onClick={nextStep}
            className="bg-blue-600 text-white px-4 py-2"
          >
            Next
          </button>
        )}

        {step === 6 && (
          <button
            onClick={ppost}
            className="bg-green-600 text-white px-4 py-2"
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
