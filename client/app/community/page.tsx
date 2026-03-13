"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, DownloadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { type IThumbnail } from "../assets/assets";
import api from "../config/api";

const Community = () => {
  const router = useRouter();

  const aspectRatioValueMap: Record<string, number> = {
    "16:9": 16 / 9,
    "1:1": 1,
    "9:16": 9 / 16,
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
          "Some error has occurred while fetching thumbnails",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (image_url: string, title?: string) => {
    try {
      const response = await api.get("/api/v1/thumbnail/download-proxy", {
        params: { url: image_url, filename: title || "community-thumbnail" },
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

  useEffect(() => {
    fetchThumbnails();
  }, []);

  return (
    <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 relative">
      {/* Header */}
      <div className="mb-12 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl text-foreground font-bold tracking-tight">
          Thumbnails created by the Frame Gen community
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mt-2 max-w-2xl">
          View and get inspired from others.
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
            No one has published any thumbnails yet. Be the first one to publish
            your thumbnail for others to see!
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
                onClick={() => router.push(`/generate/${thumb._id}`)}
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
                      alt={thumb.title || "Community Thumbnail"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-lg italic">
                      No Image Available
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
                  <div className="pt-1 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground font-medium italic">
                      by Community Member
                    </p>
                    <p className="text-xs text-muted-foreground/60 font-medium">
                      {thumb.createdAt
                        ? new Date(thumb.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </CardContent>

                {/* Actions Overlay */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-2 right-2 flex gap-1.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                >
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

export default Community;
