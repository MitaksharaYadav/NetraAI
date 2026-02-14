import { useLanguage } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground/70">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-4 text-xs">
          <span className="rounded bg-primary/20 px-2 py-1 font-semibold text-primary">
            🇮🇳 {t("digitalIndia")}
          </span>
          <span className="rounded bg-secondary-foreground/10 px-2 py-1">
            {t("atmanirbhar")}
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <a href="#" className="hover:text-primary transition-colors">{t("about")}</a>
          <a href="#" className="hover:text-primary transition-colors">{t("privacy")}</a>
          <a href="#" className="hover:text-primary transition-colors">{t("contact")}</a>
        </div>

        <p className="text-xs">
          © 2026 Netra-AI. {t("taglineSub")}.
        </p>
      </div>
    </footer>
  );
}
