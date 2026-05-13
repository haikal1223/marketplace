-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "courierEtd" TEXT,
ADD COLUMN     "courierName" TEXT,
ADD COLUMN     "courierService" TEXT,
ADD COLUMN     "shippingCost" DOUBLE PRECISION NOT NULL DEFAULT 0;
