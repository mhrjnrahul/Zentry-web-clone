import React, { useRef, useState } from 'react';

function Hero() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prevLoadedVideos) => prevLoadedVideos + 1);
        // if (loadedVideos === totalVideos) {
        //     setIsLoading(false);
        // }
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () =>{
        setHasClicked(true);

        setCurrentIndex(upcomingVideoIndex);
    }

    const getVideoSrc = (index) => {
        return `/videos/hero-${index}.mp4`;
    }

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            <div id='vide-frame' className='relative z-10 h-dvh w-screen
            overflow-hidden rounded-lg bg-blue-75'>
                <div className='mask-clip path absolute-center z-50 size-64
                cursor-pointer overflow-hidden rounded-lg absolute'>
                    <div onClick={handleMiniVdClick} 
                        className='origin-center opacity-0 scale-50
                        transition-all duration-500 ease-in hover:scale-100
                        hover:opacity-100'>
                            <video ref = {nextVideoRef}
                                src = {getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id='current-video'
                                className='size-64 origin-center scale-150
                                object-cover object-center'
                                onLoadedData = {handleVideoLoad}
                                >
                            </video>
                        </div>
                </div>

                <video ref={nextVideoRef}
                       src={getVideoSrc(currentIndex)}
                       loop
                       muted
                       id='next-video'
                       className='absolute-center invisible absolute z-20
                       size-64 object-cover object-center'
                       onLoadedData={handleVideoLoad} >
                </video>

                <video 
                    src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                    autoPlay
                    loop
                    muted
                    className='absolute left-0 top-0 size-full object-cover object-center
                    onLoadedData={handleVideoLoad} '>
                </video>
            </div>

            <h1 className='special-font font-[zentry] uppercase text-white text-5xl 
            sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem] absolute bottom-5 right-5 z-40 text-blue-75'>
                G<b>a</b>ming
            </h1>

            <div className='absolute left-0 top-0 z-40 size-full'>
                <div className='mt-24 px-5 sm:px-10'>
                    <h1 className='special-font font-[zentry] uppercase text-white text-5xl 
                        sm:right-10 sm:text-7xl md:text-9xl lg:text-[12rem] absolute'>redefi<b>n</b>e</h1>

                    <p className='mb-5 max-w-64 font-[robert-regular] text-white text-lg sm:text-xl'>
                        Enter the Metagame Layer <br /> Unleash the Play Economy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero