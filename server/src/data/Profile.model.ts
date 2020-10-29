import { Profile } from '@prisma/client';
import makeModel, { RawReadonly } from 'BaseModel';
import { checkDefined } from 'helpers';
import prisma from 'prisma';
import UserModel from './User.model';

interface ProfileModel extends RawReadonly<Profile> {}
class ProfileModel extends makeModel<Profile>() {
  static async getById(id: number) {
    const item = await prisma.profile.findOne({
      where: {
        id,
      },
    });
    return ProfileModel.wrap(item);
  }

  get user() {
    return UserModel.getById(this.userId).then(checkDefined);
  }
}

export default ProfileModel;
