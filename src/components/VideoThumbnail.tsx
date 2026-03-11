type VideoSource = {
  src: string;
  type?: string;
};

type VideoThumbnailProps = {
  sources: VideoSource[];
  className?: string;
  poster?: string;
};

export default function VideoThumbnail({
  sources,
  className,
  poster,
}: VideoThumbnailProps) {
  if (!sources?.length) {
    return (
      <div
        className={
          className ??
          "flex h-full w-full items-center justify-center bg-slate-200 text-xs text-slate-500"
        }
      >
        Video no disponible
      </div>
    );
  }

  return (
    <video
      className={className ?? "h-full w-full object-cover"}
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label="Miniatura de video"
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
      Tu navegador no soporta video.
    </video>
  );
}
