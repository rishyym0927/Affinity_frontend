/* eslint-disable react/prop-types */
const MessageBox = ({ content, incoming, timestamp }) => {
  // Format timestamp in 24-hour HH:mm
  const timeString = new Date(timestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const containerClasses = `px-4 py-2 rounded-lg max-w-xs break-words flex flex-col space-y-1 ${
    incoming ? "bg-gray-800 text-white  font-bold " : "bg-[#ff0059] text-white  font-bold "
  }`;

  const timestampColor = incoming ? "text-gray-400" : "text-white/90";

  return (
    <div className={`flex ${incoming ? "justify-start" : "justify-end"}`}>
      <div className={containerClasses}>
        <div>{content}</div>
        <div className={`text-xs self-end ${timestampColor}`}>{timeString}</div>
      </div>
    </div>
  );
};

export default MessageBox;
