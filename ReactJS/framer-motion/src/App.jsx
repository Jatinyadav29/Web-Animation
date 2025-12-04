import { motion } from "motion/react";
const App = () => {
  return (
    <div className="bg-blue-500 h-screen w-full">
      <motion.div
        animate={{ x: 1000, y: 500, rotate: 360, scale: 1.5 }}
        transition={{ delay: 1, duration: 4 }}
        className="h-48 w-48 bg-amber-400 border-2 border-white rounded"
      ></motion.div>
      <motion.div
        animate={{ x: 1000, y: 300 }}
        transition={{ delay: 1, duration: 4 }}
        className="h-48 w-48 bg-green-400 border-2 border-white rounded-[50%]"
      ></motion.div>
    </div>
  );
};

export default App;
