import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Task } from 'src/database/entities/task.entity';
import { RespositoryResolver } from 'src/shared/utils/repository.resolver';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TagModule } from '../tag/tag.module';

@Module({
	imports: [DatabaseModule, TagModule],
	controllers: [TaskController],
	providers: [TaskService, RespositoryResolver.resolve('TASK_REPOSITORY', Task)],
	exports: [TaskService],
})
export class TaskModule {}
