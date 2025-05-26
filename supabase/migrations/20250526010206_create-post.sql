ALTER TABLE "climbs" ADD COLUMN "asset_ids" text[] DEFAULT '{}';
ALTER TABLE "climbs" DROP COLUMN "media_ids";
