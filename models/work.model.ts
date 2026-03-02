import moment from "moment";
import { ImageSourcePropType } from "react-native";
import { Category } from "./category.model";
import { Json } from "./json";
import { Like } from "./like.model";
import { Province } from "./province.model";
import { UserProfile } from "./user-profile";
import { WorkType } from "./work-type.model";

export class Work {
  likeCount: number = 0;
  reviewCount: number = 0;
  public categories: Category[] = [];

  constructor(
    readonly id: number,
    readonly code: string,
    readonly title: string,
    readonly description: string,
    readonly details: string[],
    readonly primaryImage: ImageSourcePropType,
    readonly images: ImageSourcePropType[],
    readonly price: number,
    readonly province: Province | null,
    readonly workType: WorkType | null,
    readonly author: UserProfile | null,
    readonly isSync: boolean,
    readonly date: Date,
    readonly likes: Like[] = [],
    readonly displayPriority: number = 0,
    readonly avgReviewRating: number = 0
  ) {}

  get formattedPrice(): string {
    return `${this.price?.toLocaleString("en-US")}`;
  }

  get formattedLikeCount(): string {
    return `${this.likeCount.toLocaleString("en-US")}`;
  }

  get formattedReviewCount(): string {
    return `${this.reviewCount.toLocaleString("en-US")}`;
  }

  get shortTitle(): string {
    return `${this.title?.substring(0, 80)}`;
  }

  get shortDescription(): string {
    return `${this.description?.substring(0, 100)}`;
  }

  get formattedDate(): string {
    var date = new Date(this.date);
    var formatted = moment(date).format("D MMMM YYYY");
    return formatted;
  }

  setLikeCount(likeCount: number) {
    this.likeCount = likeCount;
  }

  setReviewCount(reviewCount: number) {
    this.reviewCount = reviewCount;
  }

  static createFromApi(json: Json): Work {
    const images = json.images?.map((image: string) => ({
      uri: image,
    }));

    const workInfo = new Work(
      json.id,
      json.code,
      json.title,
      json.description,
      json.details,
      { uri: json.primary_image },
      images,
      json.price,
      json.province ? Province.createFromApi(json.province) : null,
      json.work_type ? WorkType.createFromApi(json.work_type) : null,
      json.author ? UserProfile.createFromApi(json.author) : null,
      true,
      new Date(json.created_at)
    );

    workInfo.setLikeCount(json.like_count ?? 0);
    workInfo.setReviewCount(json.reply_count ?? 0);

    workInfo.categories = json.categories
      ? json.categories.map((val: Json) => Category.createFromApi(val))
      : [];
    return workInfo;
  }
}
