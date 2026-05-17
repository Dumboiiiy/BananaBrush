import React from "react";
import { assets } from "../assets/assets";

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center my-28 px-6 md:px-20 lg:px-32">
      
      <h1 className="text-4xl sm:text-5xl font-bold text-[#2B1B12] mb-3 text-center">
        Create AI Images
      </h1>

      <p className="text-[#6B5B53] text-lg mb-14 text-center">
        Turn wild orangutan ideas into stunning visuals
      </p>

      <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        
        <img
          src={assets.sample_img_1}
          className="w-full max-w-sm xl:max-w-md rounded-3xl shadow-xl border border-[#F3D4C8]"
          alt=""
        />

        <div className="max-w-2xl">
          
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#2B1B12] leading-tight mb-6">
            Meet Your Mischievous AI Art Orangutan
          </h2>

          <p className="text-[#6B5B53] text-lg leading-relaxed mb-5">
            Toss in a crazy idea, a goofy thought, or even a dream you had at
            3 AM — our orangutan-powered AI will swing it into a beautiful
            image within seconds.
          </p>

          <p className="text-[#6B5B53] text-lg leading-relaxed">
            From magical jungles and chaotic monkey business to cinematic
            portraits and fantasy worlds, just type what’s in your head and let
            the orangutan do the heavy vine-swinging.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Description;