// components/Carousel.js
import "@/app/departement/Departement.scss";

const BrandDepartement = () => {
  const photos = [
    "/image/AFEC/brand1.jpg",
    "/image/AFEC/brand2.jpg",

    "/image/AFEC/brand3.jpg",
    "/image/AFEC/brand4.jpg",

    "/image/AFEC/brand5.jpg",
  ];
  return (
    <div id="photoCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          {photos.map((photo, index) => (
            <div className="carousel-photo" key={index}>
              <img src={photo} className="d-block" alt={`photo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandDepartement;
