import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";
import useAuth from "@/hooks/auth";
import useRecruit from "@/hooks/recruit";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Card,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import React, { useMemo } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { RecruitApiService } from "../../services/api.service";
import httpRequest, {
  ApiErrorResponse,
} from "../../services/http-request.service";
import { ImageOverlay } from "./extra/image.overlay.component";
import { WorkInfoValue } from "./extra/work-info-value.component";

interface Props {
  recruitBookingId: number;
}

export default ({ recruitBookingId }: Props): React.ReactElement => {
  const navigation = useNavigation();
  const recruitApiService = new RecruitApiService(httpRequest);
  const [errorModalMessage, setErrorModalMessage] = React.useState<string>("");
  const [errorModalVisible, setErrorModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);
  const { recruitBookings, setRecruitBookings } = useRecruit();
  const { user } = useAuth();

  const recruitBooking = useMemo(() => {
    return recruitBookings.find(
      (val) => Number(val.id) === Number(recruitBookingId)
    );
  }, [recruitBookings, recruitBookingId]);

  const showErrorMessage = (errorMessage: string) => {
    setErrorModalMessage(errorMessage);
    setErrorModalVisible(true);
  };

  const doRequestConfirmBooking = async () => {
    if (isWorker()) {
      try {
        const response = await recruitApiService.doWorkerConfirmRecruitBooking(
          recruitBooking?.id ?? 0
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
      const response = await recruitApiService.doCustomerConfirmRecruitBooking(
        recruitBooking?.id ?? 0
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
    return user?.id == recruitBooking?.recruit.author?.id;
  };

  const isCustomer = () => {
    return user?.id == recruitBooking?.author?.id;
  };

  const isShowSubmitButton = () => {
    if (isWorker() && recruitBooking?.workerConfirmStatus.isWaiting) {
      return true;
    }
    if (isCustomer() && recruitBooking?.customerConfirmStatus.isWaiting) {
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
            source={recruitBooking?.recruit.primaryImage}
          />
          <Card style={styles.bookingCard} appearance="filled" disabled={true}>
            <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="ชื่องานที่ต้องการจอง"
                value={recruitBooking?.recruit.title ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="รายละเอียดงาน"
                value={recruitBooking?.recruit.description ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="วันที่นัด"
                value={recruitBooking?.formattedBookingDate ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="รายละเอียดการจอง"
                value={recruitBooking?.customerMessage ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="ผู้จอง"
                value={recruitBooking?.author?.fullName as string}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="เบอร์ติดต่อ"
                value={recruitBooking?.mobilePhone ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="สถานะการยืนยันจากเจ้าของงาน"
                value={recruitBooking?.formattedWorkerConfirmStatus ?? ""}
              />
              <WorkInfoValue
                style={[styles.workInfoValue, styles.workInfoSection]}
                hint="สถานะการยืนยันจากคนจอง"
                value={recruitBooking?.formattedCustomerConfirmStatus ?? ""}
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
