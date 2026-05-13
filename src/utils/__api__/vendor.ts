import { cache } from "react";
import {
  getVendorPayoutRequestsData,
  getVendorProductReviewsData,
  getVendorRefundRequestsData,
} from "lib/vendor-public-server";

const getAllProductReviews = cache(async () => {
  return getVendorProductReviewsData();
});

const getAllRefundRequests = cache(async () => {
  return getVendorRefundRequestsData();
});

const getAllPayoutRequests = cache(async () => {
  return getVendorPayoutRequestsData();
});

export default {
  getAllProductReviews,
  getAllRefundRequests,
  getAllPayoutRequests,
};
