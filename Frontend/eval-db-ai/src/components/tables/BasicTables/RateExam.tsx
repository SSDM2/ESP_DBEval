import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { FileIcon, MoreDotIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { useState } from "react";

interface Exams {
  id: number;
  name: string;
  variants: string;
  echeance: string;
  type: string;
  status: "corrige" | "en cours" | "indisponible";
  successRate: number;
  image: string;
  file: string;
  correction: string;
}

const tableData: Exams[] = [
  {
    id: 1,
    name: "Projet de MySQL",
    variants: "Master 1",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
    successRate: 80,
    correction: "cliquer ici",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
  },
  {
    id: 2,
    name: "Projet de MySQL",
    variants: "Master 1",
    echeance: "12/04/2025",
    type: "QCM",
    status: "indisponible",
    successRate: 60,
    file: "Voir la copie",
    correction: "indisponible",
    image: "/images/exos/exo-01.png",
  },
  {
    id: 3,
    name: "Projet de MySQL",
    variants: "Master 1",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
    successRate: 90,
    correction: "cliquer ici",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
  },
  {
    id: 4,
    name: "Projet de MySQL",
    variants: "Master 1",
    echeance: "12/04/2025",
    type: "QCM",
    status: "en cours",
    successRate: 70,
    file: "Voir la copie",
    correction: "Dans 2 mn",
    image: "/images/exos/exo-01.png",
  },
  {
    id: 5,
    name: "Projet de MySQL",
    variants: "Master 1",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
    successRate: 85,
    correction: "cliquer ici",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
  },
];

export default function RateExam() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  return (
    <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-blue-800 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                ID
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Contenu
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Type
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Echeance
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Taux de Réussite
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Exercice
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Correction
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="p-3 font-bold text-gray-500 text-theme-sm dark:text-gray-400">
                  {exam.id}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img src={exam.image} className="h-[50px] w-[50px]" alt={exam.name} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {exam.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {exam.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {exam.type}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {exam.echeance}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      exam.status === "corrige"
                        ? "success"
                        : exam.status === "en cours"
                        ? "warning"
                        : "error"
                    }
                  >
                    {exam.status}
                  </Badge>
                </TableCell>
                {/* Taux de Réussite */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-theme-sm dark:text-white/90">
                      {exam.successRate}%
                    </div>
                    <Badge
                      color={exam.successRate >= 80 ? "success" : "warning"}
                      size="sm"
                    >
                      {exam.successRate >= 80 ? "Réussi" : "En progrès"}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex h-[50px] items-center w-[100px] overflow-hidden rounded-md">
                    <div>{exam.file}</div>
                    <div>
                      <FileIcon className="size-5" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex h-[50px] items-center w-[100px] overflow-hidden rounded-md">
                    <div>{exam.correction}</div>
                    <div>
                      <FileIcon className="size-5" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <button
                      className="dropdown-toggle"
                      onClick={() => handleToggleDropdown(exam.id)}
                    >
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === exam.id}
                      onClose={handleCloseDropdown}
                      className="w-40 p-2 dark:bg-gary-900"
                    >
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex w-full items-center space-x-2 font-normal text-left text-red-500 rounded-lg hover:bg-gary-50 hover:text-red-700"
                      >
                        <TrashBinIcon className="text-red-500 dark:hover:text-gray-300 size-4" />
                        <div>Supprimer</div>
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex w-full items-center space-x-2 font-normal text-left gray-gray-500 rounded-lg hover:bg-gray-100 hover:gray-gray-700 dark:gray-gray-400 dark:hover:bg-white/6 dark:bg:gray-gray-200"
                      >
                        <PencilIcon className="gray-gray-500 hover:gray-gray-700 dark:hover:gray-gray-300 size-4" />
                        <div>Modifier</div>
                      </DropdownItem>
                    </Dropdown>
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
