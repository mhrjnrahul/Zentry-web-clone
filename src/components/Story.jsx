import React, { useRef } from 'react';
import AnimatedTitle from './AnimatedTitle';
import { gsap } from 'gsap';
import RoundedCorners from './RoundedCorners';
import Button from './Button';

const Story = () => {
    const frameRef = useRef(null);

    const handleMouseLeave = () => {
        const element = frameRef.current;

        gsap.to(element, {
            duration: 0.3,
            rotateX: 0,
            rotateY: 0,
            ease: 'power1.inOut',
        })
    }

    const handleMouseMove = (e) => {
        const {clientX, clientY} = e;
        const element = frameRef.current;

        if(!element) return;
        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Adjust the multiplier for sensitivity
        const rotateY = ((x - centerX) / centerX) * 10; // Adjust the multiplier for sensitivity

        gsap.to(element, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 500,
            ease: 'power1.inOut',
        })
    }
    
  return (
    <section className='min-h-screen w-screen bg-black text-blue-50' id='story'>
      <div className='flex size-full flex-col items-center py-10 pb-24'>
        <p className='font-[general] text-sm uppercase md:text-[10px]'>
          the multiversal ip world
        </p>

        <div className='relative size-full'>
          <AnimatedTitle 
            title="The st<b>o</b>ry of <br /> a hidden realm."
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-white"
            textColor='text-white' 
          />

          <div className='story-img-container relative md:h-dvh h-[90vh] w-full'>
            <div className='story-img-mask absolute left-0 top-0 size-full overflow-hidden md:left-[20%] md:top-[-10%] md:size-4/5'>
                <div className='story-img-content absolute w-full md:h-dvh h-[50dvh] opacity-100 left-10 top-16 md:left-0 md:top-10 lg:left-[-300px] lg:top-[-100px]'>
                    <img 
                    ref={frameRef}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseLeave}
                    onMouseEnter={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    src='/img/entrance.webp'
                    alt='entrance'
                    className='object-contain'/>
                </div>
            </div>

            <RoundedCorners />
          </div>
        </div>

        <div className='-mt-80 flex w-full justify-center md:-mt-64 md:me-44
        md:justify-end'>
            <div className='flex h-full w-fit flex-col items-center md:items-start'>
                <p className='mt-30 max-w-sm text-center font-[circular-web]
                text-violet-50 md:text-start'>
                    Where realms converge, lies Zentry and the boundless
                    pillar. Discover its secrets and shape your fate amidst infinite
                    opportunities.
                </p>

                <Button 
                id="realm-button"
                title="discover prologue"
                containerClass="mt-5 bg-white"/>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
