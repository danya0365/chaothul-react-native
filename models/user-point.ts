import { DateHelper } from "@/helpers/date";
import moment from "moment";
import { Json } from "./json";
import { IssuePoint } from "./issue-point";

export class UserPoint {
  public issuePoint: IssuePoint | null = null;
  constructor(
    readonly id: number,
    readonly pointReceived: number,
    readonly pointAvailable: number,
    readonly issuePointId: number,
    readonly expiredAt: string,
    readonly createdAt: string,
    readonly updatedAt: string
  ) {}

  get isExpired() {
    if (!this.expiredAt) return false;
    return moment(this.expiredAt).isBefore();
  }

  get formattedExpiredDateTime(): string {
    if (!this.expiredAt) return "-";
    return DateHelper.dateToFromNowDaily(this.expiredAt);
  }

  get formattedExpiredDate(): string {
    if (!this.expiredAt) return "-";
    return DateHelper.dateToFromNowDailyWithoutTime(this.expiredAt);
  }

  get formattedCreateDate(): string {
    return DateHelper.dateToFromNowDailyWithoutTime(this.createdAt);
  }

  static createFromApi(json: Json) {
    const object = new UserPoint(
      json.id,
      json.point_received,
      json.point_available,
      json.issue_point_id,
      json.expired_at,
      json.created_at,
      json.updated_at
    );
    object.issuePoint = json.issue_point
      ? IssuePoint.createFromApi(json.issue_point)
      : null;
    return object;
  }

  static createFromObject(json: UserPoint) {
    const object = new UserPoint(
      json.id,
      json.pointReceived,
      json.pointAvailable,
      json.issuePointId,
      json.expiredAt,
      json.createdAt,
      json.updatedAt
    );
    object.issuePoint = json.issuePoint
      ? IssuePoint.createFromObject(json.issuePoint)
      : null;
    return object;
  }
}
