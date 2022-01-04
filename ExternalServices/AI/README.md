OBJECT DETECTORS:

To make predictions go to yolov5 directory. 
Use this command:

python detect.py --weights ../shopping.pt --img 1251 --conf 0.25 --source data/images --save-txt --save-conf --nosave 

Choose appropiate model weight. 
Shopping sites : ../shopping.pt
News sites : ../news.pt
Forum sites : ../forum.pt

Put the images that are going to be predicted to yolov5/data/images or change the source parameter to the correct path.


SENTIMENT ANALYSIS:

Go to the ExternalServices/AI directory

Run "pip install transformers" if it is the first time you are running it and don't have the transformers module installed

Run "python Sentiment_Analysis.py"

The output will be saved to ExternalServices/OCR/merged_text.txt with the following format

negative_sentiment_count neutral_sentiment_count positive_sentiment_count

Website ClassifierZ:

Go to the ExternalServices/AI directory

Put the images that are going to be predicted to yolov5/data/images.

Run "python classifier.py"

The output will be saved to ExternalServices/AI/classifier_output.txt
The output will either be "forum", "news" or "shoppig"