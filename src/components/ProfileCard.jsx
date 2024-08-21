import react from "react";
import img1 from "../assets/img2.jpg"
const ProfileCard = ({user}) => {

    return <div className="  w-[70%] h-[60%] rounded-xl shadow-[0px_20px_125px_10px_rgba(39,_70,_132,_1)]">
        
        <img src={user?.image_url} alt={user?.username} className="w-full h-full rounded-xl" />
        
        </div>;
};

export default ProfileCard;
