import { AddClimbSchema } from "@/app/(tabs)/new-climb";
import { COLOR_CLIMB_TYPE } from "@/constants/core.const";
import { observableStore$ } from "@/stores/global-observable.store";
import { LoggedClimb } from "@/types/core.type";
import { TailwindUtil } from "@/utils/tailwind.util";

import * as ExpoCrypto from "expo-crypto";

export class ClimbsClass {
	static readonly climbs$ = observableStore$.climbs;
	static add(climb: AddClimbSchema) {
		const loggedClimb: LoggedClimb = {
			...climb,
			id: ExpoCrypto.randomUUID(),
		};
		ClimbsClass.climbs$.push(loggedClimb);
	}

	static update(args: { id: string; update: Partial<LoggedClimb> }) {
		const { id, update } = args;
		const climb = ClimbsClass.climbs$.find((c) => c.id.peek() === id);

		if (!climb) {
			console.warn(`Could not find logged climb with id: ${id}`);
			return;
		}

		climb.assign(update);
	}

	/**Returns the raw data of the climb. untracked */
	static peek(id: string): LoggedClimb | undefined {
		return ClimbsClass.climbs$.find((c) => c.id.peek() === id)?.peek();
	}

	/** Returns a "trackable" object that will update when climb is updated */
	static get(id: string): LoggedClimb | undefined {
		return ClimbsClass.climbs$.find((c) => c.id.peek() === id)?.get();
	}

	static destroy(id: string) {
		ClimbsClass.climbs$.find((c) => c.id.peek() === id)?.delete();
	}

	static flashRecordFromJSON(climbs: LoggedClimb[]) {
		ClimbsClass.climbs$.set(climbs);
	}

	/**Instance of LoggedClimb helper class */
	climb: LoggedClimb;

	/**initiate an instance by logged climb id */
	constructor(id: string) {
		const climb = ClimbsClass.peek(id);
		if (!climb) {
			console.error(`Could not find logged climb with id: ${id}`);
			throw new Error(`Could not find logged climb with id: ${id}`);
		}

		this.climb = climb;
	}

	/**Get the color of a climb by its type */
	get colorType() {
		return TailwindUtil.getCoreColor(
			COLOR_CLIMB_TYPE[this.climb.typeOfClimb]
		);
	}
}
