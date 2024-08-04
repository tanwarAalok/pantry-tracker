'use client'

import Webcam from "react-webcam";
import {useState} from "react";
import {Button} from "@mui/material";

const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: "user"
};

const WebcamCapture = ({newImage, setNewImage}) => {

    if(newImage) return <img width={"100%"} height={200} src={newImage} alt={"newImage"}/>


    return (
        <Webcam
            audio={false}
            width={"100%"}
            height={200}
            style={{border: '1px solid gray'}}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
        >
            {({ getScreenshot }) => (
                <Button
                    variant="outlined"
                    onClick={() => {
                        const imageSrc = getScreenshot()
                        setNewImage(imageSrc)
                    }}
                >Capture photo</Button>
            )}
        </Webcam>
    )
};

export default WebcamCapture;