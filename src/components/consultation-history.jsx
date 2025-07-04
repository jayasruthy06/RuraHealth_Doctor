"use client";

import React, { useState } from 'react';
import { Eye, User, MapPin, Calendar, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react';

const TicketHistoryPage = ({ tickets = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const ticketsPerPage = 4;
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const currentTickets = tickets.slice(startIndex, startIndex + ticketsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 font-nubito">
      
      {/* Desktop Grid View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b uppercase text-sm border-gray-200 font-semibold text-gray-700">
            <div className="col-span-2">Patient</div>
            <div className="col-span-2">Details</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">PHC</div>
            <div className="col-span-2">Submitted</div>
            <div className="col-span-2">Responded</div>
            
          </div>
          
          {currentTickets.map((ticket, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center">
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{ticket.patientName}</p>
                    <p className="text-sm text-gray-500">{ticket.age}y, {ticket.gender}</p>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2">
                <p className="text-sm text-gray-900 line-clamp-2">{ticket.summary}</p>
              </div>
              
              <div className="col-span-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{ticket.location}</span>
                </div>
              </div>
              
              <div className="col-span-2">
                <p className="text-sm text-gray-600">{ticket.phcName}</p>
              </div>
              
              <div className="col-span-2">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{formatDate(ticket.submittedAt)}</span>
                </div>
              </div>
              
              <div className="col-span-2">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">{formatDate(ticket.respondedAt)}</span>
                </div>
              </div>
              
              <div className="col-span-1">
                <button
                  onClick={() => openModal(ticket)}
                  className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {currentTickets.map((ticket, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-semibold text-gray-900">{ticket.patientName}</h3>
                  <p className="text-sm text-gray-500">{ticket.age} years, {ticket.gender}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-600">Responded</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-900">{ticket.summary}</p>
              
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{ticket.location}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Submitted: {formatDate(ticket.submittedAt)}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Responded: {formatDate(ticket.respondedAt)}</span>
              </div>
              
              <p className="text-sm text-gray-600">PHC: {ticket.phcName}</p>
            </div>
            
            <button
              onClick={() => openModal(ticket)}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + ticketsPerPage, tickets.length)} of {tickets.length} tickets
          </p>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-white/40 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Consultation History</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Patient Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Patient Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{selectedTicket.patientName}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Age: {selectedTicket.age} years</span>
                      <span className="text-sm text-gray-600">Gender: {selectedTicket.gender}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedTicket.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Consultation Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Submitted: </span>
                        <span className="text-sm text-gray-600">{formatDate(selectedTicket.submittedAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-green-500" />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Responded: </span>
                        <span className="text-sm text-gray-600">{formatDate(selectedTicket.respondedAt)}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">PHC: {selectedTicket.phcName}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Medical Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Patient's Medical Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedTicket.summary}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Explanation</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedTicket.details}</p>
                  </div>
                </div>
              </div>
              
              {/* Photos */}
              {selectedTicket.photos && selectedTicket.photos.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-gray-900">Uploaded Photos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedTicket.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Patient photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Doctor's Response Section */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900">Doctor's Response</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Response</label>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedTicket.doctorResponse}</p>
                  </div>
                </div>
                
                {/* Prescription Display */}
                {selectedTicket.prescription && selectedTicket.prescription.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Prescription</label>
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="space-y-2">
                        <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-700 border-b border-green-200 pb-2">
                          <div className="col-span-4">Tablet Name</div>
                          <div className="col-span-3">Dosage</div>
                          <div className="col-span-5">Duration</div>
                        </div>
                        
                        {selectedTicket.prescription.map((item, index) => (
                          <div key={index} className="grid grid-cols-12 gap-2 text-sm">
                            <div className="col-span-4 font-medium text-gray-900">{item.tabletName}</div>
                            <div className="col-span-3 text-gray-700">{item.dosage}</div>
                            <div className="col-span-5 text-gray-700">{item.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketHistoryPage;