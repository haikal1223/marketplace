-- CreateTable
CREATE TABLE "VendorSiteSetting" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "general" JSONB,
    "topbar" JSONB,
    "footer" JSONB,
    "socialLinks" JSONB,
    "shippingVat" JSONB,
    "bannerSlider" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VendorSiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorPayoutSetting" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "cash" JSONB,
    "card" JSONB,
    "bank" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VendorPayoutSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorSiteSetting_shopId_key" ON "VendorSiteSetting"("shopId");
CREATE UNIQUE INDEX "VendorPayoutSetting_shopId_key" ON "VendorPayoutSetting"("shopId");

-- AddForeignKey
ALTER TABLE "VendorSiteSetting"
ADD CONSTRAINT "VendorSiteSetting_shopId_fkey"
FOREIGN KEY ("shopId") REFERENCES "Shop"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "VendorPayoutSetting"
ADD CONSTRAINT "VendorPayoutSetting_shopId_fkey"
FOREIGN KEY ("shopId") REFERENCES "Shop"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
