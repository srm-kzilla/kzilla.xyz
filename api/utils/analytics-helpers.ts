import { analyticsreporting_v4 } from "googleapis";
import { Report, Data } from "../models/report-model";

/**
 * Makes botched Analytics report readable
 * @param reports an array of Google Analytics report
 * @param clicks number of clicks on the short link
 */
export const readableReports = (
  reports: analyticsreporting_v4.Schema$Report[],
  clicks: number
) => {
  let formattedReports: Report[] = [];
  reports.forEach((report: analyticsreporting_v4.Schema$Report) => {
    if (report) {
      let name: string | undefined = undefined;
      let data: Data[] = [];
      let _total: number | undefined = undefined;

      if (report.columnHeader && report.columnHeader.dimensions) {
        name = report.columnHeader.dimensions[0].replace("ga:", "kz:");
      }

      if (report.data && report.data.rows) {
        report.data.rows.forEach(
          (row: analyticsreporting_v4.Schema$ReportRow) => {
            if (row && row.dimensions && row.metrics && row.metrics[0].values)
              data.push({
                label: row.dimensions[0],
                value: +row.metrics[0].values[0],
              });
          }
        );
      }

      if (report.data && report.data.totals && report.data.totals[0].values) {
        _total = +report.data.totals[0].values[0];
      }

      if (name && data && _total) {
        const formattedReport: Report = {
          name: name,
          data: data,
          _total: _total,
        };

        formattedReports.push(formattedReport);
      } else throw 204;
    }
  });

  return { clicks: clicks, reports: formattedReports };
};
