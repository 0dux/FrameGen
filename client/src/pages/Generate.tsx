import { WandSparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import AspectRatioSelector from "../components/AspectRatioSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";
import SoftBackDrop from "../components/SoftBackDrop";
import StyleSelector from "../components/StyleSelector";
import api from "../configs/api";
import { useAuth } from "../context/AuthContext";

const Generate = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, refreshCredits } = useAuth();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [aspectRatios, setAspectRatios] = useState<AspectRatio>("16:9");
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  const [colorSchemeId, setColorSchemeId] = useState(
    colorSchemes[0].id as string,
  );
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchAttempts, setFetchAttempts] = useState(0);

  //Generate the thumbnail
  const handleGenerate = async () => {
    try {
      if (!isLoggedIn) {
        return toast.error("Please login to generate thumbnails.");
      }
      if (!title.trim()) {
        return toast.error("Title is required!");
      }
      setLoading(true);
      const api_payload = {
        title,
        prompt: additionalDetails,
        style,
        aspect_ratio: aspectRatios,
        color_scheme: colorSchemeId,
        text_overlay: true,
      };
      const { data } = await api.post(
        "/api/v1/thumbnail/generate",
        api_payload,
      );
      if (data.thumbnail) {
        navigate("/generate/" + data.thumbnail._id);
        toast.success(data.message);
        await refreshCredits();
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  //fetch the thumbnail
  const fetchThumbnail = async () => {
    try {
      const { data } = await api.get(`/api/v1/user/thumbnail/${id}`);

      // Check if response is wrapped or direct
      const thumbnailData = data?.thumbnail || data;

      console.log("Setting thumbnail data:", thumbnailData);

      setThumbnail(thumbnailData as IThumbnail);
      setTitle(thumbnailData?.title);
      setAspectRatios(thumbnailData?.aspect_ratio);
      setStyle(thumbnailData?.style);
      setColorSchemeId(thumbnailData?.color_scheme);
      setAdditionalDetails(thumbnailData?.user_prompt);

      // Only stop loading if we have the image
      if (thumbnailData?.image_url || !thumbnailData?.isGenerating) {
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Some error has occured during generation",
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumbnail();
      setFetchAttempts(0); // Reset attempts on new id
    }
  }, [id, isLoggedIn]);

  //Whenever a thumbnail exists it is requested from the backend for 3 times only.
  useEffect(() => {
    if (isLoggedIn && id && loading && fetchAttempts < 3) {
      const interval = setInterval(() => {
        setFetchAttempts((prev) => {
          const newAttempts = prev + 1;
          if (newAttempts >= 3) {
            setLoading(false);
            toast.error(
              "Thumbnail generation is taking longer than expected. Please try again later.",
            );
          } else {
            fetchThumbnail();
          }
          return newAttempts;
        });
      }, 5 * 1000);
      return () => clearInterval(interval);
    }
  }, [id, isLoggedIn, loading, fetchAttempts]);

  //Whenever the pathname changes the thumbnail disappears
  useEffect(() => {
    if (!id && thumbnail) {
      setThumbnail(null);
    }
  }, [pathname]);

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
                  <StyleSelector
                    value={style}
                    onChange={setStyle}
                    isOpen={styleDropdownOpen}
                    setIsOpen={setStyleDropdownOpen}
                  />
                  {/* ColorScheme Selector */}
                  <ColorSchemeSelector
                    value={colorSchemeId}
                    onChange={setColorSchemeId}
                  />
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
                  <button
                    onClick={handleGenerate}
                    className="py-3.5 bg-blue-700 rounded-xl w-full text-sm bg-linear-to-b from-blue-500 to-blue-700 font-medium hover:from-blue-700 transition-colors disabled:cursor-not-allowed duration-200"
                  >
                    {loading ? "Generating ..." : "Generate"}
                  </button>
                )}
              </div>
            </div>
            {/* right panel */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">
                  Preview
                </h2>
                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatios}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
