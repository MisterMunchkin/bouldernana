import { Observable, observable } from "@legendapp/state";
import { Collection, SupaLegend } from "./base.class";
import { Database, Tables } from "@/supabase/database.types";

export type ClimbSchema = Tables<"climbs">;

export class Climbs extends SupaLegend {
	static data$ = observable(
		SupaLegend.customSynced({
			supabase: SupaLegend.supabase,
			collection: "climbs",
			select: (from) => from.select(`*`),
			realtime: true,
			actions: ["read", "create", "update", "delete"],
			persist: {
				name: `climbs-persist`,
				retrySync: true,
				transform: {
					save: (data: ClimbSchema) => {
						//attach userId to each climb when saving
						const userId = SupaLegend.userAuth$.peek().user?.id;
						if (!userId) {
							throw new Error("User is not authenticated");
						}

						return {
							...data,
							user_id: userId,
						};
					},
				},
			},
			retry: {
				infinite: true,
			},
		})
	);

	static add = (
		climb: Omit<
			ClimbSchema,
			"user_id" | "id" | "created_at" | "updated_at" | "deleted"
		>
	) => {
		try {
			const id = SupaLegend.generateId();
			Climbs.data$[id].assign({
				id,
				...climb,
			});
		} catch (error) {
			console.error("Error adding climb:", JSON.stringify(error));
		}
	};

	static update = (
		id: string,
		climb: Partial<Omit<ClimbSchema, "user_id">>
	) => {
		if (!Climbs.data$.peek()[id]) {
			throw new Error(`Climb with id ${id} does not exist`);
		}
		Climbs.data$[id].assign(climb);
	};

	static remove = (id: string) => {
		if (!Climbs.data$.peek()[id]) {
			throw new Error(`Climb with id ${id} does not exist`);
		}
		Climbs.data$[id].delete();
	};
}
