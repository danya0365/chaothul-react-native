import React from "react";
import { ScrollView, View, Image, ViewStyle } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Text,
  InputProps,
  Modal,
  Card,
  Datepicker,
  DatepickerProps,
} from "@ui-kitten/components";
import { WorkApiService } from "../../services/api.service";
import httpRequest, {
  ApiErrorResponse,
} from "../../services/http-request.service";
import { Work } from "@/models/work.model";
import { ImageOverlay } from "./extra/image.overlay.component";
import { WorkBookingFormData } from "../../form-data/work-booking.form-data";
import { WorkInfoValue } from "./extra/work-info-value.component";
import { useNavigation } from "@react-navigation/native";
import LoadingView from "@/components/organisms/loading.view";
import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import { CalendarIcon } from "@/components/atoms/icons";
import AlertModalComponent from "@/components/molecules/alert-modal.component";

const useInputState = (initialValue = ""): InputProps => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const useDatePickerState = (initialValue?: Date): DatepickerProps => {
  const [value, setValue] = React.useState(initialValue);
  return { date: value, onSelect: setValue };
};

interface Props {
  workId: number;
}

export default ({ workId }: Props): React.ReactElement => {
  const navigation = useNavigation();
  const workApiService = new WorkApiService(httpRequest);
  const customerMessageInput = useInputState();
  const mobilePhoneInput = useInputState();
  const bookingDate = useDatePickerState();
  const [errorModalMessage, setErrorModalMessage] = React.useState<string>("");
  const [errorModalVisible, setErrorModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);
  const [workInfo, setWorkInfo] = React.useState<Work>();

  const doRequestWorkDetail = async (callback: any) => {
    setIsLoading(true);
    try {
      const response = await workApiService.getWorkDetail(workId);
      const responseWork = Work.createFromApi(response.data);
      setWorkInfo(responseWork);
      callback();
      setIsLoading(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log(error.response.data);
        const data = error.response.data;
      } else {
        console.error(error);
      }
      callback();
      setIsLoading(false);
    }
  };

  const onConfirmButtonPress = async () => {
    if (!customerMessageInput.value) {
      showErrorMessage("กรุณากรอกรายละเอียด");
      return;
    }
    if (!mobilePhoneInput.value) {
      showErrorMessage("กรุณากรอกเบอร์โทรศัพท์");
      return;
    }
    if (!bookingDate.date) {
      showErrorMessage("กรุณาเลือกวันที่");
      return;
    }
    setIsLoading(true);
    const workBookingFormData: WorkBookingFormData = {
      workId,
      customerMessage: customerMessageInput.value,
      mobilePhone: mobilePhoneInput.value,
      bookingDate: bookingDate.date,
    };

    try {
      const response = await workApiService.doBookingWork(workBookingFormData);
      setIsLoading(false);
      if (response.status) {
        navigation.goBack();
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

  const showErrorMessage = (errorMessage: string) => {
    setErrorModalMessage(errorMessage);
    setErrorModalVisible(true);
  };

  React.useEffect(() => {
    doRequestWorkDetail(() => {});
  }, []);

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <ImageOverlay
            style={styles.imageOverlay as ViewStyle}
            source={workInfo?.primaryImage}
          />
          <Card style={styles.bookingCard} appearance="filled" disabled={true}>
            <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="ชื่องานที่ต้องการจอง"
                value={workInfo?.title ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="รายละเอียดงาน"
                value={workInfo?.description ?? ""}
              />
              <Datepicker
                label="วันที่"
                style={styles.select}
                placeholder="เลือกวันที่"
                accessoryRight={CalendarIcon}
                {...bookingDate}
              />
              <Input
                label="รายละเอียดการจอง"
                multiline={true}
                textStyle={styles.inputTextStyle}
                style={styles.inputText}
                autoCapitalize="none"
                placeholder="เช่น เจอกันที่ร้าน..."
                {...customerMessageInput}
              />
              <Input
                label="เบอร์ติดต่อ"
                autoCapitalize="none"
                style={styles.inputText}
                placeholder="0xx-xxx-xxxx"
                {...mobilePhoneInput}
              />
              <Button
                style={styles.confirmButton}
                size="giant"
                onPress={onConfirmButtonPress}
              >
                ยืนยันการจอง
              </Button>
            </View>
          </Card>
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
    backgroundColor: "background-basic-color-2",
    marginBottom: 44,
  },
  imageOverlay: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  workInfoValue: {
    paddingVertical: 8,
  },
  workInfoSection: {
    marginTop: 8,
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
    marginBottom: 20,
  },
  inputTextStyle: {
    minHeight: 64,
  },
  select: {
    marginTop: 16,
  },
});
