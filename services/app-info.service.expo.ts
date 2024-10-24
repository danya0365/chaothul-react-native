import Constants from "expo-constants";

export class AppInfoService {
  static getVersion = (): string => {
    return Constants.expoConfig?.version || "0.0.0";
  };

  static getBuildNumber = (): string => {
    if (Constants.platform?.ios) {
      return `${Constants.expoConfig?.ios?.buildNumber ?? "-"}`;
    }
    if (Constants.platform?.android) {
      return `${Constants.expoConfig?.android?.versionCode ?? "-"}`;
    }
    return "-";
  };

  static getName = (): string => {
    return Constants.expoConfig?.name || "-";
  };

  static getAppEnvironment = (): string => {
    return Constants.expoConfig?.extra?.appEnvironment || "-";
  };

  static getApiUrl = (): string => {
    return Constants.expoConfig?.extra?.apiUrl || "-";
  };

  static getApiKey = (): string => {
    return Constants.expoConfig?.extra?.apiKey || "-";
  };
}
