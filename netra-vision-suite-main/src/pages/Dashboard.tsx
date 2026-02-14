import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, BarChart3, Users, ScanEye, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { t } = useLanguage();

  const stats = [
    { key: "totalScans", value: "48,291", icon: ScanEye, color: "text-primary" },
    { key: "patientsScreened", value: "31,045", icon: Users, color: "text-secondary" },
    { key: "detectionRate", value: "94.7%", icon: TrendingUp, color: "text-severity-healthy" },
  ];

  return (
    <div className="jaali-pattern min-h-full">
      <div className="chakra-watermark">
        {/* Hero */}
        <section className="px-6 py-16 text-center animate-fade-in">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg">
              <Eye className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              {t("welcomeTitle")}
            </h1>
            <p className="mt-2 text-xl text-secondary font-medium">{t("tagline")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("taglineSub")}</p>
            <p className="mt-4 text-muted-foreground">{t("welcomeDesc")}</p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/scan">
                  <ScanEye className="mr-2 h-5 w-5" />
                  {t("startScan")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <Link to="/reports">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  {t("viewReports")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 pb-16">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.key} className="border-t-4 border-t-primary hover:shadow-lg transition-shadow">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`rounded-full bg-muted p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t(stat.key)}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
