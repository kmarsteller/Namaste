import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/60 bg-stone-950 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Image
            src="/logo-greige.png"
            alt="Namaste Yoga Studio"
            width={160}
            height={56}
            className="h-10 w-auto mb-4 opacity-70"
          />
          <p className="font-body text-xs text-stone-600 tracking-wide leading-relaxed">
            9821 Olde 8 Rd. Suite H20<br />
            Northfield, OH 44067
          </p>
          <p className="font-body text-xs text-stone-600 mt-3">
            <a href="tel:3309080700" className="hover:text-stone-400 transition-colors">330-908-0700</a>
          </p>
          <p className="font-body text-xs text-stone-600">
            <a href="mailto:namasteyogaohio@gmail.com" className="hover:text-stone-400 transition-colors">
              namasteyogaohio@gmail.com
            </a>
          </p>
        </div>

        {/* Studio */}
        <div>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-600 mb-4">Studio</p>
          <ul className="space-y-2.5">
            {["Classes", "Schedule", "Pricing", "Workshops", "Teacher Training"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-body text-xs text-stone-500 hover:text-stone-200 transition-colors tracking-wide"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-600 mb-4">About</p>
          <ul className="space-y-2.5">
            {["Instructors", "About", "New Students", "Gift Cards", "Mindful Musings"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-body text-xs text-stone-500 hover:text-stone-200 transition-colors tracking-wide"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-600 mb-4">Connect</p>
          <ul className="space-y-2.5">
            {[
              { label: "Facebook", href: "https://facebook.com" },
              { label: "Instagram", href: "https://instagram.com" },
              { label: "YouTube", href: "https://youtube.com" },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs text-stone-500 hover:text-stone-200 transition-colors tracking-wide"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-14 pt-6 border-t border-stone-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-[10px] tracking-widest uppercase text-stone-700">
          &copy; {new Date().getFullYear()} Namaste Yoga Studio
        </p>
        <p className="font-display italic text-stone-700 text-sm">
          The light in me honors the light in you.
        </p>
      </div>
    </footer>
  );
}
