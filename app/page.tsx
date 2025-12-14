'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { ArrowDown, Search, MapPin, SlidersHorizontal, ChartBarStacked, House, CircleDollarSign, MapPinHouse, Headset } from "lucide-react";
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
type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: string;
  status: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  isFeatured: boolean;
};
  const properties:Property[] = [
    {
      id: "prop_001",
      title: "Modern 2‑Bedroom Apartment",
      location: "Bole, Addis Ababa",
      price: 18000,
      priceUnit: "ETB/month",
      status: "for-rent",
      image: "https://via.placeholder.com/400x250",
      bedrooms: 2,
      bathrooms: 2,
      area: "95 sqm",
      isFeatured: true
    },
    {
      id: "prop_002",
      title: "Cozy Single Room",
      location: "4 Kilo, Addis Ababa",
      price: 6500,
      priceUnit: "ETB/month",
      status: "for-rent",
      image: "https://via.placeholder.com/400x250",
      bedrooms: 1,
      bathrooms: 1,
      area: "28 sqm",
      isFeatured: false
    },
    {
      id: "prop_003",
      title: "Family House with Garden",
      location: "Ayat, Addis Ababa",
      price: 4_500_000,
      priceUnit: "ETB",
      status: "for-sale",
      image: "https://via.placeholder.com/400x250",
      bedrooms: 4,
      bathrooms: 3,
      area: "210 sqm",
      isFeatured: true
    }
  ];

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
                        <ChartBarStacked />
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
                       <House />
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
                        <CircleDollarSign />
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
                        <MapPinHouse />
                        <SelectValue placeholder="Location" />
                      </div>
                    
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
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl  font-bold my-6" >Discover your feautred property</h1>
        <p className={`${caveat.className} text-xl`}>Fast, verified, and made for modern Ethiopia.</p>
      </div>
      <div className="grid grid-cols-3 gap-3.5 mx-42 mt-8">
           {properties.map((property) => (
        <Card key={properties.id} className="overflow-hidden ">
           <span
              className={`px-4 py-1 ml-4 text-l w-26.5 rounded-lg font-semibold  ${
                properties.status === "for-sale"
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {properties.status === "for-sale" ? "For Sale" : "For Rent"}
            </span>
          <img src={properties.image} alt="property image"  className="h-40 w-full object-cover"/>
          
           <CardHeader>
            <CardTitle className="text-lg">{properties.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{properties.location}</p>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary">
                {properties.price} {properties.priceUnit}
              </span>
              <span className="text-sm text-muted-foreground">
                {properties.bedrooms} bd • {properties.bathrooms} ba
              </span>
            </div>
          </CardContent>

          
          


        </Card> ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-16 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
            <div className="flex flex-col items-center text-center space-y-4">
                <House className="text-black h-22 w-13"/>
              
              <h3 className={`${exo2.className} text-xl font-bold text-gray-900`}>Premium Properties</h3>
              <p className="text-gray-600">Hand-picked homes with luxury amenities and modern design</p>
            </div>
          </Card>

          <Card className="p-6 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
            <div className="flex flex-col items-center text-center space-y-4">
              <MapPinHouse className="text-black h-22 w-13"/>
              <h3 className={`${exo2.className} text-xl font-bold text-gray-900`}>Prime Locations</h3>
              <p className="text-gray-600">Best neighborhoods with excellent connectivity and amenities</p>
            </div>
          </Card>

          <Card className="p-6 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group">
            <div className="flex flex-col items-center text-center space-y-4">
              <Headset className="text-black h-22 w-13"/>
              <h3 className={`${exo2.className} text-xl font-bold text-gray-900`}>Expert Support</h3>
              <p className="text-gray-600">Dedicated team to guide you through every step</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}