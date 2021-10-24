const joints ={
    thumb: [0, 1, 2, 3, 4], 
    index: [0, 5, 6, 7, 8],
    middle: [0, 9, 10, 11, 12],
    ring: [0, 13, 14, 15, 16],
    pinky:[0, 17, 18, 19, 20]
}

export const drawHand = (predictions, ctx) => {
    if (predictions.length > 0) {
        predictions.forEach((prediction) => {
            const keypoints = prediction.landmarks;
            for (let j=0; j < Object.keys(joints).length; j++){
                let finger = Object.keys(joints)[j]
                for (let k=0; k < joints[finger].length - 1; k++){
                    const firstIndex = joints[finger][k];
                    console.log(firstIndex);
                    const secondIndex = joints[finger][k+1];
                    ctx.beginPath();
                    ctx.moveTo(keypoints[firstIndex][0], keypoints[firstIndex][1]);
                    ctx.lineTo(keypoints[secondIndex][0], keypoints[secondIndex][1]);
                    ctx.strokeStyle = "yellow";
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }    
            }
            for (let i = 0; i < keypoints.length; i++) {
                ctx.beginPath();
                ctx.arc(keypoints[i][0], keypoints[i][1], 5, 0, 3 * Math.PI);
                ctx.fillStyle = "indigo";
                ctx.fill();
            }
        }
        )
    }
}