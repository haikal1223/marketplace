// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import shuffle from "lodash/shuffle";
import MockAdapter from "axios-mock-adapter";
import * as db from "./data";
export const Health1Endpoints = (Mock: MockAdapter) => {
  const products = db.products.filter((item) => item.for.type === "all-products");
  const topProducts = db.products.filter((item) => item.for.type === "top-new-products");

  const categories = db.categoryNavigation.flatMap((item) => item.child ?? item);

  Mock.onGet("/api/health-beauty/category").reply(({ params }) => {
    try {
      if (params.category) {
        const category = categories.find(
          (item) => item.href === `/health-beauty/${params.category}`
        );
        if (!category) return [404, undefined];
        return [200, category];
      }

      return [404, undefined];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/health-beauty/products?tag=new").reply(async () => {
    try {
      return [200, topProducts];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/health-beauty/products").reply(async ({ params }) => {
    try {
      if (params.category) {
        return [200, shuffle(products)];
      }

      return [200, products];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/health-beauty/services").reply(() => {
    try {
      return [200, db.serviceList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/health-beauty/navigation").reply(() => {
    try {
      return [200, db.categoryNavigation];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/health-beauty/main-carousel").reply(() => {
    try {
      return [200, db.mainCarouselData];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
