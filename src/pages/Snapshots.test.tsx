import { render, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Snapshots from "./Snapshots";
import * as APIHooks from "../services/api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/api");

describe("Snapshots component", () => {
  const queryClient = new QueryClient();
  const getSnapshotsSpy = jest.spyOn(APIHooks, "getSnapshots");
  const deleteSnapshotSpy = jest.spyOn(APIHooks, "deleteSnapshot");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders loading state", async () => {
    getSnapshotsSpy.mockReturnValue(Promise.resolve({ data: [] }));
    const { getByText } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Snapshots />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await waitFor(() => expect(getByText("Loading...")).toBeDefined());
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
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Snapshots />
        </QueryClientProvider>
      </MemoryRouter>
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
    const { queryAllByText, getByRole } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <Snapshots />
        </QueryClientProvider>
      </MemoryRouter>
    );
    await waitFor(() => expect(queryAllByText("Snapshot 1")).toBeDefined());
    const deleteButton = getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeDefined();
    await waitFor(() => fireEvent.click(deleteButton));
    const confirmButton = getByRole("button", { name: "Confirm" });
    expect(confirmButton).toBeDefined();
    await waitFor(() => fireEvent.click(confirmButton));
    await waitFor(() => expect(deleteSnapshotSpy).toHaveBeenCalledTimes(1));
  });
});
