import LoadingView from "@/components/organisms/loading.view";
import { Review } from "@/models/review.model";
import { MeApiService } from "@/services/api.service";
import httpRequest from "@/services/http-request.service";
import {
    Avatar,
    List,
    ListItem,
    StyleService,
    Text,
    useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { ListRenderItemInfo, RefreshControl, View } from "react-native";

const STAR_LABELS = ["", "แย่มาก", "พอใช้", "ปานกลาง", "ดีมาก", "ดีเยี่ยม"];

export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const meApiService = new MeApiService(httpRequest);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchMyReviews = async (callback: () => void) => {
    setIsLoading(true);
    try {
      const response = await meApiService.getMePosts(1);
      if (response.status && response.data) {
        setReviews(
          (response.data as any[]).map((r: any) => Review.createFromApi(r))
        );
      }
      callback();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      callback();
      setIsLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchMyReviews(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    fetchMyReviews(() => setRefreshing(false));
  }, []);

  const renderItem = ({
    item,
  }: ListRenderItemInfo<Review>): React.ReactElement => (
    <ListItem
      style={styles.item}
      title={item.author?.fullName ?? ""}
      description={item.shortContent}
      accessoryLeft={() => (
        <Avatar style={styles.avatar as any} source={item.author?.photoUrl} />
      )}
      accessoryRight={() => (
        <View style={styles.meta}>
          <Text category="c1">{"⭐".repeat(item.rating)}</Text>
          <Text appearance="hint" category="c2">
            {item.formattedDate}
          </Text>
        </View>
      )}
    />
  );

  return (
    <>
      <List
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.list}
        data={reviews}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText} appearance="hint">
            ยังไม่มีรีวิว
          </Text>
        }
      />
      {isLoading && <LoadingView />}
    </>
  );
};

const themedStyles = StyleService.create({
  list: { flex: 1 },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-3",
  },
  avatar: {
    width: 40,
    height: 40,
    tintColor: "transparent",
    marginRight: 8,
  },
  meta: {
    alignItems: "flex-end",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
  },
});
