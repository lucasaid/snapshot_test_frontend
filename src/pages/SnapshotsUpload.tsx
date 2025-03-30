import { useCallback, useEffect, useRef, useState } from "react";
import { createSnapshot, getSnapshot, updateSnapshot } from "../services/api";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";

import { Link, useNavigate, useParams } from "react-router-dom";
import { IMAGES_URL, SNAPSHOT_DIMENSIONS } from "../utils/constants";
import {
  ButtonWrapper,
  GridWrapper,
  ImageWrapper,
  Overlay,
} from "./SnapshotsUpload.styles";
import { captureImageFromVideo, clearCanvas } from "../utils/canvasUtils";
import { startWebcam, stopTracks } from "../utils/webcamUtils";
import styled from "styled-components";

const Video = styled.video`
  object-fit: cover;
  width: ${SNAPSHOT_DIMENSIONS.width}px;
  height: ${SNAPSHOT_DIMENSIONS.height}px;;
`;
/**
 * Component for uploading snapshots using webcam.
 */
const SnapshotsUpload = () => {
  // Extract snapshot ID from URL parameters
  const snapshotId = useParams().id;

  // Refs for video and canvas elements
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State variables for managing media stream and images
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [topImage, setTopImage] = useState<string>();
  const [frontImage, setFrontImage] = useState<string>();
  const [notes, setNotes] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const navigate = useNavigate();

  // Fetch snapshot data if snapshotId is present
  useEffect(() => {
    if (snapshotId) {
      getSnapshot(parseInt(snapshotId)).then((snapshot) => {
        setTopImage(`${IMAGES_URL}/${snapshot.data.top_image}`);
        setFrontImage(`${IMAGES_URL}/${snapshot.data.front_image}`);
        setNotes(snapshot.data.notes);
      });
    }
  }, [snapshotId]);

  // Set up video stream when component mounts
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current?.addEventListener("loadedmetadata", () => {
        if (videoRef.current && canvasRef.current) {
          videoRef.current.play();
        }
      });
    }
    // Clean up by stopping the stream when component unmounts
    return () => {
      if (stream) {
        stopTracks(stream);
        setStream(null);
      }
    };
  }, [stream, videoRef]);

  // Function to start webcam and set stream
  const openWebcam = useCallback(async () => {
    if (videoRef.current) {
      const stream = await startWebcam(videoRef.current);
      if (stream) setStream(stream);
    }
  }, [videoRef]);

  // Function to stop webcam
  const closeWebcam = useCallback(() => {
    if (videoRef.current && stream) {
      stopTracks(stream);
      setStream(null);
      videoRef.current.srcObject = null;
    }
  }, [stream, videoRef]);

  // Function to clear canvas and images
  const clearPhotos = () => {
    if (canvasRef.current) {
      clearCanvas(canvasRef.current);
    }
    setTopImage(undefined);
    setFrontImage(undefined);
  };

  // Function to capture image from video and set image state
  const captureImage = useCallback(
    (direction = "top") => {
      if (canvasRef.current && videoRef.current) {
        const { data, brightness } = captureImageFromVideo(
          canvasRef.current,
          videoRef.current
        );
        if (data) {
          // Logging brightness for future implementations
          console.log({ brightness });
          if (direction === "top") {
            setTopImage(data);
          } else if (direction === "front") {
            setFrontImage(data);
          }
        } else {
          clearPhotos();
        }
      }
    },
    [canvasRef, videoRef]
  );

  // Function to save snapshot data by creating or updating
  const saveSnapshot = async () => {
    setSaving(true);
    if (topImage && frontImage) {
      if (snapshotId) {
        await updateSnapshot({
          id: parseInt(snapshotId),
          top_image:
            topImage.search(`${IMAGES_URL}/`) > -1
              ? topImage.replace(`${IMAGES_URL}/`, "")
              : topImage.replace("data:image/png;base64,", ""),
          front_image:
            frontImage.search(`${IMAGES_URL}/`) > -1
              ? frontImage.replace(`${IMAGES_URL}/`, "")
              : frontImage.replace("data:image/png;base64,", ""),
          notes,
        });
      } else {
        await createSnapshot({
          user_id: 1,
          top_image: topImage.replace("data:image/png;base64,", ""),
          front_image: frontImage.replace("data:image/png;base64,", ""),
          notes,
        });
      }
      setSaving(false);
      navigate("/");
    } else {
      setSaving(false);
    }
  };

  return (
    <>
      {saving && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={saving}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <canvas
        style={{ display: "none" }}
        ref={canvasRef}
        width={SNAPSHOT_DIMENSIONS.width/2}
        height={SNAPSHOT_DIMENSIONS.height/2}
      />

      <h1>Upload Snapshots</h1>
      <Button component={Link} to="/" variant="contained" color="primary">
        Back
      </Button>
      <GridWrapper>
        <Video width={SNAPSHOT_DIMENSIONS.width} height={SNAPSHOT_DIMENSIONS.height} ref={videoRef} />
        <ImageWrapper>
          <Overlay>Top</Overlay>
          <img src={topImage} />
        </ImageWrapper>
        <ImageWrapper>
          <Overlay>Front</Overlay>
          <img src={frontImage} />
        </ImageWrapper>
      </GridWrapper>

      <div>
        <TextField
          id="outlined-basic"
          label="Notes"
          variant="filled"
          fullWidth
          style={{ margin: "1rem 0" }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <ButtonWrapper>
        {!stream && (
          <Button variant="contained" onClick={openWebcam}>
            Open Webcam
          </Button>
        )}
        {stream && (
          <Button variant="contained" onClick={closeWebcam}>
            Stop Capture
          </Button>
        )}
        <Button variant="contained" onClick={() => captureImage("top")}>
          Take Top Picture
        </Button>
        <Button variant="contained" onClick={() => captureImage("front")}>
          Take Front Picture
        </Button>
        {(frontImage || topImage) && (
          <Button variant="contained" onClick={clearPhotos}>
            Clear Pictures
          </Button>
        )}
        {frontImage && topImage && (
          <Button variant="contained" onClick={() => saveSnapshot()}>
            Save
          </Button>
        )}
      </ButtonWrapper>
    </>
  );
};

export default SnapshotsUpload;
