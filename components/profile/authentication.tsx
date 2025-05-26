import { View, Text, Platform } from "react-native";
import React from "react";
import { SupaLegend } from "@/supa-legend/base.class";
import PressableOpacity from "../core/pressable-opacity";
import AppText from "@/components/core/app-text";
import AppleSignIn from "@/components/supabase/apple-sign-in";
import { PlatformUtil } from "@/utils/platform.util";

type Props = {};

const Authentication = (props: Props) => {
	const isAuth = SupaLegend.userAuth$.isAuthenticated.get();

	return (
		<>
			{PlatformUtil.isIOS && !isAuth && <AppleSignIn />}

			{isAuth && (
				<PressableOpacity twClassName="bg-core-red-600 rounded-lg p-4">
					<AppText>Sign Out</AppText>
				</PressableOpacity>
			)}
		</>
	);
};

export default Authentication;
