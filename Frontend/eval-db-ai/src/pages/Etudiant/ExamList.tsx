import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";

interface ExamDeposit {
  id: number;
  title: string;
  studentName: string;
  submissionDate: string;
  status: "corrige" | "en cours" | "indisponible";
}

const depositsData: ExamDeposit[] = [
  {
    id: 1,
    title: "Examen de SGBD - Partie 1",
    studentName: "Alice Dupont",
    submissionDate: "2025-03-20",
    status: "corrige",
  },
  {
    id: 2,
    title: "Examen de SGBD - Partie 2",
    studentName: "Bob Martin",
    submissionDate: "2025-03-22",
    status: "en cours",
  },
  {
    id: 3,
    title: "Examen de SGBD - Partie 3",
    studentName: "Chloe Laurent",
    submissionDate: "2025-03-25",
    status: "indisponible",
  },
];

export default function DepositPage() {
  const [selectedExam, setSelectedExam] = useState<ExamDeposit | null>(null);

  const viewCorrections = (exam: ExamDeposit) => {
    setSelectedExam(exam);
  };

  return (
    <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-blue-800 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                N
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Titre
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Étudiant
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Date de Dépôt
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Statut
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Voir Correction
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {depositsData.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="py-3 text-gray-500">{exam.id}</TableCell>
                <TableCell className="py-3 text-gray-500">{exam.title}</TableCell>
                <TableCell className="py-3 text-gray-500">{exam.studentName}</TableCell>
                <TableCell className="py-3 text-gray-500">{exam.submissionDate}</TableCell>
                <TableCell className="py-3 text-gray-500">
                  <Badge
                    size="sm"
                    color={exam.status === "corrige" ? "success" : exam.status === "en cours" ? "warning" : "error"}
                  >
                    {exam.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500">
                  <Button onClick={() => viewCorrections(exam)}>Voir Correction</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
