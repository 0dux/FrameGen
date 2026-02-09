import {
  ArrowUpRight,
  DownloadIcon,
  Eye,
  EyeClosed,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { type IThumbnail } from "../assets/assets";
import SoftBackDrop from "../components/SoftBackDrop";
import api from "../configs/api";
import { useAuth } from "../context/AuthContext";

const MyGeneration = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const aspectRatioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);

  const togglePublish = async (thumbnailId: string) => {
    try {
      const { data } = await api.patch(
        `/api/v1/thumbnail/toggle-published/${thumbnailId}`,
      );
      // Update the local state with the toggled value
      setThumbnails((prev) =>
        prev.map((t) =>
          t._id === thumbnailId
            ? {
                ...t,
                isPublished: data.thumbnail?.isPublished ?? !t.isPublished,
              }
            : t,
        ),
      );
      toast.success(data.message || "Publish status updated");
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
      toast.error(
        error?.response?.data?.message ||
          "Some error has occurred during toggling publish status",
      );
    }
  };

  const fetchThumbnail = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/v1/user/thumbnails");
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

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this thumbnail.",
      );
      if (!confirm) return;
      const { data } = await api.delete(`/api/v1/thumbnail/delete/${id}`);
      toast.success(data.message);
      setThumbnails(thumbnails.filter((t) => t._id != id));
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Some error has occured during fetching thumbnails",
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchThumbnail();
    }
  }, [isLoggedIn]);
  return (
    <>
      <SoftBackDrop />
      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl text-zinc-200 font-bold">My Generations</h1>
          <p className="text-sm text-zinc-400 mt-1">
            View and manage all your AI-generated thumbnails
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
              Generate your first thumbnail to see it here.
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
                <div
                  key={thumb._id}
                  onClick={() => navigate(`/generate/${thumb._id}`)}
                  className="mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border border-white/10 transition shadow-xl break-inside-avoid"
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}
                  >
                    {thumb.image_url ? (
                      <img
                        src={thumb.image_url}
                        alt={thumb.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">
                        {thumb.isGenerating ? "Generating..." : "No Image"}
                      </div>
                    )}
                    {thumb.isGenerating && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-sm font-medium text-white">
                        Generating...
                      </div>
                    )}
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

                  <div onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => togglePublish(thumb._id)}
                      className="absolute bottom-12 right-1 cursor-pointer"
                    >
                      {thumb.isPublished ? (
                        <div className="flex gap-2 items-center bg-linear-to-br from-blue-500 to-blue-800 hover:bg-linear-to-tl hover:from-blue-500 hover:to-blue-800 transition-colors duration-300 rounded-2xl px-2 py-1">
                          <Eye /> Published
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center bg-linear-to-br from-indigo-500 to-indigo-800 hover:bg-linear-to-tl hover:from-indigo-500 hover:to-indigo-800 transition-colors duration-300 rounded-2xl px-2 py-1">
                          <EyeClosed /> Unpublished
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Options, Download, Delete, etc... */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5"
                  >
                    <Trash2Icon
                      onClick={() => handleDelete(thumb._id)}
                      className="size-6 bg-black/50 p-1 rounded hover:bg-blue-600 transition-all"
                    />
                    <DownloadIcon
                      onClick={() =>
                        handleDownload(thumb.image_url!, thumb.title)
                      }
                      className="size-6 bg-black/50 p-1 rounded hover:bg-blue-600 transition-all"
                    />
                    <Link
                      target="_blank"
                      to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
                    >
                      <ArrowUpRight className="size-6 bg-black/50 p-1 rounded hover:bg-blue-600 transition-all" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyGeneration;
