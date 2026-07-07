import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

export default function PostBody({ body }: { body: string }) {
  return (
    <div className="font-body text-stone-300 text-sm leading-relaxed space-y-5 post-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="font-display text-2xl font-light text-stone-100 mt-10 mb-3">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-xl font-light text-stone-200 mt-8 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed text-stone-300">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="text-stone-100 font-medium">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-stone-300 italic">{children}</em>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-sage-400 hover:text-sage-300 underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-sage-600/50 pl-5 text-stone-400 italic my-6">{children}</blockquote>
          ),
          hr: () => <hr className="border-stone-800/60 my-8" />,
          ul: ({ children }) => <ul className="list-disc list-outside pl-5 space-y-1.5 text-stone-300">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-outside pl-5 space-y-1.5 text-stone-300">{children}</ol>,
          img: ({ src, alt }) => src && typeof src === "string" ? (
            <span className="block my-6 rounded-sm overflow-hidden">
              <Image src={src} alt={alt ?? ""} width={800} height={500} className="w-full h-auto object-cover rounded-sm" />
            </span>
          ) : null,
          code: ({ children }) => (
            <code className="bg-stone-800/60 text-stone-300 px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
