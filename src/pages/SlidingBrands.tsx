import React from "react";
import "../styles/slidingbrands.css";

// Import local brand images
import scaleLogo from "../images/scale.png";
import uberLogo from "../images/uber.png";
import wfLogo from "../images/wf.png";
import mercorLogo from "../images/mercor.png";
import jetLogo from "../images/jet.png";
import downloadLogo from "../images/download.jpeg";

interface SlidingBrandsProps {
  small?: string;
  title?: string;
}

const SlidingBrands: React.FC<SlidingBrandsProps> = ({ small, title }) => {
  const brands = [
    { src: scaleLogo, alt: "Scale" },
    { src: uberLogo, alt: "Uber" },
    { src: wfLogo, alt: "Wells Fargo" },
    { src: mercorLogo, alt: "Mercor" },
    { src: jetLogo, alt: "Jet" },
    { src: downloadLogo, alt: "Company" },
  ];

  // Duplicate the brands array to create seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="slidingbrands">
      <div className="slidingbrands-container">
        {(small || title) && (
          <h2>
            {small}
            <span>{title}</span>
          </h2>
        )}
        <div className="brands-container">
          <div className="brands-track">
            {duplicatedBrands.map((brand, i) => (
              <div key={i} className="brand-slide">
                <img src={brand.src} alt={brand.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlidingBrands;