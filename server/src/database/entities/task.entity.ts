import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Task {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column({ nullable: true, type: 'text' })
	description?: string;

	@Column({ default: false })
	done: boolean;

	@Column({ name: 'done_at', nullable: true })
	doneAt?: Date;

	@Column({ nullable: true })
	deadline?: Date;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@ManyToOne(() => Tag, (tag) => tag.tasks, {
		eager: true,
		nullable: true,
		onDelete: 'SET NULL',
	})
	tag?: Tag;
}
