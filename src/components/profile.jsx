"use client";

import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar, 
  Award, 
  Clock, 
  Languages, 
  FileText,
  Camera,
  Save,
  X,
  Download,
  AlertTriangle,
  CheckCircle,
  VenetianMask
} from 'lucide-react';

// Mock user data based on the form structure
const mockUserData = {
  fullName: 'Dr. Sarah Johnson',
  mobileNumber: '+91 98765 43210',
  email: 'sarah.johnson@email.com',
  gender: 'Female',
  dateOfBirth: '1985-03-15',
  medicalRegistrationNumber: 'MR123456789',
  qualification: 'MBBS, MD (Internal Medicine)',
  speciality: 'Internal Medicine',
  yearsOfExperience: '12',
  languagesSpoken: 'English, Hindi, Tamil',
  preferredWorkingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: [
      { label: 'Morning (9:00 AM - 12:00 PM)', start: '09:00', end: '12:00' },
      { label: 'Evening (6:00 PM - 9:00 PM)', start: '18:00', end: '21:00' }
    ],
    summary: '5 days/week, 2 time slots'
  },
  weeklyAvailability: '40 hours per week',
  profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  medicalDegreeFile: 'medical_degree.pdf',
  governmentIdFile: 'government_id.pdf'
};

const ProfileComponent = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
    setEditData({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Handle account deletion logic here
    console.log('Account deleted');
    setShowDeleteModal(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ProfileHeader = () => (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 font-nubito text-white p-6 rounded-t-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={userData.profilePhoto}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white object-cover"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full text-white hover:bg-blue-600 transition-colors">
                <Camera size={14} />
              </button>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userData.fullName}</h1>
            <p className="text-blue-100">{userData.speciality}</p>
            <p className="text-blue-200 text-sm">{userData.qualification}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="bg-white text-blue-600 text-sm font-nubito text-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
              >
                <Edit3 size={16} />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 text-sm font-nubito rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Delete Account</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const TabNavigation = () => (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        {[
          { id: 'personal', label: 'Personal Info', icon: User },
          { id: 'professional', label: 'Professional', icon: Award },
          { id: 'schedule', label: 'Schedule', icon: Clock },
          { id: 'documents', label: 'Documents', icon: FileText }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
              activeTab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const PersonalInfoTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="text-gray-400" size={20} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.fullName || userData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 font-medium">{userData.fullName}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Phone className="text-gray-400" size={20} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.mobileNumber || userData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 font-medium">{userData.mobileNumber}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Mail className="text-gray-400" size={20} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email || userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 font-medium">{userData.email}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
        <VenetianMask className="text-gray-400" size={20}/>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          {isEditing ? (
            <select
              value={editData.gender || userData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-900 font-medium">{userData.gender}</p>
          )}
        </div>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="text-gray-400" size={20} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={editData.dateOfBirth || userData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div>
                <p className="text-gray-900 font-medium">{formatDate(userData.dateOfBirth)}</p>
                <p className="text-sm text-gray-500">Age: {calculateAge(userData.dateOfBirth)} years</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const ProfessionalTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Medical Registration Number</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.medicalRegistrationNumber || userData.medicalRegistrationNumber}
              onChange={(e) => handleInputChange('medicalRegistrationNumber', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 font-medium">{userData.medicalRegistrationNumber}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Qualification</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.qualification || userData.qualification}
              onChange={(e) => handleInputChange('qualification', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 font-medium">{userData.qualification}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Speciality</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.speciality || userData.speciality}
              onChange={(e) => handleInputChange('speciality', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 font-medium">{userData.speciality}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.yearsOfExperience || userData.yearsOfExperience}
              onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 font-medium">{userData.yearsOfExperience} years</p>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Languages Spoken</label>
            {isEditing ? (
              <input
                type="text"
                value={editData.languagesSpoken || userData.languagesSpoken}
                onChange={(e) => handleInputChange('languagesSpoken', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900 font-medium">{userData.languagesSpoken}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Weekly Availability</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.weeklyAvailability || userData.weeklyAvailability}
              onChange={(e) => handleInputChange('weeklyAvailability', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900 font-medium">{userData.weeklyAvailability}</p>
          )}
        </div>
      </div>
    </div>
  );

  const ScheduleTab = () => (
    <div className="p-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="text-blue-600" size={20} />
          <h3 className="font-semibold text-blue-900">Working Schedule Summary</h3>
        </div>
        <p className="text-blue-800">{userData.preferredWorkingHours?.summary}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Available Days</h4>
          <div className="flex flex-wrap gap-2">
            {userData.preferredWorkingHours?.days?.map((day) => (
              <span
                key={day}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Time Slots</h4>
          <div className="space-y-2">
            {userData.preferredWorkingHours?.timeSlots?.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded"
              >
                <span className="text-sm font-medium">{slot.label}</span>
                <span className="text-xs text-gray-500">{slot.start} - {slot.end}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const DocumentsTab = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <FileText className="text-blue-600" size={20} />
              <h4 className="font-medium text-gray-900">Medical Degree Certificate</h4>
            </div>
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              <Download size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-600">{userData.medicalDegreeFile}</p>
          <div className="mt-2 flex items-center text-green-600">
            <CheckCircle size={16} className="mr-1" />
            <span className="text-sm">Verified</span>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <FileText className="text-blue-600" size={20} />
              <h4 className="font-medium text-gray-900">Government ID</h4>
            </div>
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              <Download size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-600">{userData.governmentIdFile}</p>
          <div className="mt-2 flex items-center text-green-600">
            <CheckCircle size={16} className="mr-1" />
            <span className="text-sm">Verified</span>
          </div>
        </div>
      </div>
      
      {isEditing && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-2 text-yellow-800">
            <AlertTriangle size={16} />
            <p className="text-sm font-medium">Document Upload</p>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            To update your documents, please contact support or use the document update feature in your dashboard.
          </p>
        </div>
      )}
    </div>
  );

  const DeleteModal = () => (
    showDeleteModal && (
      <div className="fixed inset-0 bg-white/40 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={confirmDelete}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoTab />;
      case 'professional':
        return <ProfessionalTab />;
      case 'schedule':
        return <ScheduleTab />;
      case 'documents':
        return <DocumentsTab />;
      default:
        return <PersonalInfoTab />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ProfileHeader />
      <TabNavigation />
      {renderTabContent()}
      <DeleteModal />
    </div>
  );
};

export default ProfileComponent;