import { render, screen } from "@testing-library/vue";
import App from "./App.vue";
import useReports from "./composables/useReports";
import { ref } from "vue";
import { Mock, expect, vi } from "vitest";

vi.mock("./composables/useReports");

const reports = [
  { id: "1", name: "1", date: "2023-05-13", probability: 80 },
  { id: "2", name: "2", date: "2023-05-14", probability: 90 },
];

const runMock = (reportsMock?: any) => {
  (useReports as Mock).mockReturnValue({
    selectedReport: ref(false),
    showArchived: ref(false),
    selectReport: vi.fn(),
    reports: ref(reportsMock || reports),
    load: vi.fn(),
  });
};

describe("App", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("render component with no reports to review message", () => {
    runMock([]);

    render(App, {
      props: {
        reports: [],
      },
    });

    const message = screen.getByText("No report to review.");
    const text = screen.getByText("You have 0 new reports");
    expect(message).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test("render reports list", () => {
    runMock();

    render(App, {
      data() {
        return {
          reports,
        };
      },
    });

    const headerTitle = screen.getByText("Reports");
    expect(headerTitle).toBeInTheDocument();

    const headerSubtitle = screen.getByText("You have 2 new reports");
    expect(headerSubtitle).toBeInTheDocument();
    expect(screen.getByText("Upload Image")).toBeInTheDocument();

    for (const report of reports) {
      const reportCard = screen.getByText("Report " + report.name);
      expect(reportCard).toBeInTheDocument();
      expect(screen.getByText(report.probability + "%")).toBeInTheDocument();
    }
  });
 
});
