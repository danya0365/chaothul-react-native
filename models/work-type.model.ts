import { ImageSourcePropType } from "react-native";
import { Json } from "./json";

export class WorkType {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description?: string,
    readonly primaryImage?: ImageSourcePropType
  ) {}

  static createFromApi(workType: Json): WorkType {
    return new WorkType(workType.id, workType.title);
  }
}
