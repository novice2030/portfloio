"use client";
import React from "react";
import { useSectionInView } from "@/lib/hooks";
import { useState } from "react";
import { config } from "react-spring";
import SectionHeading from "./section-heading";
import { useEffect } from "react";
import {
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface VideoInterface {
  _id: string;
  videouri: string;
  alt: string;
}


import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

async function getData() {
  let res = await fetch("/api/videos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let allVideos = await res.json();

  return allVideos;
}

 function Test() {
  const { ref } = useSectionInView("Paintings", 0.5);

  const [images, setImages] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setImages(data.data);
      console.log(data.data);
    });
  }, []);

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  });

  // let slides = images
  //   .map((video, index) => {
  //     return {
  //       key: video._id,
  //       content: (
  //         <iframe
  //           width="600"
  //           height="350"
  //           src={video.videouri}
  //           className=" !object-cover rounded-sm"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //           allowFullScreen
  //         ></iframe>
  //       ),
  //     };
  //   })
  //   .map((slide, index) => {
  //     return {
  //       ...slide,
  //       onClick: () => setState({ ...state, goToSlide: index }),
  //     };
  //   });

  const slidesprop = images.map((image:VideoInterface, index) => {
    return (
      <div key={index} className="w-full h-[400px] mx-auto flex items-center justify-center ">
        <iframe
          src={image.videouri}
          className="!w-[600px] !object-contain h-[400px] rounded-sm max-w-[700px] "
          width={400}
          height={400}
          key={index}
        />
      </div>
    );
  });

  return (
    <>
      <SectionHeading>Videos</SectionHeading>
      <Carousel
        // autoplay={true}
        // autoplayDelay={5000}
        // loop={true}
        // nextArrow={({ handleNext }) => (
        //   <IconButton
        //     variant="text"
        //     color="white"
        //     size="lg"
        //     onClick={handleNext}
        //     className="!absolute top-2/4 -translate-y-2/4 !right-4"
        //   >
        //     <ArrowRightIcon strokeWidth={2} className="w-6 h-6 text-black text-lg" />
        //   </IconButton>
        // )}
        // prevArrow={({ handlePrev }) => (
        //   <IconButton
        //     variant="text"
        //     color="white"
        //     size="lg"
        //     onClick={handlePrev}
        //     className="!absolute top-2/4 -translate-y-2/4 left-4 "
        //   >
        //     <ArrowLeftIcon strokeWidth={2} className="w-6 h-6 text-black text-lg" />
        //   </IconButton>
        // )}
      >
        {/* {images.map((img, idx) => (
          <Card
            key={idx}
            className="h-64 md:h-80 xl:h-84 w-full bg-gradient-to-br from-gray-500 to-gray-300 rounded-none px-6 mb-3 pb-5"
          >
            <Card className="w-full lg:w-2/3 h-4/5 my-auto mx-auto bg-white flex flex-row justify-around">
              <img
                src={img.imageuri}
                alt=""
                className="w-3/12 lg:w-5/12 h-4/5 my-auto object-contain"
              />
            </Card>
          </Card>
        ))} */}
        {slidesprop}
      </Carousel>
      <div className="flex justify-center text-xl font-bold mt-12 cursor-pointer hover:underline-offset-2 hover:underline">
        Browse all videos
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Test), {
  ssr: false,
});