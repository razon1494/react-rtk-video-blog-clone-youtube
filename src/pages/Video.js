import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/description/VideoPlayer";
import VideoDescription from "../components/description/VideoDescription";
import RelatedVideoList from "../components/list/RelatedVideoList";
import { fetchVideo } from "../features/video/videoSlice";
import Loading from "../components/ui/Loading";

export default function Video() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideo(videoId));
  }, [dispatch, videoId]);
  const videoState = useSelector((state) => state.video);
  // decide what to render
  let content = null;
  const { video, isLoading, isError, error } = videoState;
  const { id, tags, title, link } = video || {};
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }
  if (!isLoading && !isError && !video?.id) {
    content = <div className="col-span-12">No video found</div>;
  }
  if (!isLoading && !isError && video?.id) {
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <VideoPlayer link={link} title={title} />
          <VideoDescription video={video} />
        </div>
        <RelatedVideoList id={id} tags={tags} />
      </div>
    );
  }
  return (
    <>
      <section className="pt-6 pb-20">
        <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
          {content}
        </div>
      </section>
    </>
  );
}
