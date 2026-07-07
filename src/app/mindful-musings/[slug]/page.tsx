import { sql } from "@vercel/postgres";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ensureTable, type Post } from "@/lib/blog-db";
import PostBody from "@/components/PostBody";

export const dynamic = "force-dynamic";

async function getPost(slug: string): Promise<Post | null> {
  if (!process.env.POSTGRES_URL) return null;
  try {
    await ensureTable();
    const result = await sql<Post>`SELECT * FROM posts WHERE slug = ${slug} AND published = true`;
    return result.rows[0] ?? null;
  } catch {
    return null;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main>
        {/* Hero image */}
        {post.hero_image_url && (
          <div className="relative w-full h-[40vh] md:h-[55vh] bg-stone-900">
            <Image src={post.hero_image_url} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-transparent to-stone-950" />
          </div>
        )}

        <article className={`px-6 md:px-12 pb-24 bg-stone-950 ${post.hero_image_url ? "-mt-24 relative" : "pt-40"}`}>
          <div className="max-w-2xl mx-auto">
            {/* Back link */}
            <Link
              href="/mindful-musings"
              className="inline-block font-body text-[10px] tracking-[0.25em] uppercase text-stone-600 hover:text-stone-400 transition-colors mb-10"
            >
              ← Mindful Musings
            </Link>

            {/* Meta */}
            <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-600 mb-4">
              {new Date(post.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              {post.author && <> &nbsp;·&nbsp; {post.author}</>}
            </p>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl font-light text-stone-50 leading-tight mb-10">
              {post.title}
            </h1>

            {/* Body */}
            <PostBody body={post.body} />

            {/* Footer nav */}
            <div className="mt-16 pt-8 border-t border-stone-800/40">
              <Link
                href="/mindful-musings"
                className="font-body text-[10px] tracking-[0.25em] uppercase text-sage-400 hover:text-sage-300 transition-colors"
              >
                ← All posts
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
