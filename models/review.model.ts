import { Json } from "./json";
import { UserProfile } from "./user-profile";

export class Review {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly content: string,
    readonly rating: number,
    readonly images: string[],
    readonly author: UserProfile,
    readonly isSync: boolean,
    readonly date: Date,
    readonly replies: Review[],
    readonly likeCount: number
  ) {}

  get shortTitle(): string {
    return `${(this.title ?? "").substring(0, 80)}`;
  }

  get formattedDate(): string {
    return this.date ? `${this.date.toDateString()}` : "-";
  }

  get shortContent(): string {
    const isLong: boolean = (this.content ?? "").length > 100;
    return isLong ? `${this.content.substring(0, 100)}...` : this.content;
  }

  static createFromApi(json: Json): Review {
    const replies = json.replies
      ? json.replies.map((r: Json) => Review.createFromApi(r))
      : [];

    return new Review(
      json.id,
      json.title ?? "",
      json.content ?? "",
      json.rating ?? 0,
      json.images ?? [],
      json.author ? UserProfile.createFromApi(json.author) : null!,
      true,
      new Date(json.created_at),
      replies,
      json.like_count ?? 0
    );
  }
}
