import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import ReviewForm from "./review-form";
// CUSTOM UTILS LIBRARY FUNCTION
import { getDateDifference } from "lib";
// STYLED COMPONENTS
import { ReviewRoot } from "./styles";
// API FUNCTIONS
import api from "utils/__api__/products";

export default async function ProductReviews() {
  const reviews = await api.getProductReviews();

  return (
    <div>
      {/* REVIEW LIST */}
      {reviews.map(({ comment, date, imgUrl, name, rating }, ind) => (
        <ReviewRoot key={ind}>
          <div className="user-info">
            <Avatar variant="rounded" className="user-avatar">
              <Image src={imgUrl} alt={name} fill sizes="(48px 48px)" />
            </Avatar>

            <div>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {name}
              </Typography>

              <div className="user-rating">
                <Rating size="small" value={rating} color="warn" readOnly />
                <Typography variant="h6">{rating}</Typography>
                <Typography component="span">{getDateDifference(date)}</Typography>
              </div>
            </div>
          </div>

          <Typography variant="body1" sx={{ color: "grey.700" }}>
            {comment}
          </Typography>
        </ReviewRoot>
      ))}

      {/* REVIEW FORM */}
      <Typography variant="h3" sx={{ mt: 7, mb: 2.5 }}>
        Write a Review for this product
      </Typography>

      <ReviewForm />
    </div>
  );
}
