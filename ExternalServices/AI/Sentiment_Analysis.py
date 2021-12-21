import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import torch
import torch.nn as nn
import torch.nn.functional as F
from transformers import BertModel
import re
from transformers import BertTokenizer
from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler
from transformers import AdamW, get_linear_schedule_with_warmup
from transformers import AutoModelForSequenceClassification, AutoTokenizer, pipeline
import io
import copy


filepath = "../OCR/merged_text.txt"

f = io.open(filepath,mode="r",encoding="utf-8")

X_test = []
for line in f.readlines():
    if line != "\n":
        X_test.append(line)



if torch.cuda.is_available():       
    device = torch.device("cuda")
    print(f'There are {torch.cuda.device_count()} GPU(s) available.')
    print('Device name:', torch.cuda.get_device_name(0))

else:
    print('No GPU available, using the CPU instead.')

    
def text_preprocessing(text):
    """
    - Remove entity mentions (eg. '@united')
    - Correct errors (eg. '&amp;' to '&')
    @param    text (str): a string to be processed.
    @return   text (Str): the processed string.
    """
    # Remove '@name'
    text = re.sub(r'(@.*?)[\s]', ' ', text)

    # Replace '&amp;' with '&'
    text = re.sub(r'&amp;', '&', text)

    # Remove trailing whitespace
    text = re.sub(r'\s+', ' ', text).strip()

    return text    


# Load the BERT tokenizer
#TODO add BERT model to git repo
tokenizer = AutoTokenizer.from_pretrained("bert-base-turkish-sentiment-cased")

# Create a function to tokenize a set of texts
def preprocessing_for_bert(data):
    """Perform required preprocessing steps for pretrained BERT.
    @param    data (np.array): Array of texts to be processed.
    @return   input_ids (torch.Tensor): Tensor of token ids to be fed to a model.
    @return   attention_masks (torch.Tensor): Tensor of indices specifying which
                  tokens should be attended to by the model.
    """
    # Create empty lists to store outputs
    input_ids = []
    attention_masks = []

    # For every sentence...
    for sent in data:
        # `encode_plus` will:
        #    (1) Tokenize the sentence
        #    (2) Add the `[CLS]` and `[SEP]` token to the start and end
        #    (3) Truncate/Pad sentence to max length
        #    (4) Map tokens to their IDs
        #    (5) Create attention mask
        #    (6) Return a dictionary of outputs
        encoded_sent = tokenizer.encode_plus(
            text=text_preprocessing(sent),  # Preprocess sentence
            add_special_tokens=True,        # Add `[CLS]` and `[SEP]`
            max_length=MAX_LEN,                  # Max length to truncate/pad
            pad_to_max_length=True,         # Pad sentence to max length
            #return_tensors='pt',           # Return PyTorch tensor
            return_attention_mask=True      # Return attention mask
            )
        
        # Add the outputs to the lists
        input_ids.append(encoded_sent.get('input_ids'))
        attention_masks.append(encoded_sent.get('attention_mask'))

    # Convert lists to tensors
    input_ids = torch.tensor(input_ids)
    attention_masks = torch.tensor(attention_masks)

    return input_ids, attention_masks

# Concatenate train data and test data

all_str = X_test

# Encode our concatenated data
encoded_str = [tokenizer.encode(sent, add_special_tokens=True, max_length=512,truncation=True) for sent in all_str]

# Find the maximum length
max_len = max([len(sent) for sent in encoded_str])
#print('Max length: ', max_len)

# Specify `MAX_LEN` 
# TODO product review and news articles will have different lenghts two different models might be needed.
MAX_LEN = 512


    
def initialize_model():
    """Initialize the Bert Classifier
    """
    # Instantiate Bert Classifier
    #bert_classifier = BertClassifier(freeze_bert=True)
    #bert_classifier.load_state_dict(torch.load("bert_epochs_20_lr_2e-05_batch_16_freeze_F",map_location=torch.device('cpu')))
    bert_classifier = torch.load("bert_epochs_20_lr_2e-05_batch_16_freeze_F",map_location=torch.device('cpu'))
    # Tell PyTorch to run the model on GPU
    #bert_classifier.to(device)

    return bert_classifier


def bert_predict(model, test_dataloader):
    """Perform a forward pass on the trained BERT model to predict probabilities
    on the test set.
    """
    # Put the model into the evaluation mode. The dropout layers are disabled during
    # the test time.
    model.eval()

    all_logits = []

    # For each batch in our test set...
    for batch in test_dataloader:
        # Load batch to GPU
        b_input_ids, b_attn_mask = tuple(t for t in batch)[:2]

        # Compute logits
        with torch.no_grad():
            logits = model(b_input_ids, b_attn_mask)
        all_logits.append(logits)
    
    # Concatenate logits from each batch
    all_logits = torch.cat(all_logits, dim=0)

    # Apply softmax to calculate probabilities
    probs = F.softmax(all_logits, dim=1).cpu().numpy()

    return probs

bert_classifier= initialize_model()


test_inputs, test_masks = preprocessing_for_bert(X_test)

# Create the DataLoader for our test set
test_dataset = TensorDataset(test_inputs, test_masks)
test_sampler = SequentialSampler(test_dataset)
test_dataloader = DataLoader(test_dataset, sampler=test_sampler, batch_size=1)

probs = bert_predict(bert_classifier, test_dataloader)

y_pred = [np.argmax(i) for i in probs]

counts = str(y_pred.count(0)) + " " + str(y_pred.count(1)) + " " + str(y_pred.count(2))

f = io.open(filepath,mode="w",encoding="utf-8")

f.write(counts)