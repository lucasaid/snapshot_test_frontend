import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SnapshotCard } from "./SnapshotCard";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

describe("SnapshotCard component", () => {
  const queryClient = new QueryClient();
  it("matches snapshot", () => {
    const container = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SnapshotCard
            snapshot={{
              id: 1,
              name: "Snapshot 1",
              created_at: "2023-01-01",
              updated_at: "2023-01-01",
              user_id: 1,
              top_image: "top_image",
              front_image: "front_image",
              notes: "notes",
            }}
            deleteSnapshot={() => {}}
          />
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
