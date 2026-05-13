import Product from "./Product.model";
import User from "./User.model";

export default interface Shop {
  id: string;
  slug: string;
  user: User;
  email: string;
  name: string;
  phone: string;
  address: string;
  verified: boolean;
  products?: Product[];
  coverPicture: string;
  profilePicture: string;
  /** Banner strip above product grid on public shop page (from VendorSiteSetting.general) */
  productsPageBannerUrl?: string | null;
  /** Extra links shown on public shop intro (from VendorSiteSetting.general) */
  customLinks?: { label: string; url: string }[];
  socialLinks: {
    facebook?: string | null;
    youtube?: string | null;
    twitter?: string | null;
    instagram?: string | null;
  };
}
