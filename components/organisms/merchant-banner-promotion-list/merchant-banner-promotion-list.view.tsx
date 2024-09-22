import { BannerPromotion } from "@/models/banner-promotion";
import { BannerApiService } from "@/services/api.service";
import { useAppDispatch, UseAppDispatch, useAppSelector } from "@/store/hooks";
import { setBannerPromotions } from "@/store/reducer/banner-reducer";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import BannerPromotionItemView from "./partials/banner-promotion-item.view";
import LoadMoreView from "./partials/load-more.view";

type Props = {
  submitDate: Date;
  textSearch: string;
  tag: string;
  bannerApiService?: BannerApiService;
  dispatch?: UseAppDispatch;
};

export default (props: Props): React.ReactElement => {
  const navigation = useNavigation();
  const {
    submitDate,
    textSearch,
    tag,
    bannerApiService = new BannerApiService(),
    dispatch = useAppDispatch(),
  } = props;
  const styles = useStyleSheet(themedStyles);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerPromotions, setBannerPromotions] = useState<BannerPromotion[]>(
    []
  );
  const [isCanLoadMore, setIsCanLoadMore] = useState(true);
  const pageRef = useRef(1);

  const getBanners = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const response = await bannerApiService.getMerchantBannerPromotions({
        page: pageNumber,
        tag,
        textSearch,
      });
      if (response.status) {
        let newBanners = response.data.map((val) =>
          BannerPromotion.createFromApi(val)
        );
        newBanners = newBanners.sort((a, b) => {
          if (a.id < b.id) {
            return 1;
          }
          if (a.id > b.id) {
            return -1;
          }
          return 0;
        });
        if (pageNumber === 1) {
          setBannerPromotions(newBanners);
        } else {
          setBannerPromotions((prev) => [...prev, ...newBanners]);
        }
        if (newBanners.length === 0) {
          setIsCanLoadMore(false);
        } else {
          setIsCanLoadMore(true);
        }
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (bannerPromotions.length === 0) getBanners(1);
    });

    return unsubscribe;
  }, [navigation, bannerPromotions]);

  React.useEffect(() => {
    getBanners(1);
  }, [submitDate, tag, textSearch]);

  return (
    <Layout level="1" style={styles.container}>
      {bannerPromotions.map((bannerPromotion) => (
        <BannerPromotionItemView
          key={bannerPromotion.id}
          bannerPromotion={BannerPromotion.createFromObject(bannerPromotion)}
        />
      ))}
      <LoadMoreView
        onLoadMoreClick={() => {
          getBanners((pageRef.current += 1));
        }}
        itemCount={bannerPromotions.length}
        isCanLoadMore={isCanLoadMore}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
});
