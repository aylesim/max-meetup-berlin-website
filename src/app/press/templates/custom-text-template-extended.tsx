"use client";

export default function CustomTextTemplateExtended({
  text,
  rotation = -1,
  fontSize = 8,
  showSquare = true,
}: {
  text: string;
  rotation?: number;
  fontSize?: number;
  showSquare?: boolean;
}) {
  const fontSizeRem = 2 + (fontSize - 4) * (4 / 8);

  const content = (
    <h1
      className="font-bold text-center tracking-tighter leading-relaxed whitespace-pre-line"
      style={{
        overflowWrap: "break-word",
        hyphens: "auto",
        maxHeight: "100%",
        fontSize: `${fontSizeRem}rem`,
      }}
    >
      {text || "your custom text here"}
    </h1>
  );

  return (
    <div className="w-full h-full relative bg-white text-black">
      <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
        {showSquare ? (
          <div
            className="border-4 border-black p-5 bg-white w-11/12 mx-auto"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {content}
          </div>
        ) : (
          <div
            className="p-5 w-11/12 mx-auto"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
