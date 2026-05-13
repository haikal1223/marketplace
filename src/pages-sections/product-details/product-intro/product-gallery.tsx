"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
// STYLED COMPONENTS
import { PreviewImage, ProductImageWrapper } from "./styles";

export default function ProductGallery({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <Fragment>
      <ProductImageWrapper>
        <Image fill alt="product" src={images[currentImage]} sizes="(400px 400px)" />
      </ProductImageWrapper>

      <div className="preview-images">
        {images.map((url, ind) => (
          <PreviewImage
            key={ind}
            onClick={() => setCurrentImage(ind)}
            selected={currentImage === ind}>
            <Image fill alt="product" src={url} sizes="(48px 48px)" />
          </PreviewImage>
        ))}
      </div>
    </Fragment>
  );
}
