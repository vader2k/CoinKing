import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/bundle';

const Hero = () => {

  return (
    <div className="w-full md:h-[80vh] h-[60vh] z-10">
        <Swiper
          // install Swiper modules
          modules={[Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          effect={"fade"}
          autoplay={{
            delay: 5000, // Increase this value to slow down autoplay (e.g., 5 seconds here)
            disableOnInteraction: false,
          }}
        
          parallax
        >
          <SwiperSlide>
            <div className="bg-bg-img-1 bg-cover bg-center bg-no-repeat w-full md:h-[80vh] h-[60vh] relative">
              <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full ">
                <div className="max-w-[1400px] w-full mx-auto px-6">
                  <h1 className="md:text-[2.5rem] text-[1.5rem] font-bold capitalize text-white w-full max-w-[600px]">
                    Stay Ahead with latest crypto news
                  </h1>
                  <div className="text-[1rem] md:text-[1.2rem] py-4 max-w-[600px] text-white">
                    Explore the Ever-Evolving Landscape of Cryptocurrencies, Unveiling the Hottest Trends, Discovering the Latest Additions to the Market, and Navigating the Top 100 Rankings.
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-bg-img-2 bg-cover bg-no-repeat w-full md:h-[80vh] h-[60vh] relative">
              <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full ">
                <div className="max-w-[1400px] w-full mx-auto px-6">
                  <h1 className="md:text-[2.5rem] text-[1.5rem] font-bold capitalize text-white w-full max-w-[600px]">
                    Unlock the Power of Cryptocurrencies
                  </h1>
                  <div className="text-[1rem] md:text-[1.2rem] py-4 text-white max-w-[600px]">
                    Immerse Yourself in a World of Possibilities as You Dive into Detailed Insights, Comprehensive Charts, and Real-Time Updates. Empower Your Financial Journey with Timely Information and Strategic Analysis.
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
  )
}

export default Hero