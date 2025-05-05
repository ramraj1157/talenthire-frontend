import React from "react";
import { motion } from "framer-motion";
import {
  FaMagic,
  FaShieldAlt,
  FaLightbulb,
  FaClipboardCheck,
} from "react-icons/fa";

const features = [
  {
    title: "AI-Powered Matching",
    description:
      "Smart algorithms connect you with roles that align with your skills and goals — instantly.",
    icon: <FaMagic className="text-blue-600 w-6 h-6" />,
  },
  {
    title: "Verified Companies",
    description:
      "All companies on TalentHire are screened for quality and integrity to ensure trustworthy interactions.",
    icon: <FaShieldAlt className="text-blue-600 w-6 h-6" />,
  },
  {
    title: "Skill-Based Projects",
    description:
      "Find freelance or collaborative opportunities aligned with your stack, schedule, and interests.",
    icon: <FaLightbulb className="text-blue-600 w-6 h-6" />,
  },
  {
    title: "Application Dashboard",
    description:
      "Track every application, message, and offer in one simple, professional dashboard.",
    icon: <FaClipboardCheck className="text-blue-600 w-6 h-6" />,
  },
];

const Features = () => {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Features */}
        <div className="md:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-blue-800 mb-10 text-left"
          >
            Platform Features
          </motion.h2>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md border border-blue-100"
              >
                <div className="mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <motion.div
          className="md:w-1/3"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Talent platform preview"
            className="rounded-xl shadow-lg w-full object-cover max-h-[500px] border border-blue-100"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
