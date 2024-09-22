import { ImageSourcePropType } from "react-native";
import { UserProfile } from "./user-profile";
import { Province } from "./province.model";
import { WorkType } from "./work-type.model";
import moment from "moment";

export class Recruit {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly primaryImage: ImageSourcePropType,
    readonly images: ImageSourcePropType[],
    readonly budget: number,
    readonly date: Date,
    readonly province?: Province,
    readonly workType?: WorkType,
    readonly author?: UserProfile,
    readonly isSync?: boolean,
    readonly displayPriority: number = 0
  ) {}

  get formattedBudget(): string {
    return `${this.budget?.toLocaleString("en-US")}`;
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

  static createFromApi(recruit: any): Recruit {
    const images = recruit?.images?.map((image: string) => ({
      uri: image,
    }));
    return new Recruit(
      recruit?.id,
      recruit?.title,
      recruit?.description,
      { uri: recruit?.primary_image },
      images,
      recruit?.budget,
      new Date(recruit?.created_at),
      Province.createFromApi(recruit?.province) ?? undefined,
      WorkType.createFromApi(recruit?.workType) ?? undefined,
      UserProfile.createFromApi(recruit?.author) ?? undefined,
      true
    );
  }
}
