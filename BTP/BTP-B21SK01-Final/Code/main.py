import os
import time
import io
import requests
from flask import Flask, request, jsonify
import requests
from get_model import get_model
from PIL import Image

app = Flask(__name__)


def download_image(url, image_file_path):
    r = requests.get(url, timeout=4.0)
    if r.status_code != requests.codes.ok:
        assert False, "Status code error: {}.".format(r.status_code)

    with Image.open(io.BytesIO(r.content)) as im:
        im.save(image_file_path)

    with Image.open(image_file_path) as im:
        im = im.resize((240, 320))
        im.save(image_file_path)


# Ping
@app.route("/", methods=["GET"])
def ping():
    return jsonify({"message": "Welcome .."}), 200


# Model creation
@app.route("/", methods=["POST"])
def send_mail():
    signedURL = request.json["url"]  # The Pre-signed url for uploading model on s3
    imageURL = request.json["image_url"]  # Input image Url
    try:
        download_image(imageURL, f"Data/examples/{os.path.basename(imageURL)}")
        file_name = os.path.basename(imageURL)

        get_model(f"Data/examples/{file_name}", remove_background=True)

        time.sleep(10)  # Faking creation of .obj file
        inputFileName = f"Data/examples/{os.path.splitext(file_name)[0]}_noback.obj"
        outputFileName = f"Data/examples/{os.path.splitext(file_name)[0]}_noback.gltf"
        print(f"------------------ {outputFileName} --------------------")
        res = os.system(
            f"obj2gltf -i {inputFileName} -o {outputFileName}"
        )  # obj2gltf is a node module
        if res == 0:
            with open(outputFileName) as f:
                headers = {"Content-Type": "multipart/form-data"}
                print(signedURL, headers)
                r = requests.put(signedURL, data=f, headers=headers)  # Uploading output file on s3
                if r.status_code == 200:
                    return jsonify({"model_url": signedURL.split("?")[0]}), 200
                else:
                    return jsonify({"error": "Something went wrong"}), 400
        else:
            return jsonify({"error": "Something went wrong"}), 400
    except:
        return jsonify({"error": "Something went wrong"}), 400


# Run Server
if __name__ == "__main__":
    app.run(debug=True, port=8000, host="0.0.0.0")
