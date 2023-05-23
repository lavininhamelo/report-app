export interface AvatarImage {
  id: string;
  path: string;
  userReference?: string;
  reportId: string;
  date?: Date;
}

export namespace AvatarImageUsecases {
  export type NewImage = {
    execute: (
      imageName: string,
      userReference: string
    ) => Promise<{
      id: string;
      path: string;
      report_id: string;
      date: Date;
    }>;
  };
}
