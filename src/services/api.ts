import { CreateSnapshot, Snapshot, UpdateSnapshot } from "../types/snapshots";
import { SNAPSHOT_API_URL } from "../utils/constants";

/**
 * Retrieves a list of snapshots from the API.
 *
 * @returns {Promise<Snapshot[]>} A promise that resolves to an array of snapshots.
 */
export const getSnapshots = async (): Promise<{ data: Snapshot[] }> => {
  const response = await fetch(SNAPSHOT_API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};
/**
 * Gets a snapshot with the given id.
 *
 * @param {number} id - The ID of the snapshot to retrieve.
 * @returns {Promise<Snapshot>} A promise that resolves with the requested snapshot.
 */
export const getSnapshot = async (id: number): Promise<{ data: Snapshot }> => {
  const response = await fetch(`${SNAPSHOT_API_URL}/${id}`);
  return response.json();
};
/**
 * Deletes the snapshot with the provided id.
 *
 * @param {number} id - The ID of the snapshot to delete.
 * @returns {Promise<{ id: number }>} A promise that resolves with the id of the snapshot deleted.
 */
export const deleteSnapshot = async (id: number): Promise<{ id: number }> => {
  const response = await fetch(`${SNAPSHOT_API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
/**
 * Creates a new snapshot with the provided data.
 *
 * @param {Snapshot} snapshot - The snapshot data to be created.
 * @param {string} [snapshot.name=Snapshot] - The name of the snapshot. Defaults to "Snapshot".
 * @param {number} [snapshot.user_id=1] - The ID of the user who owns the snapshot. Defaults to 1 for now.
 * @param {string} snapshot.top_image - The image for the top of the snapshot.
 * @param {string} snapshot.front_image - The image for the front of the snapshot.
 * @param {string} [snapshot.notes=""] - The notes for the snapshot. Defaults to an empty string.
 * @returns {Promise<Snapshot>} The newly created snapshot.
 */
export const createSnapshot = async ({
  name = "Snapshot",
  user_id = 1,
  top_image,
  front_image,
  notes = "",
}: CreateSnapshot) => {
  const response = await fetch(SNAPSHOT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, user_id, top_image, front_image, notes }),
  });
  return response.json();
};

/**
 * Updates a snapshot with the given data.
 *
 * @param {UpdateSnapshot} snapshot
 * @param {number} snapshot.id The ID of the snapshot to update.
 * @param {string} [snapshot.name=Snapshot] The name of the snapshot. Defaults to "Snapshot".
 * @param {number} [snapshot.user_id=1] The ID of the user who owns the snapshot. Defaults to 1 for now.
 * @param {string} [snapshot.top_image] The image for the top of the snapshot.
 * @param {string} [snapshot.front_image] The image for the front of the snapshot.
 * @param {string} [snapshot.notes=""] The notes for the snapshot. Defaults to an empty string.
 * @returns {Promise<Snapshot>} The updated snapshot.
 */
export const updateSnapshot = async ({
  id,
  top_image,
  front_image,
  notes = "",
}: UpdateSnapshot): Promise<Snapshot> => {
  const response = await fetch(`${SNAPSHOT_API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ top_image, front_image, notes }),
  });

  return response.json();
};
