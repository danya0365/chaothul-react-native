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
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import httpRequest, {
  ApiErrorResponse,
} from "../../services/http-request.service";
import { WorkFormData } from "../../form-data/work.form-data";
import { WorkApiService } from "../../services/api.service";
import { useAppSelector } from "@/store/hooks";
import { Province } from "@/models/province.model";
import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import { MultipleImageUpload } from "@/components/molecules/multple-image-upload.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";
import { WorkType } from "@/models/work-type.model";

const useInputState = (initialValue = ""): InputProps => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

interface Props {
  onWorkCreated: () => {};
}

export default ({ onWorkCreated }: Props): React.ReactElement => {
  const workApiService = new WorkApiService(httpRequest);
  const { provinces, workTypes } = useAppSelector((state) => state.app);
  const workCode = useInputState();
  const workTitle = useInputState();
  const workDescription = useInputState();
  const workPrice = useInputState();
  const [provinceSelectedIndex, setProvinceSelectedIndex] =
    React.useState<IndexPath>(new IndexPath(0));
  const [workTypeSelectedIndex, setWorkTypeSelectedIndex] =
    React.useState<IndexPath>(new IndexPath(0));
  const [errorModalMessage, setErrorModalMessage] = React.useState<string>("");
  const [errorModalVisible, setErrorModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
  const styles = useStyleSheet(themedStyles);

  const getProvinceSelected = (): Province => {
    return provinces![provinceSelectedIndex.row] ?? null;
  };

  const getWorkTypeSelected = (): WorkType => {
    return workTypes![workTypeSelectedIndex.row] ?? null;
  };

  const onConfirmButtonPress = async () => {
    if (!workCode.value) {
      showErrorMessage("กรุณากรอกทะเบียนรถ");
      return;
    }
    if (!workTitle.value) {
      showErrorMessage("กรุณากรอกชื่องาน");
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
    if (uploadedImages.length <= 0) {
      showErrorMessage("กรุณาอัพโหลดรูป");
      return;
    }

    setIsLoading(true);

    const primaryPhotoUrl = uploadedImages.length > 0 ? uploadedImages[0] : "";
    const provinceId = getProvinceSelected()?.key ?? "";
    const workTypeId = getWorkTypeSelected()?.id ?? "";

    const workFormData: WorkFormData = {
      code: workCode.value,
      title: workTitle.value,
      description: workDescription.value,
      details: [],
      provinceId: provinceId,
      workTypeId: Number(workTypeId),
      price: workPrice.value,
      primaryImage: primaryPhotoUrl,
      images: uploadedImages,
    };

    try {
      const response = await workApiService.doCreateNewWork(
        workFormData.code,
        workFormData.title,
        workFormData.description,
        workFormData.details,
        workFormData.provinceId,
        workFormData.workTypeId,
        workFormData.price,
        workFormData.primaryImage,
        workFormData.images
      );
      setIsLoading(false);
      if (response.status) {
        onWorkCreated();
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
      } else {
        console.error(error);
      }
    }
  };

  const provinceSelectedDisplayValue = getProvinceSelected();
  const workTypeSelectedDisplayValue = getWorkTypeSelected();

  const renderProvinceOption = ({
    key,
    title,
  }: Province): React.ReactElement => <SelectItem title={title} key={key} />;

  const renderWorkTypeOption = ({
    id,
    title,
  }: WorkType): React.ReactElement => <SelectItem title={title} key={id} />;

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
            <Select
              label="ประเภทรถ"
              style={styles.select}
              placeholder="เลือกรถ"
              value={workTypeSelectedDisplayValue.title}
              selectedIndex={workTypeSelectedIndex}
              onSelect={(index) => setWorkTypeSelectedIndex(index as IndexPath)}
            >
              {workTypes!.map(renderWorkTypeOption)}
            </Select>
            <Input
              label="ทะเบียนรถ"
              autoCapitalize="none"
              placeholder="ใส่ทะเบียรถที่รับงาน"
              {...workCode}
            />
            <Input
              label="ชื่องาน"
              autoCapitalize="none"
              placeholder="รับขนของย้ายบ้าน"
              {...workTitle}
            />
            <Input
              label="รายละเอียด"
              multiline={true}
              textStyle={styles.inputTextStyle}
              style={styles.inputText}
              autoCapitalize="none"
              placeholder="อธิบายรายละเอียดงานที่คุณทำ"
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
              {provinces!.map(renderProvinceOption)}
            </Select>
            <Input
              label="ราคา"
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
    gap: 16,
  },
  inputText: {},
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
