import PostModel from 'data/Post.model';
import prisma from 'prisma';

async function main() {
  // await prisma.user.create({
  //   data: {
  //     name: "Alice",
  //     email: "alice@prisma.io",
  //     posts: {
  //       create: { title: "Hello World" },
  //     },
  //     profile: {
  //       create: { bio:  "I like turtles" }
  //     }
  //   }
  // })
  const post = await PostModel.getById(1);
  if (!post) {
    throw new Error();
  }
  console.log(post);
  await post.editTitle('Lorem Ipsum');
  console.log(post);
  await post.editTitle('Hello World');
  console.log(post);

  const author = await post.author;
  console.log(author);

  const postList = await author.posts;
  console.log(postList);
}

void main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
