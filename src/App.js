import React from "react";
import { drawHand } from "./utilities";

const handpose = require('@tensorflow-models/handpose');

// Tensorflow js backend
require('@tensorflow/tfjs-backend-webgl');

const style = {
  display : "block",
  textAlign: "center",
  paddingTop: "100px"
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.streamCamVideo = this.streamCamVideo.bind(this)
    this.handPoseEstimation = this.handPoseEstimation.bind(this)
  }

  async componentDidMount () {
    try{
      this.model = await handpose.load();
    }
    catch (e) {
      console.log("Model is not available!")
    }
    this.streamCamVideo();
  }

  async handPoseEstimation() {
    const video = document.getElementById("video");
    const canvas = document.getElementById("pose");
    const ctx = canvas.getContext("2d");
    const predictions = await this.model.estimateHands(video);
    ctx.drawImage(video, 0, 0, 640, 480);
    drawHand(predictions, ctx);
    setTimeout(this.handPoseEstimation, 50);
  }

  streamCamVideo() {
    var constraints = { audio: true, video: { width: 640, height: 480 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        var video = document.querySelector("video");
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
  }
  
  render() {
    return (
      <div style={ style }>
        <div id="container" style={{"display" : "none"}}>
          <video id="video" autoPlay={true} controls width="640" height="480" onLoadedData={this.handPoseEstimation}></video>
        </div>
        <div>
          <canvas id="pose" width="640" height="480" style={{ 'textAlign': 'center'}}></canvas>
        </div>
      </div>
    );
  }
}