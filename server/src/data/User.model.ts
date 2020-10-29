import { User } from '@prisma/client';
import makeModel, { RawReadonly } from 'BaseModel';
import { checkDefined } from 'helpers';
import prisma from 'prisma';
import PostModel from './Post.model';
import ProfileModel from './Profile.model';

interface UserModel extends RawReadonly<User> {}
class UserModel extends makeModel<User>() {
  static async getById(id: number) {
    const item = await prisma.user.findOne({
      where: {
        id,
      },
    });
    return UserModel.wrap(item);
  }

  static async getAll() {
    const items = await prisma.user.findMany({});
    return UserModel.wrapArray(items);
  }

  get posts() {
    return PostModel.wrapArray(prisma.post.findMany({ where: { authorId: this.id } }));
  }

  get profile() {
    return ProfileModel.wrap(
      prisma.profile.findMany({ where: { userId: this.id } }).then(p => checkDefined(p[0])),
    );
  }
}

export default UserModel;
