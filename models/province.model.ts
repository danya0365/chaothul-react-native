import { ImageSourcePropType } from "react-native";

export class Province {
  constructor(
    readonly key: string,
    readonly title: string,
    readonly image?: ImageSourcePropType
  ) {}

  static provinces(): Province[] {
    return [
      Province.bangkok(),
      Province.narathiwas(),
      Province.yala(),
      Province.pathumthani(),
      Province.nontaburi(),
      Province.songkla(),
      Province.patloong(),
      Province.choompon(),
      Province.petburi(),
      Province.phuket(),
      Province.pattani(),
    ];
  }

  static createFromApi(province: any): Province {
    return new Province(province.id, province.title, {
      uri: province.photo,
    });
  }

  static bangkok(): Province {
    return new Province(
      "Bangkok",
      "กทม",
      require("./assets/mock/province/bangkok.jpeg")
    );
  }

  static nontaburi(): Province {
    return new Province(
      "Nontaburi",
      "นนทบุรี",
      require("./assets/mock/province/bangkok.jpeg")
    );
  }

  static songkla(): Province {
    return new Province(
      "Songkla",
      "สงขลา",
      require("./assets/mock/province/bangkok.jpeg")
    );
  }

  static patloong(): Province {
    return new Province(
      "Patloong",
      "พัทลุง",
      require("./assets/mock/province/bangkok.jpeg")
    );
  }

  static choompon(): Province {
    return new Province(
      "Choompon",
      "ชุมพร",
      require("./assets/mock/province/bangkok.jpeg")
    );
  }

  static petburi(): Province {
    return new Province(
      "Petburi",
      "เพชรบุรี",
      require("./assets/mock/province/bangkok.jpeg")
    );
  }

  static phuket(): Province {
    return new Province(
      "Phuket",
      "ภูเก็ท",
      require("./assets/mock/province/bangkok.jpeg")
    );
  }

  static narathiwas(): Province {
    return new Province(
      "Narathiwas",
      "นราธิวาส",
      require("./assets/mock/province/narathiwas.png")
    );
  }

  static yala(): Province {
    return new Province(
      "Yala",
      "ยะลา",
      require("./assets/mock/province/yala.jpeg")
    );
  }

  static pattani(): Province {
    return new Province(
      "Pattani",
      "ปัตตานี",
      require("./assets/mock/province/yala.jpeg")
    );
  }

  static pathumthani(): Province {
    return new Province(
      "Pathumthani",
      "ปทุมธานี",
      require("./assets/mock/province/pathumthani.jpeg")
    );
  }
}
