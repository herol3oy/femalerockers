export default function TravelFilmAwardsPage() {
  return (
    <div className="min-h-screen py-12 px-6 text-red-100 lg:px-20">
      <div className="max-w-4xl mx-auto  shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-red-600">
          Female Rockers x Travel Film Awards
        </h1>

        <p className="text-gray-300 leading-relaxed">
          At Female Rockers, we’ve built our name on one simple truth: art
          should be free from the grip of hype, gatekeepers, and pay-to-play
          politics. Our mission has always been to give independent, talented
          musicians— especially women in rock—the visibility they deserve
          without asking them to hand over their savings or sell their soul to
          the industry machine.
        </p>

        <p className="text-gray-300 leading-relaxed">
          That’s exactly why we’re proud to sponsor the Travel Film Awards
          (TFA). This isn’t your usual red-carpet, industry-owned event. TFA
          exists to give independent filmmakers a stage where their work is
          judged by its quality and impact—not by connections, budget, or
          marketability. It’s about art for art’s sake in the world of cinema,
          just like we do for music.
        </p>

        <p className="text-gray-300 leading-relaxed">
          In a world where Netflix algorithms, Hollywood politics, and
          award-show mafias decide who gets seen, festivals like TFA are rare
          and precious. They spotlight voices that might otherwise be
          buried—artists who live for their craft, who tell stories worth
          hearing, and who often work with nothing but their skill, passion, and
          persistence.
        </p>

        <p className="text-gray-300 leading-relaxed">
          By supporting TFA, we’re extending our mission beyond music. We’re
          helping filmmakers who travel the world to capture truth, beauty, and
          humanity in all its forms. And we’re doing it because we believe
          artists— whether they play a guitar or hold a camera—are the hope of
          human life.
        </p>

        <p className="text-gray-300 leading-relaxed">
          The 2025 edition takes place in{' '}
          <span className="font-semibold">Barcelona from September 26–28</span>,
          showcasing short films from around the globe, from fiction and
          documentary to experimental and animation—all centered on this year’s
          theme:
          <span className="font-bold text-gray-300">
            {' '}
            Tourism &amp; Sustainable Transformation
          </span>
          . Alongside screenings, there will be live music, workshops, panels,
          and cultural events, all free to attend.
        </p>

        <h2 className="text-2xl font-semibold text-gray-100">
          How you can join in:
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          <li>
            <strong>Filmmakers:</strong> Submit your short travel-related film
            by August 20.
          </li>
          <li>
            <strong>Audience:</strong> Come watch, connect, and celebrate art
            that refuses to be ordinary.
          </li>
          <li>
            <strong>Supporters:</strong> Donate to help us and TFA keep projects
            like this alive. Your contribution goes directly toward managing
            this initiative and fueling future collaborations with independent
            artists.
          </li>
        </ul>

        <p className="text-gray-300 leading-relaxed">
          Art doesn’t owe you a return on investment. It’s not a business
          transaction—it’s a gift to the world. If you believe in it, support
          it. Even a single euro or dollar matters.
        </p>

        <div className="space-y-2">
          <a
            href="https://travelfilmawards.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Learn more about the Travel Film Awards
          </a>
          <br />
          <a
            href="https://femalerockers.com/donate"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Donate to support this and similar projects
          </a>
        </div>
      </div>
    </div>
  )
}
