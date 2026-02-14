from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
import torchvision.models as models
# --- ADD THIS LINE ---
import torchvision.transforms as transforms 
# ---------------------
from core.preprocess import ben_graham_preprocess
from core.inference import get_severity_details
from PIL import Image
import io

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load EfficientNet-B3 with Regression Head
model = models.efficientnet_b3(weights=None)
model.classifier[1] = torch.nn.Linear(model.classifier[1].in_features, 1)
model.load_state_dict(torch.load("models/best_model.pth", map_location=DEVICE))
model.to(DEVICE).eval()

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    img_bytes = await file.read()
    raw_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    
    # 1. Preprocess using Ben Graham method
    proc_img = ben_graham_preprocess(raw_img)
    
    # 2. Convert to Tensor (Ensure 'transforms' is imported!)
    tensor = transforms.ToTensor()(proc_img).unsqueeze(0).to(DEVICE)
    
    # 3. Model Inference
    with torch.no_grad():
        reg_val = model(tensor).item()
    
    # 4. Get Detailed Mapping
    condition, severity, confidence, regions, desc = get_severity_details(reg_val)
    
    return {
        "condition": condition,
        "severity": severity,
        "confidence": confidence, # This will now show up in your React app
        "regions": regions,
        "description": desc,
        "raw_score": round(reg_val, 2)
    }