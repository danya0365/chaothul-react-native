import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";
import { UserProfile } from "@/models/user-profile";
import { loginSuccess, setUser } from "@/store/reducer/auth-reducer";
import {
  Button,
  CheckBox,
  Icon,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React, { ReactElement } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import { AuthApiService } from "../../services/api.service";
import httpRequest, {
  ApiErrorResponse,
  setBearerToken,
} from "../../services/http-request.service";
import { EmailIcon, PersonIcon, PlusIcon } from "./extra/icons";
import { ProfileAvatar } from "./extra/profile-avatar.component";

export default (): React.ReactElement => {
  const dispatch = useDispatch();
  const apiService = new AuthApiService(httpRequest);

  const [firstName, setFirstName] = React.useState<string>();
  const [lastName, setLastName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    doRequestRegister();
  };

  const onSignInButtonPress = (): void => {
    // TODO:
    router.push("/todo");
    // navigation && navigation.navigate("Login Screen");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const doRequestRegister = async () => {
    if (!firstName) {
      showErrorMessage("กรุณากรอกชื่อ");
      return;
    }
    if (!lastName) {
      showErrorMessage("กรุณากรอกนามสกุล");
      return;
    }
    if (!email) {
      showErrorMessage("กรุณากรอกอีเมล");
      return;
    }
    if (!password) {
      showErrorMessage("กรุณากรอกรหัสผ่าน");
      return;
    }
    if (!termsAccepted) {
      showErrorMessage("กรุณายอมรับเงื่อนไข");
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiService.doRequestRegister({
        email,
        password,
        firstName,
        lastName,
      });
      setIsLoading(false);
      if (response.status) {
        const token = response.data.token;
        const user = response.data.user;
        setBearerToken(token);
        dispatch(
          loginSuccess({
            token: token,
          })
        );
        dispatch(setUser(UserProfile.createFromApi(user)));
        router.push("/(app)/(root)/(bottom-tab)/profile-menu");
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

  const showErrorMessage = (errorMessage: string) => {
    setError(errorMessage);
    setModalVisible(true);
  };

  const renderEditAvatarButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryRight={PlusIcon}
    />
  );

  const renderPasswordIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderCheckboxLabel = React.useCallback(
    (evaProps: any) => (
      <Text {...evaProps} style={styles.termsCheckBoxText}>
        ฉันยอมรับเงื่อนไขข้อตกลงการสมัครสมาชิก
      </Text>
    ),
    []
  );

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerContainer}>
          <ProfileAvatar
            style={styles.profileAvatar as any}
            resizeMode="center"
            source={require("./assets/image-person.png")}
            editButton={renderEditAvatarButton}
          />
        </View>
        <Layout style={styles.formContainer} level="1">
          <Input
            autoCapitalize="none"
            placeholder="ชื่อ"
            accessoryRight={PersonIcon}
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            style={styles.lastNameInput}
            autoCapitalize="none"
            placeholder="นามสกุล"
            accessoryRight={PersonIcon}
            value={lastName}
            onChangeText={setLastName}
          />
          <Input
            style={styles.emailInput}
            autoCapitalize="none"
            placeholder="อีเมล"
            accessoryRight={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            autoCapitalize="none"
            secureTextEntry={!passwordVisible}
            placeholder="รหัสผ่าน"
            accessoryRight={renderPasswordIcon}
            value={password}
            onChangeText={setPassword}
          />
          <CheckBox
            style={styles.termsCheckBox}
            checked={termsAccepted}
            onChange={(checked: boolean) => setTermsAccepted(checked)}
          >
            {renderCheckboxLabel}
          </CheckBox>
        </Layout>
        <Button
          style={styles.signUpButton}
          size="giant"
          onPress={onSignUpButtonPress}
        >
          ยืนยันสมัครสมาชิก
        </Button>
        <Button
          style={styles.signInButton}
          appearance="ghost"
          status="basic"
          onPress={onSignInButtonPress}
        >
          มีบัญชีอยู่แล้ว?, ลองเข้าส่ระบบ
        </Button>
      </KeyboardAvoidingView>
      <AlertModalComponent
        modalMessage={error}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    tintColor: "color-primary-default",
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
  lastNameInput: {
    marginTop: 16,
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
    marginBottom: 24,
  },
  termsCheckBoxText: {
    color: "text-hint-color",
    marginLeft: 10,
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
