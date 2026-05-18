import React from "react";
import { CommentCard } from "./CommentCard";
import { TimeCard } from "./TimeCard";
import { ScoreCard } from "./ScoreCard";

import { StatisticCardProps } from "../../../types/IStatisticCardProps";

const StatsCard = (props: StatisticCardProps) => {
  switch (props.type) {
    case "comments":
      return (
        <CommentCard
          value={props.value}
        />
      );

    case "time":
      return (
        <TimeCard
          value={props.value}
          unit={props.unit}
        />
      );

    case "score":
      return (
        <ScoreCard
          value={props.value}
        />
      );

    default:
      return null;
  }
};

export default StatsCard;