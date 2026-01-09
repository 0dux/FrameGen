import {
  ChevronDownIcon,
  CpuIcon,
  ImageIcon,
  PenToolIcon,
  SparkleIcon,
  SquareIcon,
} from "lucide-react";
import type React from "react";
import { thumbnailStyles, type ThumbnailStyle } from "../assets/assets";

const StyleSelector = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
}: {
  value: ThumbnailStyle;
  onChange: (style: ThumbnailStyle) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const styleDescription: Record<ThumbnailStyle, string> = {
    "Bold & Graphic": "High contrast, bold typography, striking visuals",
    Minimalist: "Clean, simple, lots of white space",
    Photorealistic: "Photo-based, natural looking",
    Illustrated: "Hand-drawn, artistic, creative",
    "Tech/Futuristic": "Modern, sleek, tech-inspired",
  };

  const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    "Bold & Graphic": <SparkleIcon className="h-4 w-4" />,
    Minimalist: <SquareIcon className="h-4 w-4" />,
    Photorealistic: <ImageIcon className="h-4 w-4" />,
    Illustrated: <PenToolIcon className="h-4 w-4" />,
    "Tech/Futuristic": <CpuIcon className="h-4 w-4" />,
  };
  return (
    <div className="relative space-y-3 dark">
      <label className="block text-sm font-medium text-zinc-200">
        Thumbnail Style
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition bg-white/8 border-white/10 text-zinc-200 hover:bg-white/12"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-medium">
            {styleIcons[value]}
            <span>{value}</span>
          </div>
          <p className="text-xs text-zinc-400">{styleDescription[value]}</p>
        </div>
        <ChevronDownIcon
          className={[
            "h-5 w-5 transition-transform text-zinc-400",
            isOpen && "rotate-180",
          ].join(" ")}
        />
      </button>
      {isOpen && (
        <>
          <div className="absolute bottom-0 z-50 mt-1 w-full rounded-md border border-white/12 bg-black/20 backdrop-blur-3xl shadow-lg">
            {thumbnailStyles.map((style) => (
              <button
                type={"button"}
                key={style}
                onClick={() => {
                  onChange(style);
                  setIsOpen(false);
                }}
                className={
                  "flex w-full px-4 py-3 gap-3 text-left transition hover:bg-black/30"
                }
              >
                <div className="mt-0.5">{styleIcons[style]}</div>
                <div>
                  <p className="font-medium text-zinc-200">{style}</p>
                  <p className="text-xs text-zinc-400">
                    {styleDescription[style]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StyleSelector;
