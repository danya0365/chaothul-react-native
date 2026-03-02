import useAuth from "@/hooks/auth";
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

type Props = {
  onBarcodeSuccessScanned: (data: string) => void;
};

export default ({ onBarcodeSuccessScanned }: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const { user } = useAuth();
  if (!user) return <></>;

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: "center", color: "white" }}>
            กำลังเข้าถึงกล้องของคุณ
          </Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: "center", color: "white" }}>
            กรุณาเปิดสิทธิให้เราเข้าถึงกล้องของคุณ
          </Text>
          <Button onPress={requestPermission}>อนุญาตให้เข้าถึงกล้อง</Button>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleOnBarcodeScanned = (result: BarcodeScanningResult) => {
    const data = result.data;
    if (data) {
      onBarcodeSuccessScanned(data);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "code128"],
        }}
        mode="picture"
        onBarcodeScanned={handleOnBarcodeScanned}
      >
        <View
          style={{
            ...styles.cameraContainer,
          }}
        >
          <View style={styles.qrContainer}></View>
        </View>
        <View
          style={{
            ...styles.buttonContainer,
            position: "absolute",
            bottom: 64,
            left: 0,
            right: 0,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>สลับกล้อง</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: 300,
    aspectRatio: 1,
    backgroundColor: "red",
    borderRadius: 16,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraContainer: {
    flex: 1,
    margin: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  qrContainer: {
    borderWidth: 5,
    borderStyle: "dashed",
    width: 200,
    aspectRatio: 1,
    borderColor: "text-control-color",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bold: {
    fontFamily: "Sarabun_700Bold",
  },
  extraBold: {
    fontFamily: "Sarabun_800ExtraBold",
  },
  textControl: {
    color: "text-control-color",
  },
});
