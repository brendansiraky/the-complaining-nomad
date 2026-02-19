import { json, type MetaFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getArticleBySlug } from "~/data/articles";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.article) {
    return [{ title: "Article Not Found" }];
  }
  return [
    { title: `${data.article.title} — The Complaining Nomad` },
    { name: "description", content: data.article.subtitle },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const article = getArticleBySlug(params.slug!);
  
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ article });
};

const categoryBadges: Record<string, string> = {
  hostel: "bg-[#cc1111] text-white",
  transport: "bg-blue text-white",
  food: "bg-green text-black",
  scam: "bg-purple text-white",
  surf: "bg-[#00b4d8] text-white",
};

export default function Article() {
  const { article } = useLoaderData<typeof loader>();

  return (
    <div>
      <Nav />

      <Link
        to="/"
        className="inline-block mt-10 mx-10 pt-20 font-archivo text-[13px] uppercase tracking-[2px] text-accent no-underline hover:text-accent-glow"
      >
        ← Back to stories
      </Link>

      <div className="relative min-h-[80vh] flex items-end overflow-hidden">
        <img
          src={article.heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35] contrast-[1.1] saturate-[0.8]"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgb(15,15,15) 0%, rgba(15,15,15,0.6) 35%, transparent 100%)'
          }}
        />
        <div className="relative z-10 px-10 pb-15 max-w-[900px]">
          <div className={`inline-block text-white font-archivo text-[11px] uppercase tracking-[3px] px-4 py-1.5 mb-6 ${categoryBadges[article.category]}`}>
            {article.categoryLabel}
          </div>
          <h1 className="font-archivo text-[clamp(32px,5vw,64px)] leading-[1.05] uppercase text-white mb-5">
            <span dangerouslySetInnerHTML={{ __html: article.title.replace(/(<span class="hl">|<\/span>)/g, match => 
              match === '<span class="hl">' ? '<span class="text-accent">' : '</span>'
            ) }} />
          </h1>
          <p className="text-xl text-text-muted italic max-w-[600px] leading-relaxed">
            {article.subtitle}
          </p>
          <div className="mt-6 flex gap-5 text-[13px] text-text-muted uppercase tracking-wider">
            <span>{article.location}</span>
            <span className="w-1 h-1 rounded-full bg-accent self-center" />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-6 py-20">
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        <div className="my-14 bg-surface border border-border p-9 text-center">
          <div className="font-archivo text-xs uppercase tracking-[4px] text-text-muted mb-3">
            Complaining Nomad Rating
          </div>
          <div className="font-archivo text-[72px] text-accent leading-none">
            {article.rating}<span className="text-[28px] text-text-muted">/10</span>
          </div>
          <div className="font-caveat text-[22px] text-yellow mt-2.5">
            {article.verdict}
          </div>
        </div>

        <div className="flex gap-2.5 flex-wrap mt-14 pt-9 border-t-2 border-border">
          {article.tags.map((tag) => (
            <a
              key={tag}
              href="#"
              className="bg-surface border border-border text-text-muted px-3.5 py-1.5 text-[11px] uppercase tracking-[1.5px] no-underline transition-all hover:border-accent hover:text-accent"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
