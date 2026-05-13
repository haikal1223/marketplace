import { Fragment } from "react";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { NavLink } from "components/nav-link";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { currency } from "lib";
// STYLED COMPONENT
import { Wrapper } from "./styles";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// ===========================================
interface Props {
  title: string;
  products: Product[];
}
// ===========================================

export default function ListBlock({ title, products }: Props) {
  return (
    <Fragment>
      <Typography variant="h3" sx={{ mb: "1.5rem" }}>
        {title}
      </Typography>

      {products.map((product) => (
        <Wrapper key={product.id}>
          <Link href={`/products/${product.slug}`}>
            <div className="img-wrapper">
              <LazyImage width={100} height={100} alt="product" src={product.thumbnail} />
            </div>
          </Link>

          <div>
            <NavLink href="/">
              <Typography variant="body1" noWrap className="title">
                {product.title}
              </Typography>
            </NavLink>

            <p className="price">{currency(product.price)}</p>
            <Rating readOnly value={4} sx={{ fontSize: 14 }} />
          </div>
        </Wrapper>
      ))}
    </Fragment>
  );
}
