"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader, WandSparkles } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion, Variants } from "framer-motion";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../../assets/assets";
import api from "../../config/api";
import { useAuth } from "../../context/auth-context";
import AspectRatioSelector from "../components/aspect-ratio-selector";
import ColorSchemeSelector from "../components/color-scheme-selector";
import PreviewPanel from "../components/preview-panel";
import StyleSelector from "../components/style-selector";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const leftPanelVariants: Variants = {
  hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const rightPanelVariants: Variants = {
  hidden: { opacity: 0, x: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.5,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 15,
    filter: "drop-shadow(0 0 8px rgba(37, 99, 235, 0.5))",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const Generate = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();

  const pathname = usePathname();

  const { isLoggedIn, refreshCredits } = useAuth();

  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  //thumbnail
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [aspectRatios, setAspectRatios] = useState<AspectRatio>("16:9");
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [colorSchemeId, setColorSchemeId] = useState(
    (colorSchemes[0]?.id as string) ?? "",
  );

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
        router.push("/generate/" + data.thumbnail._id);
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
  const fetchThumbnail = useCallback(async () => {
    try {
      const { data } = await api.get(`/api/v1/user/thumbnail/${id}`);

      const thumbnailData = data?.thumbnail || data;

      // console.log("Setting thumbnail data:", thumbnailData);

      setThumbnail(thumbnailData as IThumbnail);
      setTitle(thumbnailData?.title ?? "");
      setAspectRatios(thumbnailData?.aspect_ratio ?? "16:9");
      setStyle(thumbnailData?.style ?? "Bold & Graphic");
      setColorSchemeId(
        thumbnailData?.color_scheme ?? colorSchemes[0]?.id ?? "",
      );
      setAdditionalDetails(thumbnailData?.user_prompt ?? "");
      // Only stop loading if we have the image
      if (thumbnailData?.image_url || !thumbnailData?.isGenerating) {
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "Some error has occurred during generation",
      );
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumbnail();
      setFetchAttempts(0);
    }
  }, [id, isLoggedIn, fetchThumbnail]);

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
  }, [id, isLoggedIn, loading, fetchAttempts, fetchThumbnail]);

  useEffect(() => {
    if (!id && thumbnail) {
      setThumbnail(null);
    }
  }, [pathname, id, thumbnail]);

  return (
    <div className="pt-24 min-h-screen">
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8"
      >
        <div className="grid lg:grid-cols-[450px_1fr] gap-8 items-start">
          {/* left panel */}
          <motion.div variants={leftPanelVariants}>
            <Card
              className={`border shadow-lg bg-card/50 backdrop-blur-sm ${id ? "pointer-events-none opacity-80" : ""}`}
            >
              {" "}
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  Generate Thumbnail
                  <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <HugeiconsIcon
                      icon={WandSparkles}
                      className="h-6 w-6 text-blue-600 dark:text-blue-500"
                    />
                  </motion.div>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Describe your masterpiece and let AI bring it to life.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input field for generation*/}
                <div className="space-y-4">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="title" className="font-medium">
                      Title or Topic
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={100}
                      placeholder="e.g., How to Learn to Code Faster"
                      className="h-11 border-input bg-background/50 focus-visible:ring-blue-500/50 transition-all focus:scale-[1.01]"
                    />
                    <div className="flex justify-end">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {title.length}/100
                      </span>
                    </div>
                  </motion.div>

                  {/* Aspect ratio Selector */}
                  <motion.div variants={itemVariants}>
                    <AspectRatioSelector
                      value={aspectRatios}
                      onChange={setAspectRatios}
                    />
                  </motion.div>

                  {/* Style Selector */}
                  <motion.div variants={itemVariants}>
                    <StyleSelector
                      value={style}
                      onChange={setStyle}
                      isOpen={false}
                      setIsOpen={() => {}}
                    />
                  </motion.div>

                  {/* ColorScheme Selector */}
                  <motion.div variants={itemVariants}>
                    <ColorSchemeSelector
                      value={colorSchemeId}
                      onChange={setColorSchemeId}
                    />
                  </motion.div>

                  {/* Additional Details  */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="details"
                      className="flex items-center gap-2 font-medium"
                    >
                      Additional Details
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                        (Optional)
                      </span>
                    </Label>
                    <Textarea
                      id="details"
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="Add extra objects, characters, or mood you want..."
                      rows={4}
                      className="bg-background/50 border-input focus-visible:ring-blue-500/50 resize-none leading-relaxed transition-all focus:scale-[1.01]"
                    />
                  </motion.div>
                </div>

                {/* Submit Button */}
                {!id && (
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      disabled={loading}
                      onClick={handleGenerate}
                      className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={Loader}
                            className="animate-spin h-4 w-4"
                          />
                          Generating...
                        </span>
                      ) : (
                        "Generate Thumbnail"
                      )}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* right panel */}
          <motion.div
            variants={rightPanelVariants}
            className="lg:sticky lg:top-32 space-y-6"
          >
            <PreviewPanel
              thumbnail={thumbnail}
              isLoading={loading}
              aspectRatio={aspectRatios}
            />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Generate;
