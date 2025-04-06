import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { BoxIcon, BoxIconLine, GroupIcon } from "../../icons";
import Stats from "../../components/ecommerce/Stat";

interface QuestionCorrection {
  id: number;
  questionTitle: string;
  correctAnswer: string;
  studentAnswer: string;
  status: "correct" | "incorrect";
  feedback: string;
}

const correctionsData: QuestionCorrection[] = [
  {
    id: 1,
    questionTitle: "Requête pour sélectionner les employés",
    correctAnswer: "SELECT * FROM employees WHERE salary > 50000;",
    studentAnswer: "SELECT * FROM employees WHERE salary >= 50000;",
    status: "incorrect",
    feedback: "La condition salary >= 50000 peut inclure des employés avec un salaire exactement égal à 50000, ce qui n'est pas ce qui était attendu.",
  },
  {
    id: 2,
    questionTitle: "Requête de mise à jour des salaires",
    correctAnswer: "UPDATE employees SET salary = salary * 1.1 WHERE department = 'IT';",
    studentAnswer: "UPDATE employees SET salary = salary * 1.1 WHERE department = 'HR';",
    status: "incorrect",
    feedback: "La mise à jour a été effectuée pour le mauvais département. Vous devez cibler le département 'IT'.",
  },
];

export default function CorrectionPage() {

  const statsData = [
    {
      title: "SQL",
      percentage: 80,
      trend: "up",
      icon: <GroupIcon className="text-success-800 size-6" />, // Icône personnalisée
      bgColor: "success", // Couleur de fond personnalisée
      textColor: "success", // Couleur du texte personnalisée
    },
    {
      title: "MLD",
      percentage: 40,
      trend: "down",
      icon: <BoxIconLine className="text-red-800 size-6" />, // Icône personnalisée
      bgColor: "red", // Couleur de fond personnalisée
      textColor: "red", // Couleur du texte personnalisée
    },
  ];
  

  const { examId } = useParams<{ examId: string }>(); // Récupérer l'ID de l'examen depuis l'URL
  const [corrections, setCorrections] = useState<QuestionCorrection[]>([]);

  useEffect(() => {
    // Ici, vous pouvez récupérer les données des corrections depuis votre API
    // Par exemple : fetch(`/api/corrections/${examId}`)
    setCorrections(correctionsData); // Utiliser les données simulées pour l'exemple
  }, [examId]);

  return (
    
    <div className="space-y-4">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Taux de Reussite" />


    
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 col-md-12 xl:col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div>
              <ComponentCard title="Statistiques du taux de reussite">
                <div className="sm:grid-cols-1  sm:space-x-2 flex space-y-4 justify-center md:items-center md:col-span-12 md:space-x-6 xl:col-span-7">
                  <Stats stats={statsData} />
                </div>
              </ComponentCard>
              <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex space-x-3 items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <BoxIcon className="text-blue-800 size-6 dark:text-white/90" />
                  </div>
                  <h3 className="text-sm text-blue-800 dark:text-white/90">
                    Liste des taux de reussite
                  </h3>
                </div>
              </div>
            </div>
       <Table>
              {/* Table Header */}
              <TableHeader className="border-blue-800 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    N°
                  </TableCell>
                  <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Question
                  </TableCell>
                  <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Réponse Étudiant
                  </TableCell>
                  <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Réponse Correcte
                  </TableCell>
                  <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Statut
                  </TableCell>
                  <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Commentaires
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {corrections.map((correction) => (
                  <TableRow key={correction.id}>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-sm">{correction.id}</TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-sm">{correction.questionTitle}</TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-sm">{correction.studentAnswer}</TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-sm">{correction.correctAnswer}</TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-sm">
                      <Badge
                        size="sm"
                        color={correction.status === "correct" ? "success" : "error"}
                      >
                        {correction.status === "correct" ? "Correct" : "Incorrect"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-sm">{correction.feedback}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          </div>
        </div>
      </div>  );
}
