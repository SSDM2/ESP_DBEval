import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

interface Stats {
  title: string;
  nombre?: string; // Additional custom classes for styling
  pourcentage?: string; // Additional custom classes for styling
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const Stats: React.FC<Stats> = ({
  title,
  pourcentage,
  nombre,
  className = "",
}) => {
  return (
    <div className="flex gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className={`rounded-2xl border border-gray-200 bg-blue-50 dark:border-gray-800 dark:bg-white/[0.03] md:p-4 ${className}`}>

        <div className="flex items-center space-x-2" >
          <div className="items-center" >
            <div className={`flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl dark:bg-gray-800${className}`}>
              <GroupIcon className="text-blue-800 size-6 dark:text-white/90" />
            </div>

            <div className="flex items-end justify-between my-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {title}
                </span>
                <h4 className={`font-bold text-blue-800 text-title-sm dark:text-white/90${className}`}>
                  {nombre}
                </h4>
              </div>
            </div>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
           {pourcentage}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
