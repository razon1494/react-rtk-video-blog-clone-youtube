import axiosInstance from "../../utils/axios";

export const getRelatedVideos = async (videoEssentials) => {
  const { tags, id } = videoEssentials;
  let url = "/videos?";
  url += tags.map((tag) => `&tags_like=${tag}`).join("");
  url += `&id_ne=${id}`;
  //sumit saha
  const limit = 5;
  let queryString =
    tags?.length > 0
      ? tags.map((tag) => `&tags_like=${tag}`).join("&") +
        `&id_ne=${id}&_limit=${limit}`
      : `id_ne=${id}&_limit=${limit}`;
  const response = await axiosInstance.get(`/videos?${queryString}`);
  return response.data;
};
