import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSnapshot, getSnapshots } from "../services/api";
import { Snapshot } from "../types/snapshots";
import { SnapshotCard } from "../components/SnapshotCard";
import { Link } from "react-router-dom";
import { useDeleteDialog } from "../components/DeleteDialog";
import { Button } from "@mui/material";
import styled from "styled-components";

const GridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

/**
 * Snapshots component for displaying a list of snapshots.
 * Provides functionality to create, display, and delete snapshots.
 */
const Snapshots = () => {
  const queryClient = useQueryClient();

  const { handleDeleteOpen, DeleteDialog } = useDeleteDialog();

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery("snapshots", getSnapshots);

  // Mutation for deleting a snapshot
  const deleteMutation = useMutation(deleteSnapshot, {
    onSuccess: () => queryClient.invalidateQueries("snapshots"), // Invalidate cache to refetch updated snapshots
  });

  return (
    <>
      <h1>Snapshots</h1>
      <Button component={Link} to="/upload" variant="contained" color="primary">
        Create Snapshot
      </Button>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <GridWrapper>
          {/* Map over fetched snapshots and render SnapshotCard for each */}
          {result?.data?.map((snapshot: Snapshot) => (
            <SnapshotCard
              key={snapshot.id}
              snapshot={snapshot}
              deleteSnapshot={() =>
                handleDeleteOpen(() => deleteMutation.mutate(snapshot.id))
              }
            />
          ))}
        </GridWrapper>
      )}

      <DeleteDialog />

      {/* Display error message if there is an error fetching snapshots */}
      {isError && <h1>{error as string}</h1>}
    </>
  );
};

export default Snapshots;
