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
import { useEffect, useState } from "react";

// Interface pour un projet noté en SGBD
interface NoteSGBD {
  id: number;
  name: string;
  student: string;
  database: string;
  echeance: string;
  type: string;
  status: "corrige" | "Absente" | "indisponible";
  file: string;
  correction: string;
  image: string;
  note: number | string; // Supporte "N/A" ou un chiffre
}

// Données simulées
const tableData: NoteSGBD[] = [
  {
    id: 1,
    name: "Requête SQL - MySQL",
    student: "Serigne modou Thiam",
    database: "MySQL",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
    file: "Voir la copie",
    correction: "Corrigé",
    image: "/images/exos/exo-01.png",
    note: 16.5,
  },
  {
    id: 2,
    name: "Optimisation PostgreSQL",
    student: "Mame Bou FALL",
    database: "PostgreSQL",
    echeance: "18/04/2025",
    type: "Projet",
    status: "indisponible",
    file: "Voir la copie",
    correction: "Indisponible",
    image: "/images/exos/exo-02.png",
    note: "N/A",
  },
  {
    id: 3,
    name: "Fonctions SQL Avancées",
    student: "Marie Sene",
    database: "SQLite",
    echeance: "15/04/2025",
    type: "TP",
    status: "indisponible",
    file: "Voir la copie",
    correction: "En cours",
    image: "/images/exos/exo-03.png",
    note: "N/A",
  },
];

export default function NotesList() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  const [notes, setNotes] = useState([]); // 👈 state pour stocker les données
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
 

  return (
    <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader >
            <TableRow className="border-blue-800 dark:border-gray-800 border-y">
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">N°</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Projet</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Étudiant</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Base de données</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Type</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Copie</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Correction</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Note</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((project) => (

              <TableRow className="hover:bg-blue-50 dark:hover:bg-gray-950"
                key={project.id}>
                <TableCell className="py-2 text-center font-bold text-gray-500 text-theme-sm dark:text-gray-400">{project.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                   
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {project.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{project.student}</TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{project.database}</TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{project.type}</TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{project.echeance}</TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      project.status === "corrige"
                        ? "success"
                        : project.status === "indisponible"
                          ? "warning"
                          : "error"
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <FileIcon className="size-5" />
                  {project.file}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">{project.correction}</TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-semibold">
                    {typeof project.note === "number" ? `${project.note}/20` : project.note}
                  </span>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <button onClick={() => handleToggleDropdown(project.id)}>
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === project.id}
                      onClose={handleCloseDropdown}
                      className="w-40 p-2"
                    >
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex items-center text-red-500 hover:text-red-700"
                      >
                        <TrashBinIcon className="size-4 mr-2" /> Supprimer
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex items-center"
                      >
                        <PencilIcon className="size-4 mr-2" /> Modifier
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
