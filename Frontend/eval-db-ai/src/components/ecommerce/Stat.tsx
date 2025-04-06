import { ArrowDownIcon, ArrowUpIcon } from "../../icons";
import Badge from "../ui/badge/Badge";

// Définition du type StatItem, avec des options personnalisables
interface StatItem {
  title: string;
  percentage: number;
  trend: "up" | "down"; // "up" pour tendance positive, "down" pour tendance négative
  icon: React.ReactNode; // L'icône à afficher
  bgColor: string; // Couleur de fond (ex: "bg-blue-100", "bg-red-100")
  textColor: string; // Couleur du texte (ex: "text-blue-800", "text-red-800")
}

interface StatsProps {
  stats: StatItem[]; // Liste de statistiques à afficher
  className?: string;
}

const Stats: React.FC<StatsProps> = ({ stats, className = "" }) => {
  return (
    <div className={`flex gap-4 sm:grid-cols-2 md:gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-2xl border border-gray-200 bg-${stat.bgColor}-50 dark:border-gray-800 dark:bg-white/[0.03] md:p-4`}
        >
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div
                className={`bg-${stat.bgColor} flex items-center justify-center w-10 h-10 rounded-xl dark:bg-gray-800`}
              >
                {stat.icon} {/* Affichage de l'icône passée en prop */}
              </div>

              <div className="flex items-end justify-between m-2">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </span>
                  <h4
                    className={`text-${stat.textColor}-800 font-bold text-title-sm dark:text-white/90`}
                  >
                    {stat.percentage}%
                  </h4>
                </div>
              </div>
            </div>

            <Badge color={stat.trend === "up" ? "success" : "error"}>
              {stat.trend === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              {stat.percentage}%
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
