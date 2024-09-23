import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";
import useAuth from "@/hooks/auth";
import useWork from "@/hooks/work";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Card,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import React, { useMemo } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { WorkApiService } from "../../services/api.service";
import httpRequest, {
  ApiErrorResponse,
} from "../../services/http-request.service";
import { ImageOverlay } from "./extra/image.overlay.component";
import { WorkInfoValue } from "./extra/work-info-value.component";

interface Props {
  workBookingId: number;
}

export default ({ workBookingId }: Props): React.ReactElement => {
  const navigation = useNavigation();
  const workApiService = new WorkApiService(httpRequest);
  const [errorModalMessage, setErrorModalMessage] = React.useState<string>("");
  const [errorModalVisible, setErrorModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);
  const { workBookings, setWorkBookings } = useWork();
  const { user } = useAuth();

  const workBooking = useMemo(() => {
    return workBookings.find((val) => Number(val.id) === Number(workBookingId));
  }, [workBookings, workBookingId]);

  const showErrorMessage = (errorMessage: string) => {
    setErrorModalMessage(errorMessage);
    setErrorModalVisible(true);
  };

  const doRequestConfirmBooking = async () => {
    if (isWorker()) {
      try {
        const response = await workApiService.doWorkerConfirmWorkBooking(
          workBooking?.id ?? 0
        );
        if (response.status) {
          navigation && navigation.goBack();
        } else {
          showErrorMessage(response.message ?? "");
        }
      } catch (error: any) {
        console.error(error);
        setIsLoading(false);

        if (error.response?.status === 401) {
          console.log(error.response.data);
          const data: ApiErrorResponse = error.response.data;
          showErrorMessage(data.message ?? "");
        } else {
          console.error(error);
        }
      }
      return;
    }
    try {
      const response = await workApiService.doCustomerConfirmWorkBooking(
        workBooking?.id ?? 0
      );
      if (response.status) {
        navigation && navigation.goBack();
      } else {
        showErrorMessage(response.message ?? "");
      }
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);

      if (error.response?.status === 401) {
        console.log(error.response.data);
        const data: ApiErrorResponse = error.response.data;
        showErrorMessage(data.message ?? "");
      } else {
        console.error(error);
      }
    }
  };

  const onConfirmButtonPress = async () => {
    doRequestConfirmBooking();
  };

  const isWorker = () => {
    return user?.id == workBooking?.work.author?.id;
  };

  const isCustomer = () => {
    return user?.id == workBooking?.author?.id;
  };

  const isShowSubmitButton = () => {
    if (isWorker() && workBooking?.workerConfirmStatus.isWaiting) {
      return true;
    }
    if (isCustomer() && workBooking?.customerConfirmStatus.isWaiting) {
      return true;
    }
    return false;
  };

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <ImageOverlay
            style={styles.imageOverlay as ViewStyle}
            source={workBooking?.work.primaryImage}
          />
          <Card style={styles.bookingCard} appearance="filled" disabled={true}>
            <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="ชื่องานที่ต้องการจอง"
                value={workBooking?.work.title ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="รายละเอียดงาน"
                value={workBooking?.work.description ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="วันที่นัด"
                value={workBooking?.formattedBookingDate ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="รายละเอียดการจอง"
                value={workBooking?.customerMessage ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="ผู้จอง"
                value={workBooking?.author?.fullName as string}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="เบอร์ติดต่อ"
                value={workBooking?.mobilePhone ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="สถานะการยืนยันจากเจ้าของงาน"
                value={workBooking?.formattedWorkerConfirmStatus ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="สถานะการยืนยันจากคนจอง"
                value={workBooking?.formattedCustomerConfirmStatus ?? ""}
              />
              {isWorker() && isShowSubmitButton() && (
                <Button
                  style={[
                    styles.confirmButton as ViewStyle,
                    { display: isShowSubmitButton() ? "flex" : "none" },
                  ]}
                  size="giant"
                  onPress={onConfirmButtonPress}
                >
                  ยืนยันรับงาน
                </Button>
              )}
              {isCustomer() && isShowSubmitButton() && (
                <Button
                  style={[
                    styles.confirmButton as ViewStyle,
                    { display: isShowSubmitButton() ? "flex" : "none" },
                  ]}
                  size="giant"
                  onPress={onConfirmButtonPress}
                >
                  ยืนยันการจอง
                </Button>
              )}
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
