import { json, type MetaFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, useSearchParams } from "@remix-run/react";
import { articles, getArticlesByCategory, categories } from "~/data/articles";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "The Complaining Nomad — Travel is beautiful. This blog is about the other times." },
    {
      name: "description",
      content: "Real travellers. Raw stories. The stuff nobody posts on Instagram.",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  
  const filteredArticles = category 
    ? getArticlesByCategory(category)
    : articles;
  
  const categoryLabel = category 
    ? categories.find(c => c.slug === category)?.label 
    : null;

  return json({ articles: filteredArticles, category, categoryLabel });
};

const categoryBadges: Record<string, string> = {
  hostel: "bg-[#cc1111] text-white",
  transport: "bg-blue text-white",
  food: "bg-green text-black",
  scam: "bg-purple text-white",
  surf: "bg-[#00b4d8] text-white",
};

export default function Index() {
  const { articles, category, categoryLabel } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  return (
    <div>
      <Nav />

      {!category && (
        <div className="min-h-[80vh] flex items-center justify-center text-center px-10 py-[120px_40px_60px] relative bg-gradient-to-b from-[#1a0000] via-bg to-[#1a0000] overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(229,26,26,0.06) 0%, transparent 50%)'
            }}
          />
          <div className="relative z-10">
            <img
              src="/logo.jpg"
              alt="The Complaining Nomad"
              className="w-45 h-45 rounded-[20px] object-cover mb-8 mx-auto shadow-[0_0_60px_rgba(229,26,26,0.3),_0_20px_40px_rgba(0,0,0,0.5)] border-[3px] border-accent/40"
            />
            <h1 className="font-archivo text-[clamp(42px,7vw,90px)] uppercase leading-none mb-5">
              The <span className="text-accent block">Complaining</span> Nomad
            </h1>
            <p className="font-caveat text-[28px] text-yellow mb-10">
              Travel is beautiful. This blog is about the other times.
            </p>
            <p className="text-text-muted max-w-[600px] mx-auto text-base leading-[1.7]">
              Real travellers. Raw stories. The stuff nobody posts on Instagram. Bad hostels, nightmare buses, food poisoning, scams, and places that just plain sucked.
            </p>
          </div>
        </div>
      )}

      <div className="font-archivo text-sm uppercase tracking-[4px] text-text-muted px-10 mt-15 mb-8">
        {categoryLabel || "Latest Stories"}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6 px-10 pb-20">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/article/${article.slug}`}
            className="bg-surface border border-border overflow-hidden cursor-pointer transition-all hover:border-accent hover:-translate-y-1 no-underline text-inherit block"
          >
            <img
              src={article.heroImage}
              alt=""
              className="w-full h-[220px] object-cover brightness-[0.6] saturate-[0.8] transition-all hover:brightness-75 hover:saturate-100"
            />
            <div className="p-7">
              <div className={`inline-block font-archivo text-[10px] uppercase tracking-[3px] px-3 py-1 mb-3.5 ${categoryBadges[article.category]}`}>
                {article.categoryLabel}
              </div>
              <h3 className="font-archivo text-xl uppercase leading-tight mb-3">
                {article.title}
              </h3>
              <p className="text-text-muted text-[15px] leading-relaxed">
                {article.excerpt}
              </p>
              <div className="mt-4 text-xs text-text-muted uppercase tracking-wider flex gap-4">
                <span>{article.location}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}
