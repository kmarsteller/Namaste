import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSQL, ensureTable, hasDB, type Post } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mindful Musings | Namaste Yoga Studio",
  description: "Reflections, wellness tips, and stories from Namaste Yoga Studio in Northfield, Ohio.",
};

async function getPosts(): Promise<Post[]> {
  if (!hasDB()) return [];
  try {
    await ensureTable();
    const sql = getSQL();
    const rows = await sql`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`;
    return rows as Post[];
  } catch {
    return [];
  }
}

export default async function MindfulMusingsPage() {
  const posts = await getPosts();

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 md:px-12 overflow-hidden">
          {/* Background photo */}
          <Image
            src="/sanskrit_pen.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          {/* Dark base + burgundy tint */}
          <div className="absolute inset-0 bg-stone-950/75" />
          <div className="absolute inset-0 bg-burgundy-900/40" />
          {/* Side fades */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-stone-950 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-stone-950 to-transparent" />
          {/* Bottom fade into content */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-stone-950 to-transparent" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-10 h-px bg-burgundy-400/50" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-burgundy-300/80">The Blog</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-5">
              Mindful Musings
            </h1>
            <p className="font-body font-light text-stone-300 text-sm leading-relaxed max-w-xl">
              Reflections, wellness tips, and stories from our studio and community.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 px-6 md:px-12 bg-stone-950">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-2xl font-light text-stone-600">Coming soon.</p>
                <p className="font-body text-xs text-stone-700 mt-2">Check back for reflections and stories from our community.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {posts.map((post, i) => (
                  <article key={post.id} className={`flex flex-col md:flex-row gap-8 ${i > 0 ? "pt-12 border-t border-stone-800/40" : ""}`}>
                    {post.hero_image_url && (
                      <Link href={`/mindful-musings/${post.slug}`} className="flex-shrink-0">
                        <div className="relative w-full md:w-56 aspect-[4/3] rounded-sm overflow-hidden">
                          <Image src={post.hero_image_url} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      </Link>
                    )}
                    <div className="flex-1">
                      <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-600 mb-3">
                        {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        {post.author && <> &nbsp;·&nbsp; {post.author}</>}
                      </p>
                      <Link href={`/mindful-musings/${post.slug}`}>
                        <h2 className="font-display text-2xl sm:text-3xl font-light text-stone-100 mb-3 hover:text-stone-300 transition-colors leading-tight">
                          {post.title}
                        </h2>
                      </Link>
                      {post.excerpt && (
                        <p className="font-body text-sm text-stone-500 leading-relaxed mb-4">{post.excerpt}</p>
                      )}
                      <Link
                        href={`/mindful-musings/${post.slug}`}
                        className="font-body text-[10px] tracking-[0.2em] uppercase text-burgundy-400 hover:text-burgundy-300 transition-colors"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
