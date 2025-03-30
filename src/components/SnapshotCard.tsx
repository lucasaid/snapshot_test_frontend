import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Snapshot } from "../types/snapshots";
import { IMAGES_URL } from "../utils/constants";
import { Link } from "react-router-dom";

interface SnapshotCardProps {
  snapshot: Snapshot;
  deleteSnapshot: () => void;
}
/**
 * A MUI Card component that displays a snapshot.
 * @param snapshot Snapshot data, as returned by the API.
 * @param deleteSnapshot A function to delete the snapshot.
 * @returns A Card component displaying the snapshot data.
 */
export const SnapshotCard = ({
  snapshot,
  deleteSnapshot,
}: SnapshotCardProps) => {
  if (!snapshot) {
    throw new Error("snapshot is null");
  }

  return (
    <Card>
      <CardMedia
        component="img"
        image={`${IMAGES_URL}/${snapshot.top_image}`}
        alt="Top Image"
      />
      <CardMedia
        component="img"
        image={`${IMAGES_URL}/${snapshot.front_image}`}
        alt="Front Image"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ maxWidth: "100%" }}
        >
          {snapshot.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", maxWidth: "100%" }}
        >
          {snapshot.notes}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/${snapshot.id}`}
        >
          Update
        </Button>
        <Button size="small" color="error" onClick={() => deleteSnapshot()}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
