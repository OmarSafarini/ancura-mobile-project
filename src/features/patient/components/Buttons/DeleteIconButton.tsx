import React from "react";
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";

import TrashIcon from "@/assets/icons/TrashIcon";
import { scale } from "@/utils/responsive";

type DeleteIconButtonProps = TouchableOpacityProps;

const DeleteIconButton = ({ style, ...props }: DeleteIconButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.deleteButton, style]}
      activeOpacity={0.7}
      {...props}
    >
      <TrashIcon size={scale(11)} color="#FFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    width: scale(23),
    height: scale(23),
    backgroundColor: "#F8545D",
    borderRadius: scale(23) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DeleteIconButton;
