import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Your Story — The Complaining Nomad" },
    { name: "description", content: "Share your travel horror story with us" },
  ];
};

export default function Submit() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <Nav />

      <Link
        to="/"
        className="inline-block mt-10 mx-10 pt-20 font-archivo text-[13px] uppercase tracking-[2px] text-accent no-underline hover:text-accent-glow"
      >
        ← Back to stories
      </Link>

      <div className="max-w-[720px] mx-auto px-6 py-[120px_24px_80px]">
        <h2 className="font-archivo text-[clamp(28px,4vw,48px)] uppercase leading-tight mb-3 text-white">
          Got a Travel <span className="text-accent">Horror Story?</span>
        </h2>
        <p className="text-text-muted text-lg mb-12 leading-[1.7]">
          We want your worst. The hostel that should be condemned. The bus ride that broke you. The food that fought back. The scam you walked right into. If it went wrong, we want to hear about it.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="font-archivo text-xs uppercase tracking-[3px] text-text-muted block mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="What should we call you?"
              required
              className="w-full px-4.5 py-3.5 bg-surface border border-border text-text font-sans text-base outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="font-archivo text-xs uppercase tracking-[3px] text-text-muted block mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="We'll only use this to follow up"
              required
              className="w-full px-4.5 py-3.5 bg-surface border border-border text-text font-sans text-base outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="font-archivo text-xs uppercase tracking-[3px] text-text-muted block mb-2">
              Category
            </label>
            <select
              required
              className="w-full px-4.5 py-3.5 bg-surface border border-border text-text font-sans text-base outline-none focus:border-accent transition-colors"
            >
              <option>Hostel Horrors</option>
              <option>Transport Nightmares</option>
              <option>Food Poisoning Diaries</option>
              <option>Scam Stories</option>
              <option>Surf Trips Gone Wrong</option>
              <option>Other (we'll figure it out)</option>
            </select>
          </div>

          <div>
            <label className="font-archivo text-xs uppercase tracking-[3px] text-text-muted block mb-2">
              Where did it happen?
            </label>
            <input
              type="text"
              placeholder="City, country, or 'somewhere I'd rather forget'"
              required
              className="w-full px-4.5 py-3.5 bg-surface border border-border text-text font-sans text-base outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="font-archivo text-xs uppercase tracking-[3px] text-text-muted block mb-2">
              Your Story
            </label>
            <textarea
              placeholder="Tell us everything. The worse it was, the better it reads. Don't hold back."
              rows={10}
              required
              className="w-full px-4.5 py-3.5 bg-surface border border-border text-text font-sans text-base outline-none focus:border-accent transition-colors resize-y"
            />
          </div>

          <p className="text-text-muted text-sm leading-relaxed">
            By submitting, you're giving us permission to edit and publish your story. We'll keep your voice and credit you (or keep you anonymous if you prefer). Best stories get featured on the podcast.
          </p>

          <button
            type="submit"
            className={`${submitted ? 'bg-green' : 'bg-accent hover:bg-accent-glow'} text-white font-archivo text-sm uppercase tracking-[3px] px-9 py-4.5 border-none cursor-pointer transition-all self-start`}
          >
            {submitted ? 'Story Submitted! 🎉' : 'Submit Your Story'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
