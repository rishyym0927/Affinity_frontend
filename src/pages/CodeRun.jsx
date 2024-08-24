import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

const problems = [
  {
    id: 1,
    question: "Given an array of integers, return the sum of all positive numbers.",
    sampleInput: "[1, -2, 3, 4, -5]",
    sampleOutput: "8",
    submitted: false,
  },
  {
    id: 2,
    question: "Write a function to check if a string is a palindrome.",
    sampleInput: "'racecar'",
    sampleOutput: "true",
    submitted: false,
  },
  {
    id: 3,
    question: "Find the largest element in an array.",
    sampleInput: "[3, 1, 4, 1, 5, 9]",
    sampleOutput: "9",
    submitted: false,
  }
];

const CodeRun = () => {
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [file, setFile] = useState();
  const [score, setScore] = useState(0);

  const handleSubmit = async () => {
    try {
      if (selectedProblem.submitted) {
        toast.error(`You have already submitted this problem`);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      console.log(formData);

      const response = await axios.post("http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/runcode", formData);
      console.log(response);    

      if (response.data === "AC") {
        setScore(Number(score) + Number((1000 - (300 - timeLeft))));
        toast.success(`ACCEPTED`);
        setSelectedProblem((prev) => ({ ...prev, submitted: true }));
      } else {
        toast.error(`WRONG ANSWER`);
      } 

      console.log("score is " + score);
      console.log( score);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  /// refresh hone pe warning
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // This is needed for Chrome
      
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);   

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleUpload = (e) => {
    const originalFile = e.target.files[0];

    const newFileName = `ques${selectedProblem.id}.py`; // Change this to your desired filename

    // Create a new File object with the same contents but a different name
    const renamedFile = new File([originalFile], newFileName, {
      type: originalFile.type,
    });

    setFile(renamedFile);
    console.log(file);
  };
  const {user} = useContext(AuthContext);
  const handleLeave = async () => {   
    toast.success("You have completed the contest");
    try {
      const response = await axios.put("http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/updatecontestscore",{
        id: user.id.toString,
        contestscore: score.toString,
      });       
      console.log(response);  
    } catch (err) {
      console.log("Error leaving contest : " + err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="p-8 shadow-lg h-screen flex flex-col justify-between bg-neutral-900 text-white"
    >
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#ff0059]">CodeRun</h1>
          <div className="flex items-center text-lg mt-2 text-neutral-400">
            <FiClock className="mr-2 text-[#ff0059]" />
            <span>Time Left: <span className="font-bold text-white">{formatTime(timeLeft)}</span></span>
          </div>
        </div>
        <div>
          <label className="text-gray-400 mr-2">Select Problem:</label>
          <select
            value={selectedProblem.id}
            onChange={(e) =>
              setSelectedProblem(problems.find((p) => p.id === Number(e.target.value)))
            }
            className="bg-neutral-800 text-white p-2 rounded-md outline-none border border-gray-600"
          >
            {problems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                Problem {problem.id}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">Problem {selectedProblem.id}</h2>
        <p className="text-neutral-400 mb-4">{selectedProblem.question}</p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-neutral-300">Sample Input:</h3>
          <pre className="bg-neutral-800 p-4 rounded-md mt-2 text-sm text-neutral-200">
            {selectedProblem.sampleInput}
          </pre>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-neutral-300">Sample Output:</h3>
          <pre className="bg-neutral-800 p-4 rounded-md mt-2 text-sm text-neutral-200">
            {selectedProblem.sampleOutput}
          </pre>
        </div>
        <label className="block mb-6">
          <span className="text-gray-400">Upload your code:</span>
          <input
            type="file"
            accept=".js,.py,.cpp" // Adjust based on the languages you support
            onChange={handleUpload}
            className="mt-2 block w-full p-2 rounded-md bg-neutral-800 outline-none text-white border border-gray-600"
          />
          <p className="mt-2 text-sm text-neutral-500">Accepted formats: .js, .py, .cpp</p>
        </label>
      </section>

      <footer className="flex justify-between items-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleLeave}
          className="bg-neutral-800 hover:bg-gray-600 text-white py-2 px-6 rounded-md transition-all duration-300"
        >
          Leave Contest
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleSubmit}
          className="bg-[#ff0059] hover:bg-red-500 text-white py-2 px-6 rounded-md transition-all duration-300"
        >
          Submit Code
        </motion.button>
      </footer>

      <ToastContainer />
    </motion.div>
  );
};

export default CodeRun;
