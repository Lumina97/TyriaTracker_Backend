-- AlterTable
ALTER TABLE "LatestPriceHistory" ADD COLUMN "ROI" INTEGER;
ALTER TABLE "LatestPriceHistory" ADD COLUMN "profit" INTEGER;

-- AlterTable
ALTER TABLE "PriceHistory" ADD COLUMN "ROI" INTEGER;
ALTER TABLE "PriceHistory" ADD COLUMN "profit" INTEGER;
