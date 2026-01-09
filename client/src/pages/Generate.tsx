import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import AspectRatioSelector from "../components/AspectRatioSelector";
import SoftBackDrop from "../components/SoftBackDrop";

const Generate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [aspectRatios, setAspectRatios] = useState<AspectRatio>("16:9 ");
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  const [colorSchemeId, setColorSchemeId] = useState(colorSchemes[0].id);
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <SoftBackDrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8 ">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            {/* left panel */}
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                {/* Title and Description for card */}
                <div>
                  <h2 className="text-xl font-bold mb-1 text-zinc-100">
                    Generate your thumbnail
                  </h2>
                  <p className="flex text-sm text-zinc-400">
                    Describe your thumbnail and let our ai do the magic.
                    <WandSparkles className="h-4" />
                  </p>
                </div>

                {/* Input field for generation*/}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-200">
                      Title or Topic
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder="e.g., how to learn to code faster"
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end">
                      <span className="text-xs text-zinc-400">
                        {title.length}/100
                      </span>
                    </div>
                  </div>
                  {/* Aspect ratio Selector */}
                  <AspectRatioSelector
                    value={aspectRatios}
                    onChange={setAspectRatios}
                  />
                  {/* Style Selector */}
                  {/* ColorScheme Selector */}
                  {/* Additional Details  */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-200">
                      Additional Details{" "}
                      <span className="text-zinc-400 text-xs">(optional)</span>
                    </label>
                    <textarea
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      rows={3}
                      placeholder="Add any extra details you what to be present in the image"
                      className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                {!id && (
                  <button className="py-3.5 bg-blue-700 rounded-xl w-full text-sm bg-linear-to-b from-blue-500 to-blue-700 font-medium hover:from-blue-700 transition-colors disabled:cursor-not-allowed duration-200">
                    {loading ? "Generating ..." : "Generate"}
                  </button>
                )}
              </div>
            </div>
            {/* right panel */}
            <div></div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
