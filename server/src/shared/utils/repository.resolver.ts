import { DataSource, EntityTarget } from 'typeorm';

export abstract class RespositoryResolver {
	public static resolve = <T>(
		provide: string,
		entity: EntityTarget<T>,
		inject: string[] = ['DATA_SOURCE']
	) => ({
		provide,
		useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
		inject,
	});
}
