import React from "react";
import { stepsData } from "../assets/assets";
import { motion, transform } from "motion/react";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center py-24"
    >
      <h1 className="text-4xl sm:text-5xl font-bold text-[#2B1B12] mb-4">
        How it works
      </h1>

      <p className="text-lg text-[#6B5B53] mb-14 text-center max-w-xl">
        Turn goofy orangutan thoughts into beautiful AI-generated masterpieces.
      </p>

      <div className="space-y-6 w-full max-w-4xl">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-6 sm:p-8 bg-[#FFF7F3] border border-[#F3D4C8] rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-lg"
          >
            <div className="bg-[#FFE2D6] p-4 rounded-2xl">
              <img width={32} src={item.icon} alt="" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-[#2B1B12] mb-1">
                {item.title}
              </h2>

              <p className="text-[#6B5B53] text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
