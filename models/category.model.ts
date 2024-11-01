import { ImageSourcePropType } from "react-native";
import { Json } from "./json";

export class Category {
  likeCount: number = 0;
  replyCount: number = 0;

  constructor(
    readonly id: number,
    readonly name: string,
    readonly description: string,
    readonly imageUrl: ImageSourcePropType
  ) {}

  static createFromApi(json: Json): Category {
    const workInfo = new Category(json.id, json.name, json.description, {
      uri: json.image_url,
    });
    return workInfo;
  }
}
