from __future__ import print_function, division

import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim import lr_scheduler
import numpy as np
import torchvision
from torchvision import datasets, models, transforms
import matplotlib.pyplot as plt
import time
import os
import copy
import io
from PIL import Image
from torch.autograd import Variable


plt.ion()   # interactive mode

data_transforms = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

def predict_image(image):
    image_tensor = data_transforms(image).float()
    image_tensor = image_tensor.unsqueeze_(0)
    input = Variable(image_tensor)
    input = input.to(device)
    output = model(input)
    index = output.data.cpu().numpy().argmax()
    return index
        
model = torch.load("./AI/classifier_full.pt",map_location=torch.device('cpu'))

cwd = os.getcwd()


path = "./DataScraper/screenshot.jpeg"

image = Image.open(path, mode='r')

cls_pred = predict_image(image)

filepath = cwd + "/classifier_output.txt"

f = io.open(filepath,mode="w",encoding="utf-8")

if cls_pred == 0:
    pred = 'forum-site'
elif cls_pred == 1:
    pred = 'news-site'
else:
    pred = 'shopping-site'

f.write(pred)