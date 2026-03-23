import React from "react";
import PersonIcon from "src/assets/icons/PersonIcon"
import SelectUserType from "./src/components/common/SelectUserType";
import NormalButton from "./src/components/common/NormalButton";
import ToggleButton from "@/components/common/ToggleButton";
import TrashIcon from "@/assets/icons/TrashIcon";
import { View } from 'react-native';
import PencilIcon from "@/assets/icons/PencilIcon";
import SelfHelpResource from "@/components/common/SelfHelpResource";
import FileIcon from "@/assets/icons/FileIcon";

export default function App() {
    return (
        <>
        <View style={{width: "100%",display: "flex", flexDirection: "column", gap: 20, alignItems: "center", justifyContent: "center", height: "100%"}}>
        <SelectUserType title="I need help" userType="(Patient)" Icon={PersonIcon}></SelectUserType>
        <NormalButton title="Continue" bgColor="#6D7EB5" textColor="#FFFFFF"></NormalButton>
        <NormalButton title="Generate Random ID" bgColor="#DBE6ED" textColor="#000000"></NormalButton>
        <NormalButton></NormalButton>
        <ToggleButton title="Toggle" Icon={TrashIcon} bgColor="#E97072" textColor="#FFFFFF"></ToggleButton>
        <ToggleButton title="Toggle" Icon={PencilIcon} bgColor="#FFFFFF" textColor="#6D7EB5"></ToggleButton>
        <SelfHelpResource title="Understanding Anxiety: A Beginner’s Guide" tag="Static Read" Icon={TrashIcon}></SelfHelpResource>
        <SelfHelpResource title="Understanding Anxiety: A Beginner’s Guide" tag="Static Read"></SelfHelpResource>
        </View>
    </>

    );
}

