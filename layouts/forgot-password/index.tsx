import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";
import { UserProfile } from "@/models/user-profile";
import { useAppSelector } from "@/store/hooks";
import {
  authStart,
  loginFailure,
  loginSuccess,
  setUser,
} from "@/store/reducer/auth-reducer";
import {
  Button,
  Icon,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React, { ReactElement } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import { AuthApiService } from "../../services/api.service";
import httpRequest from "../../services/http-request.service";
import { PersonIcon } from "./extra/icons";

export default (): React.ReactElement => {
  const dispatch = useDispatch();
  const apiService = new AuthApiService(httpRequest);
  const { token, user, loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const styles = useStyleSheet(themedStyles);

  const doRequestLogin = async () => {
    dispatch(authStart());
    try {
      const response = await apiService.doRequestLogin({ email, password });
      if (response.status) {
        const token = response.data.token;
        const user = response.data.user;
        const permission = response.data.permission;
        dispatch(
          loginSuccess({
            token: token,
          })
        );
        dispatch(setUser(UserProfile.createFromApi(user)));
        router.push("/(app)/(root)/(bottom-tab)/profile-menu");
      } else {
        dispatch(loginFailure(response.message ?? ""));
        setModalVisible(true);
      }
    } catch (err) {
      console.error(err);
      dispatch(loginFailure(err as string));
      setModalVisible(true);
    }
  };

  const onSubmitButtonPress = (): void => {
    //router.push("/auth/register");
    //
  };

  const onSignInButtonPress = (): void => {
    router.push("/auth/login");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const isEmail = (text: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(text);
  };

  React.useEffect(() => {
    if (token) {
      router.push("/(app)/(root)/(bottom-tab)/profile-menu");
    }
  }, []);

  return (
    <View>
      <KeyboardAvoidingView style={styles.container}>
        <Layout style={styles.formContainer} level="1">
          <Input
            placeholder="อีเมล"
            accessoryRight={PersonIcon}
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Layout>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSubmitButtonPress}
        >
          ยันยัน
        </Button>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="basic"
          onPress={onSignInButtonPress}
        >
          จำรหัสผ่านได้แล้ว?, เข้าสู่ระบบ
        </Button>
      </KeyboardAvoidingView>
      <AlertModalComponent
        modalMessage={error ?? ""}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {loading && <LoadingView />}
    </View>
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
    backgroundColor: "color-secondary-500",
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
