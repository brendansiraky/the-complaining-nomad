import { Link, useSearchParams } from "@remix-run/react";
import { categories } from "~/data/articles";

export default function Nav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/85 backdrop-blur-xl border-b border-border px-10 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 no-underline">
        <img
          src="/logo.jpg"
          alt="The Complaining Nomad"
          className="h-10 w-10 rounded-md object-cover"
        />
        <div className="font-archivo text-lg uppercase tracking-[2px] text-text">
          The <span className="text-accent">Complaining</span> Nomad
        </div>
      </Link>
      <ul className="hidden md:flex gap-8 list-none">
        <li>
          <Link
            to="/"
            className="text-text-muted no-underline text-[13px] font-medium uppercase tracking-[1.5px] hover:text-accent transition-colors"
          >
            Home
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              to={`/?category=${cat.slug}`}
              className="text-text-muted no-underline text-[13px] font-medium uppercase tracking-[1.5px] hover:text-accent transition-colors"
            >
              {cat.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/submit"
            className="text-text-muted no-underline text-[13px] font-medium uppercase tracking-[1.5px] hover:text-accent transition-colors"
          >
            Submit Your Story
          </Link>
        </li>
      </ul>
    </nav>
  );
}
