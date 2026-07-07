import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ensureTable, type Post } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mindful Musings | Namaste Yoga Studio",
  description: "Reflections, wellness tips, and stories from Namaste Yoga Studio in Northfield, Ohio.",
};

async function getPosts(): Promise<Post[]> {
  if (!process.env.POSTGRES_URL) return [];
  try {
    await ensureTable();
    const result = await sql<Post>`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`;
    return result.rows;
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
        <section className="relative pt-40 pb-20 px-6 md:px-12 bg-stone-950 border-b border-stone-800/40">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <span className="block w-10 h-px bg-gold-500/40" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-gold-400/70">The Blog</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-stone-50 mb-5">
              Mindful Musings
            </h1>
            <p className="font-body font-light text-stone-400 text-sm leading-relaxed max-w-xl">
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
                        className="font-body text-[10px] tracking-[0.2em] uppercase text-sage-400 hover:text-sage-300 transition-colors"
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
