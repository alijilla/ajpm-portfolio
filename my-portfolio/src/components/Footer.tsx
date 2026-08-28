export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-16 md:mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center">
        <p suppressHydrationWarning className="text-sm text-muted-foreground lowercase text-center">
          © {currentYear} <span className="font-semibold text-foreground">alyssa jade p. merjilla</span>. all rights reserved.
        </p>
      </div>
    </footer>
  );
}