"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BedDouble,
  Bath,
  Expand,
  BadgeInfo,
  ChevronLeft,
  Camera,
  HardHat,
  MoveVertical,
  SquareParking,
  MapPinHouse,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { property } from "zod";
type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: string;
  status: string;
  mainImage: string;
  supportimage: string[];
  description: string;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  constructionYear: number;
  elevator: Boolean;
  parking: boolean;
  wifi: boolean;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  education: string[];
  health: string[];
  area: number;
  isFeatured: boolean;
};

export default function prope() {
  const [selectedProduct, setSelectedProduct] = useState<Property | null>(null);
  const [post, setPost] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => {
    async function fetchproperties() {
      try {
        const res = await fetch("/api/propost");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchproperties();
  }, []);

  if (selectedProduct) {
    return (
      <div className="z-20  ">
        <button
          onClick={() => setSelectedProduct(null)}
          className="flex flex-row space-x-1.5  ml-16 bg-primary text-white pl-2 pr-4 py-2 text-l  font-meduim rounded-lg "
        >
          <ChevronLeft />
          Back to list
        </button>
        <div className="ml-28 mt-10 ">
          <button
            className={`${
              selectedProduct.status === "for-sale"
                ? "bg-red-500"
                : "bg-green-400"
            } px-11  py-2 font-semibold text-white  text-[23px] rounded-lg `}
          >
            {selectedProduct.status === "for-sale" ? "For sale" : "For rent"}
          </button>
          <div className="grid grid-cols-[83%_17%]">
            <div>
              <h1 className="mt-7 text-6xl font-semibold">
                {selectedProduct.title}
              </h1>
              <p className="mt-4 text-gray-700 text-3xl font-meduim">
                {selectedProduct.location}
              </p>
            </div>
            <div>
              <h1 className="mt-7 text-4xl font-semibold">
                {selectedProduct.price + " ETB"}{" "}
              </h1>
              <p className="ml-19 mt-3">
                {selectedProduct.status === "for-rent" ? "per month" : ""}
              </p>
              <p className="mt-4 ml-16 text-gray-700 text-[20px] font-meduim">
                {selectedProduct.status === "for-sale"
                  ? Math.floor(selectedProduct.price / selectedProduct.area) +
                    " /sq.meter"
                  : ""}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[70%_30%] my-8 ">
            <div>
              <img
                src={selectedProduct.mainImage}
                alt="Main image"
                className="h-180  w-270 rounded-xl"
              />
            </div>
            <div className=" grid grid-rows-2 ">
              <div>
                <img
                  src={selectedProduct.mainImage}
                  alt="Support images"
                  className="h-87 w-100 rounded-xl "
                />
                <span className="z-10 absolute ml-39 -mt-48 text-white font-bold text-3xl">
                  <Camera className="ml-7 h-13 w-14 " />
                  Show all
                </span>
              </div>
              <div className="mt-3">
                <Card>
                  <Link
                    href="https://www.google.com/maps?q=12.59707480619531,37.45011114570507"
                  > <MapPinHouse /> Goto location</Link>
                  <img 
  src="https://maps.googleapis.com/maps/api/staticmap?center=11.5721,37.3614&zoom=14&size=600x400&markers=color:red|11.5721,37.3614&key=YOUR_API_KEY" 
  alt="Map location"></img>
                </Card>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[70%_30%] my-8 ">
            <div>
              <h1 className="text-4xl font-semibold tracking-[1px] mb-10 mt-16 ">
                Description
              </h1>
              <p className="text-xl mb-16">{selectedProduct.description}</p>
              <p className="text-4xl font-semibold tracking-[1px] mb-10 ">
                Property details
              </p>
              <div className="grid grid-cols-2">
                <div>
                  <p className="text-2xl text-gray-700 font-sans flex flex-row  gap-2.5">
                    <Expand className="-mt-1 w-9 h-9 mr-2" />
                    Total area{" "}
                    <span className="text-black font-medium mt-1 text-2xl ml-64">
                      {selectedProduct.area} sq.m
                    </span>
                  </p>
                  <hr className="my-6 w-130" />
                  <p className="text-2xl text-gray-700 font-sans flex flex-row  gap-2.5">
                    <BedDouble className="-mt-1 w-9 h-9 mr-2" />
                    Bedrooms{" "}
                    <span className="text-black font-medium mt-1 text-2xl ml-80">
                      {selectedProduct.bedrooms}{" "}
                    </span>
                  </p>
                  <hr className="my-6 w-130" />
                  <p className="text-2xl text-gray-700 font-sans flex flex-row  gap-2.5">
                    <Bath className="-mt-1 w-9 h-9 mr-2" />
                    Bathrooms{" "}
                    <span className="text-black font-medium mt-1 text-2xl ml-78">
                      {selectedProduct.bathrooms}
                    </span>
                  </p>
                  <hr className="my-6 w-130" />
                  <p className="text-2xl text-gray-700 font-sans flex flex-row  gap-2.5">
                    <HardHat className="-mt-1 w-9 h-9 mr-2" />
                    Construction year
                    <span className="text-black font-medium mt-1 text-2xl ml-48">
                      {selectedProduct.constructionYear}
                    </span>
                  </p>
                  <hr className="my-6 w-130" />
                </div>
                <div>
                  <p className="text-2xl text-gray-700 font-sans flex flex-row  gap-2.5">
                    <MoveVertical className="-mt-1 w-9 h-9 mr-2" />
                    Elevator{" "}
                    <span className="text-black font-medium mt-1 text-2xl ml-82">
                      {selectedProduct.elevator === true ? "Yes" : "No"}{" "}
                    </span>
                  </p>
                  <hr className="my-6 w-130" />
                  <p className="text-2xl text-gray-700 font-sans flex flex-row  gap-2.5">
                    <SquareParking className="-mt-1 w-9 h-9 mr-2" />
                    Parking{" "}
                    <span className="text-black font-medium mt-1 text-2xl ml-84">
                      {selectedProduct.parking === true ? "Yes" : "No"}{" "}
                    </span>
                  </p>
                  <hr className="my-6 w-130" />
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-linear-to-r from-blue-950  to-gray-900 text-white">
                <CardHeader className="font-medium text-3xl ml-6">
                  Contact agent
                </CardHeader>
                <div className="flex flex-row">
                  <div>
                    <img
                      src={selectedProduct.mainImage}
                      alt="Profilephoto"
                      className="w-23 h-22 rounded-full ml-9 "
                    />
                  </div>
                  <div className="mt-1">
                    <h1 className=" ml-9 font-sans font-semibold text-xl">
                      {selectedProduct.ownerName}
                    </h1>
                    <p className="ml-9 text-gray-300">
                      {selectedProduct.ownerPhone}
                    </p>
                    <p className="ml-9 text-gray-300 ">
                      {selectedProduct.ownerEmail}
                    </p>
                  </div>
                </div>
                <form className="space-y-4 -ml-6">
                  <div className="text-white ml-14 mt-3">
                    <input
                      className="border px-4 py-6 rounded-md w-106  text-white bg-white placeholder:text-gray-600 placeholder:text-xl   "
                      placeholder="Your name"
                    />
                  </div>
                  <div className="ml-14 mt-6">
                    <input
                      className="border px-4 py-6 rounded-md w-106  text-white bg-white placeholder:text-gray-600 placeholder:text-xl"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="ml-14 mt-6">
                    <input
                      className="border px-4 py-6 rounded-md w-106  text-white bg-white placeholder:text-gray-600 placeholder:text-xl"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="ml-14 mt-6">
                    <textarea
                      className="border px-4 py-6 rounded-md w-106  h-49 text-white bg-white placeholder:text-gray-600 placeholder:text-xl"
                      placeholder="Your message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-4  ml-14 mt-1 font-medium text-xl rounded-lg"
                  >
                    Send message
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-3   mx-53 my-18  ">
        {Array.isArray(properties) &&
          properties.map((property) => (
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
                  onClick={() => setSelectedProduct(property)}
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
