import React, { useMemo } from "react";
import { View } from "react-native";
import Loader from "@/components/ui/loader";

const ProfileLoader = () => {
    return (
        <>
            <View className="gap-2">
                <Loader.Item height={15} width={150} />
                <Loader.Item height={50} className={"rounded-lg"} />
            </View>
            <View className="gap-2">
                <Loader.Item height={15} width={150} />
                <Loader.Item height={50} className={"rounded-lg"} />
            </View>
            <Loader.Item height={50} className={"rounded-lg"} />
            <Loader.Item height={50} className={"rounded-lg"} />
        </>
    );
};

export default React.memo(ProfileLoader);
