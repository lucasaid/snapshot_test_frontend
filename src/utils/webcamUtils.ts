/**
 * Initializes the webcam by requesting access to the user's video input device.
 *
 * @returns {Promise<MediaStream>} A promise that resolves to the media stream of the webcam.
 */
export const startWebcam = async (videoView: HTMLVideoElement): Promise<MediaStream> => {
  return navigator.mediaDevices
    .getUserMedia({
      video: {
        width: {
          ideal: 480
        },
        height: {
          ideal: 640
        },
      },
      audio: false,
    })
    .then((stream) => {
      const track = stream.getTracks()[0];
      if (track.getSettings) {
        const {
          width,
          height
        } = track.getSettings() as {
          width: number;
          height: number;
        };
        console.log(`${width}x${height}`);
        videoView.width = (width > height) ? width : height;
        videoView.height = (height > width) ? height : width;
      }
      return stream;
    })
    .catch((error) => {
      // Alert the user in case of an error
      alert(error);
      throw error; // Re-throw the error for further handling
    });
};

/**
 * Stops all tracks of a given media stream.
 * @param {MediaStream} stream The media stream to stop.
 */
export const stopTracks = (stream: MediaStream) => {
  stream.getTracks().forEach((track) => {
    track.stop();
  });
};
