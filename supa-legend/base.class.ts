import { Observable, observable } from "@legendapp/state";
import {
	configureSyncedSupabase,
	syncedSupabase,
} from "@legendapp/state/sync-plugins/supabase";
import { createClient, User } from "@supabase/supabase-js";
import { Database } from "@/supabase/database.types";
import { configureSynced } from "@legendapp/state/sync";
import { observablePersistAsyncStorage } from "@legendapp/state/persist-plugins/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/utils/supabase.util";
import * as Crypto from "expo-crypto";

export type Collection = keyof Database["public"]["Tables"];

export abstract class SupaLegend {
	//NOTE: It might be best to use zustand + supabase + MMKV instead.
	// Legendstate makes it too hard to configure what I want to sync and how to persist it.

	static readonly supabase = supabase;

	static readonly generateId = Crypto.randomUUID;
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
		// waitFor: true, //TODO: Check if user is authenticated
	});
}
