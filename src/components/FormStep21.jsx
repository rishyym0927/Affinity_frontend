import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const FormStep21 = ({ onNext, onBack }) => {
  const { updateRegisterInfo, registerInfo } = useContext(AuthContext);

  async function onFileSelect(e) {
    try {
      console.log("HEELO");
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      const filename = file.name;
      
      console.log("token is ", localStorage.getItem("token"));

      const response = await axios.post(`http://localhost:4000/v1/user/presignedURL`, {
        filename,
      });
      console.log("preResponse is ", response);

      const presignedUrl = response.data.preSignedUrl;
      const fields = response.data.fields;
      const formData = new FormData();
      formData.append("bucket", fields.bucket);
      formData.append("X-Amz-Algorithm", fields["X-Amz-Algorithm"]);
      formData.append("X-Amz-Credential", fields["X-Amz-Credential"]);
      formData.append("X-Amz-Date", fields["X-Amz-Date"]);
      formData.append("key", fields.key);
      formData.append("Policy", fields.Policy);
      formData.append("X-Amz-Signature", fields["X-Amz-Signature"]);
      formData.append("file", file);

      const awsResponse = await axios.post(presignedUrl, formData);
      console.log(awsResponse);
      // console.log(response.data.key);

      // updateFileURL([`https://soundscorebucket.s3.ap-south-1.amazonaws.com/${response.data.fields["key"]}`]);
      console.log(
        `https://soundscorebucket.s3.ap-south-1.amazonaws.com/${response.data.fields["key"]}`
      );
      updateRegisterInfo({ ...registerInfo, image_url:  `https://soundscorebucket.s3.ap-south-1.amazonaws.com/${response.data.fields["key"]}` })

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
      className="p-6 bg-gray-800 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#ff0059] mb-4">
        Step 2: Contact Information
      </h2>
      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-400">Interests:</span>
          <input
            type="text"
            name="interests"
            value={registerInfo.interest}
            onChange={(e) =>
              updateRegisterInfo({ ...registerInfo, interest: e.target.value })
            }
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
          />
        </label>

        <label className="block">
          <span className="text-gray-400">exp_qual:</span>
          <input
            type="text"
            name="exp_qual"
            value={registerInfo.exp_qual}
            onChange={(e) =>
              updateRegisterInfo({ ...registerInfo, exp_qual: e.target.value })
            }
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
          />
        </label>

        <label className="block">
          <span className="text-gray-400">Social Habits:</span>
          <input
            type="text"
            name="social_habits"
            value={registerInfo.social_habits}
            onChange={(e) =>
              updateRegisterInfo({
                ...registerInfo,
                social_habits: e.target.value,
              })
            }
            className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
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
                onChange={() =>
                  updateRegisterInfo({ ...registerInfo, past_relations: "yes" })
                }
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
                onChange={() =>
                  updateRegisterInfo({ ...registerInfo, past_relations: "no" })
                }
                className="form-radio text-[#ff0059]"
              />
              <span className="ml-2 text-gray-400">No</span>
            </label>
              
            <div className='w-full relative h-1/2 flex flex-col items-center  justify-center bg-[#374151] border border-[#4a4949]  '>
            <input
                type="file"
                onChange={onFileSelect}
                id="fileInput"
                className=' relative h-full w-full  opacity-0  cursor-pointer'
            />
            <div className='text-white text-xl font-bold'>
            Upload Image
            </div>

        </div>
        

          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Next
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FormStep21;
