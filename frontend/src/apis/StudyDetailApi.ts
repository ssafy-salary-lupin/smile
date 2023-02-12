import axios from "axios";

const BASE_URL = `https://i8b205.p.ssafy.io/be-api/studies`;
// const BASE_URL = `/be-api/studies`;

const token = localStorage.getItem("kakao-token");

// 댓글 작성
export async function writeDetailCommentApi(data: any) {
  try {
    await axios.post(`${BASE_URL}/1/comments`, JSON.stringify(data), {
      headers: {
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
        "Content-Type": `application/json`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// 답변 작성
export async function writeDetailReplyApi(data: any, parentId: any) {
  try {
    await axios.post(
      `${BASE_URL}/1/comments/${parentId}/replies`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
          "Content-Type": `application/json`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
}

// 댓글 수정
// export async function commentUpdateApi(
//   data: any,
//   boardId: any,
//   commentId: any,
// ) {
//   try {
//     await axios.patch(
//       `${BASE_URL}/1/boards/${boardId}/comments/${commentId}`,
//       data,
//       {
//         headers: {
//           // Authorization: `Bearer ${localStorage.getItem("kakao-token")}`,
//           Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYxODMwNzAsImV4cCI6MTY3NjI2OTQ3MH0.uEJBzNc0KOFx1iMbGapjn60vC5UBwcIULQBSOUJ2q6aWIJryr0bOJAY-t1ISh4QN-i7yq9i6IenzNJNxkunyqw`,
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }

// // 댓글 삭제
// export async function commentDeleteApi(boardId: any, commentId: any) {
//   console.log("댓글 삭제");
//   try {
//     await axios.delete(
//       `${BASE_URL}/1/boards/${boardId}/comments/${commentId}`,
//       {
//         headers: {
//           // Authorization: `Bearer ${token}`,
//           Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlckVtYWlsIjoiZG9pdGZvcmp1bmdAa2FrYW8uY29tIiwidXNlcklkIjozLCJpc3MiOiJpc3N1ZXIiLCJpYXQiOjE2NzYyMDg0MDcsImV4cCI6MTY3NjI5NDgwN30.3sd9wHVyF1w-2xRexyZuXOe7roOzyJLO2aNg-5p1oVBOE14CglarHcJTj0FweK55txAGmw1D7QzJfZn24bajUA`,
//         },
//       },
//     );
//   } catch (error: any) {
//     console.log(error);
//   }
// }
