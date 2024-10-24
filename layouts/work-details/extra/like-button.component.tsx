import React, { memo } from "react";
import { Button } from "@ui-kitten/components";
import { Work } from "@/models/work.model";
import { HeartIcon } from "@/components/atoms/icons";

type Props = {
  workInfo: Work;
  isUserLike: boolean;
  isLikeButtonDisabled: boolean;
  onLikeWorkPress: () => void;
};

const LikeButton = ({
  workInfo,
  isUserLike,
  isLikeButtonDisabled,
  onLikeWorkPress,
}: Props) => {
  return (
    <Button
      style={{ paddingHorizontal: 0 }}
      appearance="ghost"
      status={isUserLike ? "danger" : "basic"}
      accessoryLeft={HeartIcon}
      disabled={isLikeButtonDisabled}
      onPress={onLikeWorkPress}
    >
      {`${workInfo.formattedLikeCount}`}
    </Button>
  );
};

export default memo(LikeButton);
