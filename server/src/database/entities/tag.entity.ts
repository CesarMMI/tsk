import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Tag {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@OneToMany(() => Task, (task) => task.tag)
	tasks: Task[];
}
