import moment from "moment";
import { Json } from "./json";
import { Recruit } from "./recruit.model";
import { Status } from "./status.model";
import { UserProfile } from "./user-profile";

export class RecruitBooking {
  constructor(
    readonly id: number,
    readonly customerMessage: string,
    readonly mobilePhone: string,
    readonly bookingDate: Date,
    readonly bookingStatus: Status,
    readonly customerConfirmStatus: Status,
    readonly workerConfirmStatus: Status,
    readonly createdAt: string,
    readonly recruit: Recruit,
    readonly author?: UserProfile
  ) {}

  get formattedCustomerConfirmStatus(): string {
    return this.customerConfirmStatus.title;
  }

  get formattedWorkerConfirmStatus(): string {
    return this.workerConfirmStatus.title;
  }

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

  static createFromApi(recruitBooking: Json): RecruitBooking {
    return new RecruitBooking(
      recruitBooking.id,
      recruitBooking.customer_message,
      recruitBooking.mobile_phone,
      new Date(recruitBooking?.booking_date),
      new Status(recruitBooking.booking_status),
      new Status(recruitBooking.customer_confirm_status),
      new Status(recruitBooking.worker_confirm_status),
      recruitBooking.created_at,
      Recruit.createFromApi(recruitBooking.recruit),
      UserProfile.createFromApi(recruitBooking.author) ?? undefined
    );
  }
}
