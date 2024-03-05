const apiUrlUser = "https://jsonplaceholder.typicode.com/users";
const apiUrlPost = "https://jsonplaceholder.typicode.com/posts";
const apiUrlComment = "https://jsonplaceholder.typicode.com/comments";

async function getData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error ", err.message);
    throw err;
  }
}

//Sử dụng API JSON giả này: https://jsonplaceholder.typicode.com/
//Nhận dữ liệu từ tất cả người dùng từ API ở trên. Bạn sẽ nhận được danh sách 10 người dùng.
//Nhận tất cả posts và commentstừ API. Ánh xạ dữ liệu với mảng người dùng. Định dạng dữ liệu phải như thế này:
function createData(users, posts, comments) {
  const userPosts = users.map((user) => {
    const userPost = posts.filter((post) => post.userId === user.id);
    const newUserPost = userPost.map((post) => {
      const { userId, ...rest } = post;
      return rest;
    });
    const userComments = newUserPost.map((post) => {
      const comment = comments.filter((comment) => comment.postId === post.id);
      return comment;
    });
    const newUserComments = userComments.flat();
    return {
      ...user,
      posts: newUserPost,
      comments: newUserComments,
    };
  });
  return userPosts;
}

//Chỉ lọc những người dùng có nhiều hơn 3 bình luận
function filterUsers(userPosts) {
  return userPosts.filter((userPost) => userPost.comments.length > 3);
}

//thêm trường số lượng bình luận và bài viết

function addCount(userPosts) {
  return userPosts.map((userPost) => {
    const { posts, comments, ...rest } = userPost;
    return {
      ...rest,
      postsCount: userPost.posts.length,
      commentsCount: userPost.comments.length,
    };
  });
}

// người dùng có nhiều bình luận và bài đăng nhất
function mostActiveUser(userPosts) {
  const mostActiveUser = userPosts.reduce((acc, userPost) => {
    if (
      userPost.posts.length + userPost.comments.length >
      acc.posts.length + acc.comments.length
    ) {
      return userPost;
    }
    return acc;
  }, userPosts[0]);
  return mostActiveUser;
}

// sắp xếp người dùng có giá trị postCount giảm dần
function sortUserByPostCount(userPosts) {
  return userPosts.sort((a, b) => b.posts.length - a.posts.length);
}

//Nhận bài đăng có ID là 1 thông qua yêu cầu API, đồng thời nhận nhận xét cho bài đăng có ID là 1 thông qua yêu cầu API khác
async function getPostAndComments() {
  try {
    const [post, comments] = await Promise.all([
      getData(`${apiUrlPost}/1`),
      getData(`${apiUrlPost}/1/comments`),
    ]);
    const postWithComments = post.map((post) => {
      const comment = comments.filter((comment) => comment.postId === post.id);
      return {
        ...post,
        comments: comment,
      };
    });
    console.log(postWithComments);
  } catch (err) {
    console.error(err);
  }
}

async function getAll() {
  try {
    const [users, posts, comments] = await Promise.all([
      getData(apiUrlUser),
      getData(apiUrlPost),
      getData(apiUrlComment),
    ]);
    const userPosts = createData(users, posts, comments);
    // console.log(userPosts);
    // const filterUsers = filterUsers(userPosts);
    // const userPostsCount = addCount(userPosts);
    // console.log(userPostsCount);
    const mostActive = mostActiveUser(userPosts);
    console.log(mostActive.comments);
  } catch (err) {
    console.error(err);
  }
}

getAll();
