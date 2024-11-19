import { fetchRequest } from ".";

export type CommentBody = {
  name: string;
  email: string;
  rate: number;
  comment?: string;
};

export const getTop5Comments = async () => {
  try {
    const response = await fetchRequest("/api/comments/top5", "GET");
    if (response.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (body: CommentBody) => {
  try {
    const response = await fetchRequest("/api/comments", "POST", body);
    return response;
  } catch (error) {
    console.log(error);
  }
};
