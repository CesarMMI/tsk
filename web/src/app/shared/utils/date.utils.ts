export abstract class DateUtils {
	static stringToDate<T extends object>(target: T, props: (keyof T)[]) {
		props.forEach((prop) => {
			if (target[prop]) {
				target[prop] = new Date(target[prop] as string) as any;
			}
		});
		return target;
	}

	static compareDatesString(a?: string, b?: string) {
		if (!a && !b) return 0;
		if (a && !b) return -1;
		if (!a && b) return 1;

		return new Date(a!).getTime() - new Date(b!).getTime();
	}

	static compareDatesWoutTime(a?: Date, b?: Date) {
		if (!a || !b) return false;

		return (
			new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()).getTime() ===
			new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()).getTime()
		);
	}
}
