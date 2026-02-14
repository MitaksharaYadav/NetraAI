import torch
import cv2
import numpy as np

def generate_gradcam(input_tensor, model, target_layer):
    gradients = []
    activations = []

    def backward_hook(module, grad_in, grad_out):
        gradients.append(grad_out[0])
    def forward_hook(module, inp, out):
        activations.append(out)

    # Register hooks on EfficientNet-B3 target layer
    h1 = target_layer.register_forward_hook(forward_hook)
    h2 = target_layer.register_backward_hook(backward_hook)

    # Forward pass
    output = model(input_tensor)
    model.zero_grad()
    output.backward()

    # Generate Heatmap
    grad = gradients[0]
    act = activations[0]
    weights = torch.mean(grad, dim=(2, 3), keepdim=True)
    cam = torch.sum(weights * act, dim=1).squeeze()
    cam = torch.relu(cam).cpu().detach().numpy()
    
    # Clean up hooks
    h1.remove()
    h2.remove()

    cam = cv2.resize(cam / (cam.max() + 1e-7), (300, 300))
    heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
    return heatmap