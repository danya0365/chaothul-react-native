import { ImageSourcePropType } from "react-native";
import { UserProfile } from "./user-profile";
import { Like } from "./like.model";
import { Review } from "./review.model";
import { Province } from "./province.model";
import { WorkType } from "./work-type.model";
import { log } from "react-native-reanimated";
import moment from "moment";

export class Work {
  likeCount: number = 0;
  replyCount: number = 0;

  constructor(
    readonly id: number,
    readonly code: string,
    readonly title: string,
    readonly description: string,
    readonly details: string[],
    readonly primaryImage: ImageSourcePropType,
    readonly images: ImageSourcePropType[],
    readonly price: number,
    readonly province: Province,
    readonly workType: WorkType,
    readonly author: UserProfile,
    readonly isSync: boolean,
    readonly date: Date,
    readonly reviews: Review[] = [],
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

  get formattedReplyCount(): string {
    return `${this.replyCount.toLocaleString("en-US")}`;
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

  setReplyCount(replyCount: number) {
    this.replyCount = replyCount;
  }

  static createFromApi(work: any): Work {
    const images = work?.images?.map((image: string) => ({
      uri: image,
    }));

    const workInfo = new Work(
      work?.id,
      work?.code,
      work?.title,
      work?.description,
      work?.details,
      { uri: work?.primary_image },
      images,
      work?.price,
      Province.createFromApi(work?.province) as Province,
      WorkType.createFromApi(work?.workType) as WorkType,
      UserProfile.createFromApi(work?.author) as UserProfile,
      true,
      new Date(work?.created_at)
    );

    workInfo.setLikeCount(work?.like_count ?? 0);
    workInfo.setReplyCount(work?.reply_count ?? 0);
    return workInfo;
  }
}
