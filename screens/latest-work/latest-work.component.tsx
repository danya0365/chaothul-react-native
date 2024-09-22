import { ArrowIosBackIcon } from "@/components/atoms/icons";
import { SafeAreaLayoutView } from "@/components/atoms/safe-area-layout.view";
import LoadingView from "@/components/organisms/loading.view";
import { Work } from "@/models/work.model";
import {
  Divider,
  StyleService,
  TopNavigation,
  TopNavigationAction,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import WorkList2Column from "../../layouts/works/work-list-2-column";
import { WorkApiService } from "../../services/api.service";
import httpRequest from "../../services/http-request.service";

export const LatestWorksScreen = ({
  navigation,
}: {
  navigation: any;
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const workApiService = new WorkApiService(httpRequest);
  const [works, setWorks] = React.useState<Work[]>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  const getLatestWorks = async () => {
    setIsLoading(true);
    try {
      const response = await workApiService.getWorks(pageNumber, 15);
      if (response.status) {
        const responseWorks = response.data.map((work) =>
          Work.createFromApi(work)
        );
        setWorks(responseWorks);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getLatestWorks();
  }, []);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  return (
    <SafeAreaLayoutView style={styles.safeArea} insets="top">
      <TopNavigation title={`รายการล่าสุด`} accessoryLeft={renderBackAction} />
      <Divider />
      <View style={[styles.container]}>
        <WorkList2Column
          navigation={navigation}
          works={works || []}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
        {isLoading && <LoadingView />}
      </View>
    </SafeAreaLayoutView>
  );
};

const themedStyles = StyleService.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    padding: 4,
  },
});
