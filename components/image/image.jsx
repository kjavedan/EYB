import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Import the effect styles

export default function Image({ src, alt }) {
  return (
    <div className="image-wrapper">
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        wrapperClassName="image-content-wrapper"
        className="image-content"
      />
    </div>
  );
}
