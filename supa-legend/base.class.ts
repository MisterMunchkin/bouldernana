import { Observable, observable } from "@legendapp/state";
import {
	configureSyncedSupabase,
	syncedSupabase,
} from "@legendapp/state/sync-plugins/supabase";
import { createClient } from "@supabase/supabase-js";
import { v7 as uuidV7 } from "uuid";
import { Database } from "@/supabase/database.types";
import { configureSynced } from "@legendapp/state/sync";
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Collection = keyof Database["public"]["Tables"];

export abstract class SupaLegend<T extends Object = { id: string }> {
	abstract data$: Observable<Record<string, T>>;
	readonly supabase;
	readonly customSynced;

	static readonly generateId = () => uuidV7();

	constructor() {
		this.supabase = createClient<Database>(
			process.env.EXPO_PUBLIC_SUPABASE_URL!,
			process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
		);
		this.customSynced = configureSynced(syncedSupabase, {
			persist: {
				plugin: observablePersistAsyncStorage({
					AsyncStorage,
				}),
			},
			generateId: SupaLegend.generateId,
			supabase: this.supabase,
			changesSince: "last-sync",
			fieldCreatedAt: "created_at",
			fieldUpdatedAt: "updated_at",
			fieldDeleted: "deleted",
			waitFor: true, //TODO: Check if user is authenticated
		});
	}
}
