import DeviceInfo from "react-native-device-info";

export class AppInfoService {
  static getVersion = (): string => {
    return DeviceInfo.getVersion();
  };

  static getBuildNumber = (): string => {
    return DeviceInfo.getBuildNumber();
  };

  static getName = (): string => {
    return "-";
  };

  static getAppEnvironment = (): string => {
    return "-";
  };

  static getApiUrl = (): string => {
    return "-";
  };

  static getApiKey = (): string => {
    return "-";
  };
}
