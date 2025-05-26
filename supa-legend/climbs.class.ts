import { observable } from "@legendapp/state";
import { Collection, SupaLegend } from "./base.class";
import { Database } from "@/supabase/database.types";

export type ClimbSchema = Database["public"]["Tables"]["climbs"]["Row"];

export class Climbs extends SupaLegend<ClimbSchema> {
	constructor() {
		super();
	}

	data$ = observable(
		SupaLegend.customSynced({
			supabase: SupaLegend.supabase,
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
