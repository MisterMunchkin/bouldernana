import { View, Text } from "react-native";
import React from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/utils/supabase.util";
import { Toast } from "@/classes/toast.class";
import { AuthError } from "@supabase/supabase-js";

type Props = {};

const AppleSignIn = (props: Props) => {
	const signIn = async () => {
		try {
			const { identityToken } = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});
			if (!identityToken) {
				throw new Error(
					"No identityToken returned from Apple Sign In."
				);
			}
			const {
				error,
				data: { user },
			} = await supabase.auth.signInWithIdToken({
				provider: "apple",
				token: identityToken,
			});
			console.log(JSON.stringify({ error, user }, null, 2));
			if (error) {
				// User is signed in
				Toast.error({
					message: "Sign in failed.",
					description: error.message,
				});
				return;
			}

			Toast.success({
				message: "Sign in successful!",
			});
		} catch (e) {
			console.error("Apple Sign In Error:", e);
			if (e instanceof AuthError || e instanceof Error) {
				Toast.error({
					message: "Sign in failed.",
					description: e.message,
				});
				return;
			}

			// handle other errors
			Toast.error({
				message: "Sign in failed.",
				description: "unknown error occurred.",
			});
		}
	};

	return (
		<AppleAuthentication.AppleAuthenticationButton
			buttonType={
				AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
			}
			buttonStyle={
				AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
			}
			cornerRadius={5}
			style={{ width: 200, height: 64 }}
			onPress={signIn}
		/>
	);
};

export default AppleSignIn;
