# AR/VR based Furniture Marketplace

Our project consists of two components -

1. Model - This is a Convolution based Encoder Decoder Network that learns to generate 3D models from 2D images.
2. Mobile App - End-to-End Mobile App that connects Users to Server and back to Users.

## Setup Instructions

- Install conda

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-py38_4.10.3-Linux-x86_64.sh
bash Miniconda3-py38_4.10.3-Linux-x86_64.sh
```

- Create a conda env

```bash
conda create -n image_to_3d python=3.6
conda activate image_to_3d
```

- Install the requirements

```bash
pip install -r requirements.txt
```

- To enforce coding style restrictions, we are using [pre-commit](https://pre-commit.com/)

```bash
pre-commit install
```

### Instructions to train the model

Preprocessed data is available from following categories -

|    Category   |      Id       |
| ------------- | ------------- |
| Table         | 04379243      |
| Chair         | 03001627      |
| Sofa          | 04256520      |
| Chair         | 02933112      |


- Run shape training script for table category:

``` bash
python train_shape.py --cat_id 04379243
```

- Run color training script for chair category:

``` bash
python train_color.py --cat_id 03001627
```

### Deploy the model

`main.py` loads the trained model and deploys it with flask. The mobile and server interactions are in JSON format.
