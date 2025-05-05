// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Hero = () => {
//   // Animation variants for the background circles
//   const circleVariants = {
//     animate: {
//       scale: [1, 1.2, 1],
//       opacity: [0.3, 0.5, 0.3],
//       transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
//     },
//   };

//   // Button hover animation
//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       boxShadow: "0px 8px 24px rgba(59, 130, 246, 0.4)",
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//   };

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//       className="relative min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden"
//     >
//       {/* Decorative Background Circles */}
//       <motion.div
//         className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300 opacity-20 rounded-full filter blur-3xl"
//         variants={circleVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-300 opacity-20 rounded-full filter blur-3xl"
//         variants={circleVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute top-1/2 -left-10 w-60 h-60 bg-purple-200 opacity-15 rounded-full filter blur-2xl"
//         variants={circleVariants}
//         animate="animate"
//       />

//       {/* Headline */}
//       <motion.h1
//         className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-black text-center mb-6 leading-tight tracking-tight"
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
//       >
//         Discover <span className="text-blue-600">Talent.</span>{" "}
//         <br className="hidden sm:block" /> Create Impact.
//       </motion.h1>

//       {/* Subtext */}
//       <motion.p
//         className="text-lg md:text-xl text-gray-700 max-w-3xl text-center mb-12 leading-relaxed"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
//       >
//         Talent Hire is where passionate developers and visionary companies come
//         together — to innovate, build, and thrive.
//       </motion.p>

//       {/* Call to Action Button */}
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
//       >
//         <Link to="/signup">
//           <motion.button
//             className="cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition-all duration-300"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap={{ scale: 0.95 }}
//           >
//             Find Your Match
//           </motion.button>
//         </Link>
//       </motion.div>
//     </motion.section>
//   );
// };

// export default Hero;

// import { motion } from "framer-motion";

// const Hero = () => {
//   return (
//     <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-[80vh] py-16 flex items-center justify-center overflow-hidden">
//       {/* Glass Effect Background Layer */}
//       <div className="absolute inset-0 backdrop-blur-sm bg-white/20 z-0"></div>

//       <div className="relative z-10 container mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
//         {/* Text Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="lg:w-1/2 text-center lg:text-left"
//         >
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-700 leading-tight mb-6">
//             Connect with top developers.
//             <br /> and build the future.
//           </h1>
//           <p className="text-gray-700 text-lg md:text-xl mb-8">
//             Talent Hire is where innovation meets opportunity — linking
//             brilliant minds with companies ready to make an impact.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={() => (window.location.href = "/signup")}
//               className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all"
//             >
//               Find Your Match
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Image Section */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
//           className="lg:w-1/2 flex justify-center"
//         >
//           <img
//             src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//             alt="Tech collaboration illustration"
//             className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-xl shadow-xl object-cover"
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { motion } from "framer-motion";

const Hero = () => {
  // Animation variants for background layer
  const backdropVariants = {
    animate: {
      opacity: [0.2, 0.3, 0.2],
      transition: { duration: 100, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Button animation variants
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 24px rgba(59, 130, 246, 0.4)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    tap: { scale: 0.97 },
  };

  return (
    <section className="relative  min-h-[90vh] py-20 flex items-center justify-center overflow-hidden">
      {/* Glass Effect Background Layer */}
      <motion.div
        className="absolute inset-0 backdrop-blur-md bg-white/30 z-0 border border-white/20"
        variants={backdropVariants}
        animate="animate"
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-800 leading-tight mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Connect with top developers.
            <br />
            Build the future.
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Talent Hire is where innovation meets opportunity — linking
            brilliant minds with companies ready to make an impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => (window.location.href = "/signup")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Find Your Match
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="lg:w-1/2 flex justify-center"
        >
          <motion.img
            src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Tech collaboration illustration"
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover border border-white/30"
            whileHover={{ scale: 1.03, rotate: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
