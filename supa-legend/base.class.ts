import { Observable, observable } from "@legendapp/state";
import {
	configureSyncedSupabase,
	syncedSupabase,
} from "@legendapp/state/sync-plugins/supabase";
import { createClient, User } from "@supabase/supabase-js";
import { v7 as uuidV7 } from "uuid";
import { Database } from "@/supabase/database.types";
import { configureSynced } from "@legendapp/state/sync";
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/utils/supabase.util";

export type Collection = keyof Database["public"]["Tables"];

export abstract class SupaLegend<T extends Object = { id: string }> {
	abstract data$: Observable<Record<string, T>>;
	static readonly supabase = supabase;

	static readonly generateId = () => uuidV7();
	static userAuth$ = observable<{
		isAuthenticated: boolean;
		user: User | null;
	}>({
		isAuthenticated: false,
		user: null,
	});

	static readonly customSynced = configureSynced(syncedSupabase, {
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
		waitFor: SupaLegend.userAuth$.isAuthenticated, //TODO: Check if user is authenticated
	});
}
