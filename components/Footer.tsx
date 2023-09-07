import { FOOTER_SECTIONS } from '@/constants/footer-sections'

export default function Footer() {
  return (
    <footer className="secondary-light-color my-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {FOOTER_SECTIONS.map((section) => (
        <section key={section.title}>
          <h3 className="w-full border border-l-0 border-r-0 border-t-0 border-b-zinc-100 pb-1 text-xl font-bold uppercase">
            {section.title}
          </h3>
          {section.content}
        </section>
      ))}
    </footer>
  )
}
