import { AspectRatio, aspectRatios } from "@/app/assets/assets";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  RectangleHorizontal,
  RectangleVertical,
  Square,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type React from "react";

const AspectRatioSelector = ({
  value,
  onChange,
}: {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}) => {
  const iconMap: Record<AspectRatio, React.ReactNode> = {
    "16:9": <HugeiconsIcon icon={RectangleHorizontal} className="size-4" />,
    "1:1": <HugeiconsIcon icon={Square} className="size-4" />,
    "9:16": <HugeiconsIcon icon={RectangleVertical} className="size-4" />,
  };

  return (
    <div className="space-y-3">
      <Label id="aspect-ratio-label">Aspect Ratio</Label>
      <div
        role="group"
        aria-labelledby="aspect-ratio-label"
        className="flex flex-wrap gap-2"
      >
        {" "}
        {aspectRatios.map((ratio) => {
          const selected = value === ratio;

          return (
            <Button
              key={ratio}
              variant={selected ? "default" : "outline"}
              size="sm"
              className={`flex items-center gap-2 transition-all ${
                selected
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm ring-2 ring-blue-600/20"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              type="button"
              onClick={() => onChange(ratio)}
            >
              {iconMap[ratio]}
              <span className="tracking-widest">{ratio}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AspectRatioSelector;
