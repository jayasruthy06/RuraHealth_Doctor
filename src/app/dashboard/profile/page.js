import ProfileComponent from "@/components/profile"

export const metadata = {
    title: "RuraHealth - Doctor | Profile",
    icons:{
    icon: "/favicon.ico"
  }
}

export default function Profile(){
    return(
       <>
      <h3 className="font-nubito text-primary text-6xl ml-6 mt-8 font-bold">Profile</h3>
      <div className="p-10">
        <ProfileComponent/>
      </div>
    </>
    )
}