import { UserProfile } from "./user-profile";

export class Like {
  constructor(
    readonly id: number,
    readonly author: UserProfile,
    readonly isSync: boolean,
    readonly date: Date
  ) {}

  get formattedDate(): string {
    return this.date ? `${this.date.toDateString()}` : "-";
  }
}
