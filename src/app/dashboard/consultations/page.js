import ConsultationTicketsPage from "../../../components/consultation-tickets";

const sampleTickets = [
  {
    patientName: "Sarah Johnson",
    age: 34,
    gender: "Female",
    location: "Downtown Medical District",
    submittedAt: "2024-01-15T10:30:00Z",
    summary: "Persistent headache and fever for 3 days",
    details: "Patient reports severe headache with fever reaching 102°F. Symptoms started 3 days ago and have been getting worse. No recent travel history. Taking over-the-counter pain medication with minimal relief.",
    photos: ["https://via.placeholder.com/300x200", "https://via.placeholder.com/300x200"],
    phcName: "Central Health Center",
    urgency: "high"
  },
  {
    patientName: "Michael Chen",
    age: 28,
    gender: "Male",
    location: "Suburban Health Complex",
    submittedAt: "2024-01-15T14:45:00Z",
    summary: "Chest pain and shortness of breath",
    details: "Experiencing sharp chest pain and difficulty breathing for the past 2 hours. Pain is localized to the left side of chest. No previous cardiac history. Currently at rest but symptoms persist.",
    photos: [],
    phcName: "West Side Clinic",
    urgency: "high"
  },
  {
    patientName: "Emily Rodriguez",
    age: 45,
    gender: "Female",
    location: "Community Health Center",
    submittedAt: "2024-01-15T09:15:00Z",
    summary: "Skin rash and itching",
    details: "Developed red, itchy rash on arms and legs yesterday. No known allergies. Haven't changed soap, detergent, or diet recently. Rash is spreading slowly.",
    photos: ["https://via.placeholder.com/300x200"],
    phcName: "North District PHC",
    urgency: "medium"
  },
  {
    patientName: "Robert Taylor",
    age: 52,
    gender: "Male",
    location: "Rural Health Outpost",
    submittedAt: "2024-01-15T16:20:00Z",
    summary: "Joint pain and stiffness",
    details: "Experiencing increasing joint pain and morning stiffness, particularly in hands and knees. Symptoms have been gradually worsening over the past 2 months. Family history of arthritis.",
    photos: [],
    phcName: "Rural Care Center",
    urgency: "low"
  },
  {
    patientName: "Lisa Wang",
    age: 29,
    gender: "Female",
    location: "University Health Services",
    submittedAt: "2024-01-15T11:30:00Z",
    summary: "Persistent cough and throat pain",
    details: "Dry cough and sore throat for 5 days. No fever but throat is very painful, especially when swallowing. Voice is hoarse. No improvement with over-the-counter remedies.",
    photos: [],
    phcName: "Campus Health Center",
    urgency: "medium"
  }
];

export const metadata = {
    title: "RuraHealth - Doctor | Consultations"
}

export function Consultation() {
  return (
    <>
      <h3 className="font-nubito text-primary text-6xl ml-6 mt-8 font-bold">Consultations</h3>
      <div className="p-10">
        <ConsultationTicketsPage tickets={sampleTickets} />
      </div>
    </>
  );
}

// If you need a default export, add this:
export default Consultation;