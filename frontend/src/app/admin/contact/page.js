'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminLayout from '../../../components/admin/AdminLayout'
import { 
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

export default function ContactAdmin() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      name: 'Ahmad Khan', 
      email: 'ahmad@example.com',
      phone: '+93 70 123 4567',
      subject: 'Partnership Inquiry',
      message: 'We are interested in partnering with Afghan Cricket Network for upcoming tournaments.',
      status: 'New',
      priority: 'High',
      receivedDate: '2024-01-15T10:30:00',
      category: 'Business'
    },
    { 
      id: 2, 
      name: 'Sara Ahmadi', 
      email: 'sara.ahmadi@email.com',
      phone: '+93 78 987 6543',
      subject: 'Media Coverage Request',
      message: 'Hello, I am a journalist and would like to cover the upcoming cricket matches.',
      status: 'In Progress',
      priority: 'Medium',
      receivedDate: '2024-01-14T14:20:00',
      category: 'Media'
    },
    { 
      id: 3, 
      name: 'Omar Faizi', 
      email: 'omar.faizi@gmail.com',
      phone: '+93 79 555 1234',
      subject: 'Training Program Information',
      message: 'Can you provide information about youth cricket training programs?',
      status: 'Resolved',
      priority: 'Low',
      receivedDate: '2024-01-13T09:15:00',
      category: 'General'
    }
  ])

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const handleStatusChange = (id, newStatus) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: newStatus } : msg
    ))
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(item => item.id !== id))
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || message.status.toLowerCase().replace(' ', '') === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const stats = [
    { name: 'Total Messages', value: messages.length, icon: EnvelopeIcon, color: 'blue' },
    { name: 'New Messages', value: messages.filter(m => m.status === 'New').length, icon: ExclamationCircleIcon, color: 'emerald' },
    { name: 'In Progress', value: messages.filter(m => m.status === 'In Progress').length, icon: ClockIcon, color: 'amber' },
    { name: 'Resolved', value: messages.filter(m => m.status === 'Resolved').length, icon: CheckCircleIcon, color: 'purple' }
  ]

  return (
    <AdminLayout title="Contact Messages">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl font-bold gradient-text mb-2">Contact Messages</h1>
            <p className="text-gray-600">View and respond to customer inquiries</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass rounded-2xl p-6 hover-glow group">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-50 group-hover:bg-${stat.color}-100 transition-colors`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10 bg-white/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input bg-white/50 min-w-[120px]"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="inprogress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="space-y-6">
        {filteredMessages.map((message) => (
          <div key={message.id} className="glass rounded-2xl p-6 hover-glow group transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 min-w-0 mb-4 lg:mb-0 lg:mr-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <UserIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {message.subject}
                      </h3>
                      <p className="text-sm text-gray-500">From: {message.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`badge ${getPriorityColor(message.priority)}`}>
                      {message.priority}
                    </span>
                    <span className={`badge ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{message.message}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    <span>{message.email}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="w-4 h-4 mr-2" />
                    <span>{message.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{new Date(message.receivedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{message.category}</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <select
                  value={message.status}
                  onChange={(e) => handleStatusChange(message.id, e.target.value)}
                  className="form-input text-sm min-w-[120px]"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <div className="flex items-center space-x-2">
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200">
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <EnvelopeIcon className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchTerm || filterStatus !== 'all' ? 'No messages found' : 'No messages yet'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Contact messages will appear here when customers reach out.'}
          </p>
        </div>
      )}
    </AdminLayout>
  )
}