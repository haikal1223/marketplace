import navbarNavigation from "data/navbarNavigation";
import { categoryMenus } from "data/navigations";
import * as db from "__server__/__db__/layout/data";
import type LayoutModel from "models/Layout.model";

/** Same JSON as GET /api/layout — use from RSC so `next build` does not need a running HTTP server. */
export function getLayoutPayload(): LayoutModel {
  return {
    footer: {
      appStoreUrl: "#",
      playStoreUrl: "#",
      logo: "/assets/images/logo.svg",
      contact: db.footerContact,
      about: db.footerAboutLinks,
      socials: db.footerSocialLinks,
      description: db.footerDescription,
      customers: db.footerCustomerCareLinks
    },
    mobileNavigation: {
      version1: db.mobileNavigation,
      version2: db.mobileNavigationTwo,
      logo: "/assets/images/bazaar-black-sm.svg"
    },
    topbar: {
      label: "HOT",
      title: "Free Express Shipping",
      socials: db.topbarSocialLinks,
      languageOptions: db.languageOptions
    },
    header: {
      categories: db.categories,
      categoryMenus: categoryMenus,
      navigation: navbarNavigation,
      logo: "/assets/images/logo2.svg"
    }
  };
}
