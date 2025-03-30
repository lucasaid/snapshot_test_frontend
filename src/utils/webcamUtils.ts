/**
 * Initializes the webcam by requesting access to the user's video input device.
 *
 * @returns {Promise<MediaStream>} A promise that resolves to the media stream of the webcam.
 */
export const startWebcam = async (): Promise<MediaStream> => {
  return navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
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
