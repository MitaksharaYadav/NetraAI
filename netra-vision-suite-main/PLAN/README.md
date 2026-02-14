

# Netra-AI: Advanced Indian Eye Diagnostic Suite

## Overview
A premium, India-themed eye diagnostic frontend with a distinctive national aesthetic, featuring retinal scan upload, multilingual support, and rural health impact widgets.

---

## Design System

- **Primary accent**: Saffron (#FF9933) for buttons, highlights, and active states
- **Headers & navigation**: Ashoka Teal (#008080)
- **Background**: Warm Off-White/Ivory with subtle geometric Jaali pattern watermark
- **Typography**: Clean sans-serif (Inter) with a Devanagari-styled tagline "नयनं प्रधानम्"
- **Cards**: White with soft shadows and teal/saffron border accents

---

## Pages & Features

### 1. Dashboard (Home)
- Welcome hero section with the Netra-AI logo and Devanagari tagline
- Quick stats cards: Total Scans, Patients Screened, Detection Rate
- Subtle Chakra/Jaali watermark pattern in the background
- Navigation to Netra-Scan and Reports

### 2. Netra-Scan Interface (Core Feature)
- Central drag-and-drop / click-to-upload zone for retinal images
- **Processing animation**: Saffron pulsing eye-shaped glow radiating from center during "analysis"
- Mock diagnostic result display after upload:
  - Detected condition (e.g., Diabetic Retinopathy)
  - **"Triranga" Severity Bar**: Gradient scale from Green (Healthy, 0-1) → White (Moderate, 2) → Deep Saffron (Severe, 3-4)
  - Confidence score and affected regions highlighted
- Sample/demo images available for quick testing

### 3. Reports & History
- Table/list of past scan results with severity badges
- Filter by date, severity, condition
- Detail view for each scan with full diagnostic breakdown

### 4. Multilingual Support
- Prominent language dropdown in top-right navbar: English / Hindi / Telugu / Tamil / Bengali
- UI labels and key text switch based on selection (using a simple i18n approach with JSON translation files)

### 5. Sidebar Widgets
- **"Impact in Rural India"** stats card: Number of screenings, villages covered, early detections
- **"Nearest Ayushman Bharat Center"** widget with placeholder location info
- **Rural Health Statistics**: Visual charts showing diagnostic reach

### 6. Footer
- "Digital India" badge/logo
- "Atmanirbhar Bharat" branding element
- Standard links: About, Privacy, Contact

---

## Layout Structure
- **Top navbar**: Netra-AI logo, navigation links, language selector
- **Sidebar**: Rural health widgets, quick links (collapsible)
- **Main content area**: Dashboard or Netra-Scan depending on route
- **Footer**: Digital India branding

---

## Technical Notes
- All frontend-only with mock/simulated diagnostic data (no real AI backend)
- Smooth animations using CSS keyframes for the eye-pulse scanning effect
- Responsive design for desktop and tablet
- Recharts for statistics visualizations

