import TicketHistoryPage from "@/components/consultation-history"

export const metadata = {
    title: "RuraHealth - Doctor | History"
}

const sampleTickets = [
  {
    patientName: "John Doe",
    age: 45,
    gender: "Male",
    location: "Salem Central",
    phcName: "Salem PHC",
    submittedAt: "2024-01-15T10:30:00Z",
    respondedAt: "2024-01-15T14:45:00Z",
    summary: "Persistent headache and fever for 3 days",
    details: "Patient reports severe headache accompanied by high fever (102°F), body aches, and fatigue. Symptoms started 3 days ago and have been progressively worsening. No recent travel history.",
    photos: [],
    doctorResponse: "Based on the symptoms described, this appears to be a viral fever. The combination of headache, high fever, and body aches is consistent with viral syndrome.\n\nRecommendations:\n1. Complete rest for 5-7 days\n2. Maintain adequate hydration\n3. Monitor temperature regularly\n4. Return if symptoms worsen or persist beyond 7 days",
    prescription: [
      { tabletName: "Paracetamol", dosage: "500mg", duration: "3 times daily for 5 days" },
      { tabletName: "ORS", dosage: "1 packet", duration: "Twice daily as needed" }
    ]
  },
  {
    patientName: "Sarah Johnson",
    age: 32,
    gender: "Female",
    location: "Salem North",
    phcName: "North PHC",
    submittedAt: "2024-01-14T09:15:00Z",
    respondedAt: "2024-01-14T11:30:00Z",
    summary: "Skin rash on arms and legs",
    details: "Developed red, itchy rash on both arms and legs yesterday. No known allergies. Recently started using a new laundry detergent.",
    photos: [],
    doctorResponse: "The rash pattern suggests contact dermatitis, likely from the new laundry detergent. This is a common allergic reaction.\n\nImmediate steps:\n1. Stop using the new detergent\n2. Wash all clothes with hypoallergenic detergent\n3. Apply prescribed antihistamine cream\n4. Avoid scratching to prevent secondary infection",
    prescription: [
      { tabletName: "Cetirizine", dosage: "10mg", duration: "Once daily for 7 days" },
      { tabletName: "Calamine lotion", dosage: "Apply", duration: "2-3 times daily until rash subsides" }
    ]
  }
];

// Add default export here
export default function ConsultationHistory() {
    return(
    <>
      <h3 className="font-nubito text-primary text-6xl ml-6 mt-8 font-bold">Consultation History</h3>
      <div className="p-10">
        <TicketHistoryPage tickets={sampleTickets}/>
      </div>
    </>
    )
}