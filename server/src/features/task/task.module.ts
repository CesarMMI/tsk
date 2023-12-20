import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Task } from 'src/database/entities/task.entity';
import { RespositoryResolver } from 'src/shared/utils/repository.resolver';
import { TagModule } from '../tag/tag.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
	imports: [DatabaseModule, TagModule],
	controllers: [TaskController],
	providers: [TaskService, RespositoryResolver.resolve('TASK_REPOSITORY', Task)],
})
export class TaskModule {}
