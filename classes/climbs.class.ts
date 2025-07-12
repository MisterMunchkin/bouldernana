import { ClimbSchema } from "@/components/forms/climb-log-form";
import { COLOR_CLIMB_TYPE } from "@/constants/core.const";
import { observableStore$ } from "@/stores/global-observable.store";
import { LoggedClimb } from "@/types/core.type";
import { day } from "@/utils/day-js.util";
import { TailwindUtil } from "@/utils/tailwind.util";
import { computed, Observable } from "@legendapp/state";

import * as ExpoCrypto from "expo-crypto";

export class ClimbsClass {
	static readonly climbs$ = observableStore$.climbs;
	static add(climb: ClimbSchema) {
		const id = ExpoCrypto.randomUUID();

		if (ClimbsClass.climbs$.find((c) => c.id.peek() === id)) {
			console.warn(
				`Climb with id ${id} already exists. Generating a new id.`
			);
			ClimbsClass.add(climb);
			return;
		}

		const loggedClimb: LoggedClimb = {
			...climb,
			id,
		};

		console.log("add climb", JSON.stringify(loggedClimb));
		ClimbsClass.climbs$.set((prev) => [...prev, loggedClimb]);
	}

	static update(args: { id: string; update: Partial<LoggedClimb> }) {
		const { id, update } = args;
		const climb = ClimbsClass.climbs$.find((c) => c.id.peek() === id);

		if (!climb) {
			console.warn(`Could not find logged climb with id: ${id}`);
			return;
		}

		climb.set((prev) => ({
			...prev,
			...update,
		}));
	}

	/**Returns the raw data of the climb. untracked */
	static peek(id: string): LoggedClimb | undefined {
		return ClimbsClass.climbs$.find((c) => c.id.peek() === id)?.peek();
	}

	/** Returns a "trackable" object that will update when climb is updated */
	static get(id: string): Observable<LoggedClimb> | undefined {
		return ClimbsClass.climbs$.find((c) => c.id.peek() === id);
	}

	static destroy(id: string) {
		ClimbsClass.climbs$.find((c) => c.id.peek() === id)?.delete();
	}

	static flashRecordFromJSON(climbs: LoggedClimb[]) {
		ClimbsClass.climbs$.set(climbs);
	}

	/**
	 * Climbs sorted by date
	 * slice() is used to avoid mutating the original observable.
	 * We wrap it in a computed to restore reactivity
	 */
	static sortedClimbs$ = computed(() =>
		ClimbsClass.climbs$
			.get()
			.slice()
			.sort((a, b) => day(b.date).unix() - day(a.date).unix())
	);

	/**Instance of LoggedClimb helper class */
	climb: Observable<LoggedClimb>;

	/**initiate an instance by logged climb id */
	constructor(id: string) {
		const climb = ClimbsClass.get(id);
		if (!climb) {
			console.error(`Could not find logged climb with id: ${id}`);
			throw new Error(`Could not find logged climb with id: ${id}`);
		}

		this.climb = climb;
	}

	/**Get the color of a climb by its type */
	get colorType() {
		return TailwindUtil.getCoreColor(
			COLOR_CLIMB_TYPE[this.climb.typeOfClimb.get()]
		);
	}
}
