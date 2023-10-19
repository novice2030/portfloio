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
import { vidData } from "@/lib/data";
// @ts-ignore
import getYouTubeThumbnail from "youtube-thumbnail";
// import { motion } from "framer-motion";

interface VideoObject {
  _id: string;
  videouri: string;
  alt: string;
}

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
  const { ref } = useSectionInView("Videos", 0.5);

  const [videos, setVideos] = useState<VideoObject[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setVideos(data.data);
      console.log(vidData);
    });
  }, []);

  const extractVideoId = (videoLink:string) => {
    const url = new URL(videoLink);
    return url.searchParams.get("v");
  };

  const videoThumbnails = videos.map((videoLink:VideoObject, index) => {
    const videoId = extractVideoId(videoLink.videouri);
    const thumbnail = getYouTubeThumbnail(videoId);
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const alt = "video thumbnail";

    return (
      <div
        key={index}
        className="w-full h-[400px] mx-auto flex items-center justify-center"
      >
        <Link href={videoUrl}>
          <Image
            src={thumbnail.medium.url}
            alt={alt}
            className="!w-[600px] !object-contain h-[400px] rounded-sm max-w-[700px]"
            width={400}
            height={400}
            key={index}
          />
        </Link>
      </div>
    );
  });

  return (
    <motion.section
      id="videos"
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
      <SectionHeading>Videos</SectionHeading>

      {
        <Carousel autoPlay infiniteLoop interval={3000}>
          {videoThumbnails}
        </Carousel>
      }

      <div className="flex justify-center text-xl font-bold mt-5 cursor-pointer hover:underline-offset-2 hover:underline">
        <Link href="https://youtube.com/@nityasoni108?si=5GxG4Q0l38_2yO6D">
          Browse all videos
        </Link>
      </div>
    </motion.section>
  );
}

export default Test;
