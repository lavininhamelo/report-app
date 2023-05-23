import { fireEvent, render, screen } from "@testing-library/vue";
import ReportDetails from "./ReportDetails.vue";
import { IndividualReport } from "./types";

const report: IndividualReport = {
  id: "1",
  name: "Test",
  status: "PENDING",
  probability: 80,
  reportDate: "2023-05-13T19:00:33.000Z",
  imageUrl: "https://via.placeholder.com/150",
  tags: ["Tag A", "Tag B"],
  dates: [
    {
      title: "Created Date",
      date: "2023-05-13T19:00:33.000Z",
    },
    {
      title: "Relatory Date",
      date: "2023-05-13T19:00:33.000Z",
    },
  ],
};
describe("ReportDetails", () => {
  it("renders the report name correctly", async () => {
    render(ReportDetails, {
      props: {
        report,
      },
    });

    const reportName = screen.getByText(`Report ${report.name}`);
    expect(reportName).toBeInTheDocument();

    const reportStatus = screen.getByText("Pending");
    expect(reportStatus).toBeInTheDocument();

    const reportProbability = screen.getByText(`${report.probability}%`);
    expect(reportProbability).toBeInTheDocument();

    const date1 = screen.getByTestId("test-date-0");
    expect(date1).toBeInTheDocument();
    expect(date1).toHaveTextContent("Created Date");

    const date2 = screen.getByTestId("test-date-1");
    expect(date2).toBeInTheDocument();
    expect(date2).toHaveTextContent("Relatory Date");

    const tagA = screen.getByText("Tag A");
    expect(tagA).toBeInTheDocument();

    const tagB = screen.getByText("Tag B");
    expect(tagB).toBeInTheDocument();

    const probability = screen.getByText(`${report.probability}%`);
    expect(probability).toBeInTheDocument();

    const image = screen.getByAltText("Uploaded Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", report.imageUrl);
    expect(image).toHaveClass("blur-lg");

    const focusButton = screen.getByText("Reveal Image");
    expect(focusButton).toBeInTheDocument();

    const rejectButton = screen.getByText("Reject");
    expect(rejectButton).toBeInTheDocument();

    const approveButton = screen.getByText("Approve");
    expect(approveButton).toBeInTheDocument();
  });

  it("should render processing when reportDate is undefined", async () => {
    render(ReportDetails, {
      props: {
        report: {
          ...report,
          reportDate: undefined,
        },
      },
    });

    screen.getByText("Report is being processed...");
  });

  it("focuses the image when the focus button is clicked", async () => {
    render(ReportDetails, {
      props: {
        report,
      },
    });

    const image = screen.getByAltText("Uploaded Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", report.imageUrl);
    expect(image).toHaveClass("blur-lg");

    const focusButton = screen.getByText("Reveal Image");
    expect(focusButton).toBeInTheDocument();

    await fireEvent.click(focusButton);
    expect(image).toHaveClass("blur-none");
    const hideButton = screen.getByText(/Hide Image/i);
    expect(hideButton).toBeInTheDocument();
    const button = screen.queryByText(/Reveal Image/i);
    expect(button).toBeNull();
  });

  describe("should render the correct status", () => {
    it('should render "Pending" status', async () => {
      render(ReportDetails, {
        props: {
          report,
        },
      });

      const reportStatus = screen.getByText("Pending");
      expect(reportStatus).toBeInTheDocument();
      expect(reportStatus).toHaveClass("border-gray-500 text-gray-500");

      const rejectButton = screen.getByText("Reject");
      expect(rejectButton).toBeInTheDocument();

      const approveButton = screen.getByText("Approve");
      expect(approveButton).toBeInTheDocument();
    });

    it('should render "Pending" status', async () => {
      render(ReportDetails, {
        props: {
          report: {
            ...report,
            status: "APPROVED",
          },
        },
      });

      const reportStatus = screen.getByText("Approved");
      expect(reportStatus).toBeInTheDocument();
      expect(reportStatus).toHaveClass("border-green-500 text-green-500");

      const rejectButton = screen.queryByText("Reject");
      expect(rejectButton).toBeNull();

      const approveButton = screen.queryByText("Approve");
      expect(approveButton).toBeNull();
    });

    it('should render "Rejected" status', async () => {
      render(ReportDetails, {
        props: {
          report: {
            ...report,
            status: "REJECTED",
          },
        },
      });

      const reportStatus = screen.getByText("Rejected");
      expect(reportStatus).toBeInTheDocument();
      expect(reportStatus).toHaveClass("border-red-500 text-red-500");

      const rejectButton = screen.queryByText("Reject");
      expect(rejectButton).toBeNull();

      const approveButton = screen.queryByText("Approve");
      expect(approveButton).toBeNull();
    });
  });
});
