import { Reports } from '../entities/report.entity';

export interface IReportsRepository {
  createReports(data: Reports[]): Promise<Reports[]>;
  countFilteredReports(reporting_date: string): Promise<number>;
  findAllReports(
    skip: number,
    take: number,
    reporting_date: string,
  ): Promise<Reports[]>;
}
