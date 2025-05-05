import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-8 bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl sm:text-5xl font-bold text-blue-800 text-center mb-16"
        >
          About TalentHire
        </motion.h1>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Empowering the Next Generation of Talent
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              TalentHire is a platform built to bridge the gap between emerging
              developers and forward-thinking companies. We believe that talent
              isn’t limited by geography, and opportunity shouldn't be either.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Since our launch in 2023, we’ve helped students, freelancers, and
              growing professionals discover internships, jobs, and
              collaborative projects aligned with their skills and aspirations.
              With AI-powered matchmaking, seamless onboarding, and a growing
              network of top employers, TalentHire is redefining how modern
              recruitment works.
            </p>
          </div>

          {/* Image */}
          <motion.div
            className="md:w-1/3"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7"
              alt="Collaborative team"
              className="rounded-xl shadow-lg w-full object-cover max-h-[420px] border border-blue-100"
            />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
