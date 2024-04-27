import React from 'react';
import Image from 'next/image';
import heroImage from '../assets/hero_image.png';

export default function Hero() {
  return (
    <section className="hero-image bg-blue-500 text-white p-8 shadow-md mb-5 relative">
      <div className="absolute inset-0 z-0">
        <Image
          className='opacity-80'
          src={heroImage}
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Revolutionize Your Teaching with PDF AI
        </h1>
        <p className="text-lg mb-8 text-center">
          Unlock the power of AI to enhance your educational experience.
        </p>
      </div>
    </section>
  );
}