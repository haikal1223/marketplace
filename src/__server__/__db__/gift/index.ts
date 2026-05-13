// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import MockAdapter from "axios-mock-adapter";
import shuffle from "lodash/shuffle";
import * as db from "./data";

export const GiftEndpoints = (Mock: MockAdapter) => {
  const categories = db.categoryNavigation.flatMap(({ categoryItem }) =>
    categoryItem.flatMap((item) => item.child ?? item)
  );

  Mock.onGet("/api/gift-shop/category").reply(({ params }) => {
    try {
      if (params?.category) {
        const category = categories.find((item) => item.href === `/gift-shop/${params.category}`);
        if (!category) return [404, undefined];
        return [200, category];
      }

      return [404, undefined];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/gift-shop/main-carousel").reply(() => {
    try {
      return [200, db.mainCarouselData];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/gift-shop/service-list").reply(() => {
    try {
      return [200, db.serviceList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/gift-shop/top-categories").reply(() => {
    try {
      return [200, db.categories];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/gift-shop-navigation").reply(() => {
    try {
      return [200, db.categoryNavigation];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  const getProducts = (type: string) => db.products.filter((item) => item.for.type === type);
  const allProducts = getProducts("all-products");
  const popularProducts = getProducts("popular-items");
  const topSailedProducts = getProducts("top-saled-items");

  Mock.onGet("/api/gift-shop/products?tag=popular").reply(() => {
    try {
      return [200, popularProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/gift-shop/products?tag=top-sailed").reply(() => {
    try {
      return [200, topSailedProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/gift-shop/products").reply(({ params }) => {
    try {
      if (params.category) return [200, shuffle(allProducts)];

      return [200, allProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
