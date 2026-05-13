import duotone from "icons/duotone";

export const adminNavigation = [
  { type: "label", label: "Admin" },
  {
    name: "Dashboard",
    icon: duotone.Dashboard,
    path: "/admin/dashboard"
  },
  {
    name: "Orders",
    icon: duotone.Order,
    path: "/vendor/orders"
  },
  {
    name: "Products",
    icon: duotone.Products,
    children: [
      { name: "Product List", path: "/admin/products" },
      { name: "Product Reviews", path: "/admin/products/reviews" }
    ]
  },
  {
    name: "Categories",
    icon: duotone.Accounts,
    children: [
      { name: "Category List", path: "/admin/categories" },
      { name: "Create Category", path: "/admin/categories/create" }
    ]
  },
  {
    name: "Brands",
    icon: duotone.Apps,
    children: [
      { name: "Brand List", path: "/admin/brands" },
      { name: "Create Brand", path: "/admin/brands/create" }
    ]
  },
  {
    name: "Customers",
    icon: duotone.Customers,
    path: "/admin/customers"
  },
  {
    name: "Sellers",
    icon: duotone.Seller,
    children: [
      { name: "Seller List", path: "/admin/sellers" },
      { name: "Seller Package", path: "/admin/seller-package" },
      { name: "Package Payments", path: "/admin/package-payments" },
      { name: "Earning History", path: "/admin/earning-history" },
      { name: "Payouts", path: "/admin/payouts" },
      { name: "Payout Request", path: "/admin/payout-requests" }
    ]
  },
  {
    name: "Refunds",
    icon: duotone.Refund,
    children: [
      { name: "Refund Request", path: "/admin/refund-request" },
      { name: "Refund Settings", path: "/admin/refund-setting" }
    ]
  }
];

export const vendorNavigation = [
  { type: "label", label: "Vendor" },
  {
    name: "Dashboard",
    icon: duotone.Dashboard,
    path: "/vendor/dashboard"
  },
  {
    name: "Products",
    icon: duotone.Products,
    children: [
      { name: "My Products", path: "/vendor/products" },
      { name: "Add Product", path: "/vendor/products/create" }
    ]
  },
  {
    name: "Orders",
    icon: duotone.Order,
    path: "/vendor/orders"
  },
  {
    name: "Reviews",
    icon: duotone.Review,
    path: "/vendor/reviews"
  },
  {
    name: "Earnings",
    icon: duotone.ProjectChart,
    children: [
      { name: "Earning History", path: "/vendor/earning-history" },
      { name: "Payouts", path: "/vendor/payouts" },
      { name: "Payout Request", path: "/vendor/payout-requests" },
      { name: "Payout Settings", path: "/vendor/payout-settings" }
    ]
  },
  {
    name: "Refund Request",
    icon: duotone.Refund,
    path: "/vendor/refund-request"
  },
  {
    name: "Shop Settings",
    icon: duotone.SiteSetting,
    path: "/vendor/shop-settings"
  },
  {
    name: "Support Tickets",
    icon: duotone.ElementHub,
    path: "/vendor/support-tickets"
  },
  {
    name: "Account Settings",
    icon: duotone.AccountSetting,
    path: "/vendor/account-settings"
  }
];

// Combined for backward compatibility (used by shared layout)
export const navigation = [...adminNavigation, ...vendorNavigation];
