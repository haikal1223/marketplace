// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import MockAdapter from "axios-mock-adapter";
import shops from "./data";
import products from "data/product-database";

export const ShopEndpoints = (Mock: MockAdapter) => {
  const getProducts = (slug: string) => products.filter((item) => item.shop?.slug === slug);

  Mock.onGet("/api/shops").reply(async () => {
    try {
      return [200, shops];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/shops/single").reply(async (config) => {
    try {
      if (config.params?.slug) {
        const shop = shops.find((item) => item.slug === config.params.slug);
        if (shop) {
          shop.products = getProducts(config.params.slug).slice(0, 9);
          return [200, shop];
        }
      }

      const shop = shops[0];
      shop.products = getProducts(shops[0].slug).slice(0, 9);
      return [200, shop];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/shops/slugs").reply(async () => {
    try {
      const slugs = shops.map((item) => ({ params: { slug: item.slug } }));
      return [200, slugs];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
