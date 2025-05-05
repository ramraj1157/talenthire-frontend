import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    text: "Talent Hire made my job search super easy!",
    name: "John Doe",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    text: "I found my dream job within days!",
    name: "Jane Smith",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    text: "Swipe feature is a game changer.",
    name: "Alex Johnson",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    text: "Intuitive UI, fast results!",
    name: "Sara Lee",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    text: "Loved how quickly I got responses.",
    name: "Daniel Kim",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    text: "Super convenient and accurate!",
    name: "Emily Nguyen",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const Testimonials = () => {
  const duplicated = [...testimonials, ...testimonials]; // duplicate for seamless loop

  // Card animation variants
  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 12px 24px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className=" py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16 px-4">
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-blue-800 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          What People Are Saying
        </motion.h2>
      </div>

      {/* Outer overflow-hidden container */}
      <div className="relative w-full overflow-hidden">
        {/* Inner scrolling container */}
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {duplicated.map((item, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] max-w-xs bg-white/80 backdrop-blur-sm border border-blue-100/50 rounded-2xl shadow-lg p-8 flex-shrink-0"
              variants={cardVariants}
              whileHover="hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-start">
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaQuoteLeft className="text-blue-400 text-3xl mb-3" />
                </motion.div>
                <p className="text-gray-600 italic mb-4 text-base leading-relaxed">
                  "{item.text}"
                </p>
                <div className="flex items-center">
                  <motion.img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-full mr-4 border border-blue-200"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h4 className="text-blue-800 font-semibold text-lg">
                    {item.name}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
