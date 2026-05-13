import Link from "next/link";
import Typography from "@mui/material/Typography";
// LOCAL CUSTOM COMPONENT
import CategoryCard from "./category-card";
import CategoriesCarousel from "./categories-carousel";
// API FUNCTIONS
import api from "utils/__api__/gift-shop";

export default async function Section4() {
  const categories = await api.getTopCategories();
  if (!categories || !categories.length) return null;

  return (
    <div className="mt-2">
      <Typography variant="h2" sx={{ mb: "1rem" }}>
        Top Categories
      </Typography>

      <CategoriesCarousel>
        {categories.map((item, ind) => (
          <Link href="/" key={ind}>
            <CategoryCard title={item.name!} imgUrl={item.image!} available={item.description!} />
          </Link>
        ))}
      </CategoriesCarousel>
    </div>
  );
}
