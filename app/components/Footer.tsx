export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-10 text-center text-text-muted text-[13px] tracking-wider uppercase">
      <img
        src="/logo.jpg"
        alt=""
        className="w-15 h-15 rounded-xl object-cover mb-4 mx-auto"
      />
      <div className="font-archivo text-base text-text mb-3 tracking-[2px]">
        The <span className="text-accent">Complaining</span> Nomad
      </div>
      <p>Travel is beautiful. This blog is about the other times.</p>
    </footer>
  );
}
