import { Post } from '@prisma/client';
import makeModel, { RawReadonly } from 'BaseModel';
import { checkDefined } from 'helpers';
import prisma from 'prisma';
import UserModel from './User.model';

interface PostModel extends RawReadonly<Post> {}
class PostModel extends makeModel<Post>() {
  static async getById(id: number) {
    const item = await prisma.post.findOne({
      where: {
        id,
      },
    });
    return PostModel.wrap(item);
  }

  get author() {
    return UserModel.getById(this.authorId).then(checkDefined);
  }

  async editTitle(title: string) {
    const updated = await prisma.post.update({
      data: {
        title,
      },
      where: {
        id: this.id,
      },
    });

    this.raw = updated;
  }
}

export default PostModel;
