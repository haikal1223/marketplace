// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import shuffle from "lodash/shuffle";
import MockAdapter from "axios-mock-adapter";
import * as db from "./data";

export const Grocery1Endpoints = (Mock: MockAdapter) => {
  const getProducts = (type: string) => {
    return db.products.filter((item) => item.for.type === type);
  };

  const categories = db.categoryNavigation.flatMap(({ categoryItem }) =>
    categoryItem.flatMap((item) => item.child ?? item)
  );

  Mock.onGet("/api/grocery-1/category").reply(({ params }) => {
    try {
      if (params?.category) {
        const category = categories.find((item) => item.href === `/grocery-1/${params.category}`);
        if (!category) return [404, undefined];
        return [200, category];
      }

      return [404, undefined];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/grocery-1/navigation").reply(() => {
    try {
      return [200, db.categoryNavigation];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/grocery-1/services").reply(async () => {
    try {
      return [200, db.serviceList];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/grocery-1/products?tag=popular").reply(async () => {
    try {
      return [200, getProducts("popular-products")];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/grocery-1/products?tag=trending").reply(async () => {
    try {
      return [200, getProducts("trending-products")];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/grocery-1/products").reply(async ({ params }) => {
    try {
      if (params.category) {
        return [200, shuffle(getProducts("all-products"))];
      }

      return [200, getProducts("all-products")];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });

  Mock.onGet("/api/grocery-1/category-based-products").reply(async () => {
    try {
      return [200, shuffle(getProducts("all-products"))];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
