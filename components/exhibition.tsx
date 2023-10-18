// "use client";

// import React from "react";
// import SectionHeading from "./section-heading";
// import { projectsData } from "@/lib/data";
// import { useSectionInView } from "@/lib/hooks";
// import dynamic from "next/dynamic";
// import { useState } from "react";
// import { config } from "react-spring";
// import { useEffect } from "react";
// import Image from "next/image";
// import Slider3d from "./Slider3d";

// const Carousel2 = dynamic(() => import("react-spring-3d-carousel"), {
//   ssr: false,
// });

// type ProjectProps = (typeof projectsData)[number];

// async function getData() {
//   let res = await fetch("/api/images", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let allImages = await res.json();
//   console.log("Fetched");
//   console.log("Yipee", allImages);

//   return allImages;
// }

// export default function Projects() {
//   const { ref } = useSectionInView("Paintings", 0.5);

//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     getData().then((data) => {
//       setImages(data.data);
//     });
//   }, []);

//   const [state, setState] = useState({
//     goToSlide: 0,
//     offsetRadius: 2,
//     showNavigation: true,
//     config: config.gentle,
//   });

//   // useEffect(() => {
//   //   const intervalId = setInterval(autoMoveToNextSlide, 10000);
//   //   return () => clearInterval(intervalId);
//   // }, [state.goToSlide]);

//   // const autoMoveToNextSlide = () => {
//   //   const nextSlideIndex = (state.goToSlide + 1) % slides.length;
//   //   setState({ goToSlide: nextSlideIndex });
//   // };

//   let slides = images
//     .map((image, index) => {
//       console.log("Image at index", index, image);
//       return {
//         key: image._id,
//         content: (
//           <Image
//             src={image.imageuri}
//             alt={image.alt}
//             className="w-[900px] !object-cover h-[400px] rounded-sm"
//             width={900}
//             height={400}
//           />
//         ),
//       };
//     })
//     .map((slide, index) => {
//       return { ...slide, onClick: () => setState({ goToSlide: index }) };
//     });

//   let xDown = null;
//   let yDown = null;

//   const getTouches = (evt) => {
//     return evt.touches || evt.originalEvent.touches;
//   };

//   const handleTouchStart = (evt) => {
//     const firstTouch = getTouches(evt)[0];
//     xDown = firstTouch.clientX;
//     yDown = firstTouch.clientY;
//   };

//   const slidesprop = images.map((image, index) => {
//     return (
//       <Image
//         src={image.imageuri}
//         alt={image.alt}
//         className="!w-[400px] !object-cover h-[200px] rounded-sm max-w-[700px]"
//         width={400}
//         height={400}
//         key={index}
//       />
//     );
//   });

//   const handleTouchMove = (evt) => {
//     if (!xDown || !yDown) {
//       return;
//     }

//     let xUp = evt.touches[0].clientX;
//     let yUp = evt.touches[0].clientY;

//     let xDiff = xDown - xUp;
//     let yDiff = yDown - yUp;

//     if (Math.abs(xDiff) > Math.abs(yDiff)) {
//       if (xDiff > 0) {
//         setState({ goToSlide: state.goToSlide + 1 });
//       } else {
//         setState({ goToSlide: state.goToSlide - 1 });
//       }
//     }
//     xDown = null;
//     yDown = null;
//   };

//   return (
//     <section
//       ref={ref}
//       id="projects"
//       className="scroll-mt-28 mb-28 h-[50vh] w-full"
//     >
//       <SectionHeading>Paintings</SectionHeading>

//       {/* <div
//         style={{ margin: "0 auto" }}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         className="w-full h-full"
//       >
//         <Carousel2
//           slides={slides}
//           goToSlide={state.goToSlide}
//           goToSlideDelay={1000}
//           offsetRadius={state.offsetRadius}
//           showNavigation={false}
//           animationConfig={state.config}
//         />
//       </div> */}

//       <Slider3d slides={slidesprop} classNameaddnl="mt-16" />

//       <div className="flex justify-center text-xl font-bold mt-12 cursor-pointer hover:underline-offset-2 hover:underline">
//         Browse all works
//       </div>
//     </section>
//   );
// }

"use client";
import React from "react";
import { useSectionInView } from "@/lib/hooks";
import { useState } from "react";
import { config } from "react-spring";
import SectionHeading from "./section-heading";
import { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Carousel,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

async function getData() {
  let res = await fetch("/api/images", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let allImages = await res.json();

  return allImages;
}



interface ImageObject {
  _id: string;
  imageuri: string;
  alt: string;
}



function Test() {
  const { ref } = useSectionInView("Exhibitions", 0.5);

  const [images, setImages] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setImages(data.data);
      // console.log(data.data);
    });
  }, []);

  const [state, setState] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  });

  // let slides = images
  //   .map((image, index) => {
  //     console.log("Image at index", index, image);
  //     return {
  //       key: image._id,
  //       content: (
  //         <Image
  //           src={image.imageuri}
  //           alt={image.alt}
  //           className="w-[900px] !object-cover h-[400px] rounded-sm"
  //           width={900}
  //           height={400}
  //         />
  //       ),
  //     };
  //   })
  //   .map((slide, index) => {
  //     return { ...slide, onClick: () => setState({ goToSlide: index }) };
  //   });

  const slidesprop = images.map((image: ImageObject, index) => {
    return (
      <div key={index} className="w-full h-[400px] mx-auto flex items-center justify-center">
        <Image
          src={image.imageuri}
          alt={image.alt}
          className="!w-[500px] !object-contain h-[400px] rounded-sm max-w-[700px]"
          width={400}
          height={400}
          key={index}
        />
      </div>
    );
  });

  return (
    <>
      <SectionHeading>Exhibition</SectionHeading>
      <Carousel
        autoplay={true}
        autoplayDelay={5000}
        loop={true}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 -translate-y-2/4 !right-4"
          >
            <ArrowRightIcon
              strokeWidth={2}
              className="w-6 h-6 text-black text-lg"
            />
          </IconButton>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 -translate-y-2/4 left-4 "
          >
            <ArrowLeftIcon
              strokeWidth={2}
              className="w-6 h-6 text-black text-lg"
            />
          </IconButton>
        )}
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
        <Link href="/collections/exhibition"> Browse all exhibition</Link>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Test), {
  ssr: false,
});