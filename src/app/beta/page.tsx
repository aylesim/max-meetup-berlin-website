import Image from "next/image";

export default function BetaPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-black px-4 pt-16 pb-16">
      <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />

      <div className="w-full max-w-5xl relative">
        <div className="flex flex-col gap-12">
          {/* Image Container */}
          <div className="relative w-full h-[60vh] overflow-hidden">
            <Image
              src="/beta.jpg"
              alt="Beta Haus Berlin in black and white"
              fill
              style={{ objectFit: "cover", filter: "grayscale(100%)" }}
              priority
              className="transition-all duration-500 hover:scale-105"
            />
          </div>

          {/* Location - Large Centered */}
          <div className="text-center space-y-6">
            <p className="text-7xl md:text-8xl font-mono font-bold transform -rotate-1">
              @ Betahaus
            </p>
            <p className="text-2xl font-mono opacity-80">
              Rudi-Dutschke-Straße 23, 10969 Berlin
            </p>
          </div>

          {/* Time Info */}
          <div className="text-center space-y-4">
            <p className="text-2xl font-mono">
              February the 15th 2025
              <br />
              3:00 PM - 7:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
