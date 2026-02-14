# Netra-AI: Advanced Diabetic Retinopathy Screening System

**Netra-AI** is a high-accuracy, "Made in India" diagnostic tool designed for automated retinal screening. By utilizing deep learning and explainable AI, it provides expert-level diagnostics to bridge the gap in clinical accessibility and improve early intervention for diabetic patients.



## 🚀 Key Technical Achievements
* **Performance:** Achieved a **Quadratic Weighted Kappa score of 0.8985** on the APTOS 2019 dataset.
* **Architecture:** Optimized **EfficientNet-B3** backbone with an **Ordinal Regression** head for multi-stage severity mapping.
* **Preprocessing:** Implemented **Ben Graham's Gaussian Blur Subtraction** for lighting normalization and lesion enhancement.
* **Explainability:** Integrated **Grad-CAM** heatmaps to highlight pathological regions like microaneurysms and hemorrhages.



## 🛠️ Technology Stack
* **Frontend:** React, Vite, TypeScript, shadcn-ui, Tailwind CSS.
* **Backend:** FastAPI (Python), PyTorch, Torchvision.
* **Infrastructure:** ABDM (Ayushman Bharat Digital Mission) simulated integration for electronic health record standards.

## 💻 Local Development

### Prerequisites
- Node.js & npm installed
- Python 3.10+ installed

### Setup Commands
```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>
cd Netra-AI

# Step 2: Set up the AI Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Step 3: Set up the React Frontend (Open new terminal)
cd frontend
npm install
npm run dev
