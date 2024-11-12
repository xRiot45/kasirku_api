import { Reports } from '../entities/report.entity';

export interface IReportsRepository {
  createReports(data: Reports[]): Promise<Reports[]>;
}
