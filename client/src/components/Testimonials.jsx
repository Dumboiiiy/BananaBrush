import React from "react";
import { assets, testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#2B1B12] mb-3 text-center">
        Customer Testimonials
      </h1>

      <p className="text-[#6B5B53] text-lg mb-14 text-center">
        What Our Users Are Saying
      </p>

      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#FFF7F3] p-12 rounded-3xl shadow-md border border-[#F3D4C8] w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <img src={testimonial.image} className="rounded-full w-14" />
              <h2 className="text-xl font-semibold mt-3 text-[#2B1B12]">
                {testimonial.name}
              </h2>
              <p className="text-[#6B5B53] mb-4">{testimonial.role}</p>
              <div className="flex mb-4">
                {Array(testimonial.stars)
                  .fill()
                  .map((item, index) => (
                    <img key={index} src={assets.rating_star} />
                  ))}
              </div>
              <p className="text-center text-sm text-[#6B5B53] leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
