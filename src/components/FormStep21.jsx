import React, { useContext, useRef , useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { validations } from "../utils/formValidations";
const FormStep21 = ({ onNext, onBack }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);
  const interestsInputRef = useRef(null);
  const socialHabitsInputRef = useRef(null);
  const [errors, setErrors] = useState({});

  const handleNext = () =>{
    const newErrors ={};
    const fieldsToValidate = ['interests','past_relationships'] ;

    fieldsToValidate.forEach((field) => {
      const error = validations(field, registerInfo[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    onNext(); 
  }

  async function onFileSelect(e) {
    try {
      const file = e.target.files[0];
      const filename = file.name;

      const response = await axios.post(
        `http://ec2-3-111-34-89.ap-south-1.compute.amazonaws.com:4000/v1/user/presignedUrl`,
        {
          filename,
        }
      );

      const presignedUrl = response.data.preSignedUrl;
      const fields = response.data.fields;
      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const awsResponse = await axios.post(presignedUrl, formData);
      console.log(awsResponse);

      const imageUrl = `https://soundscorebucket.s3.ap-south-1.amazonaws.com/${fields["key"]}`;
      updateRegisterInfo({ ...registerInfo, image_url: imageUrl });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg shadow-lg h-full flex flex-col justify-around bg-white dark:bg-neutral-900"
    >
      <div>
        <h2 className="text-4xl font-bold text-[#ff0059] mb-4 dark:text-yellow-400">
          More About You
        </h2>
        <p className="text-neutral-700 font-bold mb-8 dark:text-neutral-400">
          Let's get to know you better <span className="text-yellow-600">!</span>
        </p>
      </div>

      <form className="space">
        <label className="block">
          <span className="text-gray-800 dark:text-gray-300">Interests:</span>
          <input
            ref={interestsInputRef}
            type="text"
            name="interests"
            defaultValue={registerInfo.interests}
            onChange={(e) =>
              updateRegisterInfo({ ...registerInfo, interests: e.target.value })
            }
            className="mt-1 block w-full p-2 rounded-md bg-gray-100 dark:bg-neutral-800 outline-none text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
          />
          {errors.interests && (
            <p className="text-[#ff0059] dark:text-red-400">{errors.interests}</p>
          )}
        </label>

        <label className="block">
          <span className="text-gray-800 dark:text-gray-300">Social Habits:</span>
          <input
            ref={socialHabitsInputRef}
            type="text"
            name="social_habits"
            defaultValue={registerInfo.social_habits}
            onChange={(e) =>
              updateRegisterInfo({ ...registerInfo, social_habits: e.target.value })
            }
            className="mt-1 block w-full p-2 rounded-md bg-gray-100 dark:bg-neutral-800 outline-none text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
          />
        </label>

        <div className="block">
          <span className="text-gray-800 dark:text-gray-300">Past Relationships:</span>
          <div className="flex items-center mt-2">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="past_relationships"
                value="Yes"
                checked={registerInfo.past_relations === "Yes"}
                onChange={() => updateRegisterInfo({ ...registerInfo, past_relations: "Yes" })}
                className="form-radio text-[#ff0059] dark:text-red-500"
              />
              <span className="ml-2 text-gray-800 dark:text-gray-300">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="past_relationships"
                value="No"
                checked={registerInfo.past_relations === "No"}
                onChange={() => updateRegisterInfo({ ...registerInfo, past_relations: "No" })}
                className="form-radio text-[#ff0059] dark:text-red-500"
              />
              <span className="ml-2 text-gray-800 dark:text-gray-430">No</span>
            </label>
          </div>
          {errors.past_relationships && (
            <p className="text-[#ff0059] dark:text-red-400">{errors.past_relationships}</p>
          )}
        </div>

        <div className="mt-4">
          <span className="text-gray-800 dark:text-gray-300">Profile Picture:</span>
          <div className="mt-2 relative h-28 flex flex-col items-center justify-center bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
            <input
              type="file"
              onChange={onFileSelect}
              id="fileInput"
              className="absolute h-full w-full opacity-0 cursor-pointer"
            />
            {registerInfo.image_url ? (
              <img src={registerInfo.image_url} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="text-neutral-900 dark:text-white text-xl font-bold">
                Upload Image
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="flex justify-start gap-4 items-end mt-10 pb-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-100 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-gray-800 text-gray-800 dark:text-white py-2 px-4 rounded-md"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default FormStep21;
