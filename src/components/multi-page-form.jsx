
"use client";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, ChevronDown, Clock, X } from 'lucide-react';
import { FormSelect } from './formselect';
import ConfirmationModal from './confirmation-modal';
// Enhanced Specialty Selector Component
const SpecialtySelector = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const medicalSpecialties = [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Endocrinology',
    'Gastroenterology',
    'Neurology',
    'Oncology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry',
    'Pulmonology',
    'Ophthalmology',
    'ENT (Otolaryngology)',
    'Urology',
    'Gynecology',
    'Obstetrics',
    'Anesthesiology',
    'Emergency Medicine',
    'Family Medicine',
    'Internal Medicine',
    'Radiology',
    'Pathology',
    'Surgery - General',
    'Surgery - Cardiac',
    'Surgery - Neuro',
    'Surgery - Plastic',
    'Dentistry',
    'Physiotherapy',
    'Ayurveda',
    'Homeopathy',
    'Other'
  ];

  const filteredSpecialties = medicalSpecialties.filter(specialty =>
    specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (specialty) => {
    onChange(specialty);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative font-nubito text-sm">
      <div
        className={`flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer bg-white transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${isOpen ? 'border-blue-500' : ''} hover:border-gray-400`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value || 'Select your specialty'}
        </span>
        <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search specialties..."
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredSpecialties.map((specialty) => (
              <div
                key={specialty}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => handleSelect(specialty)}
              >
                {specialty}
              </div>
            ))}
            {filteredSpecialties.length === 0 && (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No specialties found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Working Hours Selector Component
const WorkingHoursSelector = ({ value, onChange, error }) => {
  const [selectedDays, setSelectedDays] = useState(value?.days || []);
  const [timeSlots, setTimeSlots] = useState(value?.timeSlots || []);
  const [showTimeSlotForm, setShowTimeSlotForm] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState({ start: '', end: '' });

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const predefinedSlots = [
    { label: 'Morning (9:00 AM - 12:00 PM)', start: '09:00', end: '12:00' },
    { label: 'Afternoon (1:00 PM - 5:00 PM)', start: '13:00', end: '17:00' },
    { label: 'Evening (6:00 PM - 9:00 PM)', start: '18:00', end: '21:00' },
    { label: 'Night (10:00 PM - 6:00 AM)', start: '22:00', end: '06:00' }
  ];

  const handleDayToggle = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    
    setSelectedDays(updatedDays);
    updateWorkingHours(updatedDays, timeSlots);
  };

  const handlePredefinedSlot = (slot) => {
    const updatedSlots = [...timeSlots, slot];
    setTimeSlots(updatedSlots);
    updateWorkingHours(selectedDays, updatedSlots);
  };

  const handleCustomTimeSlot = () => {
    if (newTimeSlot.start && newTimeSlot.end) {
      const customSlot = {
        label: `${newTimeSlot.start} - ${newTimeSlot.end}`,
        start: newTimeSlot.start,
        end: newTimeSlot.end
      };
      const updatedSlots = [...timeSlots, customSlot];
      setTimeSlots(updatedSlots);
      updateWorkingHours(selectedDays, updatedSlots);
      setNewTimeSlot({ start: '', end: '' });
      setShowTimeSlotForm(false);
    }
  };

  const removeTimeSlot = (index) => {
    const updatedSlots = timeSlots.filter((_, i) => i !== index);
    setTimeSlots(updatedSlots);
    updateWorkingHours(selectedDays, updatedSlots);
  };

  const updateWorkingHours = (days, slots) => {
    const workingHoursData = {
      days,
      timeSlots: slots,
      summary: `${days.length} days/week, ${slots.length} time slots`
    };
    onChange(workingHoursData);
  };

  return (
    <div className={`border rounded-md p-4 ${error ? 'border-red-500' : 'border-gray-300'}`}>
      <div className="space-y-4">
        {/* Days Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Available Days</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  selectedDays.includes(day)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                {day.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <label className="block text-sm font-medium mb-2">Time Slots</label>
          
          {/* Predefined Time Slots */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {predefinedSlots.map((slot, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handlePredefinedSlot(slot)}
                className="text-left px-3 py-2 text-sm border border-gray-300 rounded hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Clock size={14} className="inline mr-2" />
                {slot.label}
              </button>
            ))}
          </div>

          {/* Custom Time Slot Form */}
          {showTimeSlotForm ? (
            <div className="flex items-center gap-2 p-3 border border-gray-200 rounded bg-gray-50">
              <input
                type="time"
                value={newTimeSlot.start}
                onChange={(e) => setNewTimeSlot(prev => ({ ...prev, start: e.target.value }))}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <span className="text-sm">to</span>
              <input
                type="time"
                value={newTimeSlot.end}
                onChange={(e) => setNewTimeSlot(prev => ({ ...prev, end: e.target.value }))}
                className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleCustomTimeSlot}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowTimeSlotForm(false)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowTimeSlotForm(true)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              + Add Custom Time Slot
            </button>
          )}

          {/* Selected Time Slots */}
          {timeSlots.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Selected Time Slots:</p>
              <div className="space-y-1">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded">
                    <span className="text-sm">{slot.label}</span>
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        {(selectedDays.length > 0 || timeSlots.length > 0) && (
          <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
            <p className="text-sm font-medium text-green-800">Working Schedule Summary:</p>
            <p className="text-sm text-green-700">
              {selectedDays.length > 0 && `${selectedDays.length} days per week`}
              {selectedDays.length > 0 && timeSlots.length > 0 && ' • '}
              {timeSlots.length > 0 && `${timeSlots.length} time slots configured`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Basic UI Components (since we don't have access to your ui components)
const Label = ({ children, className = "" }) => (
  <label className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);


const MultiStepForm = ({ onFormComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = React.useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState('success');

  const [formData, setFormData] = useState({
    // Step 1 - Personal Info
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    
    // Step 2 - Professional Details
    medicalRegistrationNumber: '',
    qualification: '',
    speciality: '',
    yearsOfExperience: '',
    languagesSpoken: '',
    preferredWorkingHours: null,
    weeklyAvailability: '',
    
    // Step 3 - Profile Documents
    medicalDegreeFile: null,
    governmentIdFile: null,
    profilePhotoFile: null
  });

  const [errors, setErrors] = useState({});
  const totalSteps = 3;

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.gender.trim()) newErrors.gender = 'Gender is required';
      if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (step === 2) {
      if (!formData.medicalRegistrationNumber.trim()) newErrors.medicalRegistrationNumber = 'Medical registration number is required';
      if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
      if (!formData.speciality.trim()) newErrors.speciality = 'Speciality is required';
      if (!formData.yearsOfExperience.trim()) newErrors.yearsOfExperience = 'Years of experience is required';
      if (!formData.languagesSpoken.trim()) newErrors.languagesSpoken = 'Languages spoken is required';
      if (!formData.preferredWorkingHours) newErrors.preferredWorkingHours = 'Preferred working hours is required';
      if (!formData.weeklyAvailability.trim()) newErrors.weeklyAvailability = 'Weekly availability is required';
    }

    if (step === 3) {
      if (!formData.medicalDegreeFile) newErrors.medicalDegreeFile = 'Medical degree certificate is required';
      if (!formData.governmentIdFile) newErrors.governmentIdFile = 'Government issued ID is required';
      if (!formData.profilePhotoFile) newErrors.profilePhotoFile = 'Profile photo is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    setModalState('success');
    setModalOpen(true);
    if (validateStep(currentStep)) {
      // Call the callback with form data
      if (onFormComplete) {
        onFormComplete(formData);
      }
      console.log('Form submitted:', formData);
    }
  };

  const handleFileChange = (field, file) => {
    updateFormData(field, file);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            step < currentStep 
              ? 'bg-green-500 text-white' 
              : step === currentStep 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600'
          }`}>
            {step < currentStep ? <Check size={16} /> : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 transition-colors ${
              step < currentStep ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 font-nunito">
      <h2 className="text-2xl font-bold text-center mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Full Name <span className="text-gray-400">(As per your certificate)</span> <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label>
            Mobile Number <span className="text-red-500">*</span>
          </Label>
          <Input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => updateFormData('mobileNumber', e.target.value)}
            className={errors.mobileNumber ? 'border-red-500' : ''}
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <Label>
          Password <span className="text-red-500">*</span>
        </Label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData('password', e.target.value)}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      
      <div className="flex flex-row gap-5">
        <div className="space-y-2">
          <Label>
            Gender <span className="text-red-500">*</span>
          </Label>
          <FormSelect
            value={formData.gender}
            onChange={(value) => updateFormData('gender', value)}
          />
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>
        <div className="space-y-2">
          <Label>
            Date of Birth <span className="text-red-500">*</span>
          </Label>
          <input 
            type="date" 
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
            className={`text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${
              errors.dateOfBirth ? 'border-red-500' : ''
            }`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Professional Details</h2>
      
      <div className="space-y-2">
        <Label>
          Medical Registration Number <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          value={formData.medicalRegistrationNumber}
          onChange={(e) => updateFormData('medicalRegistrationNumber', e.target.value)}
          className={errors.medicalRegistrationNumber ? 'border-red-500' : ''}
        />
        {errors.medicalRegistrationNumber && <p className="text-red-500 text-sm">{errors.medicalRegistrationNumber}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Qualification <span className='text-red-500'>*</span>
          </Label>
          <Input
            type="text"
            value={formData.qualification}
            onChange={(e) => updateFormData('qualification', e.target.value)}
            className={errors.qualification ? 'border-red-500' : ''}
          />
          {errors.qualification && <p className="text-red-500 text-sm">{errors.qualification}</p>}
        </div>
        
        <div className="space-y-2">
          <Label>
            Speciality <span className="text-red-500">*</span>
          </Label>
          <SpecialtySelector
            value={formData.speciality}
            onChange={(value) => updateFormData('speciality', value)}
            error={errors.speciality}
          />
          {errors.speciality && <p className="text-red-500 text-sm">{errors.speciality}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Years of Experience <span className='text-red-500'>*</span>
          </Label>
          <Input
            type="text"
            value={formData.yearsOfExperience}
            onChange={(e) => updateFormData('yearsOfExperience', e.target.value)}
            className={errors.yearsOfExperience ? 'border-red-500' : ''}
          />
          {errors.yearsOfExperience && <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>}
        </div>
        
        <div className="space-y-2">
          <Label>
            Languages Spoken <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={formData.languagesSpoken}
            onChange={(e) => updateFormData('languagesSpoken', e.target.value)}
            className={errors.languagesSpoken ? 'border-red-500' : ''}
          />
          {errors.languagesSpoken && <p className="text-red-500 text-sm">{errors.languagesSpoken}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>
          Preferred Working Hours <span className="text-red-500">*</span>
        </Label>
        <WorkingHoursSelector
          value={formData.preferredWorkingHours}
          onChange={(value) => updateFormData('preferredWorkingHours', value)}
          error={errors.preferredWorkingHours}
        />
        {errors.preferredWorkingHours && <p className="text-red-500 text-sm">{errors.preferredWorkingHours}</p>}
      </div>

      <div className="space-y-2">
        <Label>
          Weekly Availability <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          placeholder="e.g., 40 hours per week"
          value={formData.weeklyAvailability}
          onChange={(e) => updateFormData('weeklyAvailability', e.target.value)}
          className={errors.weeklyAvailability ? 'border-red-500' : ''}
        />
        {errors.weeklyAvailability && <p className="text-red-500 text-sm">{errors.weeklyAvailability}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Profile Documents</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            Medical Degree Certificate <span className="text-gray-400">(PDF)</span> <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange('medicalDegreeFile', e.target.files[0])}
            className={errors.medicalDegreeFile ? 'border-red-500' : ''}
          />
          {errors.medicalDegreeFile && <p className="text-red-500 text-sm">{errors.medicalDegreeFile}</p>}
        </div>
        
        <div className="space-y-2">
          <Label>
            Government Issued ID <span className="text-gray-400">(Aadhaar/PAN/License)</span> <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('governmentIdFile', e.target.files[0])}
            className={errors.governmentIdFile ? 'border-red-500' : ''}
          />
          {errors.governmentIdFile && <p className="text-red-500 text-sm">{errors.governmentIdFile}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>
          Profile Photo <span className='text-red-500'>*</span>
        </Label>
        <Input 
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => handleFileChange('profilePhotoFile', e.target.files[0])}
          className={errors.profilePhotoFile ? 'border-red-500' : ''}
        />
        {errors.profilePhotoFile && <p className="text-red-500 text-sm">{errors.profilePhotoFile}</p>}
      </div>
    </div>
  );

  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <>
    <ConfirmationModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      state={modalState}
      title="Success!"
      message="You've successfully registered."
    />
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {renderStepIndicator()}
      
      <div className="mb-8">
        {renderCurrentStep()}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          <ChevronLeft size={16} className="mr-1" />
          Previous
        </button>
        
        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
            <Check size={16} className="ml-1" />
          </button>
        )}
      </div>
    </div>
    </>
  );
};

export default MultiStepForm;