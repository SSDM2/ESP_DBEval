import { useState, useEffect } from "react";
import LineChart from "../Charts/LineChart";
import TauxReussite from "../../components/ecommerce/TauxReussite";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";

interface LearningTrend {
  subject: string;
  accuracy: number; // Précision dans le sujet (en %)
  incorrectAnswers: number; // Nombre de réponses incorrectes
}

interface OverallProgress {
  date: string; // Date de l'examen ou de la mise à jour
  progress: number; // Score d'apprentissage
}

const learningTrendsData: LearningTrend[] = [
  {
    subject: "SGBD - SQL",
    accuracy: 80,
    incorrectAnswers: 2,
  },
  {
    subject: "SGBD - Modélisation",
    accuracy: 60,
    incorrectAnswers: 4,
  },
  {
    subject: "SGBD - Normalisation",
    accuracy: 70,
    incorrectAnswers: 3,
  },
];

const progressData: OverallProgress[] = [
  { date: "2025-03-01", progress: 55 },
  { date: "2025-03-15", progress: 70 },
  { date: "2025-03-30", progress: 80 },
];

export default function LearningProgressPage() {
  const [trends, setTrends] = useState<LearningTrend[]>([]);
  const [progress, setProgress] = useState<OverallProgress[]>([]);

  useEffect(() => {
    // Ici, vous pouvez récupérer les données depuis votre API
    setTrends(learningTrendsData); // Utiliser les données simulées pour l'exemple
    setProgress(progressData); // Utiliser les données simulées pour l'exemple
  }, []);

  // Graphique de progression
  const progressChartData = {
    labels: progress.map(p => p.date),
    datasets: [
      {
        label: "Taux d'apprentissage (%)",
        data: progress.map(p => p.progress),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <h2 className="text-xl font-semibold mb-4">Taux d'Apprentissage</h2>

      {/* Graphique de progression */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold">Progression dans le Temps</h3>
<div className="col-span-12 xl:col-span-5">
          <TauxReussite />
        </div>     </div>

      {/* Table des tendances d'apprentissage */}
      <div className="max-w-full overflow-x-auto mb-8">
        <h3 className="text-lg font-semibold">Tendances d'Apprentissage</h3>
        <Table>
          {/* Table Header */}
          <TableHeader className="border-blue-800 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Sujet
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Précision (%) 
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Réponses Incorrectes
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {trends.map((trend, index) => (
              <TableRow key={index}>
                <TableCell className="py-3 text-gray-500">{trend.subject}</TableCell>
                <TableCell className="py-3 text-gray-500">{trend.accuracy}%</TableCell>
                <TableCell className="py-3 text-gray-500">{trend.incorrectAnswers}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Section pour afficher le taux global d'amélioration */}
      <div>
        <h3 className="text-lg font-semibold">Amélioration Globale</h3>
        <Table>
          {/* Table Header */}
          <TableHeader className="border-blue-800 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Date
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Score d'Apprentissage (%)
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {progress.map((p, index) => (
              <TableRow key={index}>
                <TableCell className="py-3 text-gray-500">{p.date}</TableCell>
                <TableCell className="py-3 text-gray-500">{p.progress}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
