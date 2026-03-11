export function Footer() {
  return (
    <footer className="border-t py-8 px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center text-sm text-muted-foreground sm:text-base">
        <p>
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground transition-colors hover:text-ktm-600 dark:hover:text-ktm-400"
          >
            Next.js
          </a>
          ,{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground transition-colors hover:text-ktm-600 dark:hover:text-ktm-400"
          >
            Tailwind CSS
          </a>
          {" & "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground transition-colors hover:text-ktm-600 dark:hover:text-ktm-400"
          >
            shadcn/ui
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} Sai Mahith Reddy Bekkem</p>
      </div>
    </footer>
  );
}
