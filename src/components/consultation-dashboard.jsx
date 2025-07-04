"use client";

import React from 'react';
import { 
  Clock, 
  User, 
  MapPin, 
  AlertCircle, 
  Eye, 
  Calendar,
  Activity,
  ArrowRight
} from 'lucide-react';

const ConsultationTickets = ({ 
  tickets = [], 
  onViewDetails = (ticketId) => console.log('View details for:', ticketId),
  onViewAll = () => window.location.href = '/dashboard/consultations'
}) => {
  // Sample data for demonstration
  const sampleTickets = [
    {
      id: 1,
      patientName: "Rajesh Kumar",
      age: 45,
      gender: "male",
      submittedAt: "2024-06-23T10:30:00Z",
      symptoms: "Persistent cough, fever for 3 days",
      phcName: "Vellore Rural PHC",
      urgency: "high"
    },
    {
      id: 2,
      patientName: "Priya Sharma",
      age: 32,
      gender: "female",
      submittedAt: "2024-06-23T09:15:00Z",
      symptoms: "Headache, dizziness, nausea",
      phcName: "Salem District PHC",
      urgency: "medium"
    },
    {
      id: 3,
      patientName: "Mohammed Ali",
      age: 28,
      gender: "male",
      submittedAt: "2024-06-23T08:45:00Z",
      symptoms: "Routine check-up, blood pressure monitoring",
      phcName: "Coimbatore Central PHC",
      urgency: "low"
    },
    {
      id: 4,
      patientName: "Lakshmi Devi",
      age: 67,
      gender: "female",
      submittedAt: "2024-06-23T11:20:00Z",
      symptoms: "Chest pain, shortness of breath",
      phcName: "Madurai East PHC",
      urgency: "high"
    },
    {
      id: 5,
      patientName: "Arjun Singh",
      age: 19,
      gender: "male",
      submittedAt: "2024-06-23T07:30:00Z",
      symptoms: "Skin rash, itching",
      phcName: "Chennai Metro PHC",
      urgency: "low"
    }
  ];

  const displayTickets = tickets.length > 0 ? tickets.slice(0, 5) : sampleTickets.slice(0, 5);
  const totalTickets = tickets.length > 0 ? tickets.length : sampleTickets.length;

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'high':
        return <AlertCircle className="w-3 h-3" />;
      case 'medium':
        return <Clock className="w-3 h-3" />;
      case 'low':
        return <Activity className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getGenderIcon = (gender) => {
    return <User className="w-4 h-4" />;
  };

  if (displayTickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Clock className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Tickets</h3>
        <p className="text-gray-500">All consultation requests have been processed.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border font-nubito border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Consultations
            </h2>
            <button
              onClick={onViewAll}
              className="text-primary-accent hover:text-blue-700 transition-colors flex items-center"
              title="View all consultations"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {displayTickets.length} showing
            </span>
            {totalTickets > 5 && (
              <span className="text-sm text-gray-500">
                of {totalTickets} total
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden">
        <div className="divide-y divide-gray-200">
          {displayTickets.map((ticket) => (
            <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getGenderIcon(ticket.gender)}
                  <div>
                    <h3 className="font-medium text-gray-900">{ticket.patientName}</h3>
                    <p className="text-sm text-gray-500">{ticket.age} years</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(ticket.urgency)}`}>
                  {getUrgencyIcon(ticket.urgency)}
                  <span className="ml-1 capitalize">{ticket.urgency}</span>
                </span>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-700 mb-2">{ticket.symptoms}</p>
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {ticket.phcName}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDateTime(ticket.submittedAt)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => onViewDetails(ticket.id)}
                className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symptoms
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PHC Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Urgency
              </th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {getGenderIcon(ticket.gender)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {ticket.patientName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ticket.age} years, {ticket.gender}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {ticket.symptoms}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {ticket.phcName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDateTime(ticket.submittedAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getUrgencyColor(ticket.urgency)}`}>
                    {getUrgencyIcon(ticket.urgency)}
                    <span className="ml-1 capitalize">{ticket.urgency}</span>
                  </span>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultationTickets;