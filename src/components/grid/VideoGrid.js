import VideoGridItem from "./VideoGridItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../features/videos/videosSlice";
import { useEffect } from "react";
import Loading from "../ui/Loading";
import { fetchTags } from "../../features/tags/tagsSlice";
export default function VideoGrid() {
  const dispatch = useDispatch();

  const { videos, isLoading, isError, error } = useSelector(
    (state) => state.videos
  );
  const { tags, search } = useSelector((state) => state.filter);
  useEffect(() => {
    dispatch(fetchVideos({ tags, search }));
    dispatch(fetchTags());
  }, [dispatch, tags, search]);
  let content;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }
  if (!isError && !isLoading && videos?.length === 0) {
    content = <div className="col-span-12">No Videos found</div>;
  }
  if (!isError && !isLoading && videos?.length > 0) {
    content = videos.map((video) => (
      <VideoGridItem key={video.id} video={video} />
    ));
  }
  return (
    <section className="pt-12">
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {content}
          {/* {videos &&
            videos.map((video) => (
              <VideoGridItem key={video.id} video={video} />
            ))} */}

          {/* <div className="col-span-12">some error happened</div> */}
        </div>
      </section>
    </section>
  );
}
