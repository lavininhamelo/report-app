import { logger } from "../application/helpers/logger";
import { ReportRepository } from "../application/repositories/Report.repository";
import { ReportUsecases } from "../domain/Report";

function getRandomTags(tagArray: string[], minCount: number, maxCount: number) {
  const count = Math.floor(Math.random() * (maxCount - minCount + 1) + minCount);
  const shuffledArray = tagArray.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
}

function generateTags() {
  const mockedTagsNormal = ["person", "female", "male", "draw", "happy", "anime", "art", "florest"];
  const mockedBadTags = ["violence", "gun", "blood", "knife", "nudism"];

  const randomValue = Math.random();

  let tags: string[] = [];

  if (randomValue <= 0.5) {
    tags = getRandomTags(mockedTagsNormal, 3, 4);
  } else if (randomValue <= 0.7) {
    tags = getRandomTags(mockedTagsNormal, 2, 2).concat(getRandomTags(mockedBadTags, 2, 2));
  } else if (randomValue > 0.8) {
    tags = [mockedTagsNormal[0]].concat(getRandomTags(mockedBadTags, 2, 3));
  }

  return {
    tags,
    percent: randomValue,
  };
}

export class GeneratereportUsecase implements ReportUsecases.GenerateReport {
  constructor(private ReportRepository: ReportRepository) {}

  async execute(reportId: string, imageName: string): Promise<void> {
    const { tags, percent } = generateTags();
    try {
      await this.ReportRepository.addreportAnalysis(reportId, tags.join(","), percent);
    } catch (error) {
      logger((error as Error).message);
      throw new Error("Error on generate report");
    }
  }
}
