import React, { ReactElement } from "react";
import { View, TouchableWithoutFeedback, NativeModules } from "react-native";
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
  Modal,
  Card,
} from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { PersonIcon } from "./extra/icons";
import { StackActions } from "@react-navigation/native";
import httpRequest from "../../services/http-request.service";
import { AuthApiService } from "../../services/api.service";
import { router } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import {
  authStart,
  loginFailure,
  loginSuccess,
  setUser,
} from "@/store/reducer/auth-reducer";
import { UserProfile } from "@/models/user-profile";
import { KeyboardAvoidingView } from "@/components/atoms/keyboard-avoiding-view.component";
import AlertModalComponent from "@/components/molecules/alert-modal.component";
import LoadingView from "@/components/organisms/loading.view";

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
        // TODO:
        router.push("/todo");
        //navigation && navigation.dispatch(StackActions.popToTop());
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

  const onSignUpButtonPress = (): void => {
    // TODO:
    router.push("/todo");
    //navigation && navigation.navigate("Register Screen");
  };

  const onSignInButtonPress = (): void => {
    if (!loading) doRequestLogin();
  };

  const onForgotPasswordButtonPress = (): void => {
    // TODO:
    router.push("/todo");
    //navigation && navigation.navigate("Forgot Password Screen");
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
      // TODO:
      router.push("/todo");
      //navigation && navigation.dispatch(StackActions.popToTop());
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
          <Input
            style={styles.passwordInput}
            placeholder="รหัสผ่าน"
            accessoryRight={renderPasswordIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              status="basic"
              onPress={onForgotPasswordButtonPress}
            >
              ลืมรหัสผ่าน
            </Button>
          </View>
        </Layout>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}
        >
          เข้าสู่ระบบ
        </Button>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="basic"
          onPress={onSignUpButtonPress}
        >
          ยังไม่มีบัญชี?, สมัครเลย
        </Button>
      </KeyboardAvoidingView>
      <AlertModalComponent
        modalMessage={error ?? ""}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {loading && <LoadingView onDismissPress={() => {}} />}
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
    backgroundColor: "#4dbb1a",
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
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
