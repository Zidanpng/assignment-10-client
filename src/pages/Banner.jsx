import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
const Banner = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full w-full"
      >
        <SwiperSlide>
          <div
            className="relative w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center px-6 md:px-20">
              <div className="max-w-2xl text-white space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight uppercase tracking-tighter">
                  Find Your New Best Friend
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-90">
                  Connecting loving homes with pets in need of adoption
                </p>
                <button className="btn bg-[#e83128] border-none text-white px-8 hover:bg-[#0a303a] transition-colors uppercase font-bold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1592468257342-8375cb556a69?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center px-6 md:px-20">
              <div className="max-w-2xl text-white space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight uppercase tracking-tighter">
                  Premium Food & Supplies
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-90">
                  Everything your pet needs to stay healthy and happy
                </p>
                <button className="btn bg-[#e83128] border-none text-white px-8 hover:bg-[#0a303a] transition-colors uppercase font-bold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1619508111539-a0c4d7afa3d5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center px-6 md:px-20">
              <div className="max-w-2xl text-white space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight uppercase tracking-tighter">
                  Expert Care <br /> Products
                </h1>
                <p className="text-lg md:text-xl font-medium opacity-90">
                  Quality healthcare and grooming for your furry companions
                </p>
                <button className="btn bg-[#e83128] border-none text-white px-8 hover:bg-[#0a303a] transition-colors uppercase font-bold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
