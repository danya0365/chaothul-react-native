import { ImageSourcePropType } from "react-native";
import { UserProfile } from "./user-profile";
import { Like } from "./like.model";

export class Reply {
  constructor(
    readonly id: number,
    readonly postMessge: string,
    readonly author: UserProfile,
    readonly isSync: boolean,
    readonly date: Date,
    readonly likes: Like[]
  ) {}

  get shortPostMessge(): string {
    return `${this.postMessge.substring(0, 100)}`;
  }

  get formattedDate(): string {
    return this.date ? `${this.date.toDateString()}` : "-";
  }
}
