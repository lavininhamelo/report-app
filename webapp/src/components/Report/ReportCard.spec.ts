import { render, screen } from "@testing-library/vue";
import ReportCard from "./ReportCard.vue";
import formatReportDate from "../../helpers/formatReportDate";
import { vi } from "vitest";
vi.mock("../../helpers/formatReportDate");

describe("ReportCard", () => {
  it("renders the name correctly", () => {
    const name = "Test";
    render(ReportCard, {
      props: {
        name,
        date: "2023-05-18",
        probability: 80,
      },
    });

    

    const cardName = screen.getByText("Report Test");
    
    expect(cardName).toBeInTheDocument();
    expect(formatReportDate).toHaveBeenCalledTimes(1);
    expect(formatReportDate).toHaveBeenCalledWith("2023-05-18");
  });

  it("applies the correct class for probability <= 25", () => {
    const probability = 20;
    render(ReportCard, {
      props: {
        name: "Test Report",
        date: "2023-05-18",
        probability,
      },
    });

    const cardProbability = screen.getByText(`${probability}%`);
    expect(cardProbability).toHaveClass("border-green-500");
    expect(cardProbability).toHaveClass("text-green-500");
  });

  it("applies the correct class for probability > 75", () => {
    const probability = 85;
    render(ReportCard, {
      props: {
        name: "Test Report",
        date: "2023-05-22",
        probability,
      },
    });

    const cardProbability = screen.getByText(`${probability}%`);
    expect(cardProbability).toHaveClass("border-red-500");
    expect(cardProbability).toHaveClass("text-red-500");
  });

});
