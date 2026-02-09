import { ArrowUpRight, DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { type IThumbnail } from "../assets/assets";
import SoftBackDrop from "../components/SoftBackDrop";
import api from "../configs/api";

const Community = () => {
  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);

  const fetchThumbnails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/v1/thumbnail/community");
      setThumbnails(data.thumbnails || []);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Some error has occured during fetching thumbnails",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (image_url: string, title?: string) => {
    try {
      const response = await fetch(image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title || "thumbnail"}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);
  return (
    <>
      <SoftBackDrop />
      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-zinc-200 font-bold">
            Thumbnails created by the Frame Gen community
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            View and get inspired from others.
          </p>
        </div>
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]"
              />
            ))}
          </div>
        )}
        {/* Empty State */}
        {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-zinc-200">
              No Thumbnails Yet
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              No one has published any thumbnails yet be the first one to
              publish your thumbnail for others to see.
            </p>
          </div>
        )}
        {/* Display Grid */}
        {!loading && thumbnails.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
            {thumbnails.map((thumb: IThumbnail) => {
              const aspectClass =
                aspectRatioClassMap[thumb.aspect_ratio || "16:9"];
              // console.log(thumb._id);

              return (
                <a href={thumb.image_url} target="_blank">
                  <div
                    key={thumb._id}
                    className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid"
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
                    >
                      <img
                        src={thumb.image_url}
                        alt={thumb.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h3 className="text-sm font-semibold text-zinc-100 line-clamp-2">
                        {thumb.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                        <span className="px-2 py-0.5 bg-white/8 rounded">
                          {thumb.style}
                        </span>
                        <span className="px-2 py-0.5 bg-white/8 rounded">
                          {thumb.color_scheme}
                        </span>
                        <span className="px-2 py-0.5 bg-white/8 rounded">
                          {thumb.aspect_ratio}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">
                        {new Date(thumb.createdAt!).toDateString()}
                      </p>
                    </div>
                    {/* Options, Download, Delete, etc... */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5"
                    >
                      <DownloadIcon
                        onClick={() => handleDownload(thumb.image_url!, thumb.title)}
                        className="size-6 bg-black/50 p-1 rounded hover:bg-green-600 transition-all"
                      />
                      <Link
                        target="_blank"
                        to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
                      >
                        <ArrowUpRight className="size-6 bg-black/50 p-1 rounded hover:bg-green-600 transition-all" />
                      </Link>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Community;
