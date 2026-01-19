export default function HeroCarouselSkeleton() {
  return (
    <div className="my-10 w-full rounded-3xl overflow-hidden shadow-xl shadow-red-900/20 ring-1 ring-white/10">
      <div className="relative h-[28rem] sm:h-[32rem] lg:h-[36rem] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-6 z-10 flex flex-col space-y-3">
          <div className="h-6 w-44 rounded bg-white/10" />
          <div className="h-10 w-80 max-w-[70vw] rounded bg-white/10" />
        </div>

        <div className="absolute top-4 right-4 h-10 w-10 rounded bg-white/10" />
      </div>
    </div>
  )
}
