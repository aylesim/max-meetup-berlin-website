"use client";

export default function CustomTextTemplateExtended({
  text,
  rotation = -1,
  fontSize = 8,
  showSquare = true,
  backgroundImage = "",
  imagePosition = "cover",
  imageFilter = "none",
  textColor = "#000000",
  boxBgColor = "#ffffff",
  boxBorderColor = "#000000",
  boxOpacity = 100,
  boxFillOpacity = 100,
}: {
  text: string;
  rotation?: number;
  fontSize?: number;
  showSquare?: boolean;
  backgroundImage?: string;
  imagePosition?: "cover" | "contain" | "fill" | "none";
  imageFilter?: string;
  textColor?: string;
  boxBgColor?: string;
  boxBorderColor?: string;
  boxOpacity?: number;
  boxFillOpacity?: number;
}) {
  const fontSizeRem = 2 + (fontSize - 4) * (4 / 8);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const content = (
    <h1
      className="font-bold text-center tracking-tighter leading-relaxed whitespace-pre-line"
      style={{
        overflowWrap: "break-word",
        hyphens: "auto",
        maxHeight: "100%",
        fontSize: `${fontSizeRem}rem`,
        color: textColor,
      }}
    >
      {text || "your custom text here"}
    </h1>
  );

  const boxStyle = {
    transform: `rotate(${rotation}deg)`,
    backgroundColor: hexToRgba(boxBgColor, boxFillOpacity / 100),
    ...(showSquare && {
      borderWidth: "4px",
      borderStyle: "solid" as const,
      borderColor: hexToRgba(boxBorderColor, boxOpacity / 100),
    }),
  };

  return (
    <div className="w-full h-full relative text-black overflow-hidden">
      {backgroundImage && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: imagePosition === "none" ? "auto" : imagePosition,
            backgroundPosition: "center",
            backgroundRepeat: imagePosition === "none" ? "repeat" : "no-repeat",
            filter: imageFilter !== "none" ? imageFilter : "none",
          }}
        />
      )}

      <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
        <div className="p-5 w-11/12 mx-auto" style={boxStyle}>
          {content}
        </div>
      </div>
    </div>
  );
}
