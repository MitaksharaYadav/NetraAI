import cv2
import numpy as np
from PIL import Image

def ben_graham_preprocess(image_pil, sigmaX=10, img_size=300):
    """
    Normalizes lighting and crops retinal images to highlight microaneurysms.
    """
    image = np.array(image_pil)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    
    # 1. Auto-crop black borders
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    mask = gray > 7
    if mask.any():
        image = image[np.ix_(mask.any(1), mask.any(0))]
        
    image = cv2.resize(image, (img_size, img_size))
    
    # 2. Gaussian Blur subtraction for feature clarity
    image = cv2.addWeighted(image, 4, cv2.GaussianBlur(image, (0,0), sigmaX), -4, 128)
    return Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))