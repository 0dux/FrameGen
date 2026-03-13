import { ThumbnailStyle, thumbnailStyles } from "@/app/assets/assets";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Cpu,
  Image,
  PenTool,
  Sparkle,
  SquareIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type React from "react";

const styleDescription: Record<ThumbnailStyle, string> = {
  "Bold & Graphic": "High contrast, bold typography, striking visuals",
  Minimalist: "Clean, simple, lots of white space",
  Photorealistic: "Photo-based, natural looking",
  Illustrated: "Hand-drawn, artistic, creative",
  "Tech/Futuristic": "Modern, sleek, tech-inspired",
};

const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
  "Bold & Graphic": <HugeiconsIcon icon={Sparkle} className="h-4 w-4" />,
  Minimalist: <HugeiconsIcon icon={SquareIcon} className="h-4 w-4" />,
  Photorealistic: <HugeiconsIcon icon={Image} className="h-4 w-4" />,
  Illustrated: <HugeiconsIcon icon={PenTool} className="h-4 w-4" />,
  "Tech/Futuristic": <HugeiconsIcon icon={Cpu} className="h-4 w-4" />,
};

const StyleSelector = ({
  value,
  onChange,
}: {
  value: ThumbnailStyle;
  onChange: (style: ThumbnailStyle) => void;
  isOpen: boolean; // Retained for compatibility but effectively unused with Shadcn Select
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <div className="space-y-3">
      <Label>Thumbnail Style</Label>
      <Select
        value={value}
        onValueChange={(val) => onChange(val as ThumbnailStyle)}
      >
        <SelectTrigger className="w-full flex items-center justify-between h-auto py-3">
          <SelectValue placeholder="Select a style">
            <div className="flex items-center gap-2 text-left">
              <div className="mt-0.5">{styleIcons[value]}</div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{value}</span>
                <span className="text-[10px] text-muted-foreground leading-tight">
                  {styleDescription[value]}
                </span>
              </div>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {thumbnailStyles.map((style) => (
            <SelectItem
              key={style}
              value={style}
            >
              <div className="flex items-center gap-3 py-1">
                <div className="mt-0.5">{styleIcons[style]}</div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{style}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight">
                    {styleDescription[style]}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StyleSelector;

