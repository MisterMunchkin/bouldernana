import Reactotron from "reactotron-react-native";
import mmkvPlugin from "reactotron-react-native-mmkv";
import { storage } from "@/stores/global-observable.store";

Reactotron.configure({}) // controls connection & communication settings
	.use(mmkvPlugin({ storage }))
	.useReactNative() // add all built-in react native plugins
	.connect(); // let's connect!
