export type CommentsProps = {
  type: "comments";
  value: string | number;
};

export type TimeProps = {
  type: "time";
  value: string | number;
};

export type ScoreProps = {
  type: "score";
  value: string | number;
};

export type StatisticCardProps = CommentsProps | TimeProps | ScoreProps;
