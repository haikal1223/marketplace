import MockAdapter from "axios-mock-adapter";
import shuffle from "lodash/shuffle";
import * as db from "./data";
import shops from "../shop/data";

export const Market3Endpoints = (Mock: MockAdapter) => {
  // get all products
  Mock.onGet("/api/market-3/products").reply((config) => {
    try {
      if (config?.params?.type) {
        return [200, shuffle(db.products)];
      }
      return [200, db.products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all service
  Mock.onGet("/api/market-3/service").reply(() => {
    try {
      return [200, db.services];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all categories
  Mock.onGet("/api/market-3/categories").reply(() => {
    try {
      return [200, db.categories];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all carousel data
  Mock.onGet("/api/market-3/main-carousel").reply(async () => {
    try {
      return [200, db.mainCarouselData];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // electronics category products
  Mock.onGet("/api/market-3/category-based-product?tag=electronics").reply(async () => {
    try {
      return [200, { category: db.singleCategory, products: db.products }];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // men's fashion category products
  Mock.onGet("/api/market-3/category-based-product?tag=men").reply(async () => {
    try {
      const data = {
        products: db.products.slice(2),
        category: {
          title: "Men's Fashion",
          children: db.singleCategory.children
        }
      };

      return [200, data];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // women's fashion category products
  Mock.onGet("/api/market-3/category-based-product?tag=women").reply(async () => {
    try {
      const data = {
        products: db.products.slice(3),
        category: {
          title: "Women's Fashion",
          children: db.singleCategory.children
        }
      };

      return [200, data];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all brands
  Mock.onGet("/api/market-3/brand").reply(async () => {
    try {
      return [200, db.brands];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get featured shops
  Mock.onGet("/api/market-3/shops").reply(async () => {
    try {
      return [200, shops.slice(0, 6)];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
