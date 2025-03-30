/**
 * Captures a snapshot of the video element and calculates its brightness.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to be used for capturing the snapshot.
 * @param {HTMLVideoElement} video - The video element to be captured.
 *
 * @returns {Object} An object containing the snapshot as a data URL of the image and the brightness of the image.
 */
export const captureImageFromVideo = (
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement
) => {
  const context = canvas.getContext("2d");
  if (context) {
    // Draw the video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Get the data URL of the snapshot
    const data = canvas.toDataURL("image/png");

    // Calculate the brightness of the snapshot
    let r,
      g,
      b,
      avg,
      colorSum = 0;

    // Iterate through all the pixels in the snapshot
    for (let x = 0, len = data.length; x < len; x += 4) {
      // Get the color components of the current pixel
      r = imageData.data[x];
      g = imageData.data[x + 1];
      b = imageData.data[x + 2];

      // Calculate the average of the color components
      avg = Math.floor((r + g + b) / 3);

      // Add the average to the sum of all the color components
      colorSum += avg;
    }

    // Calculate the brightness as the average of all the color components
    const brightness = Math.floor(colorSum / (canvas.width * canvas.height));

    return { data, brightness };
  }
  return { data: null, brightness: 0 };
};

/**
 * Clears the entire canvas by filling it with a specified color.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to be cleared.
 */
export const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");

  // If the context is available, fill the canvas with a light gray color
  if (context) {
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
};
