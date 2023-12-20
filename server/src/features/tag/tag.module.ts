import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { RespositoryResolver } from 'src/shared/utils/repository.resolver';
import { Tag } from 'src/database/entities/tag.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [TagController],
	providers: [RespositoryResolver.resolve('TAG_REPOSITORY', Tag), TagService],
	exports: [TagService],
})
export class TagModule {}
