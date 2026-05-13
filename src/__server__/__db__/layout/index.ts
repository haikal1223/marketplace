// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@ui-lib.com
import MockAdapter from "axios-mock-adapter";
import { getLayoutPayload } from "lib/get-layout-payload";

export const LayoutEndpoints = (Mock: MockAdapter) => {
  Mock.onGet("/api/layout").reply(() => {
    try {
      return [200, getLayoutPayload()];
    } catch (err) {
      console.error(err);
      return [500, { message: "Internal server error" }];
    }
  });
};
