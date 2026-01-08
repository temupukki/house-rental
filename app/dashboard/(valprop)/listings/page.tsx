"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  MoreVertical,
  Calendar,
  DollarSign,
  Bed,
  Bath,
  Expand,
  MapPin,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  X,
  Home,
  Camera,
  Info,
  Send,
  Upload,
  Save,
} from "lucide-react";
import Link from "next/link";

interface Property {
  locationName: any;
  id: string;
  title: string;
  type: string;
  price: number;
  status: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  postedDate: string;

  images: string[];

  description: string;
}

export default function Listings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [edit, visisbleEdit] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  useEffect(() => {
    async function fetchproperties() {
      try {
        const res = await fetch("/api/listing");
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchproperties();
  }, []);

  if (!properties || !Array.isArray(properties)) {
    return [];
  }

  const filteredProperties = properties
    .filter((property) => {
      const title = property?.title?.toLowerCase() || "";
      const location = property?.locationName?.toLowerCase() || "";
      const description = property?.description?.toLowerCase() || "";

      const searchLower = (searchTerm || "").toLowerCase();

      const matchesSearch =
        title.includes(searchLower) ||
        location.includes(searchLower) ||
        description.includes(searchLower);

      const matchesType = filterType === "all" || property?.type === filterType;
      const matchesStatus =
        filterStatus === "all" || property?.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortBy || sortBy === "default") return 0;

      switch (sortBy) {
        case "price-high":
          return (b?.price || 0) - (a?.price || 0);
        case "price-low":
          return (a?.price || 0) - (b?.price || 0);
        case "newest":
          const dateA = a?.postedDate ? new Date(a.postedDate).getTime() : 0;
          const dateB = b?.postedDate ? new Date(b.postedDate).getTime() : 0;
          return dateB - dateA;
        default:
          return 0;
      }
    });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const stats = {
    total: properties.length,
    rent: properties.filter((p) => p.status === "for-rent").length,
    sale: properties.filter((p) => p.status === "for-sale").length,
    sold: properties.filter((p) => p.status === "sold").length,
    totalValue: properties.reduce((sum, prop) => sum + prop.price, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 ">
      <div className={`mb-8 `}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Property Listings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your properties and listings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/post">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus size={18} />
                Add New Property
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">Total Properties</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-xs text-gray-500 mt-1">All listing</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">For Rent</div>
            <div className="text-2xl font-bold text-green-600">
              {stats.rent}
            </div>
            <div className="text-xs text-gray-500 mt-1">listed for rent</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">For Sale</div>
            <div className="text-2xl font-bold text-green-600">
              {stats.sale}
            </div>
            <div className="text-xs text-gray-500 mt-1">listed for Sale</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">Total Value</div>
            <div className="text-2xl font-bold text-gray-900">
              {formatCurrency(stats.totalValue)}
            </div>
            <div className="text-xs text-gray-500 mt-1">Market value</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search properties by title, address, or city..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="for-rent">For rent</option>
                <option value="for-sale">For sale</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>

          {selectedProperties.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-blue-900">
                    {selectedProperties.length} properties selected
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProperties([])}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear selection
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border">
              <div className="text-gray-400 mb-2">No properties found</div>
              <div className="text-gray-500">
                Try adjusting your filters or add a new property
              </div>
            </div>
          ) : (
            filteredProperties.map((property) => {
              return (
                <div
                  key={property.id}
                  className={`bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                    selectedProperties.includes(property.id)
                      ? "ring-2 ring-blue-500"
                      : ""
                  } `}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="md:w-48 h-48 rounded-lg bg-gray-200 shrink-0 overflow-hidden">
                        <div className="w-full h-full bg-linear-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-gray-600">Property Image</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6 ml-4">
                              <h3 className="font-semibold text-gray-900 text-2xl">
                                {property.title}
                              </h3>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 ml-4">
                              <div className="flex items-center">
                                <Bed size={28} className="text-gray-400 mr-2" />
                                <span className="text-gray-700 text-lg">
                                  {property.bedrooms} beds
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Bath
                                  size={28}
                                  className="text-gray-400 mr-2"
                                />
                                <span className="text-gray-700 text-lg">
                                  {property.bathrooms} baths
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Expand
                                  size={28}
                                  className="text-gray-400 mr-2"
                                />
                                <span className="text-gray-700 text-lg">
                                  {property.area.toLocaleString()} sqft
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Calendar
                                  size={28}
                                  className="text-gray-400 mr-2"
                                />
                                <span className="text-gray-700 text-lg">
                                  {formatDate(property.postedDate)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {formatCurrency(property.price)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {property.type === "commercial"
                                  ? "For Sale"
                                  : "Market Price"}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => visisbleEdit(true)}
                                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                                title="Edit property"
                              >
                                <Edit size={18} />
                              </button>
                            </div>
                            {edit && (
                              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
                                <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200 animate-scaleIn">
                                  <div className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h1 className="text-3xl font-bold text-white mb-1">
                                          Edit Property Listing
                                        </h1>
                                        <p className="text-blue-100">
                                          Manage your property details
                                          comprehensively
                                        </p>
                                      </div>
                                      <button
                                        onClick={() => visisbleEdit(false)}
                                        className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 hover:rotate-90 group"
                                      >
                                        <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                      </button>
                                    </div>

                                    <div className="flex items-center gap-4 mt-4">
                                      <span
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                                          property.status === "For Sale"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-blue-100 text-blue-800"
                                        }`}
                                      >
                                        {property.status}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="p-6 overflow-y-auto max-h-[70vh]">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                      <div className="space-y-6">
                                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                          <div className="flex justify-between items-start mb-4">
                                            <div>
                                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Property Title
                                              </label>
                                              <input
                                                type="text"
                                                value={property.title}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl font-bold"
                                                placeholder="Modern Luxury Villa with Pool"
                                              />
                                            </div>
                                            <div className="text-right">
                                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Price
                                              </label>
                                              <div className="relative">
                                                <span className="absolute left-3 top-3 text-gray-500">
                                                  $
                                                </span>
                                                <input
                                                  type="number"
                                                  value={property.price}
                                                  className="pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 text-right text-2xl font-bold text-blue-700"
                                                />
                                              </div>
                                              <select className="mt-2 p-2 border rounded-lg text-sm">
                                                <option>Sale</option>
                                                <option>Rent</option>
                                                <option>Lease</option>
                                                <option>Auction</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <Home className="w-5 h-5" />{" "}
                                            Property Details
                                          </h3>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <label className="block text-sm text-gray-600 mb-1">
                                                Bedrooms
                                              </label>
                                              <div className="flex items-center border rounded-lg p-2">
                                                <input
                                                  type="number"
                                                  min="0"
                                                  className="w-full outline-none"
                                                  defaultValue="3"
                                                />
                                                <Bed className="w-4 h-4 text-gray-400 ml-2" />
                                              </div>
                                            </div>
                                            <div>
                                              <label className="block text-sm text-gray-600 mb-1">
                                                Bathrooms
                                              </label>
                                              <div className="flex items-center border rounded-lg p-2">
                                                <input
                                                  type="number"
                                                  min="0"
                                                  className="w-full outline-none"
                                                  defaultValue="2"
                                                />
                                                <Bath className="w-4 h-4 text-gray-400 ml-2" />
                                              </div>
                                            </div>
                                            <div>
                                              <label className="block text-sm text-gray-600 mb-1">
                                                Square Feet
                                              </label>
                                              <div className="flex items-center border rounded-lg p-2">
                                                <input
                                                  type="number"
                                                  className="w-full outline-none"
                                                  defaultValue="2500"
                                                />
                                                <span className="text-gray-400 text-sm ml-2">
                                                  sqft
                                                </span>
                                              </div>
                                            </div>
                                            <div>
                                              <label className="block text-sm text-gray-600 mb-1">
                                                Year Built
                                              </label>
                                              <input
                                                type="number"
                                                className="w-full border rounded-lg p-2"
                                                defaultValue="2020"
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />{" "}
                                            Location
                                          </h3>
                                          <input
                                            type="text"
                                            placeholder="Full Address"
                                            className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                                          />
                                          <div className="grid grid-cols-2 gap-3">
                                            <input
                                              type="text"
                                              placeholder="City"
                                              className="p-2 border rounded-lg"
                                            />
                                            <input
                                              type="text"
                                              placeholder="State"
                                              className="p-2 border rounded-lg"
                                            />
                                            <input
                                              type="text"
                                              placeholder="ZIP Code"
                                              className="p-2 border rounded-lg"
                                            />
                                            <input
                                              type="text"
                                              placeholder="Neighborhood"
                                              className="p-2 border rounded-lg"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="space-y-6">
                                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                          <h3 className="text-lg font-bold text-gray-800 mb-4">
                                            Amenities
                                          </h3>
                                          <div className="grid grid-cols-2 gap-3">
                                            {[
                                              "Swimming Pool",
                                              "Gym",
                                              "Parking",
                                              "Garden",
                                              "Security",
                                              "Elevator",
                                              "Pet Friendly",
                                              "Balcony",
                                            ].map((amenity) => (
                                              <label
                                                key={amenity}
                                                className="flex items-center space-x-2 cursor-pointer"
                                              >
                                                <input
                                                  type="checkbox"
                                                  className="rounded text-blue-600"
                                                />
                                                <span className="text-gray-700">
                                                  {amenity}
                                                </span>
                                              </label>
                                            ))}
                                          </div>
                                        </div>

                                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                          <h3 className="text-lg font-bold text-gray-800 mb-4">
                                            Photos & Videos
                                          </h3>
                                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 mb-2">
                                              Drag & drop property images or
                                              videos
                                            </p>
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                              Browse Files
                                            </button>
                                            <p className="text-sm text-gray-500 mt-2">
                                              Up to 20 images, 5 videos allowed
                                            </p>
                                          </div>
                                        </div>
                                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                          <h3 className="text-lg font-bold text-gray-800 mb-4">
                                            Virtual Experience
                                          </h3>
                                          <div className="space-y-3">
                                            <input
                                              type="url"
                                              placeholder="3D Tour URL"
                                              className="w-full p-2 border rounded-lg"
                                            />
                                            <input
                                              type="url"
                                              placeholder="Video Walkthrough URL"
                                              className="w-full p-2 border rounded-lg"
                                            />
                                            <label className="flex items-center space-x-2">
                                              <input
                                                type="checkbox"
                                                className="rounded"
                                              />
                                              <span className="text-gray-700">
                                                Enable AR View
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Property Description
                                      </h3>
                                      <textarea
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Describe the property features, neighborhood, unique selling points..."
                                      />
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                                        <h4 className="font-bold text-gray-800 mb-2">
                                          Financial Details
                                        </h4>
                                        <div className="space-y-2">
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              Property Tax:
                                            </span>
                                            <input
                                              type="text"
                                              className="w-24 text-right border-b"
                                              defaultValue="$3,200/yr"
                                            />
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              HOA Fees:
                                            </span>
                                            <input
                                              type="text"
                                              className="w-24 text-right border-b"
                                              defaultValue="$250/mo"
                                            />
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-600">
                                              Insurance:
                                            </span>
                                            <input
                                              type="text"
                                              className="w-24 text-right border-b"
                                              defaultValue="$1,500/yr"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="bg-linear-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                                        <h4 className="font-bold text-gray-800 mb-2">
                                          Listing Settings
                                        </h4>
                                        <div className="space-y-3">
                                          <label className="flex items-center justify-between">
                                            <span className="text-gray-600">
                                              Featured Listing
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="toggle toggle-success"
                                            />
                                          </label>
                                          <label className="flex items-center justify-between">
                                            <span className="text-gray-600">
                                              Open House
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="toggle toggle-info"
                                            />
                                          </label>
                                          <label className="flex items-center justify-between">
                                            <span className="text-gray-600">
                                              Instant Booking
                                            </span>
                                            <input
                                              type="checkbox"
                                              className="toggle toggle-warning"
                                            />
                                          </label>
                                        </div>
                                      </div>

                                      <div className="bg-linear-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                        <h4 className="font-bold text-gray-800 mb-2">
                                          Agent Information
                                        </h4>
                                        <select className="w-full mb-2 p-2 border rounded-lg">
                                          <option>
                                            John Doe (Primary Agent)
                                          </option>
                                          <option>Jane Smith</option>
                                          <option>Mike Johnson</option>
                                        </select>
                                        <input
                                          type="text"
                                          placeholder="Agent Notes"
                                          className="w-full p-2 border rounded-lg text-sm"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                      <div className="flex space-x-3">
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                          <Save className="inline w-4 h-4 mr-2" />
                                          Save Draft
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                                          <EyeOff className="inline w-4 h-4 mr-2" />
                                          Preview
                                        </button>
                                      </div>
                                      <div className="flex space-x-3">
                                        <button
                                          onClick={() => visisbleEdit(false)}
                                          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition font-semibold"
                                        >
                                          Cancel
                                        </button>
                                        <button className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-semibold shadow-lg">
                                          <Upload className="inline w-5 h-5 mr-2" />
                                          Publish Listing
                                        </button>
                                        <button className="px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition font-semibold shadow-lg">
                                          <Send className="inline w-5 h-5 mr-2" />
                                          Schedule
                                        </button>
                                      </div>
                                    </div>
                                    <div className="mt-4 text-center text-sm text-gray-500">
                                      <Info className="inline w-4 h-4 mr-1" />
                                      This listing will be visible on your
                                      website, MLS, and partner portals
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {filteredProperties.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-gray-600">
              Showing {filteredProperties.length} of {properties.length}{" "}
              properties
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
