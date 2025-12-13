'use client'

import { Card } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@radix-ui/react-select";
import { ArrowDown } from "lucide-react";
import { Caveat } from "next/font/google";
import { Exo_2 } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Home(){
  return(
    <div className="bg-white">
      <Card className="bg-linear-to-r from-gray-600 via-gray-800 to-gray-700  mx-10 mt-4 flex flex-col items-center justify-center h-screen ">
        <h1 className={`${exo2.className} text-7xl font-bold`}>Find ahome that suits your lifestyle.</h1>
        <p className={`${caveat.className} text-3xl font-medium`}>We have a curated selection of homes designed for comfort, style, and modern living. </p>
      </Card>
      <Card className="text-black flex-row justify-center z-10 -mt-20 bg-white w-340 ml-40 border-none h-39 ">
        <Select>
      <SelectTrigger className="w-[180px] flex-row">
        <SelectValue placeholder="Category " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="appartment">Appartement</SelectItem>
          <SelectItem value="condo">Condos</SelectItem>
          <SelectItem value="villa">Villas</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Property type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Property type</SelectLabel>
          <SelectItem value="studio">Studio</SelectItem>
          <SelectItem value="1bed">One bed room</SelectItem>
          <SelectItem value="2bed">Two bed rooms</SelectItem>
          <SelectItem value="3bed">Three bed rooms</SelectItem>
          <SelectItem value="g1">G + 1</SelectItem>
          <SelectItem value="g2">G + 2</SelectItem>
          <SelectItem value="g3">G + 3</SelectItem>
      
        </SelectGroup>
      </SelectContent>
    </Select>
 
      </Card>



    
    </div>
  )
}