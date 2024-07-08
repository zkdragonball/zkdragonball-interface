import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {images, descriptions} from './nftImage';
const Nft = () => {
    return (
        <>
            <div className='container mx-auto h-[410px] md:mt-40 md:20'>
                <Carousel></Carousel>
            </div>
        </>

    );
}


const Carousel = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      autoplay: true,
      centerPadding: '0px',
      autoplaySpeed: 3000
    };
  
    return (
      <div className='flex flex-col md:flex-row items-center justify-center md:w-4/5 mx-auto'>
        <div className="mx-auto md:w-3/4 md:py-10">
            <h1 className="text-center text-4xl lilita-one-regular leading-8 text-orange-500"> NFT</h1>
            <div className="mt-10 w-full flex max-w-lg flex-col gap-y-2 px-5 md:px-0 mx-auto">
                <dt className="text-xl lilita-one-regular leading-8 text-gray-700 text-center md:text-left">
                Based on artificial intelligence and blockchain technology, we have forged a unique collection of NFT artworks. Focusing on classic characters from Dragon Ball, these pieces leverage the innovative features of blockchain to offer unprecedented interactive experiences and gameplay. 
                </dt>
                <dt className='text-xl lilita-one-regular leading-8 text-gray-700 mt-5 text-center md:text-left'>
                Explore the new possibilities of NFTs and discover the limitless potential of art and technology.
                </dt>
            </div>
        </div>
        
        <div className="w-1/3 md:w-1/4 mt-10 ml-5">
          <Slider {...settings}>
            {images.map((img, index) => (
              <div key={index} className='flex items-center justify-center'>
                <img src={img} alt={`Image ${index + 1}`}  className="h-[200px] w-[160px] md:w-[260px] md:h-[300px] border-2 border-white rounded-lg shadow-md"/>
                <p className=" mt-5 text-center text-xl lilita-one-regular leading-8 text-black">{descriptions[index]}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };
  
  export default Nft;