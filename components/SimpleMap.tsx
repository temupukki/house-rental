"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import {
  MapPin,
  Navigation,
  CheckCircle,
  Loader2,
  Search,
  X,
  ZoomIn,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
interface LocationPickerProps {
  onConfirm: (location: { position: [number, number]; name: string }) => void;
}

const createCustomIcon = (color: string = "#3B82F6") => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: rotate(-45deg) scale(1); }
          50% { transform: rotate(-45deg) scale(1.1); }
          100% { transform: rotate(-45deg) scale(1); }
        }
      </style>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: "custom-marker",
  });
};

function LocationClickHandler({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
}

function FlyToLocation({ location }: { location: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo(location, 15, {
        duration: 1.5,
      });
    }
  }, [location, map]);

  return null;
}

async function getPlaceName(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();

    if (data.display_name) {
      const address = data.display_name;
      const parts = address.split(",");
      if (parts.length > 3) {
        return `${parts[0]}, ${parts[1]}, ${parts[parts.length - 2]}, ${
          parts[parts.length - 1]
        }`;
      }
      return address;
    }

    return `Location at ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
  } catch (error) {
    console.error("Error getting place name:", error);
    return `Location at ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
  }
}

async function searchPlaces(query: string) {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=5`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

export default function LocationPicker({ onConfirm }: LocationPickerProps) {
  const [userLocation, setUserLocation] = useState<{
    position: [number, number];
    name: string;
  } | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<{
    position: [number, number];
    name: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [isLocating, setIsLocating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [flyToLocation, setFlyToLocation] = useState<[number, number] | null>(
    null
  );
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        const results = await searchPlaces(searchQuery);
        setSearchResults(results);
        setIsSearching(false);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const getCurrentLocation = async () => {
    setIsLocating(true);

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      const placeName = await getPlaceName(40.7128, -74.006);
      setUserLocation({
        position: [40.7128, -74.006],
        name: placeName,
      });
      setFlyToLocation([40.7128, -74.006]);
      setIsLoading(false);
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const placeName = await getPlaceName(latitude, longitude);

        setUserLocation({
          position: [latitude, longitude],
          name: placeName,
        });
        setFlyToLocation([latitude, longitude]);
        setIsLoading(false);
        setIsLocating(false);
      },
      async (error) => {
        console.log("Error getting location:", error);
        const placeName = await getPlaceName(40.7128, -74.006);
        setUserLocation({
          position: [40.7128, -74.006],
          name: placeName,
        });
        setFlyToLocation([40.7128, -74.006]);
        setIsLoading(false);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleMapClick = async (lat: number, lng: number) => {
    const placeName = await getPlaceName(lat, lng);
    setSelectedLocation({
      position: [lat, lng],
      name: placeName,
    });
    setFlyToLocation([lat, lng]);
    setShowSearchResults(false);
  };

  const handleSelectSearchResult = async (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const placeName = await getPlaceName(lat, lng);

    setSelectedLocation({
      position: [lat, lng],
      name: placeName,
    });

    setFlyToLocation([lat, lng]);
    setSearchQuery(result.display_name.split(",")[0]);
    setShowSearchResults(false);
  };

  const confirmLocation = () => {
    if (selectedLocation) {
     
      onConfirm(selectedLocation);
      

     
    }
  };

  const clearLocation = () => {
    setSelectedLocation(null);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const zoomToPlace = (position: [number, number]) => {
    setFlyToLocation(position);
  };

  const goToMyLocation = () => {
    if (userLocation) {
      setFlyToLocation(userLocation.position);
    } else {
      getCurrentLocation();
    }
  };

  const userIcon = createCustomIcon("#10B981"); 
  const selectedIcon = createCustomIcon("#EF4444"); 
  const searchIcon = createCustomIcon("#8B5CF6"); 

  const mapCenter = userLocation?.position || [40.7128, -74.006];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto mb-6" />
          <p className="text-gray-600 text-lg">Loading map...</p>
          <p className="text-gray-400 text-sm mt-2">Getting your location</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-2xl px-4">
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) {
                    setShowSearchResults(true);
                  }
                }}
                placeholder="Search for a city, address, or place..."
                className="w-full p-4 pl-12 bg-white/95 backdrop-blur-sm border-2 border-blue-300 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-3 focus:ring-blue-100 transition-all text-gray-900 shadow-2xl"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchResults(false);
                  }}
                  className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={goToMyLocation}
                disabled={isLocating}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50 shadow-lg"
                title="Go to my location"
              >
                {isLocating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Navigation className="w-5 h-5" />
                )}
              </button>
            </div>

            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-20">
                <div className="p-3 border-b border-gray-100 bg-blue-50">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-blue-700">
                      Found {searchResults.length} results
                    </p>
                    <button
                      onClick={() => setShowSearchResults(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectSearchResult(result)}
                      className="w-full text-left p-4 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 group-hover:text-blue-700 truncate">
                            {result.display_name.split(",")[0]}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {result.display_name
                              .split(",")
                              .slice(1, 3)
                              .join(",")
                              .trim()}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 shrink-0 ml-2" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedLocation && (
          <div className="absolute top-24 right-4 z-10 w-full max-w-sm">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-200 overflow-hidden">
              <div className="p-4 border-b border-red-100 bg-linear-to-r from-red-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <MapPin className="w-4 h-4 text-red-600" />
                    </div>
                    <h3 className="font-bold text-red-800">Selected Place</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => zoomToPlace(selectedLocation.position)}
                      className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Zoom to location"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={clearLocation}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Clear selection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-800 font-medium mb-4">
                  {selectedLocation.name}
                </p>
                <button
                  onClick={confirmLocation}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <CheckCircle className="w-5 h-5" />
                  Select This Location
                </button>
              </div>
            </div>
          </div>
        )}

        {userLocation && (
          <div className="absolute top-174 left-6 z-10 w-full max-w-xs">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-200 overflow-hidden">
              <div className="p-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5  rounded-lg">
                    <motion.button
                         
                      onClick={goToMyLocation}
                      disabled={isLocating}
                      className="flex items-center -mr-4  px-2 py-2.5 text-gray-700 hover:text-green-700  rounded-xl font-medium transition-all disabled:opacity-50"
                      whileHover={{scale:1.12}}
                      whileTap={{scale:0.6}}
                    >
                      {isLocating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <MapPin  className="w-13 h-9 " />
                      )}
                     
                    </motion.button>
                  </div>
                  <span className="text-sm font-semibold text-green-800">
                    {userLocation.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

       

        <div className="absolute inset-0 z-0">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyToLocation location={flyToLocation} />

            <LocationClickHandler onLocationSelect={handleMapClick} />

            {userLocation && (
              <Marker position={userLocation.position} icon={userIcon}>
                <Popup>
                  <div className="font-bold text-green-700">
                    Your Location
                  </div>
                  <div className="text-gray-800 mt-1 max-w-xs">
                    {userLocation.name}
                  </div>
                </Popup>
              </Marker>
            )}

         
            {selectedLocation && (
              <Marker position={selectedLocation.position} icon={selectedIcon}>
                <Popup>
                  <div className="font-bold text-red-700">
                    Selected Place
                  </div>
                  <div className="text-gray-800 mt-1 max-w-xs">
                    {selectedLocation.name}
                  </div>
                </Popup>
              </Marker>
            )}

            {searchResults.map((result, index) => (
              <Marker
                key={index}
                position={[parseFloat(result.lat), parseFloat(result.lon)]}
                icon={searchIcon}
              >
                <Popup>
                  <div className="font-bold text-purple-700">
                     Search Result
                  </div>
                  <div className="text-gray-800 mt-1 max-w-xs">
                    {result.display_name.split(",")[0]}
                  </div>
                  <button
                    onClick={() => handleSelectSearchResult(result)}
                    className="mt-2 text-sm text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Select this place →
                  </button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {searchResults.length > 0 && !showSearchResults && (
          <div className="absolute top-20 left-4 z-10">
            <button
              onClick={() => setShowSearchResults(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">
                {searchResults.length} results found
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
