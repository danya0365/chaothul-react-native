import React, { memo } from "react";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { View } from "react-native";

enum AlertModalType {
  Success,
  Error,
}

interface Props {
  modalVisible: boolean;
  setModalVisible: any;
  modalMessage: string;
  modalType?: AlertModalType;
}

const AlertModal = ({
  modalVisible,
  setModalVisible,
  modalMessage,
  modalType = AlertModalType.Error,
}: Props) => {
  return (
    <Modal
      visible={modalVisible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onBackdropPress={() => setModalVisible(false)}
    >
      <Card disabled={true}>
        <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
          <Text
            category="s1"
            status="control"
            style={{
              color: modalType == AlertModalType.Error ? "red" : "green",
              marginBottom: 16,
            }}
          >
            {`${modalMessage}`}
          </Text>
          <Button onPress={() => setModalVisible(false)}>ปิด</Button>
        </View>
      </Card>
    </Modal>
  );
};

export default memo(AlertModal);
