import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ScanRecord {
  id: string;
  patient: string;
  date: string;
  condition: string;
  severity: number;
  confidence: number;
  regions: string[];
  description?: string; // Added to match backend
}

// Updated mock data to reflect the 5 severity stages (0-4)
const mockData: ScanRecord[] = [
  { id: "NTR-2026-001", patient: "Ramesh K.", date: "2026-02-10", condition: "Proliferative DR", severity: 4, confidence: 91.2, regions: ["Macula", "Optic Disc", "Vessels"], description: "Critical stage. New abnormal blood vessel growth detected." },
  { id: "NTR-2026-002", patient: "Sita D.", date: "2026-02-09", condition: "No Diabetic Retinopathy", severity: 0, confidence: 98.5, regions: [], description: "Normal retina. No clinical signs detected." },
  { id: "NTR-2026-003", patient: "Arjun P.", date: "2026-02-08", condition: "Mild DR", severity: 1, confidence: 84.1, regions: ["Retinal Vessels"], description: "Early stage. Small microaneurysms detected." },
  { id: "NTR-2026-004", patient: "Lakshmi N.", date: "2026-02-07", condition: "Severe DR", severity: 3, confidence: 88.5, regions: ["Optic Disc", "Macula"], description: "Advanced stage. Extensive hemorrhages detected." },
];

function severityBadge(severity: number, t: (k: string) => string) {
  // Logic updated to match the 5-stage medical classification
  if (severity === 0) return <Badge variant="secondary" className="bg-severity-healthy text-primary-foreground">{t("healthy")}</Badge>;
  if (severity === 1) return <Badge variant="outline" className="border-severity-moderate text-foreground">{t("mild")}</Badge>;
  if (severity === 2) return <Badge className="bg-orange-500 text-white border-none">{t("moderate")}</Badge>;
  return <Badge variant="destructive">{t("severe")} ({severity === 4 ? t("proliferative") : t("stage3")})</Badge>;
}

export default function Reports() {
  const { t } = useLanguage();
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [conditionFilter, setConditionFilter] = useState<string>("all");
  const [detail, setDetail] = useState<ScanRecord | null>(null);

  const conditions = [...new Set(mockData.map((d) => d.condition))];

  const filtered = mockData.filter((r) => {
    if (severityFilter !== "all") {
      const s = parseInt(severityFilter);
      // Fixed filter logic for 5-stage scale
      if (s === 0 && r.severity !== 0) return false;
      if (s === 1 && (r.severity < 1 || r.severity > 2)) return false;
      if (s === 3 && r.severity < 3) return false;
    }
    if (conditionFilter !== "all" && r.condition !== conditionFilter) return false;
    return true;
  });

  return (
    <div className="jaali-pattern min-h-full p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-2xl font-bold text-foreground animate-fade-in">{t("reports")}</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filterBySeverity")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allStages")}</SelectItem>
              <SelectItem value="0">{t("healthy")} (0)</SelectItem>
              <SelectItem value="1">{t("mild")}/{t("moderate")} (1-2)</SelectItem>
              <SelectItem value="3">{t("severe")}/{t("proliferative")} (3-4)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={conditionFilter} onValueChange={setConditionFilter}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder={t("filterByCondition")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allConditions")}</SelectItem>
              {conditions.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="border-t-4 border-t-primary">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">{t("scanId")}</TableHead>
                  <TableHead>{t("patient")}</TableHead>
                  <TableHead>{t("date")}</TableHead>
                  <TableHead>{t("condition")}</TableHead>
                  <TableHead>{t("severity")}</TableHead>
                  <TableHead className="text-right pr-6">{t("action")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="pl-6 font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.patient}</TableCell>
                    <TableCell className="text-muted-foreground">{r.date}</TableCell>
                    <TableCell>{r.condition}</TableCell>
                    <TableCell>{severityBadge(r.severity, t)}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="outline" size="sm" onClick={() => setDetail(r)}>
                        {t("viewDetails")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!detail} onOpenChange={() => setDetail(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-secondary text-xl border-b pb-2">{detail?.id}</DialogTitle>
            </DialogHeader>
            {detail && (
              <div className="space-y-6 pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <Row label={t("patient")} value={detail.patient} />
                  <Row label={t("date")} value={detail.date} />
                </div>
                
                <div className="p-3 bg-muted rounded-lg">
                  <span className="text-xs font-bold uppercase text-muted-foreground">{t("aiDiagnosis")}</span>
                  <p className="text-sm font-semibold mt-1">{detail.condition}</p>
                  <p className="text-xs text-muted-foreground mt-1 italic">"{detail.description}"</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t("severity")} ({detail.severity}/4)</span>
                    {severityBadge(detail.severity, t)}
                  </div>
                  {/* Digital Needle Bar */}
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 opacity-30" />
                    <div
                      className="absolute top-0 h-full w-1.5 bg-foreground rounded-full shadow-lg ring-2 ring-white transition-all duration-700"
                      style={{ left: `${(detail.severity / 4) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-muted-foreground">{t("aiConfidence")}</span>
                  <span className="text-xl font-black text-primary">{detail.confidence}%</span>
                </div>

                {detail.regions.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground block mb-2">{t("detectedRegions")}</span>
                    <div className="flex flex-wrap gap-2">
                      {detail.regions.map((r) => (
                        <Badge key={r} variant="outline" className="bg-primary/5">{r}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button className="w-full" variant="secondary" onClick={() => window.print()}>
                  {t("exportPdf")}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] font-bold uppercase text-muted-foreground block">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}