import React from "react";
import { motion } from "framer-motion";
import {
  FaMobileAlt,
  FaClock,
  FaEye,
  FaBullseye,
  FaStream,
} from "react-icons/fa";

const features = [
  {
    title: "Flexibility",
    description:
      "Mobile-first convenience. Quickly shortlist relevant jobs with ease.",
    icon: <FaMobileAlt className="text-blue-600 text-4xl mb-4" />,
  },
  {
    title: "Time Savings",
    description:
      "Smart job recommendations tailored to your profile. Instant access.",
    icon: <FaClock className="text-blue-600 text-4xl mb-4" />,
  },
  {
    title: "Transparent Info",
    description:
      "Access detailed job expectations without revealing your identity.",
    icon: <FaEye className="text-blue-600 text-4xl mb-4" />,
  },
  {
    title: "Accurate Matching",
    description:
      "Get paired with jobs that align with your real skills and goals.",
    icon: <FaBullseye className="text-blue-600 text-4xl mb-4" />,
  },
  {
    title: "Simplified Workflow",
    description:
      "Track and manage your applications with a clean, guided interface.",
    icon: <FaStream className="text-blue-600 text-4xl mb-4" />,
  },
];

const Features = () => {
  // Card animation variants
  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 12px 24px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Icon animation variants
  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className=" py-24 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-blue-800 mb-6 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Designed to Help You Thrive
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg md:text-xl mb-16 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Talent Hire isn’t just another job board — it’s your smart career
          assistant. Discover tools that simplify connecting with the right
          opportunities.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-2xl shadow-lg hover:shadow-xl p-8 transition-all duration-300 group"
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  variants={iconVariants}
                  className="group-hover:icon"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3 group-hover:text-blue-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
