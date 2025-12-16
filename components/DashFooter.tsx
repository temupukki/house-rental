"use client"
import Link from "next/link"
import { 
  MapPin, 
  Clock, 
  Home, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Heart,
  Shield,
  Building,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DashFooter(){
    return(
        <footer className="relative overflow-hidden bg-linear-to-br from-gray-900 via-blue-950 to-black text-white pt-16 pb-8">
           
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent" />
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-linear-to-br from-blue-600 to-cyan-500 rounded-lg">
                                <Home className="h-7 w-7" />
                            </div>
                            <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Val<span className="font-black">Living</span>
                            </h2>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                            Redefining modern living in Ethiopia with premium properties, 
                            exceptional service, and unmatched expertise in real estate.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-blue-400" />
                                <span className="text-sm text-gray-300">Verified Properties</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Heart className="h-5 w-5 text-red-400" />
                                <span className="text-sm text-gray-300">Trusted by 1000+ Clients</span>
                            </div>
                        </div>
                    </div>

                 
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <ChevronRight className="h-5 w-5 text-blue-400" />
                            Quick Links
                        </h3>
                        <div className="space-y-4">
                            <Link href="/" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                                <ArrowRight className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                Home
                            </Link>
                            <Link href="#properties" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                                <ArrowRight className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                Properties
                            </Link>
                            <Link href="#about" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                                <ArrowRight className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                About Us
                            </Link>
                            <Link href="#contact" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                                <ArrowRight className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                Contact
                            </Link>
                          
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <Building className="h-5 w-5 text-blue-400" />
                            Property Types
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300" />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Apartments</span>
                            </div>
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-150 transition-transform duration-300" />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Houses</span>
                            </div>
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Condos</span>
                            </div>
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Villas</span>
                            </div>
                            <div className="flex items-center gap-3 group cursor-pointer">
                                <div className="w-2 h-2 bg-blue-300 rounded-full group-hover:scale-150 transition-transform duration-300" />
                                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Commercial</span>
                            </div>
                        </div>
                    </div>

                   
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <Mail className="h-5 w-5 text-blue-400" />
                            Stay Updated
                        </h3>
                        <p className="text-gray-300 text-sm">
                            Get exclusive property listings and market insights
                        </p>
                        <div className="space-y-4">
                        
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-blue-400" />
                                    <a href="tel:+251911234567" className="text-gray-300 hover:text-white transition-colors duration-300">
                                        +251 911 234 567
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-blue-400" />
                                    <a href="mailto:info@Valliving.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                                        info@Valliving.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
                <div className="border-t border-gray-800/50 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-blue-400" />
                                <h4 className="font-medium">Our Locations</h4>
                            </div>
                            <div className="space-y-2 ml-8">
                                <p className="text-gray-300">Bole, Ednamall • 3rd Floor</p>
                                <p className="text-gray-300">Kality, Kafdem Plaza • Suite 405</p>
                                <p className="text-gray-300">4 Kilo, Ambassador</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-blue-400" />
                                <h4 className="font-medium">Business Hours</h4>
                            </div>
                            <div className="space-y-2 ml-8">
                                <p className="text-gray-300">Mon - Fri: 8:00 AM - 6:00 PM</p>
                                <p className="text-gray-300">Saturday: 9:00 AM - 4:00 PM</p>
                                <p className="text-gray-300">Sunday: 10:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end space-y-4">
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-gray-800/50 rounded-lg hover:bg-blue-600/20 transition-all duration-300 group">
                                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800/50 rounded-lg hover:bg-sky-600/20 transition-all duration-300 group">
                                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800/50 rounded-lg hover:bg-pink-600/20 transition-all duration-300 group">
                                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800/50 rounded-lg hover:bg-blue-700/20 transition-all duration-300 group">
                                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white" />
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm text-center md:text-right">
                            Connect with us for daily updates
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} ValLiving Real Estate. All rights reserved.
                        </p>
                     
                    </div>
                    <p className="text-gray-500 text-xs mt-4">
                        Transforming dreams into addresses since pukki born.
                    </p>
                </div>
            </div>
        </footer>
    )
}