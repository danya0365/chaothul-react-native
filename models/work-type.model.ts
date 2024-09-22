import { ImageSourcePropType } from "react-native";

export class WorkType {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly description?: string,
    readonly primaryImage?: ImageSourcePropType
  ) {}

  static createFromApi(workType: any): WorkType | null {
    if (!workType) {
      return null;
    }
    return new WorkType(workType.id, workType.title);
  }
}
