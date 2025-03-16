import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { BoltIcon, BoxIconLine, CheckCircleIcon, CloseIcon, FileIcon, InfoIcon, MoreDotIcon, PencilIcon, PlusIcon, TrashBinIcon } from "../../../icons";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { useState } from "react";

interface Note {
  id: number; // Unique identifier for each Note
  name: string; // Note name
  variants: string; // Number of variants (e.g., "1 Variant", "2 Variants")
  echeance: string; // echeance of the Note
  type: string; // type of the Note (as a string with currency symbol)
  // status: string; // Status of the Note
  image: string; // URL or path to the Note image
  file: string; // URL or path to the Note image
  correction: string; // URL or path to the Note image
  status: "corrige" | "en cours" | "indisponible"; // Status of the Note
  // action: string; // prolongee 
}

// Define the table data using the interface
const tableData: Note[] = [
  {
    id: 1,
    name: "Projet de MySQL",
    variants: "Master 1",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
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
    correction: "cliquer ici",

    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
  },
];


export default function NotesList() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (id: number) => {
    // Si le dropdown ouvert est déjà celui sur lequel on clique, on le ferme
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
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                N
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Contenu
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
                Exercice
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Copie
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id} className="">
                <TableCell className="p-3 font-bold text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.id}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        className="h-[50px] w-[50px]"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.type}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.echeance}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "corrige"
                        ? "success"
                        : product.status === "en cours"
                          ? "warning"
                          : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className=" text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex h-[50px] items-center w-[100px] overflow-hidden rounded-md">

                    <div>
                      {product.file}
                    </div>
                    <div>
                      <FileIcon className="size-5" />

                    </div>
                  </div>
                </TableCell>
                <TableCell className=" text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex h-[50px] items-center w-[100px] overflow-hidden rounded-md">

                    <div>
                      {product.file}
                    </div>
                    <div>
                      <FileIcon className="size-5" />

                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <button className="dropdown-toggle"
                      onClick={() => handleToggleDropdown(product.id)}
                    >
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === product.id}
                      onClose={handleCloseDropdown}
                      className="w-40 p-2"
                    >
                      <Dropdown
                      isOpen={openDropdownId === product.id}
                      onClose={handleCloseDropdown}
                      className="w-40 p-2 dark:bg-gary-900"
                    >
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex w-full items-center space-x-2 font-normal text-left text-red-500 rounded-lg hover:bg-gary-50 hover:text-red-700"
                      >
                        < TrashBinIcon className="text-red-500 dark:hover:text-gray-300 size-4" />
                        <div>
                          Supprimer
                        </div>
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex w-full items-center space-x-2 font-normal text-left gray-gray-500 rounded-lg hover:bg-gray-100 hover:gray-gray-700 dark:gray-gray-400 dark:hover:bg-white/6 dark:bg:gray-gray-200"
                      >
                        < PencilIcon className="gray-gray-500 hover:gray-gray-700 dark:hover:gray-gray-300 size-4" />
                        <div>
                          Modifier
                        </div>
                      </DropdownItem>
                    </Dropdown>
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex w-full items-center space-x-2 font-normal text-left gray-gray-500 rounded-lg hover:bg-gray-100 hover:gray-gray-700 dark:gray-gray-400 dark:hover:bg-white/5 dark:hover:gray-gray-300"
                        >
                        < PencilIcon className="gray-gray-500 hover:gray-gray-700 dark:hover:gray-gray-300 size-4" />
                        <div>
                        Modifier
                       </div> 
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
