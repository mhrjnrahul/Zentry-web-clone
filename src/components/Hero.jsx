import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 3;
  const previewVideoRef = useRef(null);
  const nextVideoRef = useRef(null);
  const mainVideoRef = useRef(null);

  useGSAP(() => {
    if(hasClicked) {
      gsap.set('#next-video', {visibility: 'visible'});

      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVideoRef.current.play()
      })

      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
        onStart: () => nextVideoRef.current.play(),
      });
    }
  }, {dependencies: [currentIndex], revertOnUpdate: true});

  const handleVideoLoad = () => {
    setLoadedVideos((prevLoadedVideos) => {
      const newCount = prevLoadedVideos + 1;
      if (newCount >= totalVideos) {
        setIsLoading(false);
      }
      return newCount;
    });
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const getVideoSrc = (index) => {
    return `/videos/hero-${index}.mp4`;
  };

  // Make sure videos play properly
  useEffect(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current
        .play()
        .catch((err) => console.error("Video play error:", err));
    }
  }, [currentIndex]);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Center preview video */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-64 h-64
                cursor-pointer overflow-hidden rounded-lg"
        >
          <div
            onClick={handleMiniVdClick}
            className="origin-center opacity-0 scale-50
                      transition-all duration-500 ease-in hover:scale-100
                      hover:opacity-100"
          >
            <video
              ref={previewVideoRef}
              src={getVideoSrc(upcomingVideoIndex)}
              loop
              muted
              id="current-video"
              className="w-64 h-64 origin-center scale-150 object-cover object-center"
              onLoadedData={handleVideoLoad}
            ></video>
          </div>
        </div>

        {/* Hidden next video for preloading */}
        <video
          ref={nextVideoRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          id="next-video"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible z-20
                    w-64 h-64 object-cover object-center"
          onLoadedData={handleVideoLoad}
        ></video>

        {/* Main background video */}
        <video
          ref={mainVideoRef}
          src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 w-full h-full object-cover object-center"
          onLoadedData={handleVideoLoad}
        ></video>

        {/* Gaming text */}
        <h1
          className="special-font font-[zentry] uppercase text-white text-5xl
            sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem] absolute bottom-5 right-5 z-40 text-blue-75"
        >
          G<b>a</b>ming
        </h1>

        {/* Top section with heading and button */}
        <div className="absolute left-0 top-0 z-40 w-full h-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1
              className="special-font font-[zentry] uppercase text-white text-5xl
            sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem]"
            >
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-[robert-regular] text-white text-lg sm:text-xl">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex items-center justify-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1
          className="special-font font-[zentry] uppercase text-white text-5xl
            sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem] absolute bottom-5 right-5 text-black"
        >
          G<b>a</b>ming
        </h1>
    </div>
  );
}

export default Hero;
