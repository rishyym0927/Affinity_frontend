/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const MessageBox = ({
  content,
  incoming,
  timestamp,
  status = "sent",
  onRetry,
}) => {
  // Format timestamp in 24-hour HH:mm
  const timeString = new Date(timestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Determine message styling based on status
  const getMessageStyles = () => {
    if (incoming) {
      return {
        container: "bg-gray-800 text-white",
        timestamp: "text-gray-400",
      };
    }

    switch (status) {
      case "pending":
        return {
          container: "bg-[#ff0059]/70 text-white",
          timestamp: "text-white/70",
        };
      case "failed":
        return {
          container: "bg-red-600/80 text-white border border-red-500",
          timestamp: "text-white/80",
        };
      case "sent":
      default:
        return {
          container: "bg-[#ff0059] text-white",
          timestamp: "text-white/90",
        };
    }
  };

  const styles = getMessageStyles();
  const containerClasses = `px-4 py-2 rounded-lg max-w-xs break-words flex flex-col space-y-1 font-bold ${styles.container}`;

  // Animation variants
  const messageVariants = {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const getStatusIcon = () => {
    if (incoming) return null; // No status icons for incoming messages

    switch (status) {
      case "pending":
        return (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-xs"
          >
            ⏳
          </motion.span>
        );
      case "failed":
        return (
          <span
            className="text-xs cursor-pointer hover:scale-110 transition-transform"
            onClick={onRetry}
            title="Click to retry"
          >
            ⚠️
          </span>
        );
      case "sent":
        return <span className="text-xs">✓</span>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`flex ${incoming ? "justify-start" : "justify-end"}`}
      variants={messageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className={containerClasses}>
        <div className="flex items-start justify-between gap-2">
          <span className="flex-1">{content}</span>
          {getStatusIcon()}
        </div>

        <div
          className={`text-xs self-end flex items-center gap-1 ${styles.timestamp}`}
        >
          <span>{timeString}</span>
          {status === "failed" && (
            <motion.button
              onClick={onRetry}
              className="text-xs bg-white/20 hover:bg-white/30 px-1 py-0.5 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBox;
