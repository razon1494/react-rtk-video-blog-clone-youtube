import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import Loading from "../ui/Loading";
import RelatedVideoListItem from "./RelatedVideoListItem";

export default function RelatedVideoList({ id, tags }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const videoEssentials = { id, tags };
    dispatch(fetchRelatedVideos(videoEssentials));
  }, [dispatch, id, tags]);
  const { relatedVideos, isLoading, isError, error } = useSelector(
    (state) => state.relatedVideos
  );

  let content = null;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }
  if (!isLoading && !isError && relatedVideos?.length === 0) {
    content = (
      <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
        No Related Video Found
        {/*  {allVideoes.map((video) => (
          <RelatedVideoListItem key={video.id} video={video} />
        ))} */}
      </div>
    );
  }
  if (!isLoading && !isError && relatedVideos?.length > 0) {
    content = (
      <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
        {relatedVideos.map((video) => (
          <RelatedVideoListItem key={video.id} video={video} />
        ))}
      </div>
    );
  }
  return content;
}
