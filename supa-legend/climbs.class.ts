import { observable } from "@legendapp/state";
import { Collection, SupaLegend } from "./base.class";
import { Database } from "@/supabase/database.types";
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncedSupabase } from "@legendapp/state/sync-plugins/supabase";

export type ClimbSchema = Database["public"]["Tables"]["climbs"]["Row"];

export class Climbs extends SupaLegend<ClimbSchema> {
	// climbs$: Record<string, Database["public"]["Tables"]["climbs"]["Row"]> = {};
	constructor() {
		super();
	}

	data$ = observable(
		this.customSynced({
			supabase: this.supabase,
			collection: "climbs",
			select: (from) => from.select(`*`),
			realtime: true,
			actions: ["read"],
			persist: {
				name: `climbs-persist`,
				retrySync: true,
			},
			retry: {
				infinite: true,
			},
		})
	);
}
