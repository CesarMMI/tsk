export abstract class DateUtils {
	static stringToDate<T extends object>(target: T, props: (keyof T)[]) {
		props.forEach((prop) => {
			if (target[prop]) {
				target[prop] = new Date(target[prop] as string) as any;
			}
		});
		return target;
	}
}
