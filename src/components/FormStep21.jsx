import React, { useContext, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Tagify from '@yaireo/tagify';
import "@yaireo/tagify/dist/tagify.css";

const FormStep21 = ({ onNext, onBack }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);
  const interestsInputRef = useRef(null);
  const socialHabitsInputRef = useRef(null);

  useEffect(() => {
    const tagifyInterests = new Tagify(interestsInputRef.current, {
      whitelist: [], // Add your predefined tags here if any
      maxTags: 10, // Set the maximum number of tags allowed
      dropdown: {
        maxItems: 20, // Set the maximum number of suggestions shown in the dropdown
        enabled: 0,   // Enable suggestions dropdown
      },
    });

    tagifyInterests.on('change', (e) => {
      updateRegisterInfo({ ...registerInfo, interest: e.detail.value });
    });

    const tagifySocialHabits = new Tagify(socialHabitsInputRef.current, {
      whitelist: [],
      maxTags: 10,
      dropdown: {
        maxItems: 20,
        enabled: 0,
      },
    });

    tagifySocialHabits.on('change', (e) => {
      updateRegisterInfo({ ...registerInfo, social_habits: e.detail.value });
    });

    // Cleanup on unmount
    return () => {
      tagifyInterests.destroy();
      tagifySocialHabits.destroy();
    };
  }, [registerInfo, updateRegisterInfo]);

  async function onFileSelect(e) {
    try {
      const file = e.target.files[0];
      const filename = file.name;

      const response = await axios.post(`http://localhost:4000/v1/user/presignedURL`, {
        filename,
      });

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
      className="p-6 rounded-lg shadow-lg h-full flex flex-col justify-around"
    >
      <div>
        <h2 className="text-4xl text-white font-bold text-[#ff0059] mb-4">More About You</h2>
        <p className='text-neutral-400 font-bold mb-8'>Let's get to know you better <span className='text-yellow-600'>!</span></p>
      </div>

      <form className="space">
        <label className="block">
          <span className="text-gray-400">Interests:</span>
          <input
            ref={interestsInputRef}
            type="text"
            name="interests"
            defaultValue={registerInfo.interest}
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
          />
        </label>

        <label className="block">
          <span className="text-gray-400">Social Habits:</span>
          <input
            ref={socialHabitsInputRef}
            type="text"
            name="social_habits"
            defaultValue={registerInfo.social_habits}
            className="mt-1 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
          />
        </label>

        <div className="block">
          <span className="text-gray-400">Past Relationships:</span>
          <div className="flex items-center mt-2">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="past_relationships"
                value="yes"
                checked={registerInfo.past_relations === "yes"}
                onChange={() => updateRegisterInfo({ ...registerInfo, past_relations: "yes" })}
                className="form-radio text-[#ff0059]"
              />
              <span className="ml-2 text-gray-400">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="past_relationships"
                value="no"
                checked={registerInfo.past_relations === "no"}
                onChange={() => updateRegisterInfo({ ...registerInfo, past_relations: "no" })}
                className="form-radio text-[#ff0059]"
              />
              <span className="ml-2 text-gray-400">No</span>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <span className="text-gray-400">Profile Picture:</span>
          <div className='mt-2 relative h-28 flex flex-col items-center justify-center bg-neutral-800 border border-gray-600 rounded-md overflow-hidden'>
            <input
              type="file"
              onChange={onFileSelect}
              id="fileInput"
              className='absolute h-full w-full opacity-0 cursor-pointer'
            />
            {registerInfo.image_url ? (
              <img src={registerInfo.image_url} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className='text-white text-xl font-bold'>
                Upload Image
              </div>
            )}
          </div>
        </div>
      </form>

      <div className="flex justify-start gap-4 items-end mt-10">
        <button type="button" onClick={onBack} className="bg-neutral-800 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
          Back
        </button>
        <button type="button" onClick={onNext} className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md">
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default FormStep21;
