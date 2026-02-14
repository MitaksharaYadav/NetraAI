import { useState, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Eye, ImageIcon, AlertCircle } from "lucide-react";

interface DiagnosticResult {
  condition: string;
  severity: number;
  confidence: number;
  regions: string[];
}

function SeverityBar({ severity }: { severity: number }) {
  const pct = (severity / 4) * 100;
  return (
    <div className="relative h-4 w-full overflow-hidden rounded-full bg-gradient-to-r from-severity-healthy via-severity-moderate to-severity-severe">
      <div
        className="absolute top-0 h-full w-1 bg-foreground rounded-full shadow-md transition-all"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

function severityLabel(severity: number, t: (k: string) => string) {
  if (severity <= 1) return t("healthy");
  if (severity === 2) return t("moderate");
  return t("severe");
}

function severityVariant(severity: number): "default" | "secondary" | "destructive" {
  if (severity <= 1) return "secondary";
  if (severity === 2) return "default";
  return "destructive";
}

export default function NetraScan() {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
    setScanning(true);

    const formData = new FormData();
    formData.append("file", f);

    try {
      // Connect to your FastAPI backend
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend Error: Analysis failed");

      const data = await response.json();
      
      // Map backend response to UI
      setResult({
        condition: data.condition,
        severity: data.severity,
        confidence: data.confidence,
        regions: data.regions || []
      });
    } catch (err) {
      console.error("Diagnosis Error:", err);
      setError("Unable to connect to AI server. Ensure backend is running.");
    } finally {
      setScanning(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleSample = () => {
    setError("Sample mode disabled. Please upload a real fundus image for model analysis.");
  };

  return (
    <div className="jaali-pattern min-h-full p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-foreground animate-fade-in">{t("netraScan")}</h1>

        {/* Upload Zone */}
        <Card
          className={`relative overflow-hidden border-2 border-dashed transition-colors ${
            scanning ? "border-primary" : "border-border hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            {scanning ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <div className="absolute inset-0 rounded-full animate-eye-pulse bg-primary/20" />
                  <Eye className="h-16 w-16 text-primary" />
                  <div className="absolute left-0 right-0 h-0.5 bg-primary/60 animate-scan-line" />
                </div>
                <p className="text-sm font-medium text-primary">{t("processing")}</p>
              </div>
            ) : preview ? (
              <img src={preview} alt="Retinal scan" className="max-h-48 rounded-lg object-contain" />
            ) : (
              <>
                <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">{t("uploadTitle")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t("uploadDesc")}</p>
              </>
            )}

            {!scanning && (
              <div className="mt-6 flex gap-3">
                <label className="cursor-pointer">
                  <Button asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      {t("uploadTitle")}
                    </span>
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                    }}
                  />
                </label>
                <Button variant="outline" onClick={handleSample}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {t("trySample")}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error Handling */}
        {error && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-500 bg-red-500/10 rounded-lg border border-red-500/20">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Real-time AI Results */}
        {result && (
          <Card className="animate-fade-in border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-secondary">{t("resultTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("condition")}</span>
                <span className="font-semibold text-foreground">{result.condition}</span>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("severity")}</span>
                  <Badge variant={severityVariant(result.severity)}>
                    {severityLabel(result.severity, t)} ({result.severity}/4)
                  </Badge>
                </div>
                <SeverityBar severity={result.severity} />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>0 – {t("healthy")}</span>
                  <span>2 – {t("moderate")}</span>
                  <span>4 – {t("severe")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("confidence")}</span>
                <span className="text-lg font-bold text-primary">{result.confidence}%</span>
              </div>

              {result.regions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {result.regions.map((r) => (
                    <Badge key={r} variant="outline">{r}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}