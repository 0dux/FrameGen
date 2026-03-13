import { yt_html } from "../assets/assets";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function YtPreview({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const thumbnail_url = (resolvedParams.thumbnail_url as string) || "";
  const title = (resolvedParams.title as string) || "Demo Title";

  const new_html = yt_html
    .replace("%%THUMBNAIL_URL%%", thumbnail_url)
    .replace("%%TITLE%%", title);

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      <iframe
        srcDoc={new_html}
        className="h-full w-full border-none"
        title="YouTube Preview"
        allowFullScreen
      ></iframe>
    </div>
  );
}
