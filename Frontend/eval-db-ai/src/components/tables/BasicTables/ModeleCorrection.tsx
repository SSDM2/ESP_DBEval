import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table"; // Assurez-vous que le chemin d'importation est correct
import Badge from "../../ui/badge/Badge"; // Badge pour afficher les status
import { FileIcon } from "../../../icons"; // Assurez-vous d'avoir importé les icônes

interface ModelCorrection {
  id: number;
  title: string;
  description: string;
  type: string;
  criteria: string;
  echeance: string;
  status: "corrige" | "en cours" | "indisponible";
  dateDepot: string;
  file: string;
}

const tableData: ModelCorrection[] = [
  {
    id: 1,
    title: "Modèle de Correction 1",
    description: "Correction d'un projet MySQL avec des critères détaillés.",
    type: "QCM",
    criteria: "Exactitude: 8, Clarté: 4, Exemples: 3",
    echeance: "2025-04-12",
    status: "corrige",
    dateDepot: "2025-03-15",
    file: "Voir la copie",
  },
  {
    id: 2,
    title: "Modèle de Correction 2",
    description: "Correction d'un projet de code SQL avec analyse détaillée.",
    type: "QCM",
    criteria: "Exactitude: 9, Clarté: 3, Exemples: 2",
    echeance: "2025-04-14",
    status: "en cours",
    dateDepot: "2025-03-16",
    file: "Voir la copie",
  },
  {
    id: 3,
    title: "Modèle de Correction 3",
    description: "Correction du projet SQL avec un focus sur la performance.",
    type: "Théorique",
    criteria: "Exactitude: 7, Clarté: 5, Exemples: 4",
    echeance: "2025-04-16",
    status: "indisponible",
    dateDepot: "2025-03-17",
    file: "Voir la copie",
  },
];

export default function ModelCorrectionList() {
  return (
    <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-blue-800 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                N
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Titre
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Description
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Critères
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Echeance
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date Dépôt
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Copie
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((model) => (
              <TableRow key={model.id}>
                <TableCell className="py-3 font-bold text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.id}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.title}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.description}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.type}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.criteria}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.echeance}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      model.status === "corrige"
                        ? "success"
                        : model.status === "en cours"
                        ? "warning"
                        : "error"
                    }
                  >
                    {model.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.dateDepot}
                </TableCell>
                <TableCell className="text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex h-[50px] items-center w-[100px] overflow-hidden rounded-md">
                    <div>{model.file}</div>
                    <div>
                      <FileIcon className="size-5" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
