import { dataURItoBlob } from "@/helpers/utils";
import { UploadApiService } from "@/services/api.service";
import httpRequest, { ApiErrorResponse } from "@/services/http-request.service";
import { ThemeContextValue, Theming } from "@/services/theme.service";
import {
  Button,
  ButtonProps,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Platform } from "react-native";
import { PlusIcon } from "./icons";
type ImagePickerAsset = ImagePicker.ImagePickerAsset;
const uploadLimit = 7;

export interface EditAvatarButtonProps extends ButtonProps {
  onUploaded: (imageUrl: string) => void;
  uploadApiService?: UploadApiService;
}

export const EditAvatarButton = ({
  onUploaded,
  uploadApiService = new UploadApiService(httpRequest),
}: EditAvatarButtonProps): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const { currentTheme, isDarkMode }: ThemeContextValue = React.useContext(
    Theming.ThemeContext
  ) as ThemeContextValue;

  const [isLoading, setIsLoading] = React.useState(false);

  const doCompressImage = async (image: any) => {
    const resize =
      image.width > image.height ? { width: 2000 } : { height: 2000 };
    const manipResult = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult;
  };

  const handleUploadImage = async (images: ImagePicker.ImagePickerAsset[]) => {
    setIsLoading(true);
    const uploadedImages: string[] = await Promise.all(
      images.map(async (image: ImagePickerAsset): Promise<string> => {
        let compressedImage = null;
        if (Platform.OS != "web") {
          try {
            compressedImage = await doCompressImage(image);
          } catch (error) {
            console.error("doCompressImage failed", error);
          }
        }

        try {
          let blob: Blob | undefined = undefined;
          let file: { uri: string; type: string; name: string } | undefined =
            undefined;
          if (Platform.OS === "web") {
            blob = dataURItoBlob(compressedImage?.uri || image.uri);
          } else {
            file = {
              uri: compressedImage?.uri || image.uri,
              name: "photo.jpg",
              type: "image/jpeg",
            };
          }
          const response = await uploadApiService.doUploadOriginalImage(
            blob || file
          );

          if (response.status) {
            return response.data.original;
          }
        } catch (error: any) {
          if (error.response?.status === 401) {
            const data: ApiErrorResponse = error.response.data;
            console.log("error upload 401", data);
          } else {
            console.error("uploadApiService failed", error);
          }
        }
        return "";
      })
    );
    setIsLoading(false);
    onUploaded(uploadedImages[0]);
  };

  const handleChooseImage = async () => {
    if (!requestCameraRollPermission()) {
      alert("Sorry, we need camera roll permissions to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
    });
    if (!result.canceled && result.assets) {
      const assets = result.assets;
      if (assets.length) {
        handleUploadImage(assets);
      }
    }
  };

  const requestCameraRollPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status == "granted";
  };

  return (
    <Button
      onPress={() => {
        //
        handleChooseImage();
      }}
      style={styles.editAvatarButton}
      status="basic"
      accessoryRight={PlusIcon}
    />
  );
};

const themedStyles = StyleService.create({
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
