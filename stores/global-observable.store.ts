import { LoggedClimb } from "@/types/core.type";
import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import { MMKV } from "react-native-mmkv";

type ObservableStore = {
	climbs: LoggedClimb[];
};

export const storage = new MMKV();

export const observableStore$ = observable<ObservableStore>({
	climbs: [],
});

syncObservable(observableStore$.climbs, {
	persist: {
		name: "climbs",
		plugin: ObservablePersistMMKV,
		mmkv: storage,
	},
});
