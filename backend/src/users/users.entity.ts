import { PostEntity } from 'src/posts/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class UserEntity {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  companyName: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
