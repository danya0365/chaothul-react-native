import { DateHelper } from "@/helpers/date";
import { Json } from "./json";

export class IssuePoint {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly desc: string,
    readonly points: number,
    readonly type: string,
    readonly status: string,
    readonly userMissionId: number,
    readonly userId: number,
    readonly createdAt: string,
    readonly updatedAt: string
  ) {}

  get formattedCreateDate(): string {
    return DateHelper.dateToFromNowDailyWithoutTime(this.createdAt);
  }

  static createFromApi(json: Json) {
    const object = new IssuePoint(
      json.id,
      json.name,
      json.desc,
      Number(json.points),
      json.type,
      json.status,
      json.user_mission_id,
      json.user_id,
      json.created_at,
      json.updated_at
    );

    return object;
  }

  static createFromObject(json: IssuePoint) {
    const object = new IssuePoint(
      json.id,
      json.name,
      json.desc,
      json.points,
      json.type,
      json.status,
      json.userMissionId,
      json.userId,
      json.createdAt,
      json.updatedAt
    );

    return object;
  }
}
