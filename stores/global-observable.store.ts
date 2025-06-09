import { LoggedClimb } from "@/types/core.type";
import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";

type ObservableStore = {
	climbs: LoggedClimb[];
};

export const observableStore$ = observable<ObservableStore>({
	climbs: [],
});

syncObservable(observableStore$.climbs, {
	persist: {
		name: "climbs",
		plugin: ObservablePersistMMKV,
	},
});
