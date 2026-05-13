-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "warehouseId" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "ShopWarehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
