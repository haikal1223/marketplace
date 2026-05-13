import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import { StyledTableRow, CategoryWrapper, StyledTableCell, StyledIconButton } from "../styles";

// ========================================================================
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  brand: string;
  brandName?: string;
  image: string;
  category: string;
  published: boolean;
}

type Props = { product: Product; editBasePath?: string };
// ========================================================================

export default function ProductRow({ product, editBasePath = "/admin/products" }: Props) {
  const router = useRouter();
  const { category, name, price, image, brand, brandName, id, published, slug } = product;

  const [productPublish, setProductPublish] = useState(published);
  const [savingPublished, setSavingPublished] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isVendor = editBasePath.includes("/vendor/products");

  const handlePublishedChange = async () => {
    if (savingPublished) return;
    const next = !productPublish;
    setProductPublish(next);
    setSavingPublished(true);
    try {
      const url = isVendor ? `/api/vendor/products/${slug}` : `/api/admin/products/${slug}`;
      const res = await fetch(url, {
        method: isVendor ? "PUT" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: next })
      });
      if (!res.ok) throw new Error("failed");
      router.refresh();
    } catch {
      setProductPublish(!next);
    } finally {
      setSavingPublished(false);
    }
  };

  const handleDelete = async () => {
    if (deleting) return;
    if (!window.confirm(`Hapus produk "${name}"?`)) return;
    setDeleting(true);
    try {
      const url = isVendor ? `/api/vendor/products/${slug}` : `/api/admin/products/${slug}`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) throw new Error("failed");
      router.refresh();
    } catch {
      window.alert("Gagal menghapus produk.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar variant="rounded">
            <Image fill src={image} alt={name} sizes="(100%, 100%)" />
          </Avatar>

          <div>
            <Typography variant="h6">{name}</Typography>

            <Typography variant="body1" sx={{ fontSize: 13, color: "grey.600" }}>
              #{id.split("-")[0]}
            </Typography>
          </div>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>{category}</CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">
        {brand ? (
          <Box sx={{ width: 55, height: 25, position: "relative", img: { objectFit: "contain" } }}>
            <Image fill src={brand} alt={brandName || name} sizes="(55px, 25px)" />
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {brandName || "—"}
          </Typography>
        )}
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPublish}
          disabled={savingPublished}
          onChange={handlePublishedChange}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <Link href={`${editBasePath}/${slug}`}>
          <StyledIconButton aria-label="Edit product">
            <Edit />
          </StyledIconButton>
        </Link>

        <Link href={`/products/${slug}`} target="_blank" rel="noopener noreferrer">
          <StyledIconButton aria-label="View product page">
            <RemoveRedEye />
          </StyledIconButton>
        </Link>

        <StyledIconButton aria-label="Delete product" disabled={deleting} onClick={handleDelete}>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
}
