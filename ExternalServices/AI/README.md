To make predictions go to yolov5 directory. 
Use this command:

python detect.py --weights ../shopping.pt --img 1251 --conf 0.25 --source data/images --save-txt --save-conf --nosave 

Choose appropiate model weight. 
Shopping sites : ../shopping.pt
News sites : ../news.pt
Forum sites : ../forum.pt

Put the images that are going to be predicted to yolov5/data/images or change the source parameter to the correct path.
