import React from "react";
import { CommentCard } from "./CommentCard";
import { TimeCard } from "./TimeCard";
import { ScoreCard } from "./ScoreCard";

type CommentsProps = {
  type: "comments";
  value: string | number;
};

type TimeProps = {
  type: "time";
  value: string | number;
};

type ScoreProps = {
  type: "score";
  value: string | number;
};

type Props = CommentsProps | TimeProps | ScoreProps;

const StatsCard = (props: Props) => {
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