"use client"

import { useState, useEffect } from 'react'
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
  Square,
  MapPin,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface Property {
  id: string
  title: string
  type: 'house' | 'apartment' | 'condo' | 'villa' | 'commercial'
  price: number
  status: 'active' | 'pending' | 'sold' | 'draft'
  address: string
  city: string
  bedrooms: number
  bathrooms: number
  area: number
  postedDate: string
  views: number
  inquiries: number
  images: string[]
  featured: boolean
  description: string
}

export default function Listings() {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Villa with Ocean View',
      type: 'villa',
      price: 1250000,
      status: 'active',
      address: '123 Ocean Drive',
      city: 'Miami',
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      postedDate: '2024-01-15',
      views: 1245,
      inquiries: 24,
      images: ['/property1.jpg'],
      featured: true,
      description: 'Luxury villa with panoramic ocean views'
    },
    {
      id: '2',
      title: 'Downtown Luxury Apartment',
      type: 'apartment',
      price: 850000,
      status: 'pending',
      address: '456 Main St',
      city: 'New York',
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      postedDate: '2024-01-10',
      views: 890,
      inquiries: 18,
      images: ['/property2.jpg'],
      featured: false,
      description: 'Modern apartment in heart of downtown'
    },
    {
      id: '3',
      title: 'Suburban Family House',
      type: 'house',
      price: 650000,
      status: 'active',
      address: '789 Maple Ave',
      city: 'Austin',
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      postedDate: '2024-01-05',
      views: 567,
      inquiries: 12,
      images: ['/property3.jpg'],
      featured: true,
      description: 'Perfect family home in quiet neighborhood'
    },
    {
      id: '4',
      title: 'Commercial Space for Rent',
      type: 'commercial',
      price: 2500000,
      status: 'draft',
      address: '101 Business Blvd',
      city: 'Chicago',
      bedrooms: 0,
      bathrooms: 4,
      area: 5000,
      postedDate: '2024-01-20',
      views: 234,
      inquiries: 8,
      images: ['/property4.jpg'],
      featured: false,
      description: 'Prime commercial space in business district'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.city.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || property.type === filterType
      const matchesStatus = filterStatus === 'all' || property.status === filterStatus
      return matchesSearch && matchesType && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-high':
          return b.price - a.price
        case 'price-low':
          return a.price - b.price
        case 'views':
          return b.views - a.views
        case 'newest':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        default:
          return 0
      }
    })

 
  const propertyTypeConfig = {
    house: { label: 'House', color: 'bg-blue-100 text-blue-800', icon: '🏠' },
    apartment: { label: 'Apartment', color: 'bg-green-100 text-green-800', icon: '🏢' },
    condo: { label: 'Condo', color: 'bg-purple-100 text-purple-800', icon: '🏘️' },
    villa: { label: 'Villa', color: 'bg-yellow-100 text-yellow-800', icon: '🏰' },
    commercial: { label: 'Commercial', color: 'bg-red-100 text-red-800', icon: '🏬' }
  }


  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Eye },
    sold: { label: 'Sold', color: 'bg-gray-100 text-gray-800', icon: DollarSign },
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: EyeOff }
  }

  const handleDeleteProperty = (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(prop => prop.id !== id))
    }
  }

  const handleToggleStatus = (id: string, newStatus: Property['status']) => {
    setProperties(properties.map(prop => 
      prop.id === id ? { ...prop, status: newStatus } : prop
    ))
  }

  const handleToggleFeatured = (id: string) => {
    setProperties(properties.map(prop => 
      prop.id === id ? { ...prop, featured: !prop.featured } : prop
    ))
  }

  const handleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(filteredProperties.map(prop => prop.id))
    }
  }

  const handleSelectProperty = (id: string) => {
    setSelectedProperties(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id)
        : [...prev, id]
    )
  }

  const handleBulkAction = (action: 'delete' | 'activate' | 'deactivate') => {
    if (selectedProperties.length === 0) return

    switch (action) {
      case 'delete':
        if (confirm(`Delete ${selectedProperties.length} selected properties?`)) {
          setProperties(properties.filter(prop => !selectedProperties.includes(prop.id)))
          setSelectedProperties([])
        }
        break
      case 'activate':
        setProperties(properties.map(prop => 
          selectedProperties.includes(prop.id) ? { ...prop, status: 'active' } : prop
        ))
        break
      case 'deactivate':
        setProperties(properties.map(prop => 
          selectedProperties.includes(prop.id) ? { ...prop, status: 'draft' } : prop
        ))
        break
    }
  }


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }


  const stats = {
    total: properties.length,
    active: properties.filter(p => p.status === 'active').length,
    pending: properties.filter(p => p.status === 'pending').length,
    sold: properties.filter(p => p.status === 'sold').length,
    totalValue: properties.reduce((sum, prop) => sum + prop.price, 0),
    totalViews: properties.reduce((sum, prop) => sum + prop.views, 0),
    totalInquiries: properties.reduce((sum, prop) => sum + prop.inquiries, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
 
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Property Listings</h1>
            <p className="text-gray-600 mt-1">Manage your properties and listings</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Filter size={18} />
              Export
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus size={18} />
              Add New Property
            </button>
          </div>
        </div>

    
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">Total Properties</div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-500 mt-1">All listings</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">Active</div>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-xs text-gray-500 mt-1">Currently listed</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">Total Value</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</div>
            <div className="text-xs text-gray-500 mt-1">Market value</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">Total Views</div>
            <div className="text-2xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">Property views</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">Inquiries</div>
            <div className="text-2xl font-bold text-purple-600">{stats.totalInquiries}</div>
            <div className="text-xs text-gray-500 mt-1">Total leads</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-sm text-gray-500 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-gray-500 mt-1">Under negotiation</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
   
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="draft">Draft</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
                <option value="views">Most Views</option>
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBulkAction('activate')}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm hover:bg-gray-200"
                    >
                      Draft
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
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
              <div className="text-gray-500">Try adjusting your filters or add a new property</div>
            </div>
          ) : (
            filteredProperties.map((property) => {
              const StatusIcon = statusConfig[property.status].icon
              return (
                <div
                  key={property.id}
                  className={`bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                    selectedProperties.includes(property.id) ? 'ring-2 ring-blue-500' : ''
                  } ${property.featured ? 'border-l-4 border-l-blue-500' : ''}`}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Property Image */}
                      <div className="md:w-48 h-48 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">
                              {propertyTypeConfig[property.type].icon}
                            </div>
                            <div className="text-gray-600">Property Image</div>
                          </div>
                        </div>
                        {property.featured && (
                          <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                            Featured
                          </div>
                        )}
                      </div>

                    
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {property.title}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${propertyTypeConfig[property.type].color}`}>
                                {propertyTypeConfig[property.type].label}
                              </span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-3">
                              <MapPin size={16} className="mr-1" />
                              <span>{property.address}, {property.city}</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                              <div className="flex items-center">
                                <Bed size={18} className="text-gray-400 mr-2" />
                                <span className="text-gray-700">{property.bedrooms} beds</span>
                              </div>
                              <div className="flex items-center">
                                <Bath size={18} className="text-gray-400 mr-2" />
                                <span className="text-gray-700">{property.bathrooms} baths</span>
                              </div>
                              <div className="flex items-center">
                                <Square size={18} className="text-gray-400 mr-2" />
                                <span className="text-gray-700">{property.area.toLocaleString()} sqft</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar size={18} className="text-gray-400 mr-2" />
                                <span className="text-gray-700">{formatDate(property.postedDate)}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <StatusIcon size={16} className={statusConfig[property.status].color.includes('green') ? 'text-green-600' : ''} />
                                <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[property.status].color}`}>
                                  {statusConfig[property.status].label}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600 text-sm">
                                <Eye size={14} />
                                <span>{property.views.toLocaleString()} views</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600 text-sm">
                                <span>•</span>
                                <span>{property.inquiries} inquiries</span>
                              </div>
                            </div>
                          </div>

                        
                          <div className="flex flex-col items-end gap-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {formatCurrency(property.price)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {property.type === 'commercial' ? 'For Sale' : 'Market Price'}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={selectedProperties.includes(property.id)}
                                onChange={() => handleSelectProperty(property.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              
                              <button
                                onClick={() => handleToggleFeatured(property.id)}
                                className={`p-2 rounded-lg ${property.featured ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                title={property.featured ? 'Remove from featured' : 'Mark as featured'}
                              >
                                <TrendingUp size={18} />
                              </button>

                              <button
                                onClick={() => handleToggleStatus(property.id, property.status === 'active' ? 'draft' : 'active')}
                                className={`p-2 rounded-lg ${
                                  property.status === 'active' 
                                    ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title={property.status === 'active' ? 'Deactivate' : 'Activate'}
                              >
                                {property.status === 'active' ? <EyeOff size={18} /> : <Eye size={18} />}
                              </button>

                              <button
                                onClick={() => {/* Edit functionality */}}
                                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                                title="Edit property"
                              >
                                <Edit size={18} />
                              </button>

                              <button
                                onClick={() => handleDeleteProperty(property.id)}
                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                                title="Delete property"
                              >
                                <Trash2 size={18} />
                              </button>

                              <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                                <MoreVertical size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {filteredProperties.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-gray-600">
              Showing {filteredProperties.length} of {properties.length} properties
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
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}