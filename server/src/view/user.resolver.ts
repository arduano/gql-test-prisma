import { Context } from 'context';
import UserModel from 'data/User.model';

export const Query = {
  getAllUsers: (_: any, {}, ctx: Context) => UserModel.getAll(),
};

// export const Mutation = {
//   usersCreate: (_: any, { data }: MutationUsersCreateArgs, ctx: Context) =>
//     withPermalinkUser(ctx, user => userAdmin.create(data, user)),
//   usersPatch: (_: any, { data, id }: MutationUsersPatchArgs, ctx: Context) =>
//     withPermalinkUser(ctx, user => userAdmin.patch(id, data, user)),
//   usersDeleteMany: (_: any, { ids }: MutationUsersDeleteManyArgs, ctx: Context) =>
//     withPermalinkUser(ctx, user => userAdmin.deleteMany(ids, user)),
// };
