import { Json } from "./json";

export class UserType {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly textCondition: string,
    readonly amount: number
  ) {}

  static createFromApi(json: Json) {
    const object = new UserType(
      json.id,
      json.user_type.name,
      json.text_condition,
      json.amount
    );
    return object;
  }

  static createFromObject(json: UserType) {
    const object = new UserType(
      json.id,
      json.name,
      json.textCondition,
      json.amount
    );
    return object;
  }
}
