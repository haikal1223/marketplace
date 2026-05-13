// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import MockAdapter from "axios-mock-adapter";
import * as db from "./data";
import shops from "../shop/data";

const flashDeals = db.products.filter((item) => item.for.type === "flash-deals");
const justForYou = db.products.filter((item) => item.for.type === "just-for-you");
const newArrivals = [...flashDeals.slice(2, 5), ...justForYou.slice(2, 5)];
const allProducts = db.products.filter((item) => item.for.type === "all-products");

const shopImages = ["herman miller", "otobi", "hatil", "steelcase"];
const shopList = shops.slice(4, 8).map((item, i) => ({ ...item, thumbnail: shopImages[i] }));

export const Market1Endpoints = (Mock: MockAdapter) => {
  Mock.onGet("/api/market-1/main-carousel").reply(async () => {
    try {
      return [200, db.mainCarouselData];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/flash-deals").reply(async () => {
    try {
      return [200, flashDeals];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/categories").reply(async () => {
    try {
      return [200, db.categories];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/just-for-you").reply(async () => {
    try {
      const products = [...justForYou, ...flashDeals.slice(0, 3)];
      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/new-arrivals").reply(async () => {
    try {
      return [200, newArrivals];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/shops").reply(async () => {
    try {
      return [200, shopList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/products").reply(async () => {
    try {
      return [200, allProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/services").reply(async () => {
    try {
      return [200, db.services];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/market-1/blogs").reply(async () => {
    try {
      return [200, db.articles];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
