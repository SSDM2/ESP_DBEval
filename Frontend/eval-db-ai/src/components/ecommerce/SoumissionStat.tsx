import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function SoumissionStat() {
  return (
    <div className="flex gap-4 sm:grid-cols-1 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <div className="flex items-center space-x-2" >
          <div className="items-center" >
            <div className="flex items-center justify-center p-2 rounded-xl dark:bg-gray-800">
              <GroupIcon className="text-blue-800 size-6 dark:text-white/90" />
            </div>

            <div className="flex items-end justify-between my-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Sujets Corriges
                </span>
                <h4 className="font-bold text-blue-800 text-title-sm dark:text-white/90">
                  5
                </h4>
              </div>
            </div>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

  
    </div>
  );
}
