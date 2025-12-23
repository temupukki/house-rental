"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Building2, House, Store } from "lucide-react";
import { useState } from "react";


export default function owner() {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const backStep = () => {
    setStep((prev) => prev - 1);
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
              <Card className="px-5 py-7 ">
                <House className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">House</p>
              </Card>
            </div>
            <div className="mx-3">
              <Card className="px-5 py-7 ">
                <Building className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">Apartment</p>
              </Card>
            </div>
            <div className="mx-3">
              <Card className="px-5 py-7 ">
                <Building2 className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">Condo</p>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-3 mx-90 mt-6">
            <div className="mx-3">
              <Card className="px-5 py-7 ">
                <Store className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">Shop</p>
              </Card>
            </div>
            <div className="mx-3">
              <Card className="px-5 py-7 ">
                <House className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">House</p>
              </Card>
            </div>
            <div className="mx-3">
              <Card className="px-5 py-7 ">
                <House className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">House</p>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-3 mx-90  mt-6 mb-14">
            <div className="mx-3">
              <Card className="px-5 py-7 ">
                <House className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">House</p>
              </Card>
            </div>
            <div className="mx-3">
              <Card className="px-5 py-7 ">
                <House className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">House</p>
              </Card>
            </div>
            <div className="mx-3">
              <Card className="px-5 py-7 ">
                <House className="text-gray-800 w-20 h-14" />
                <p className="text-gray-700 text-xl ml-4 -mt-5">House</p>
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
            <Card className="text-2xl font-semibold  hover:border-black border-gray-300 hover:bg-gray-100 pl-10 py-17">
              For rent
            </Card>
            <Card className="text-2xl font-semibold  hover:border-black border-gray-300 hover:bg-gray-100 pl-10 py-17">
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
            <Input className="py-7 " placeholder="Enter your property title"/>
             <Label className="text-xl text-medium">Property description </Label>
            <Textarea className="py-3 h-80 " placeholder="Enter your property description"/>
             
          </div>
        </div>
      )}
       {step === 5 && (
        <div>
          <h1 className=" mt-13 text-5xl font-semibold text-gray-800 flex flex-col items-center ">
            Property Details
          </h1>
          <div className="space-y-3 mx-90 mt-12.5">
            <Label className="text-xl text-medium">Bedrooms</Label>
            <Input className="py-7 " placeholder="Enter property Number of Bedrooms"/>
             <Label className="text-xl text-medium">Bathrooms </Label>
              <Input className="py-7 " placeholder="Enter property Number of Bathrooms"/>
               <div className="flex items-center gap-3 pl-3">
              <Checkbox id="shared" />
               <Label htmlFor="shared" className="text-black ">Shared</Label>
               </div>
               <p className="italic pl-3 "><span className="font-bold">NB</span>:  If property bathroom is shared check shared box . </p>

             <Label className="text-xl text-medium">Property price</Label> 
            <Input className="py-7 " placeholder="Enter property price"/>


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
        <button
          onClick={nextStep}
          className="text-white bg-primary h-11 my-10 text-2xl font-semibold rounded-xl pt-2 pb-4 px-10 mr-25"
        >
          Next
        </button>
      </div>
    </div>
  );
}
