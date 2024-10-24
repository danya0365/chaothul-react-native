import { DateHelper } from "@/helpers/date";
import { Json } from "./json";
import { UserProfile } from "./user-profile";

export type MessengerConversationType = "text" | "image" | "url";

export class MessengerConversation {
  constructor(
    readonly id: number,
    readonly content: string,
    readonly type: MessengerConversationType,
    readonly author: UserProfile,
    readonly channelId: number,
    readonly seenAt: string,
    readonly createdAt: string
  ) {}

  get formattedCreateDate(): string {
    return DateHelper.dateToFromNowDailyWithoutTime(this.createdAt);
  }

  get isSeen(): boolean {
    return !!this.seenAt;
  }

  static createFromApi = (json: Json) => {
    const author = UserProfile.createFromApi(json.author);
    const obj = new MessengerConversation(
      json.id,
      json.content,
      json.type,
      author,
      json.channel_id,
      json.seen_at,
      json.created_at
    );
    return obj;
  };

  static createFromObject = (value: MessengerConversation) => {
    const author = UserProfile.createFromObject(value.author);
    const obj = new MessengerConversation(
      value.id,
      value.content,
      value.type,
      author,
      value.channelId,
      value.seenAt,
      value.createdAt
    );
    return obj;
  };
}
