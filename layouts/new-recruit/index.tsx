import React from "react";
import { ScrollView } from "react-native";
import {
  Layout,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  InputProps,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { RecruitApiService } from "../../services/api.service";
import httpRequest, {
  ApiErrorResponse,
} from "../../services/http-request.service";
import { RecruitFormData } from "../../form-data/recruit.form-data";
import { useAppSelector } from "@/store/hooks";
import { Province } from "@/models/province.model";
import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import { MultipleImageUpload } from "@/components/molecules/multple-image-upload.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";

const useInputState = (initialValue = ""): InputProps => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

interface Props {
  onRecruitCreated: () => {};
}

export default ({ onRecruitCreated }: Props): React.ReactElement => {
  const recruitApiService = new RecruitApiService(httpRequest);
  const { provinces } = useAppSelector((state) => state.app);
  const recruitTitle = useInputState();
  const workDescription = useInputState();
  const workPrice = useInputState();
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const [provinceSelectedIndex, setProvinceSelectedIndex] =
    React.useState<IndexPath>(new IndexPath(0));
  const [errorModalMessage, setErrorModalMessage] = React.useState<string>("");
  const [errorModalVisible, setErrorModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);

  const getProvinceSelected = (): Province => {
    return provinces![provinceSelectedIndex.row] ?? null;
  };

  const onConfirmButtonPress = async () => {
    if (!recruitTitle.value) {
      showErrorMessage("กรุณากรอกชื่องานที่กำลังหา");
      return;
    }
    if (!workDescription.value) {
      showErrorMessage("กรุณากรอกรายละเอียด");
      return;
    }
    if (!getProvinceSelected()) {
      showErrorMessage("กรุณาเลือกจังหวัด");
      return;
    }
    if (!workPrice.value) {
      showErrorMessage("กรุณากรอกราคา");
      return;
    }
    setIsLoading(true);

    let primaryPhotoUrl = uploadedImages.length > 0 ? uploadedImages[0] : "";
    let provinceId = getProvinceSelected()?.key ?? "";

    const recruitFormData: RecruitFormData = {
      title: recruitTitle.value,
      description: workDescription.value,
      provinceId: provinceId,
      workTypeId: `${1}`,
      budget: workPrice.value,
      primaryImage: primaryPhotoUrl,
      images: [
        primaryPhotoUrl,
        primaryPhotoUrl,
        primaryPhotoUrl,
        primaryPhotoUrl,
      ],
    };

    try {
      const response = await recruitApiService.doCreateNewRecruit(
        recruitFormData.title,
        recruitFormData.description,
        recruitFormData.provinceId,
        recruitFormData.workTypeId,
        recruitFormData.budget,
        recruitFormData.primaryImage,
        recruitFormData.images
      );
      setIsLoading(false);
      if (response.status) {
        onRecruitCreated();
      } else {
        showErrorMessage(response.message ?? "");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);

      if (error.response?.status === 401) {
        console.log(error.response.data);
        const data: ApiErrorResponse = error.response.data;
        showErrorMessage(data.message ?? "");
      } else if (error.response?.status === 500) {
        console.log(error.response.data);
        const data: ApiErrorResponse = error.response.data;
        showErrorMessage(data.message ?? "");
      } else {
        console.error(error);
        showErrorMessage(error as string);
      }
    }
  };

  const provinceSelectedDisplayValue = getProvinceSelected();

  const renderOption = ({
    key,
    title,
  }: {
    key: string;
    title: string;
  }): React.ReactElement => <SelectItem title={title} key={key} />;

  const showErrorMessage = (errorMessage: string) => {
    setErrorModalMessage(errorMessage);
    setErrorModalVisible(true);
  };

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <MultipleImageUpload setUploadedImages={setUploadedImages} />
          <Layout style={styles.formContainer} level="1">
            <Input
              label="ชื่องานที่กำลังหา"
              autoCapitalize="none"
              placeholder="ฉันหารถกะบะ"
              {...recruitTitle}
            />
            <Input
              label="รายละเอียด"
              multiline={true}
              textStyle={styles.inputTextStyle}
              style={styles.inputText}
              autoCapitalize="none"
              placeholder="อธิบายรายละเอียดงานที่คุณกำลังหา"
              {...workDescription}
            />
            <Select
              label="จังหวัด"
              style={styles.select}
              placeholder="เลือกจังหวัด"
              value={provinceSelectedDisplayValue.title}
              selectedIndex={provinceSelectedIndex}
              onSelect={(index) => setProvinceSelectedIndex(index as IndexPath)}
            >
              {provinces!.map(renderOption)}
            </Select>
            <Input
              label="งบประมาณ"
              autoCapitalize="none"
              style={styles.inputText}
              placeholder="บาท"
              {...workPrice}
            />
          </Layout>
          <Button
            style={styles.confirmButton}
            size="giant"
            onPress={onConfirmButtonPress}
          >
            ส่งข้อมูล
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
      <AlertModalComponent
        modalMessage={errorModalMessage}
        modalVisible={errorModalVisible}
        setModalVisible={setErrorModalVisible}
      />
      {isLoading && <LoadingView />}
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 216,
    backgroundColor: "color-primary-default",
  },
  uploadImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginTop: 8,
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  inputText: {
    marginTop: 16,
  },
  confirmButton: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 100,
  },
  inputTextStyle: {
    minHeight: 64,
  },
  select: {
    marginTop: 16,
  },
});
