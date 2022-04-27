prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("webcam");
Webcam.attach("#webcam");

function captureImage() {
    Webcam.snap(function (data_uri) {
        document.getElementById("output").innerHTML = '<img id="captured_Image" src="' + data_uri + '">';
    });
}
console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yeZlqL1Cn/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    talk1 = "First prediction is " + prediction_1;
    talk2 = "And second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(talk1 + talk2);
    synth.speak(utterThis);
}

function PredictImage() {
    img = document.getElementById("captured_Image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultEmotionName1").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "Happy") {
            document.getElementById("update_emoji_1").innerHTML = "&#128512;";
        }
        if (results[0].label == "Sad") {
            document.getElementById("update_emoji_1").innerHTML = "&#128532;";
        }
        if (results[0].label == "Surprise") {
            document.getElementById("update_emoji_1").innerHTML = "&#128558;";
        }




        if (results[1].label == "Happy") {
            document.getElementById("update_emoji_2").innerHTML = "&#128512;";
        }
        if (results[1].label == "Sad") {
            document.getElementById("update_emoji_2").innerHTML = "&#128532;";
        }
        if (results[1].label == "Surprise") {
            document.getElementById("update_emoji_2").innerHTML = "&#128558;";
        }
    }
}