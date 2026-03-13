"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  DownloadIcon,
  Eye,
  EyeOff,
  Trash,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { type IThumbnail } from "../assets/assets";
import api from "../config/api";
import { useAuth } from "../context/auth-context";

const MyGeneration = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const aspectRatioValueMap: Record<string, number> = {
    "16:9": 16 / 9,
    "1:1": 1,
    "9:16": 9 / 16,
  };

  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);

  const togglePublish = async (thumbnailId: string) => {
    try {
      const { data } = await api.patch(
        `/api/v1/thumbnail/toggle-published/${thumbnailId}`,
      );
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
          "Some error has occurred during fetching thumbnails",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (image_url: string, title?: string) => {
    try {
      const response = await api.get("/api/v1/thumbnail/download-proxy", {
        params: { url: image_url, filename: title || "thumbnail" },
        responseType: "blob",
      });
      const blob = new Blob([response.data]);
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
      toast.error("Failed to download thumbnail");
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
      setThumbnails(thumbnails.filter((t) => t._id !== id));
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Some error has occurred during deleting thumbnail",
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchThumbnail();
    }
  }, [isLoggedIn]);

  return (
    <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl text-foreground font-bold tracking-tight">
          My Generations
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mt-2">
          View and manage all your AI-generated thumbnails
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="rounded-2xl animate-pulse h-65 border-border bg-card"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && thumbnails.length === 0 && (
        <div className="text-center py-24">
          <h3 className="text-xl font-semibold text-foreground">
            No Thumbnails Yet
          </h3>
          <p className="text-base text-muted-foreground mt-2">
            Generate your first thumbnail to see it here.
          </p>
        </div>
      )}

      {/* Display Grid */}
      {!loading && thumbnails.length > 0 && (
        <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-6">
          {thumbnails.map((thumb: IThumbnail) => {
            const aspectValue =
              aspectRatioValueMap[thumb.aspect_ratio || "16:9"];

            return (
              <Card
                key={thumb._id}
                onClick={() => router.replace(`/generate/${thumb._id}`)}
                className="mb-6 group relative cursor-pointer overflow-hidden rounded-2xl border-border bg-card transition-all hover:shadow-2xl break-inside-avoid p-0"
              >
                {/* Image Section */}
                <AspectRatio
                  ratio={aspectValue}
                  className="bg-muted overflow-hidden relative"
                >
                  {thumb.image_url ? (
                    <Image
                      src={thumb.image_url}
                      alt={thumb.title || "Thumbnail"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg">
                      {thumb.isGenerating ? "Generating..." : "No Image"}
                    </div>
                  )}
                  {thumb.isGenerating && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-md flex items-center justify-center text-lg font-bold">
                      Generating...
                    </div>
                  )}
                </AspectRatio>

                {/* Content Section */}
                <CardContent className="p-3 space-y-2.5">
                  <h3 className="text-xl font-bold text-card-foreground line-clamp-2 leading-tight tracking-tight">
                    {thumb.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge
                      variant="secondary"
                      className="px-2.5 py-0.5 text-sm font-semibold"
                    >
                      {thumb.style}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="px-2.5 py-0.5 text-sm font-semibold"
                    >
                      {thumb.color_scheme}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="px-2.5 py-0.5 text-sm font-semibold"
                    >
                      {thumb.aspect_ratio}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {thumb.createdAt
                      ? new Date(thumb.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </CardContent>

                {/* Publish Toggle Button */}
                <div
                  className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    size="sm"
                    variant={thumb.isPublished ? "default" : "secondary"}
                    onClick={() => togglePublish(thumb._id)}
                    className={`h-8 px-3 text-xs font-bold gap-1.5 rounded-full shadow-lg ${
                      thumb.isPublished
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-background/90 backdrop-blur-md hover:bg-background border border-border"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={thumb.isPublished ? Eye : EyeOff}
                      className="size-4"
                    />
                    {thumb.isPublished ? "Published" : "Unpublished"}
                  </Button>
                </div>

                {/* Actions Overlay */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-2 right-2 flex gap-1.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-9 rounded-xl bg-background/90 backdrop-blur-md border border-border hover:bg-destructive hover:text-white shadow-lg transition-all"
                    onClick={() => handleDelete(thumb._id)}
                  >
                    <HugeiconsIcon icon={Trash} className="size-4.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="size-9 rounded-xl bg-background/90 backdrop-blur-md border border-border hover:bg-primary hover:text-white shadow-lg transition-all"
                    onClick={() =>
                      handleDownload(thumb.image_url!, thumb.title)
                    }
                  >
                    <HugeiconsIcon icon={DownloadIcon} className="size-4.5" />
                  </Button>
                  <Link
                    target="_blank"
                    href={`/preview?thumbnail_url=${encodeURIComponent(thumb.image_url || "")}&title=${encodeURIComponent(thumb.title || "")}`}
                    passHref
                  >
                    <Button
                      size="icon"
                      variant="secondary"
                      className="size-9 rounded-xl bg-background/90 backdrop-blur-md border border-border hover:bg-primary hover:text-white shadow-lg transition-all"
                    >
                      <HugeiconsIcon icon={ArrowUpRight} className="size-4.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyGeneration;
