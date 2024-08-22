import react from "react";
import img1 from "../assets/img2.jpg"
const ProfileCard = ({user}) => {

    return <div className=" h-full rounded-xl bg-red-200 ">
        
        <img src={user?.image_url} alt={user?.username} className="w-full h-full rounded-xl" />
        
        </div>;
};

export default ProfileCard;
