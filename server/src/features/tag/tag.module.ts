import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Tag } from 'src/database/entities/tag.entity';
import { RespositoryResolver } from 'src/shared/utils/repository.resolver';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
	imports: [DatabaseModule],
	controllers: [TagController],
	providers: [TagService, RespositoryResolver.resolve('TAG_REPOSITORY', Tag)],
	exports: [TagService],
})
export class TagModule {}
