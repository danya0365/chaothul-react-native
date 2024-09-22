import {
  Avatar,
  Button,
  Card,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import { useSelector } from "react-redux";
import { MessageCircleIcon } from "@/components/atoms/icons";
import { Work } from "@/models/work.model";
import { MeApiService, WorkApiService } from "../../services/api.service";
import httpRequest, {
  ApiErrorResponse,
} from "../../services/http-request.service";
import ReviewList from "../review-list";
import BookingCalendarComponent from "./extra/booking-calendar.component";
import { ImageOverlay } from "./extra/image-overlay.component";
import LikeButtonComponent from "./extra/like-button.component";
import { router } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import LoadingView from "@/components/organisms/loading.view";

interface Props {
  workId: number;
  onWorkInfoReady: (work: Work) => void;
}

export default ({ workId, onWorkInfoReady }: Props): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);
  const workApiService = new WorkApiService(httpRequest);
  const meApiService = new MeApiService(httpRequest);
  const { token, user } = useAppSelector((state) => state.auth);
  const [isCanManageWork, setIsCanManageWork] = React.useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const [workInfo, setWorkInfo] = React.useState<Work>();
  const [isUserLike, setIsUserLike] = React.useState(false);
  const [isLikeButtonDisabled, setIsLikeButtonDisabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onBookButtonPress = (): void => {
    if (!token) {
      // TODO:
      router.push("/todo");
      //navigation.navigate("Login Screen");
      return;
    }
    if (isCanManageWork) {
      // TODO:
      router.push("/todo");
      // navigation &&
      //   navigation.navigate("Work Booking List Screen", { work: workInfo });
      return;
    }
    // TODO:
    router.push("/todo");
    // navigation &&
    //   navigation.navigate("Work Booking Screen", { work: workInfo });
  };

  const getIsUserLikeWork = async () => {
    try {
      const response = await meApiService.isLikeWork(workId);
      if (response.status) {
        setIsUserLike(response.data);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log(err.response.data);
        const data: ApiErrorResponse = err.response.data;
        console.log(data);
      } else {
        console.error(err);
      }
    }
  };

  const getWorkLikeCount = async (): Promise<number> => {
    try {
      const response = await workApiService.getLikeCount(workId);
      if (response.status) {
        return response.data;
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        console.log(err.response.data);
        const data: ApiErrorResponse = err.response.data;
        console.log(data);
      } else {
        console.error(err);
      }
    }
    return 0;
  };

  const onLikeWorkPress = async () => {
    setIsLikeButtonDisabled(true);
    setIsUserLike(!isUserLike);
    try {
      const response = await workApiService.doLikeWork(workId);
      if (response.status) {
        workInfo?.setLikeCount(
          !isUserLike ? workInfo.likeCount + 1 : workInfo.likeCount - 1
        );
        setWorkInfo(workInfo);
      } else {
        setIsUserLike(!isUserLike);
      }
      setIsLikeButtonDisabled(false);
    } catch (err: any) {
      setIsUserLike(!isUserLike);
      setIsLikeButtonDisabled(false);

      if (err.response?.status === 401) {
        console.log(err.response.data);
        const data: ApiErrorResponse = err.response.data;
        console.log(data);
      } else {
        console.error(err);
      }
    }
  };

  const doRequestWorkDetail = async (callback: any) => {
    setIsLoading(true);
    try {
      const response = await workApiService.getWorkDetail(workId);
      const responseWork = Work.createFromApi(response.data);
      const likeCount = await getWorkLikeCount();
      responseWork.setLikeCount(likeCount);
      setWorkInfo(responseWork);
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
    getIsUserLikeWork();
    doRequestWorkDetail(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    getIsUserLikeWork();
    doRequestWorkDetail(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    if (workInfo) {
      onWorkInfoReady(workInfo);
    }

    if (token && workInfo?.author?.id == user?.id) {
      setIsCanManageWork(true);
    } else {
      setIsCanManageWork(false);
    }
  }, [workInfo]);

  const renderImageItem = (
    info: ListRenderItemInfo<ImageSourcePropType>
  ): React.ReactElement => (
    <Image style={styles.imageItem as ImageStyle} source={info.item} />
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

  const likeButtonItem = (): React.ReactElement => {
    return (
      <LikeButtonComponent
        workInfo={workInfo!}
        isUserLike={isUserLike}
        isLikeButtonDisabled={isLikeButtonDisabled}
        onLikeWorkPress={onLikeWorkPress}
      />
    );
  };

  const renderWorkFooter = (): React.ReactElement => (
    <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
      <Text category="s1">ทะเบียนรถ</Text>
      <View style={styles.detailsList}>
        {renderDetailItem(workInfo?.code || "-", `plate-number-1`)}
      </View>
    </View>
  );

  const getCalendar = () => {
    return (
      <BookingCalendarComponent
        workId={workId}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    );
  };

  return (
    <>
      {workInfo && (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ImageOverlay
            style={styles.imageOverlay as ViewStyle}
            source={workInfo.primaryImage}
          />
          <Card
            style={styles.bookingCard}
            appearance="filled"
            disabled={true}
            footer={renderWorkFooter}
          >
            <View style={{ paddingVertical: 16, paddingHorizontal: 24 }}>
              <Text style={styles.title} category="h6">
                {workInfo.title}
              </Text>
              <Text style={styles.rentLabel} appearance="hint" category="p2">
                ค่าบริการ
              </Text>
              <Text style={styles.priceLabel} category="h6">
                {workInfo.formattedPrice}
              </Text>
              <Button style={styles.bookButton} onPress={onBookButtonPress}>
                {isCanManageWork ? `ดูรายการจอง` : `จองเลย`}
              </Button>
            </View>
          </Card>
          <View style={styles.itemFooter}>
            <Avatar source={workInfo.author.photoUrl} />
            <View style={styles.itemAuthoringContainer}>
              <Text category="s2">{workInfo.author.fullName}</Text>
              <Text appearance="hint" category="c1">
                {workInfo.formattedDate}
              </Text>
            </View>
            <Button
              style={styles.iconButton}
              appearance="ghost"
              status="basic"
              accessoryLeft={MessageCircleIcon}
            >
              {`${workInfo.reviews.length}`}
            </Button>
            {likeButtonItem()}
          </View>
          <Text style={styles.sectionLabel} category="s1">
            ตารางคิวงาน
          </Text>
          <View style={styles.calendar}>{getCalendar()}</View>
          <Text style={styles.sectionLabel} category="s1">
            รายละเอียดงาน
          </Text>
          <Text style={styles.description} appearance="hint">
            {workInfo.description}
          </Text>
          {workInfo.images.length > 0 && (
            <>
              <Text style={styles.sectionLabel} category="s1">
                ตัวอย่างผลงาน
              </Text>
              <List
                contentContainerStyle={styles.imagesList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={workInfo.images}
                renderItem={renderImageItem}
              />
            </>
          )}
          <Text style={styles.sectionLabel} category="s1">
            รีวิวจากผู้ว่าจ้าง
          </Text>
          <ReviewList reviews={workInfo.reviews} />
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
  imageOverlay: {
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
