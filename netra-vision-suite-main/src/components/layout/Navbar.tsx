import { Link, useLocation } from "react-router-dom";
import { Eye, BarChart3, LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Language, languageNames } from "@/i18n/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navItems = [
  { key: "dashboard", path: "/", icon: LayoutDashboard },
  { key: "netraScan", path: "/scan", icon: Eye },
  { key: "reports", path: "/reports", icon: BarChart3 },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-secondary text-secondary-foreground">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold tracking-tight text-secondary-foreground">
                {t("appName")}
              </span>
              <p className="text-xs text-secondary-foreground/70">{t("tagline")}</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-secondary-foreground/80 hover:bg-secondary-foreground/10"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
        </div>

        <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
          <SelectTrigger className="w-[140px] border-secondary-foreground/20 bg-secondary-foreground/10 text-secondary-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.entries(languageNames) as [Language, string][]).map(([code, name]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}
