import { ImageSourcePropType } from "react-native";
import { UserProfile } from "./user-profile";
import { Like } from "./like.model";
import { Reply } from "./reply.model";

export class Review {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly postMessge: string,
    readonly rating: Number,
    readonly author: UserProfile,
    readonly isSync: boolean,
    readonly date: Date,
    readonly replies: Reply[],
    readonly likes: Like[]
  ) {}

  get shortTitle(): string {
    return `${this.title.substring(0, 80)}`;
  }

  get formattedDate(): string {
    return this.date ? `${this.date.toDateString()}` : "-";
  }

  get shortPostMessge(): string {
    const isLong: boolean = this.postMessge.length > 100;
    return isLong ? `${this.postMessge.substring(0, 100)}...` : this.postMessge;
  }
}
