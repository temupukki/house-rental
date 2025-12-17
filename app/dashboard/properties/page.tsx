"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BedDouble, Bath, Expand, BadgeInfo } from "lucide-react";
import { useState } from "react";
type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: string;
  status: string;
  mainImage: string;
  supportimage:string[];
  desccription:string;
  bedrooms: number;
  bathrooms: number;
  floor:number;
  constructionYear:number;
  elevator:number;
  parking:boolean;
  wifi:boolean;
  education:string[];
  health:string[];
  area: string;
  isFeatured: boolean;
};
const properties: Property[] = [
  {
    id: "prop_001",
    title: "Modern 2‑Bedroom Apartment",
    location: "Bole, Addis Ababa",
    price: 18000,
    priceUnit: "ETB/month",
    status: "for-rent",
    mainImage: "data:image/jpeg;base64,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",
    bedrooms: 2,
    bathrooms: 2,
    area: "95 sqm",
    isFeatured: true,
    supportimage: [],
    desccription: "",
    floor: 0,
    constructionYear: 0,
    elevator: 0,
    parking: false,
    wifi: false,
    education: [],
    health: []
  },
  {
    id: "prop_002",
    title: "Cozy Single Room",
    location: "4 Kilo, Addis Ababa",
    price: 6500,
    priceUnit: "ETB/month",
    status: "for-rent",
    mainImage: "https://via.placeholder.com/400x250",
    bedrooms: 1,
    bathrooms: 1,
    area: "28 sqm",
    isFeatured: false,
    supportimage: [],
    desccription: "",
    floor: 0,
    constructionYear: 0,
    elevator: 0,
    parking: false,
    wifi: false,
    education: [],
    health: []
  },
  {
    id: "prop_003",
    title: "Family House with Garden",
    location: "Ayat, Addis Ababa",
    price: 4500000,
    priceUnit: "ETB",
    status: "for-sale",
    mainImage: "https://via.placeholder.com/400x250",
    bedrooms: 4,
    bathrooms: 3,
    area: "210 sqm",
    isFeatured: true,
    supportimage: [],
    desccription: "",
    floor: 0,
    constructionYear: 0,
    elevator: 0,
    parking: false,
    wifi: false,
    education: [],
    health: []
  },
];

export default function prope() {
  const [selectedProduct, setSelectedProduct]= useState<Property | null>(null)
     if (selectedProduct) {
    return (
      <div className="z-20 text-8xl text-red-500">
        
      </div>
    )}
  return (
    <div>
      
      <div className="grid grid-cols-3   mx-53 my-18  ">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="overflow-hidden p-0 rounded-sm w-100 "
          >
            <span
              className={`absolute m-4 px-4 py-1 text-sm rounded-lg font-semibold z-10 ${
                property.status === "for-sale"
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white"
              }`}
            >
              {property.status === "for-sale" ? "For Sale" : "For Rent"}
            </span>
            <img
              src={property.mainImage}
              alt="property image"
              className="h-40 w-full object-cover"
            />

            <CardHeader>
              <CardTitle className="text-lg">{property.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {property.location}
              </p>
            </CardHeader>

            <CardContent>
              <div>
                <span className="font-bold text-primary ">
                  {property.price} {property.priceUnit}
                </span>
                <hr className="my-3" />
                <div className="text-sm text-black flex gap-14.5 mt-3">
                  <span className="flex gap-1.5">
                    <BedDouble />
                    {property.bedrooms}
                  </span>
                  <span className="flex gap-1.5">
                    <Bath />
                    {property.bathrooms}
                  </span>
                  <span className="flex gap-1.5">
                    <Expand />
                    {property.area}
                  </span>
                  <motion.button
                    className="-ml-4"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.94 }}
                    whileInView={{ scale: 1.1 }}
                  >
                    <BadgeInfo />
                  </motion.button>
                </div>
                <div className="flex flex-col-4 gap-7.5 text-sm mt-1">
                  <p>Bedrooms</p>
                  <p>Bathrooms</p>
                  <p>Total area</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <motion.button
                onClick={()=>setSelectedProduct(property)}
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.12,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.6 }}
                className="px-4 py-2 rounded-md bg-primary text-white font-medium mb-4"
              >
                See Details
              </motion.button>
            </CardFooter>
          </Card>
        ))}
      </div>

  
    </div>
  );
}
