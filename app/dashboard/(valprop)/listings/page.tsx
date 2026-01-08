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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 " >
        {edit && (
          <div className="bg-gray-300 absolute z-40 top-45 left-65 right-65 h-170 w-300 ">
              <div className="absolute inset-0 backdrop-blur-md"></div>
            <X />
          </div>
        )}
      <div className={`mb-8 ${edit ? "blur-2xl" : ""}`}>
      
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
