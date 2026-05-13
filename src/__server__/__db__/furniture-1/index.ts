import MockAdapter from "axios-mock-adapter";
import * as db from "./data";

const categories = db.categoryNavigation.flatMap(({ categoryItem }) =>
  categoryItem.flatMap((item) => item.child ?? item)
);

export const Furniture1Endpoints = (Mock: MockAdapter) => {
  Mock.onGet("/api/furniture-1/category").reply(({ params }) => {
    try {
      if (params?.category) {
        const category = categories.find((item) => item.href === `/furniture-1/${params.category}`);
        if (!category) return [404, undefined];
        return [200, category];
      }

      return [404, undefined];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get sidebar navigation
  Mock.onGet("/api/furniture-1/navigation").reply(() => {
    try {
      return [200, db.categoryNavigation];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get the main carousel
  Mock.onGet("/api/furniture-1/main-carousel").reply(() => {
    try {
      return [200, db.mainCarouselData];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get new products
  const newProducts = db.products.filter((item) => item.for.type === "top-new-product");

  Mock.onGet("/api/furniture-1/products?tag=new").reply(() => {
    try {
      return [200, newProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get top selling products
  const sellingProducts = db.products.filter((item) => item.for.type === "top-selling-product");

  Mock.onGet("/api/furniture-1/products?tag=top-selling").reply(() => {
    try {
      return [200, sellingProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  // get all products
  const allProducts = db.products.filter((item) => item.for.type === "all-product");

  Mock.onGet("/api/furniture-1/all-products").reply(() => {
    try {
      return [200, allProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
