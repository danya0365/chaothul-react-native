import moment from "moment";
import { UserProfile } from "./user-profile";
import { Work } from "./work.model";
import { Status } from "./status.model";
import { Json } from "./json";

export class WorkBooking {
  constructor(
    readonly id: number,
    readonly customerMessage: string,
    readonly mobilePhone: string,
    readonly bookingDate: Date,
    readonly bookingStatus: Status,
    readonly customerConfirmStatus: Status,
    readonly workerConfirmStatus: Status,
    readonly createdAt: string,
    readonly work: Work,
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

  static createFromApi(workBooking: Json): WorkBooking {
    return new WorkBooking(
      workBooking.id,
      workBooking.customer_message,
      workBooking.mobile_phone,
      new Date(workBooking?.booking_date),
      new Status(workBooking.booking_status),
      new Status(workBooking.customer_confirm_status),
      new Status(workBooking.worker_confirm_status),
      workBooking.created_at,
      Work.createFromApi(workBooking.work),
      UserProfile.createFromApi(workBooking.author) ?? undefined
    );
  }
}
