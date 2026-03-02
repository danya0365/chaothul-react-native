import LoadingView from "@/components/organisms/loading.view";
import { Recruit } from "@/models/recruit.model";
import { Review } from "@/models/review.model";
import { MeApiService, RecruitApiService } from "@/services/api.service";
import { useAppSelector } from "@/store/hooks";
import {
    Avatar,
    Button,
    Card,
    List,
    StyleService,
    Text,
    useStyleSheet,
} from "@ui-kitten/components";
import { router } from "expo-router";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    ListRenderItemInfo,
    RefreshControl,
    ScrollView,
    View,
} from "react-native";
import httpRequest from "../../services/http-request.service";
import ReviewList from "../review-list";
import { ImageOverlay } from "./extra/image-overlay.component";

interface Props {
  recruitId: number;
  onRecruitInfoReady: (recruit: Recruit) => void;
}

export default ({
  recruitId,
  onRecruitInfoReady,
}: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const recruitApiService = new RecruitApiService(httpRequest);
  const meApiService = new MeApiService(httpRequest);
  const { user } = useAppSelector((state) => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);
  const [recruitInfo, setRecruitInfo] = React.useState<Recruit>();
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCanManageRecruit, setIsCanManageRecruit] = React.useState(false);

  const onBookButtonPress = (): void => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    if (isCanManageRecruit) {
      router.push(`/recruit/${recruitId}/recruit-booking-list`);
      return;
    }
    router.push(`/recruit/${recruitId}/create-booking`);
  };

  const doRequestRecruitDetail = async (callback: () => void) => {
    setIsLoading(true);
    try {
      const response = await recruitApiService.getRecruitDetail(recruitId);
      const responseRecruit = Recruit.createFromApi(response.data);
      setRecruitInfo(responseRecruit);

      // fetch reviews separately
      const reviewResponse = await recruitApiService.getRecruitReviews(recruitId, 1, 20);
      if (reviewResponse.status && reviewResponse.data) {
        setReviews(
          (reviewResponse.data as any[]).map((r: any) => Review.createFromApi(r))
        );
      }

      callback();
      setIsLoading(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log(error.response.data);
        const data = error.response.data;
      } else {
        console.error(error);
      }
      callback();
      setIsLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    doRequestRecruitDetail(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    doRequestRecruitDetail(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    if (recruitInfo) onRecruitInfoReady(recruitInfo);

    if (user && recruitInfo?.author?.id == user?.id) {
      setIsCanManageRecruit(true);
    } else {
      setIsCanManageRecruit(false);
    }
  }, [recruitInfo]);

  const renderImageItem = (
    info: ListRenderItemInfo<ImageSourcePropType>
  ): React.ReactElement => (
    <Image style={styles.imageItem as any} source={info.item} />
  );

  const renderDetailItem = (
    detail: string,
    index: string
  ): React.ReactElement => (
    <Button
      key={index}
      style={styles.detailItem}
      appearance="outline"
      size="tiny"
    >
      {detail}
    </Button>
  );

  return (
    <>
      {recruitInfo && (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ImageOverlay
            style={styles.image as any}
            source={recruitInfo.primaryImage}
          />
          <Card style={styles.bookingCard} appearance="filled" disabled={true}>
            <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
              <Text style={styles.title} category="h6">
                {recruitInfo.title}
              </Text>
              <Text style={styles.rentLabel} appearance="hint" category="p2">
                งบประมาณ
              </Text>
              <Text style={styles.priceLabel} category="h6">
                {recruitInfo.formattedBudget}
              </Text>
              <Button style={styles.bookButton} onPress={onBookButtonPress}>
                {isCanManageRecruit ? `ดูรายการจอง` : `จองเลย`}
              </Button>
            </View>
          </Card>
          {recruitInfo ? (
            <View style={styles.itemFooter}>
              <Avatar source={recruitInfo.author?.photoUrl} />
              <View style={styles.itemAuthoringContainer}>
                <Text category="s2">{recruitInfo.author?.fullName}</Text>
                <Text appearance="hint" category="c1">
                  {recruitInfo.formattedDate}
                </Text>
              </View>
            </View>
          ) : null}
          <Text style={styles.sectionLabel} category="s1">
            รายละเอียดงาน
          </Text>
          <Text style={styles.description} appearance="hint">
            {recruitInfo.description}
          </Text>
          {recruitInfo.images.length > 0 && (
            <>
              <Text style={styles.sectionLabel} category="s1">
                ตัวอย่างงาน
              </Text>
              <List
                contentContainerStyle={styles.imagesList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={recruitInfo.images}
                renderItem={renderImageItem}
              />
            </>
          )}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel} category="s1">
              รีวิวจากผู้ว่าจ้าง
            </Text>
            {user && !isCanManageRecruit && (
              <Button
                size="small"
                appearance="outline"
                onPress={() => router.push(`/recruit/${recruitId}/create-review`)}
              >
                เขียนรีวิว
              </Button>
            )}
          </View>
          <ReviewList reviews={reviews} />
        </ScrollView>
      )}
      {isLoading && <LoadingView />}
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-2",
    marginBottom: 44,
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  title: {
    width: "65%",
  },
  rentLabel: {
    marginTop: 24,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  calendar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 4,
  },
  imagesList: {
    padding: 8,
    backgroundColor: "background-basic-color-2",
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  itemFooter: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
