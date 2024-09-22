import moment from "moment";
import { UserProfile } from "./user-profile";
import { Recruit } from "./recruit.model";

export class RecruitBooking {
  constructor(
    readonly id: number,
    readonly customerMessage: string,
    readonly mobilePhone: string,
    readonly bookingDate: Date,
    readonly bookingStatus: string,
    readonly customerConfirmStatus: string,
    readonly workerConfirmStatus: string,
    readonly createdAt: string,
    readonly recruit: Recruit,
    readonly author?: UserProfile
  ) {}

  get formattedBookingDate(): string {
    var date = new Date(this.bookingDate);
    var formatted = moment(date).format("D MMMM YYYY");
    return formatted;
  }

  get formattedCreatedDate(): string {
    var date = new Date(this.createdAt);
    var formatted = moment(date).format("D MMMM YYYY");
    return formatted;
  }

  static createFromApi(recruitBooking: any): RecruitBooking | null {
    if (!recruitBooking) {
      return null;
    }
    return new RecruitBooking(
      recruitBooking.id,
      recruitBooking.customer_message,
      recruitBooking.mobile_phone,
      new Date(recruitBooking?.booking_date),
      recruitBooking.booking_status,
      recruitBooking.customer_confirm_status,
      recruitBooking.worker_confirm_status,
      recruitBooking.created_at,
      Recruit.createFromApi(recruitBooking.recruit),
      UserProfile.createFromApi(recruitBooking.author) ?? undefined
    );
  }
}
