import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TagModule } from './features/tag/tag.module';
import { TaskModule } from './features/task/task.module';

@Module({
	imports: [DatabaseModule, TaskModule, TagModule],
})
export class AppModule {}
