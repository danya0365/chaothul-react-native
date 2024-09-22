import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Datepicker,
  Divider,
  IndexPath,
  Input,
  InputProps,
  Layout,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { router } from "expo-router";
import { Province } from "@/models/province.model";
import { useAppSelector } from "@/store/hooks";
import { CalendarIcon, SearchIcon } from "@/components/atoms/icons";

const useInputState = (initialValue = ""): InputProps => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

export interface SearchParam {
  keyword?: string;
  province?: Province;
  date?: Date;
}

export const SearchBox = (): React.ReactElement => {
  const { provinces } = useAppSelector((state) => state.app);
  const searchKeywordInputState = useInputState();
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(
    new IndexPath(0)
  );
  const [date, setDate] = React.useState();
  const displayValue = useMemo(() => {
    provinces ? provinces[selectedIndex.row] : new Province("0", "ทั้งหมด");
  }, [provinces, selectedIndex]);

  return (
    <Layout style={styles.container} key={`search-box-body`}>
      <View style={styles.rowContainer} key={`search-box-header`}>
        <Text style={{ paddingVertical: 8 }} category="h6">
          {`คุณต้องการอะไร`}
        </Text>
      </View>
      <View style={styles.rowContainer} key={`search-box-container`}>
        <Card style={styles.card} key={`search-box-card`}>
          <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
            <Input
              style={styles.searchKeywordInput}
              status="basic"
              placeholder="คำค้นหา"
              accessoryLeft={SearchIcon}
              {...searchKeywordInputState}
            />
            <View style={[styles.rowContainer, { marginTop: 8 }]}>
              <Datepicker
                label="วันที่"
                style={styles.select}
                placeholder="เลือกวันที่"
                date={date}
                onSelect={(nextDate) => setDate(nextDate)}
                accessoryRight={CalendarIcon}
              />
              <Divider />
              <Select
                label="จังหวัด"
                style={styles.select}
                placeholder="Default"
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index as IndexPath)}
              >
                {provinces
                  ? provinces.map(({ key, title }, index) => (
                      <SelectItem title={title} key={key} />
                    ))
                  : []}
              </Select>
            </View>
            <Button
              status="primary"
              style={[styles.searchButton, {}]}
              onPressOut={() => {
                // TODO:
                router.push("/todo");
                // navigation.navigate("Search Screen", {
                //   q: {
                //     keyword: searchKeywordInputState.value,
                //     province: provinces[selectedIndex.row],
                //     date: date,
                //   },
                // });
              }}
              accessoryLeft={SearchIcon}
            >
              ค้นหา
            </Button>
          </View>
        </Card>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    margin: 2,
    flex: 1,
    borderRadius: 20,
  },
  select: {
    margin: 2,
    flex: 1,
  },
  searchButton: {
    fontSize: 20,
    borderRadius: 20,
    marginTop: 8,
  },
  searchKeywordInput: {
    margin: 2,
    borderRadius: 20,
  },
});
