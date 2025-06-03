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
import { MMKV } from "react-native-mmkv";

export type Collection = keyof Database["public"]["Tables"];

type CreateDataSyncArgs<T> = {
	supaLegendSyncedArgs: Parameters<typeof SupaLegend.supaLegendSynced>[0];
	mmkvArgs: {
		key: string;
		value: T;
	};
};

/**
 * @todo Still trying to figure out how to have offline first
 * local persistance when user is unauthenticated, then move to db sync when
 * they are authenticated.
 */
export abstract class SupaLegend {
	//NOTE: It might be best to use zustand + supabase + MMKV instead.
	// Legendstate makes it too hard to configure what I want to sync and how to persist it.

	/**Supabase client */
	static readonly supabase = supabase;
	/**MMKV instance */
	static readonly mmkv = new MMKV();

	/**Generates a random v4 UUID */
	static readonly generateId = Crypto.randomUUID;

	/**Observable for authenticated user */
	static userAuth$ = observable<{
		isAuthenticated: boolean;
		user: User | null;
	}>({
		isAuthenticated: false,
		user: null,
	});

	/**Sync feature with LegendState + Supabase */
	static readonly supaLegendSynced = configureSynced(syncedSupabase, {
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

	static createDataSync = <T>(args: CreateDataSyncArgs<T>) => {
		const { supaLegendSyncedArgs, mmkvArgs } = args;
		if (SupaLegend.userAuth$.peek().isAuthenticated) {
		}
	};
}
