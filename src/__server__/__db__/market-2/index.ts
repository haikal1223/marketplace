import MockAdapter from "axios-mock-adapter";
import * as db from "./data";
import shops from "../shop/data";

const flashProducts = db.products.filter((product) => product.for.type === "flash-deals");
const topRatedProducts = db.products.filter((product) => product.for.type === "top-rated");

const allProducts = [...flashProducts.slice(0, 4), ...topRatedProducts.slice(3, 6)];

const shopImages = ["herman miller", "otobi", "hatil", "steelcase"];
const shopList = shops.slice(4, 8).map((item, i) => ({ ...item, thumbnail: shopImages[i] }));

export const Market2Endpoints = (Mock: MockAdapter) => {
  // get all service
  Mock.onGet("/api/market-2/service").reply(() => {
    try {
      return [200, db.serviceList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all categories
  Mock.onGet("/api/market-2/categories").reply(() => {
    try {
      return [200, db.categories];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all carousel data
  Mock.onGet("/api/market-2/main-carousel").reply(async () => {
    try {
      return [200, db.mainCarouselData];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // flash deals products
  Mock.onGet("/api/market-2/flash-deals").reply(async () => {
    try {
      return [200, flashProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // top rated products
  Mock.onGet("/api/market-2/top-rated").reply(async () => {
    try {
      return [200, topRatedProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // all products
  Mock.onGet("/api/market-2/products").reply(async () => {
    try {
      return [200, allProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all shops
  Mock.onGet("/api/market-2/shops").reply(async () => {
    try {
      return [200, shopList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all brands
  Mock.onGet("/api/market-2/brand").reply(async () => {
    try {
      return [200, db.brands];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all articles
  Mock.onGet("/api/market-2/articles").reply(async () => {
    try {
      return [200, db.articles];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all clients
  Mock.onGet("/api/market-2/clients").reply(async () => {
    try {
      return [200, db.clients];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
