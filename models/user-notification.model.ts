import moment from "moment";
import { Work } from "./work.model";

const convertStringToEnumWithValue = <T>(
  enumType: T,
  str: string
): T[keyof T] | undefined => {
  const _enumType = enumType as [string];
  const enumKeys = Object.keys(_enumType);
  const enumKey = enumKeys.find((key) => _enumType[key as any] === str);
  return enumKey !== undefined
    ? (_enumType[enumKey as any] as T[keyof T])
    : undefined;
};

export enum UserNotificationType {
  WorkBooking = "work-booking",
  BookingConfirm = "booking-confirm",
  WorkLike = "work-like",
  WorkReview = "work-review",
  ReviewReply = "review-reply",
  ReviewLike = "review-like",
  RecruitBooking = "recruit-booking",
}

export class UserNotification {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly type: UserNotificationType,
    readonly date: string | null,
    readonly isRead: boolean,
    readonly work?: Work
  ) {}

  get formattedTitle(): string {
    const isLong: boolean = this.title.length > 36;
    return isLong ? `${this.title.substring(0, 32)}...` : this.title;
  }

  get formattedDate(): string {
    var date = new Date(this.date ?? "");
    var formatted = moment(date).format("D MMMM YYYY");
    return formatted;
  }

  static createFromApi(userNotification: any): UserNotification {
    const userNotificationType = convertStringToEnumWithValue(
      UserNotificationType,
      userNotification.notification_type
    ) as UserNotificationType;
    return new UserNotification(
      userNotification.id,
      userNotification.title,
      userNotificationType,
      userNotification.created_at,
      userNotification.is_read,
      Work.createFromApi(userNotification.notificationable)
    );
  }
}
