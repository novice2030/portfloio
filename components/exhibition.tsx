"use client";
import React from "react";
import { useSectionInView } from "@/lib/hooks";
import { useState } from "react";
import { motion } from "framer-motion";
import { config } from "react-spring";
import SectionHeading from "./section-heading";
import { useEffect } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import { motion } from "framer-motion";

interface ImageObject {
  _id: string;
  imageuri: string;
  alt: string;
}

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

function Test() {
  const { ref } = useSectionInView("Exhibitions", 0.5);

  const [images, setImages] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setImages(data.data);
    });
  }, []);

  return (
    <motion.section
      id="paintings"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Exhibitions</SectionHeading>

      <Carousel autoPlay infiniteLoop interval={3000}>
        {images.map((image: ImageObject, index) => {
          return (
            <div
              key={index}
              className="w-full h-[400px] mx-auto flex items-center justify-center"
            >
              <Image
                src={image.imageuri}
                alt={image.alt}
                className="!w-[600px] !object-contain h-[400px] rounded-sm max-w-[700px]"
                width={400}
                height={400}
                key={index}
              />
            </div>
          );
        })}
      </Carousel>

      <div className="flex justify-center text-xl font-bold mt-5 cursor-pointer hover:underline-offset-2 hover:underline">
        <Link href="/collections/paintings">Browse all exhibition</Link>
      </div>
    </motion.section>
  );
}

export default Test;
