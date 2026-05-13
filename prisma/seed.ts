/**
 * Prisma Seed Script
 *
 * Populates the database with initial data derived from the existing mock data.
 * Run with: npx prisma db seed
 *
 * Requirements: DATABASE_URL must be set in .env and the database must be migrated.
 * Command: npx prisma migrate dev --name init && npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ============================================================
  // USERS
  // ============================================================
  const passwordHash = await bcryptjs.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bazaar.com" },
    update: {},
    create: {
      email: "admin@bazaar.com",
      firstName: "Admin",
      lastName: "Bazaar",
      phone: "+1 123 456 7890",
      password: passwordHash,
      verified: true,
      role: "ADMIN"
    }
  });

  const vendor1 = await prisma.user.upsert({
    where: { email: "vendor1@bazaar.com" },
    update: {},
    create: {
      email: "vendor1@bazaar.com",
      firstName: "Hope",
      lastName: "Ullrich",
      phone: "(613) 343-9004",
      password: passwordHash,
      verified: true,
      role: "VENDOR"
    }
  });

  const vendor2 = await prisma.user.upsert({
    where: { email: "vendor2@bazaar.com" },
    update: {},
    create: {
      email: "vendor2@bazaar.com",
      firstName: "Jane",
      lastName: "Smith",
      phone: "(415) 555-0123",
      password: passwordHash,
      verified: true,
      role: "VENDOR"
    }
  });

  const customer1 = await prisma.user.upsert({
    where: { email: "customer@bazaar.com" },
    update: {},
    create: {
      email: "customer@bazaar.com",
      firstName: "Nick",
      lastName: "DuBuque",
      phone: "(445) 653-3771",
      avatar: "/assets/images/faces/10.jpg",
      password: passwordHash,
      verified: true,
      role: "CUSTOMER"
    }
  });

  console.log("Users seeded.");

  // ============================================================
  // SHOPS
  // ============================================================
  const shop1 = await prisma.shop.upsert({
    where: { slug: "scarlett-beauty" },
    update: {},
    create: {
      slug: "scarlett-beauty",
      userId: vendor1.id,
      email: "scarlett@bazaar.com",
      name: "Scarlett Beauty",
      phone: "(613) 343-9004",
      address: "845 N. Stonybrook Ave. Tonawanda, NY 14210",
      verified: true,
      coverPicture: "/assets/images/banners/cycle.png",
      profilePicture: "/assets/images/faces/propic.png",
      facebookUrl: "https://www.facebook.com",
      youtubeUrl: "https://www.youtube.com",
      twitterUrl: "https://www.twitter.com",
      instagramUrl: "https://www.instagram.com"
    }
  });

  const shop2 = await prisma.shop.upsert({
    where: { slug: "tech-store" },
    update: {},
    create: {
      slug: "tech-store",
      userId: vendor2.id,
      email: "tech@bazaar.com",
      name: "Tech Store",
      phone: "(415) 555-0123",
      address: "123 Market St, San Francisco, CA 94105",
      verified: true,
      coverPicture: "/assets/images/banners/banner-1.png",
      profilePicture: "/assets/images/faces/propic(1).png",
      facebookUrl: "https://www.facebook.com",
      instagramUrl: "https://www.instagram.com"
    }
  });

  console.log("Shops seeded.");

  // ============================================================
  // CATEGORIES
  // ============================================================
  const categoryData = [
    { name: "Toys", slug: "toys", image: "/assets/images/market-3/cat-1.jpg" },
    { name: "Sports", slug: "sports", image: "/assets/images/market-3/cat-2.jpg" },
    { name: "Gaming", slug: "gaming", image: "/assets/images/market-3/cat-3.jpg" },
    { name: "Furniture", slug: "furniture", image: "/assets/images/market-3/cat-4.jpg" },
    { name: "Fashion", slug: "fashion", image: "/assets/images/market-3/cat-5.jpg" },
    { name: "Cameras", slug: "cameras", image: "/assets/images/market-3/cat-6.jpg" },
    { name: "Electronics", slug: "electronics", image: "/assets/images/categories/1.jpg" },
    { name: "Men's Fashion", slug: "mens-fashion", image: "/assets/images/categories/2.jpg" },
    { name: "Women's Fashion", slug: "womens-fashion", image: "/assets/images/categories/3.jpg" }
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoryData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { image: cat.image, name: cat.name },
      create: cat
    });
    categories[cat.slug] = created.id;
  }

  console.log("Categories seeded.");

  // ============================================================
  // BRANDS
  // ============================================================
  const brandData = [
    { name: "Samsung", slug: "samsung", type: "electronics", image: "/assets/images/brands/samsung.png" },
    { name: "Apple", slug: "apple", type: "electronics", image: "/assets/images/brands/apple.png" },
    { name: "Sony", slug: "sony", type: "electronics", image: "/assets/images/brands/sony.png" },
    { name: "Nike", slug: "nike", type: "fashion", image: "/assets/images/brands/brand-1.jpg" },
    { name: "Adidas", slug: "adidas", type: "fashion", image: "/assets/images/brands/adidas.png" },
    { name: "Levi's", slug: "levis", type: "fashion", image: "/assets/images/brands/levis.png" }
  ];

  const brands: Record<string, string> = {};
  for (const brand of brandData) {
    const created = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: { image: brand.image, name: brand.name },
      create: brand
    });
    brands[brand.slug] = created.id;
  }

  console.log("Brands seeded.");

  // ============================================================
  // PRODUCTS
  // ============================================================
  const productData = [
    {
      slug: "silver-high-neck-sweater",
      title: "Silver High Neck Sweater",
      price: 210,
      discount: 15,
      rating: 4.5,
      thumbnail: "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png",
      images: [
        "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png",
        "/assets/images/products/Fashion/Clothes/2.SilverHighNeckSweater.png"
      ],
      colors: ["Silver", "Gray"],
      sizes: ["S", "M", "L", "XL"],
      shopId: shop1.id,
      brandId: brands["nike"],
      categorySlug: "fashion"
    },
    {
      slug: "samsung-galaxy-m1",
      title: "Samsung Galaxy M1",
      price: 599,
      discount: 10,
      rating: 4.7,
      thumbnail: "/assets/images/products/Electronics/10.SonyPS4.png",
      images: ["/assets/images/products/Electronics/10.SonyPS4.png"],
      colors: ["Black", "White"],
      sizes: [],
      shopId: shop2.id,
      brandId: brands["samsung"],
      categorySlug: "electronics"
    },
    {
      slug: "wireless-headphone-pro",
      title: "Wireless Headphone Pro",
      price: 149,
      discount: 20,
      rating: 4.3,
      thumbnail: "/assets/images/products/Electronics/1.Siri2020.png",
      images: ["/assets/images/products/Electronics/1.Siri2020.png"],
      colors: ["Black"],
      sizes: [],
      shopId: shop2.id,
      brandId: brands["sony"],
      categorySlug: "electronics"
    },
    {
      slug: "mens-casual-shirt",
      title: "Men's Casual Shirt",
      price: 59,
      discount: 5,
      rating: 4.1,
      thumbnail: "/assets/images/products/Fashion/Clothes/11.StripedCasual.png",
      images: ["/assets/images/products/Fashion/Clothes/11.StripedCasual.png"],
      colors: ["Blue", "White", "Black"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      shopId: shop1.id,
      brandId: brands["levis"],
      categorySlug: "mens-fashion"
    },
    {
      slug: "womens-summer-dress",
      title: "Women's Summer Dress",
      price: 89,
      discount: 12,
      rating: 4.6,
      thumbnail: "/assets/images/products/Fashion/Clothes/13.HighWaistedGabardine.png",
      images: ["/assets/images/products/Fashion/Clothes/13.HighWaistedGabardine.png"],
      colors: ["Red", "Blue", "Yellow"],
      sizes: ["XS", "S", "M", "L"],
      shopId: shop1.id,
      brandId: brands["adidas"],
      categorySlug: "womens-fashion"
    },
    {
      slug: "gaming-mechanical-keyboard",
      title: "Gaming Mechanical Keyboard",
      price: 129,
      discount: 8,
      rating: 4.8,
      thumbnail: "/assets/images/products/Electronics/11.Netgear2020.png",
      images: ["/assets/images/products/Electronics/11.Netgear2020.png"],
      colors: ["Black"],
      sizes: [],
      shopId: shop2.id,
      brandId: brands["samsung"],
      categorySlug: "gaming"
    }
  ];

  for (const product of productData) {
    const { categorySlug, ...productFields } = product;

    const created = await prisma.product.upsert({
      where: { slug: productFields.slug },
      update: { thumbnail: productFields.thumbnail, images: productFields.images, title: productFields.title },
      create: productFields
    });

    if (categorySlug && categories[categorySlug]) {
      await prisma.productCategory.upsert({
        where: {
          productId_categoryId: {
            productId: created.id,
            categoryId: categories[categorySlug]
          }
        },
        update: {},
        create: {
          productId: created.id,
          categoryId: categories[categorySlug]
        }
      });
    }
  }

  console.log("Products seeded.");

  // ============================================================
  // ADDRESSES
  // ============================================================
  await prisma.address.upsert({
    where: { id: "seed-address-1" },
    update: {},
    create: {
      id: "seed-address-1",
      userId: customer1.id,
      title: "Home",
      street: "777 Brockton Avenue",
      city: "Abington",
      country: "United States",
      phone: "(213) 840-9416"
    }
  });

  console.log("Addresses seeded.");

  // ============================================================
  // WISHLIST (sample for customer)
  // ============================================================
  const wishSlugs = ["silver-high-neck-sweater", "samsung-galaxy-m1", "wireless-headphone-pro"];
  for (const slug of wishSlugs) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) continue;
    await prisma.wishlistItem.upsert({
      where: { userId_productId: { userId: customer1.id, productId: product.id } },
      update: {},
      create: { userId: customer1.id, productId: product.id }
    });
  }

  console.log("Wishlist seeded.");

  // ============================================================
  // SAMPLE ORDER
  // ============================================================
  const existingOrder = await prisma.order.findFirst({ where: { userId: customer1.id } });
  if (!existingOrder) {
    await prisma.order.create({
      data: {
        userId: customer1.id,
        tax: 0,
        discount: 0,
        totalPrice: 350,
        isDelivered: false,
        shippingAddress: "Kelly Williams 777 Brockton Avenue, Abington MA 2351",
        status: "Pending",
        items: {
          create: [
            {
              productImg: "/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png",
              productName: "Silver High Neck Sweater",
              productPrice: 210,
              productQuantity: 1,
              variant: "Silver"
            }
          ]
        }
      }
    });
  }

  console.log("Orders seeded.");

  console.log("\nSeed complete!");
  console.log("Test accounts:");
  console.log("  Admin:    admin@bazaar.com / password123");
  console.log("  Vendor:   vendor1@bazaar.com / password123");
  console.log("  Customer: customer@bazaar.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
