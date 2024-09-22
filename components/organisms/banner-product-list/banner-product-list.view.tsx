import { BannerProduct } from "@/models/banner-product";
import { BannerApiService } from "@/services/api.service";
import { useAppDispatch, UseAppDispatch } from "@/store/hooks";
import { Layout, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import BannerProductItemView from "./partials/banner-product-item.view";
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
  const [bannerProducts, setBannerProducts] = useState<BannerProduct[]>([]);
  const [isCanLoadMore, setIsCanLoadMore] = useState(true);
  const pageRef = useRef(1);

  const getBanners = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const response = await bannerApiService.getBannerProducts({
        page: pageNumber,
        tag,
        textSearch,
      });
      if (response.status) {
        let newBanners = response.data.map((val) =>
          BannerProduct.createFromApi(val)
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
          setBannerProducts(newBanners);
        } else {
          setBannerProducts((prev) => [...prev, ...newBanners]);
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
      if (bannerProducts.length === 0) getBanners(1);
    });

    return unsubscribe;
  }, [navigation, bannerProducts]);

  React.useEffect(() => {
    getBanners(1);
  }, [submitDate, tag, textSearch]);

  return (
    <Layout level="1" style={styles.container}>
      {bannerProducts.map((bannerProduct) => (
        <BannerProductItemView
          key={bannerProduct.id}
          bannerProduct={BannerProduct.createFromObject(bannerProduct)}
        />
      ))}
      <LoadMoreView
        onLoadMoreClick={() => {
          getBanners((pageRef.current += 1));
        }}
        itemCount={bannerProducts.length}
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
