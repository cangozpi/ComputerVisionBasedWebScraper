import glob
import os
import pickle
import cv2
from os import listdir, getcwd
from os.path import join

# enter paths
dirs = ["trendyol"]
# enter classes
classes = ['title', 'seller', 'ratings', 'price', 'review', 'reviews_button', 'details_button', 'search_box', 'question', 'questions_button', 'product_info', 'product_specs', 'photo', 'selected_photo', 'main_photo', 'options', 'summary', 'product_desc']

def getImagesInDir(dir_path):
    image_list = []
    for filename in glob.glob(dir_path + '/*.jpeg'):
        image_list.append(filename)
    return image_list

def scale(width,height,box):
    bbox = []
    bbox.append(str(float(box[0])/width))
    bbox.append(str(float(box[1])/height))
    bbox.append(str(float(box[2])/width))
    bbox.append(str(float(box[3])/height))
    return bbox

def convert_annotation(dir_path, output_path, image_path):
    
    basename = os.path.basename(image_path)
    basename_no_ext = os.path.splitext(basename)[0]
    
    img = cv2.imread(image_path)
    height, width, _ = img.shape 
    
    in_file = open(dir_path + '/label/' + basename_no_ext + '.txt')
    out_file = open(output_path + basename_no_ext + '.txt', 'w')
    
    
    for line in in_file.readlines():
        label = line.split()
        box = scale(width,height, label[1:])
        out_file.write(str(label[0]) + " " + " ".join([str(a) for a in box]) + '\n')

cwd = getcwd()

for dir_path in dirs:
    full_dir_path = os.path.join(cwd,"data\\",dir_path)
    output_path = full_dir_path + '\\label\\yolo\\'

    if not os.path.exists(output_path):
        os.makedirs(output_path)

    image_paths = getImagesInDir(full_dir_path + "\\image")
    list_file = open(full_dir_path + '.txt', 'w')

    for image_path in image_paths:
        list_file.write(image_path + '\n')
        convert_annotation(full_dir_path, output_path, image_path)
    list_file.close()

    print("Finished processing: " + dir_path)