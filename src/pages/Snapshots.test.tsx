import { render, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Snapshots from "./Snapshots";
import * as APIHooks from "../services/api";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../services/api");

describe("Snapshots component", () => {
  const getSnapshotsSpy = vi.spyOn(APIHooks, "getSnapshots");
  const deleteSnapshotSpy = vi.spyOn(APIHooks, "deleteSnapshot");
  const queryClient = new QueryClient();

  beforeEach(async () => {
    vi.resetAllMocks();
  });

  it("renders loading state", async () => {
    getSnapshotsSpy.mockReturnValue(Promise.resolve({ data: [] }));
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Snapshots />
      </QueryClientProvider>
    );
    expect(getByText("Loading...")).toBeDefined();
  });

  it("renders successful data fetch", async () => {
    const data = [
      {
        id: 1,
        name: "Snapshot 1",
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
        user_id: 1,
        top_image: "top_image",
        front_image: "front_image",
        notes: "notes",
      },
    ];
    getSnapshotsSpy.mockReturnValue(Promise.resolve({ data }));
    const { queryAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <Snapshots />
      </QueryClientProvider>
    );
    await waitFor(() => expect(queryAllByText("Snapshot 1")).toBeDefined());
  });

  it("tests delete snapshot functionality", async () => {
    const data = [
      {
        id: 1,
        name: "Snapshot 1",
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
        user_id: 1,
        top_image: "top_image",
        front_image: "front_image",
        notes: "notes",
      },
    ];
    getSnapshotsSpy.mockReturnValue(Promise.resolve({ data }));
    deleteSnapshotSpy.mockReturnValue(Promise.resolve({ id: 1 }));
    const { queryAllByText, queryAllByRole } = render(
      <QueryClientProvider client={queryClient}>
        <Snapshots />
      </QueryClientProvider>
    );
    await waitFor(() => expect(queryAllByText("Snapshot 1")).toBeDefined());
    const deleteButton = queryAllByRole("button", { name: "Delete" });
    expect(deleteButton).toBeDefined();
    await waitFor(() => fireEvent.click(deleteButton[0]));
    await waitFor(() => expect(deleteSnapshotSpy).toHaveBeenCalledTimes(1));
  });
});
