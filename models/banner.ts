import { DateHelper } from "@/helpers/date";
import { Json } from "./json";

export type BannerType = "external_url" | "product" | "promotion";

export class Banner {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly content: string,
    readonly viewCount: number,
    readonly type: BannerType,
    readonly imageUrl: string,
    readonly externalUrl: string,
    readonly isPublic: boolean,
    readonly isPinned: boolean,
    readonly bannerPromotionId: boolean,
    readonly bannerProductId: boolean,
    readonly expiredAt: string,
    readonly createdAt: string,
    readonly updatedAt: string
  ) {}

  get formattedExpiredDate(): string {
    if (!this.expiredAt) return "-";
    return DateHelper.dateToFromNowDailyWithoutTime(this.expiredAt);
  }

  get formattedCreateDate(): string {
    return DateHelper.dateToFromNowDailyWithoutTime(this.createdAt);
  }

  get previewContent(): string {
    let previewContent = this.content;
    return previewContent.length > 30
      ? previewContent.substring(0, 28) + "..."
      : previewContent;
  }

  static createFromApi = (json: Json) => {
    const object = new Banner(
      json.id,
      json.name,
      json.content,
      Number(json.view_count),
      json.type,
      json.image_url,
      json.external_url,
      json.is_public,
      json.is_pinned,
      json.banner_promotion_id,
      json.banner_product_id,
      json.expired_at,
      json.created_at,
      json.updated_at
    );
    return object;
  };

  static createFromObject = (value: Banner) => {
    const object = new Banner(
      value.id,
      value.name,
      value.content,
      value.viewCount,
      value.type,
      value.imageUrl,
      value.externalUrl,
      value.isPublic,
      value.isPinned,
      value.bannerPromotionId,
      value.bannerProductId,
      value.expiredAt,
      value.createdAt,
      value.updatedAt
    );
    return object;
  };
}
