import DialpadKeypad from "@/components/molecules/dialpad-keypad/dialpad-keypad.view";
import DialpadPin from "@/components/molecules/dialpad-pin/dialpad-pin";
import useAuth from "@/hooks/auth";
import { AuthApiService } from "@/services/api.service";
import { setBearerToken } from "@/services/http-request.service";
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");

const dialPadContent = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "X"];

const dialPadSize = width * 0.2;
const dialPadTextSize = dialPadSize * 0.4;

const pinLength = 6;
const pinContainerSize = width / 2;
const pinSize = pinContainerSize / pinLength;

type Props = {
  authApiService?: AuthApiService;
};

export default ({
  authApiService = new AuthApiService(),
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const {
    authStart,
    logoutSuccess,
    setLoginPinCode,
    setPinCode: setSecurityPinCode,
    token,
  } = useAuth();
  const [code, setCode] = useState<string[]>([]);
  const [pinCodeErrors, setPinCodeErrors] = useState<string[]>([]);

  const onLoginButtonClick = async () => {
    setPinCodeErrors([]);
    const pinCodeValue = code.join("");
    setSecurityPinCode(pinCodeValue);
    setLoginPinCode(pinCodeValue);
    router.push("/");
  };
  const onLogoutButtonClick = async () => {
    if (token) {
      try {
        authStart();
        await authApiService.doRequestLogout(token);
      } catch {}
    }
    setBearerToken("");
    logoutSuccess();
    router.replace("/");
  };

  useEffect(() => {
    if (code.length === pinLength) onLoginButtonClick();
  }, [code]);

  useEffect(() => {
    if (code.length === pinLength) onLoginButtonClick();
  }, [code]);

  return (
    <View style={{ ...styles.container, justifyContent: "space-between" }}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 16,
          flex: 1,
        }}
      >
        <Text style={styles.pinSubText}>ตั้งรหัส PIN</Text>
        <DialpadPin
          pinLength={pinLength}
          pinSize={pinSize}
          code={code}
          dialPadContent={dialPadContent}
        />
        {pinCodeErrors.length > 0 ? (
          <Text style={styles.errorLabel} category="s1">
            {pinCodeErrors.join(", ")}
          </Text>
        ) : null}
        <DialpadKeypad
          dialPadContent={dialPadContent}
          code={code}
          setCode={setCode}
          dialPadSize={dialPadSize}
          dialPadTextSize={dialPadTextSize}
        />
      </View>
      <View
        style={{
          width: "100%",
          padding: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 16,
            backgroundColor: "transparent",
          }}
        >
          <Button
            onPress={() => {
              onLogoutButtonClick();
            }}
            status="danger"
            style={{ flex: 1, borderRadius: 16 }}
          >
            ออกจากระบบ
          </Button>
        </View>
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  pinText: {
    fontSize: 30,
    fontFamily: "Sarabun_100Thin",
  },
  pinSubText: {
    fontSize: 18,
    fontFamily: "Sarabun_700Bold",
    marginVertical: 20,
    color: "text-control-color",
  },
  dialPadContainer: {
    width: dialPadSize,
    height: dialPadSize,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 50,
    borderColor: "transparent",
  },
  dialPadText: {
    fontSize: dialPadTextSize,
  },
  errorLabel: {
    marginTop: 4,
    marginBottom: 8,
    color: "text-danger-color",
  },
});
