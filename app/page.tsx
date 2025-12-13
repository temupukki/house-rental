'use client'

import { Card } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { ArrowDown, Search, MapPin, SlidersHorizontal } from "lucide-react";
import { Caveat } from "next/font/google";
import { Exo_2 } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
   
      <div className="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 mx-4 md:mx-10 mt-4 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
        <Card className="relative border-none bg-transparent backdrop-blur-sm flex flex-col items-center justify-center h-[85vh] px-4 md:px-8">
          <div className="text-center space-y-8 max-w-6xl">
            <div className="space-y-4">
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-6 py-2 text-lg">
                 Premium Living Spaces
              </Badge>
              <h1 className={`${exo2.className} text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight`}>
                Find a home that
                <span className="block bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  suits your lifestyle.
                </span>
              </h1>
            </div>
            
            <p className={`${caveat.className} text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed`}>
              We have a curated selection of homes designed for comfort, style, and modern living.
            </p>
            
        
          </div>
        </Card>
      </div>

      <div className="relative z-10 -mt-24 md:-mt-28 mx-4 md:mx-auto max-w-7xl">
        <Card className=" backdrop-blur-xl border-white/20 shadow-black-2xl shadow-blue-500/10 rounded-2xl p-6 md:p-8 h-48 bg-white ">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
             
                <div className="relative group text-black ml-2 mt-10 ">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <Select >
                    <SelectTrigger className="relative bg-white font-medium text-[18px] border-gray-200 hover:border-blue-300 transition-all duration-200 w-[240px] py-7 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 text-2xl font-bold" />
                        <SelectValue placeholder="Category" />
                      </div>
                    
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200  rounded-xl w-90">
                      <SelectGroup>
                        <SelectLabel className="text-black">Category</SelectLabel>
                        <SelectItem value="apartment" className="cursor-pointer text-black hover:bg-gray-50">Apartment</SelectItem>
                        <SelectItem value="condo" className="cursor-pointer text-black hover:bg-gray-50">Condo</SelectItem>
                        <SelectItem value="villa" className="cursor-pointer text-black hover:bg-gray-50"> Villa</SelectItem>
 
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative group text-black mt-10 ml-10" >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <Select>
                    <SelectTrigger className="relative font-medium text-[18px] bg-white border-gray-200 hover:border-blue-300 transition-all duration-200 w-60 py-7  h-12 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 text-black" />
                        <SelectValue placeholder="Property Type" />
                      </div>
                    
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-xl rounded-xl">
                      <SelectGroup>
                        <SelectLabel className="text-black">Property Type</SelectLabel>
                        <SelectItem value="studio" className="cursor-pointer text-black  hover:bg-gray-50">Studio</SelectItem>
                        <SelectItem value="1bed" className="cursor-pointer text-black hover:bg-gray-50">1 Bedroom</SelectItem>
                        <SelectItem value="2bed" className="cursor-pointer text-black hover:bg-gray-50">2 Bedrooms</SelectItem>
                        <SelectItem value="3bed" className="cursor-pointer text-black hover:bg-gray-50">3+ Bedrooms</SelectItem>
                        <SelectItem value="g1" className="cursor-pointer text-black hover:bg-gray-50">G + 1</SelectItem>
                        <SelectItem value="g2" className="cursor-pointer text-black hover:bg-gray-50">G + 2</SelectItem>
                        <SelectItem value="g3" className="cursor-pointer text-black hover:bg-gray-50">G + 3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative group text-black mt-10 ml-18">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <Select>
                    <SelectTrigger className="relative text-[18px] font-medium bg-white border-gray-200 hover:border-blue-300 transition-all duration-200 w-60  py-7 h-12 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <SelectValue placeholder="Price Range" />
                      </div> 
                     
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-xl rounded-xl">
                      <SelectGroup>
                        <SelectLabel className="text-gray-500">Price Range</SelectLabel>
                        <SelectItem value="100k" className="cursor-pointer text-black hover:bg-gray-50">$100K - $300K</SelectItem>
                        <SelectItem value="300k" className="cursor-pointer text-black hover:bg-gray-50">$300K - $500K</SelectItem>
                        <SelectItem value="500k" className="cursor-pointer text-black hover:bg-gray-50">$500K - $1M</SelectItem>
                        <SelectItem value="1m+" className="cursor-pointer text-black hover:bg-gray-50">$1M+</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative group text-black mt-10 ml-24">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <Select>
                    <SelectTrigger className="relative text-[18px] font-meduim bg-white border-gray-200 hover:border-blue-300 transition-all duration-200 w-60 py-7 h-12 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <SelectValue placeholder="Location" />
                      </div>
                      <ArrowDown className="h-4 w-4 opacity-50" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 shadow-xl rounded-xl">
                      <SelectGroup>
                        <SelectLabel className="text-gray-500">Location</SelectLabel>
                        <SelectItem value="downtown" className="cursor-pointer text-black hover:bg-gray-50">Downtown</SelectItem>
                        <SelectItem value="suburbs" className="cursor-pointer text-black hover:bg-gray-50">Suburbs</SelectItem>
                        <SelectItem value="beachfront" className="cursor-pointer text-black hover:bg-gray-50">Beachfront</SelectItem>
                        <SelectItem value="countryside" className="cursor-pointer text-black hover:bg-gray-50">Countryside</SelectItem>
                      </SelectGroup>
                    </SelectContent> 
                  </Select>
                </div>
              </div>

           
              <Button className=" mt-10 ml-30 h-12 py-7 px-13 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/35">
                <Search className="mr-2 h-5 w-5" />
                Search
                <SlidersHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                <div className="text-3xl">🏠</div>
              </div>
              <h3 className={`${exo2.className} text-xl font-bold text-gray-900`}>Premium Properties</h3>
              <p className="text-gray-600">Hand-picked homes with luxury amenities and modern design</p>
            </div>
          </Card>

          <Card className="p-6 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                <div className="text-3xl">📍</div>
              </div>
              <h3 className={`${exo2.className} text-xl font-bold text-gray-900`}>Prime Locations</h3>
              <p className="text-gray-600">Best neighborhoods with excellent connectivity and amenities</p>
            </div>
          </Card>

          <Card className="p-6 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-xl bg-linear-to-br from-blue-50 to-cyan-50 group-hover:from-blue-100 group-hover:to-cyan-100 transition-all duration-300">
                <div className="text-3xl">🤝</div>
              </div>
              <h3 className={`${exo2.className} text-xl font-bold text-gray-900`}>Expert Support</h3>
              <p className="text-gray-600">Dedicated team to guide you through every step</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}