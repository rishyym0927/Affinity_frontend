import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { AnimatePresence, motion } from "framer-motion";
import { RiseLoader } from "react-spinners";
import { RiHeartFill, RiVideoAddFill, RiPhoneFill } from "react-icons/ri";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [currentHumor, setCurrentHumor] = useState(0);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

 
  const darkHumors = [
    "I used to think I was indecisive. Now I'm not so sure.",
    "I have a lot of growing up to do. I realized that the other day inside my fort.",
    "I'm not saying I'm Wonder Woman, I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
    "I don't suffer from insanity. I enjoy every minute of it.",
    "I'm not afraid of death. I just don't want to be there when it happens.",
    "I used to think I was a people person. Then people ruined it.",
  ];

  useEffect(() => {
    if (!remoteSocketId) {
      const interval = setInterval(() => {
        setCurrentHumor((prev) => (prev + 1) % darkHumors.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [remoteSocketId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-violet-900 p-4 text-white"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-4xl font-bold mb-6 text-pink-500"
      >
        LoveConnect Video Chat
      </motion.h1>

      <AnimatePresence mode="wait">
        {!remoteSocketId ? (
          <motion.div
            key="humor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl mb-4 text-yellow-400 text-center max-w-md"
          >
            <p className="mb-2">Waiting for your perfect match...</p>
            <motion.p
              key={currentHumor}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="italic text-gray-400"
            >
              "{darkHumors[currentHumor]}"
            </motion.p>
          </motion.div>
        ) : (
          <motion.h4
            key="connected"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-xl mb-4 text-green-400"
          >
            Connected with your match!
          </motion.h4>
        )}
      </AnimatePresence>

      <div className="flex space-x-4 mb-6">
        {myStream && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors flex items-center"
            onClick={sendStreams}
          >
            <RiVideoAddFill className="mr-2" /> Send Stream
          </motion.button>
        )}
        {remoteSocketId && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center"
            onClick={handleCallUser}
          >
            <RiPhoneFill className="mr-2" /> Start Call
          </motion.button>
        )}
      </div>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <AnimatePresence>
          {myStream && (
            <motion.div
              key="myStream"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="text-center"
            >
              <h2 className="text-xl font-semibold mb-2 text-pink-400">You</h2>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-2 rounded-lg shadow-lg"
              >
                <ReactPlayer
                  playing
                  muted
                  height="300px"
                  width="400px"
                  url={myStream}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {remoteStream && (
            <motion.div
              key="remoteStream"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <h2 className="text-xl font-semibold mb-2 text-pink-400">Your Match</h2>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-2 rounded-lg shadow-lg"
              >
                <ReactPlayer
                  playing
                  height="300px"
                  width="400px"
                  url={remoteStream}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          fill="#FF69B4"
          fillOpacity="0.1"
          d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></motion.path>
      </svg>
    </motion.div>
  );
};

export default RoomPage;