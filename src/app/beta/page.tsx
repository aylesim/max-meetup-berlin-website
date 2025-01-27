import Image from "next/image";

export default function BetaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="relative w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-8">
          {/* Image Container */}
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src="/beta.jpg"
              alt="Beta Haus Berlin"
              fill
              style={{ objectFit: "cover" }}
              priority
              className="transition-all duration-500 hover:scale-105"
            />
          </div>

          {/* Info Container */}
          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-xl font-bold">WHERE</h2>
              <p className="text-lg">
                Beta Haus
                <br />
                Prinzessinnenstraße 23
                <br />
                10969 Berlin
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">WHEN</h2>
              <p className="text-lg">
                Friday, April 26th 2024
                <br />
                19:00 - 23:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
