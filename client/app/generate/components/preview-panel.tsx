import {
  AspectRatio as AspectRatioType,
  IThumbnail,
} from "@/app/assets/assets";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ImageIcon, Loader } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatioType;
}) => {
  const aspectValue = {
    "16:9": 16 / 9,
    "1:1": 1,
    "9:16": 9 / 16,
  }[aspectRatio];

  //Download function
  const onDownload = async () => {
    if (!thumbnail?.image_url) return;
    try {
      const response = await fetch(thumbnail.image_url);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${thumbnail.title || "thumbnail"}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Card className="relative overflow-hidden shadow-2xl">
      <AspectRatio ratio={aspectValue}>
        {/* Loading State  */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
            <HugeiconsIcon
              icon={Loader}
              className="size-10 animate-spin text-blue-600 dark:text-blue-500"
            />
            <div className="text-center px-6">
              <p className="text-base font-semibold">
                Crafting Your Masterpiece...
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                This usually takes about 10-20 seconds
              </p>
            </div>
          </div>
        )}

        {/* Thumbnail Generated Preview */}
        {!isLoading && thumbnail?.image_url ? (
          <div className="group relative h-full w-full">
            <Image
              src={thumbnail.image_url}
              alt={thumbnail.title || "Generated thumbnail"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Button
                onClick={onDownload}
                size="lg"
                className="gap-2 bg-white text-black hover:bg-zinc-200 dark:bg-zinc-100 dark:hover:bg-zinc-300 transition-all transform translate-y-4 group-hover:translate-y-0"
              >
                <HugeiconsIcon icon={Download} className="size-5" />
                Download PNG
              </Button>
            </div>
          </div>
        ) : !isLoading ? (
          /* Empty State */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
            <div className="flex size-24 items-center justify-center rounded-full bg-blue-600/10 border border-blue-600/20 dark:bg-blue-500/10 dark:border-blue-500/20">
              <HugeiconsIcon
                icon={ImageIcon}
                className="size-12 text-blue-600/60 dark:text-blue-500/60"
              />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Your Preview Awaits</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Configure your thumbnail style and title on the left, then click
                Generate to see the magic.
              </p>{" "}
            </div>
          </div>
        ) : null}
      </AspectRatio>
    </Card>
  );
};

export default PreviewPanel;
