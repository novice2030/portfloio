"use client";
import React, { useEffect, useState } from "react";
import "./page.styles.css";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { XMarkIcon } from '@heroicons/react/24/outline'
import dynamic from "next/dynamic";

interface Image {
  url: string;
  className: string;
}

interface ImageObject {
  _id: string;
  imageuri: string;
  alt: string;
}

interface PageProps {}

const Page: React.FC<PageProps> = (props) => {
  const [images, setImages] = useState<Image[]>([]);
  const [imageObjects, setImageObjects] = useState<Image[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [activeImageURL, setActiveImageURL] = useState<string>("");

  const handleOpen = () => {
    setOpen(!open);
  };

  async function getData() {
    let res = await fetch("/api/images", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let allImages = await res.json();
    const imageresp = allImages.data;
    let temp: Image[] = [];

    imageresp.forEach((image:ImageObject) => {
      temp.push({
        url: image.imageuri,
        className: "card span-2 c-2 cursor-pointer",
      });
    });

    setImageObjects(temp);
    return allImages;
  }

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const ImageCard: React.FC<{ imageUrl: string; c: string }> = ({
    imageUrl,
    c,
  }) => {
    return (
      <div
        className={c}
        onClick={() => {
          setActiveImageURL(imageUrl);
          handleOpen();
        }}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
    );
  };

  return (
    <div>
      <div className="grid w-full px-5 pb-10 min-h-[70vh] place-content-center-center">
        {imageObjects.map((imageUrl, index) => (
          <ImageCard
            key={index}
            imageUrl={imageUrl.url}
            c={imageUrl.className}
          />
        ))}
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        className="fixed top-0 bottom-0 left-0 right-0 m-auto w-[50%] h-[60%] "
      >
        <DialogHeader className="w-full h-13">
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-4 ml-auto"
          >
            <XMarkIcon strokeWidth={2} className="w-6 h-6 text-black text-lg" />
          </Button>
        </DialogHeader>
        <DialogBody className="h-full bg-white ">
          <img
            src={activeImageURL}
            className="h-full mx-auto object-contain "
          />
        </DialogBody>
      </Dialog>
    </div>
  );
};

const getStaticProps = async () => {
  const res = await fetch("/api/images");
  const data = await res.json();
  return {
    props: { data },
  };
};

export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
});

