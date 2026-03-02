import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";
import { WorkApiService } from "@/services/api.service";
import httpRequest, { ApiErrorResponse } from "@/services/http-request.service";
import {
    Button,
    Card,
    Input,
    StyleService,
    Text,
    useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

interface Props {
  workId: number;
}

const STARS = [1, 2, 3, 4, 5];

export default ({ workId }: Props): React.ReactElement => {
  const navigation = useNavigation();
  const workApiService = new WorkApiService(httpRequest);
  const styles = useStyleSheet(themedStyles);

  const [rating, setRating] = React.useState<number>(0);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorModalMessage, setErrorModalMessage] = React.useState("");
  const [errorModalVisible, setErrorModalVisible] = React.useState(false);

  const showError = (msg: string) => {
    setErrorModalMessage(msg);
    setErrorModalVisible(true);
  };

  const onSubmitPress = async () => {
    if (rating === 0) {
      showError("กรุณาเลือกคะแนน");
      return;
    }
    if (!content.trim()) {
      showError("กรุณากรอกรีวิว");
      return;
    }

    setIsLoading(true);
    try {
      const response = await workApiService.createWorkReview(
        workId,
        content.trim(),
        rating,
        title.trim() || undefined
      );
      setIsLoading(false);
      if (response.status) {
        navigation.goBack();
      } else {
        showError((response as any).message ?? "เกิดข้อผิดพลาด");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response?.status === 401) {
        const data: ApiErrorResponse = error.response.data;
        showError(data.message ?? "กรุณาเข้าสู่ระบบ");
      } else {
        showError("เกิดข้อผิดพลาด กรุณาลองใหม่");
        console.error(error);
      }
    }
  };

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <Card style={styles.card} appearance="filled" disabled={true}>
            <View style={{ paddingVertical: 16, paddingHorizontal: 8 }}>
              {/* Rating */}
              <Text category="s1" style={styles.label}>
                คะแนน
              </Text>
              <View style={styles.starsRow}>
                {STARS.map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    style={styles.starButton}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.star, star <= rating && styles.starActive]}>
                      ★
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text appearance="hint" category="c1" style={styles.ratingLabel}>
                {rating === 0
                  ? "แตะดาวเพื่อให้คะแนน"
                  : ["", "แย่มาก", "พอใช้", "ปานกลาง", "ดีมาก", "ดีเยี่ยม"][rating]}
              </Text>

              {/* Title (optional) */}
              <Input
                label="หัวข้อรีวิว (ไม่บังคับ)"
                style={styles.input}
                autoCapitalize="none"
                placeholder="เช่น งานดีมาก ตรงเวลา"
                value={title}
                onChangeText={setTitle}
              />

              {/* Content */}
              <Input
                label="รีวิว *"
                multiline={true}
                textStyle={styles.inputTextStyle}
                style={styles.input}
                autoCapitalize="none"
                placeholder="เล่าประสบการณ์ของคุณ..."
                value={content}
                onChangeText={setContent}
              />

              <Button
                style={styles.submitButton}
                size="giant"
                onPress={onSubmitPress}
                disabled={isLoading}
              >
                ส่งรีวิว
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
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 12,
  },
  label: {
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  starButton: {
    paddingHorizontal: 4,
  },
  star: {
    fontSize: 40,
    color: "background-basic-color-4",
  },
  starActive: {
    color: "color-warning-500",
  },
  ratingLabel: {
    marginBottom: 16,
    height: 16,
  },
  input: {
    marginTop: 16,
  },
  inputTextStyle: {
    minHeight: 80,
  },
  submitButton: {
    marginTop: 24,
    marginBottom: 8,
  },
});
