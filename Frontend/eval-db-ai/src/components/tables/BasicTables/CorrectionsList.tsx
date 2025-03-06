import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { AngleUpIcon, CheckCircleIcon, CopyIcon, DocsIcon, FileIcon, MoreDotIcon, PlusIcon, TaskIcon, TrashBinIcon } from "../../../icons";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { useState } from "react";

interface Corrections {
  id: number; // Unique identifier for each Corrections
  name: string; // Corrections name
  variants: string; // Number of variants (e.g., "1 Variant", "2 Variants")
  date: string; // date of the Corrections
  type: string; // type of the Corrections (as a string with currency symbol)
  // status: string; // Status of the Corrections
  prediction: string; // URL or path to the Corrections image
  image: string; // URL or path to the Corrections image
  file: string; // URL or path to the Corrections image
  status: "corrige" | "en cours" | "indisponible"; // Status of the Corrections
  // action: string; // prolongee 
}


// Define the table data using the interface
const tableData: Corrections[] = [
  {
    id: 1,
    name: "Projet de MySQL",
    variants: "Master 1",
    date: "12/04/2025",
    type: "QCM",
    status: "corrige",
    prediction: "95%",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
  },
  {
    id: 2,
    name: "Projet de MySQL",
    variants: "Master 1",
    date: "12/04/2025",
    type: "QCM",
    status: "indisponible",
    prediction: "95%",

    file: "indisponible",
    image: "/images/exos/exo-01.png",
  },
  {
    id: 3,
    name: "Projet de MySQL",
    variants: "Master 1",
    date: "12/04/2025",
    type: "QCM",
    status: "corrige",
    prediction: "95%",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
  },
  {
    id: 4,
    name: "Projet de MySQL",
    variants: "Master 1",
    date: "12/04/2025",
    type: "QCM",
    status: "en cours",
    prediction: "95%",

    file: "Dans 2 mn",
    image: "/images/exos/exo-01.png",
  },
  {
    id: 5,
    name: "Projet de MySQL",
    variants: "Master 1",
    date: "12/04/2025",
    type: "QCM",
    status: "corrige",
    prediction: "95%",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
  },
];


export default function CorrectionList() {

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
                className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
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
                Date
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
                Correction
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Prediction
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
            {tableData.map((correction) => (
              <TableRow key={correction.id} className="">
                <TableCell className="py-3 font-bold text-gray-500 text-theme-sm dark:text-gray-400">
                  {correction.id}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={correction.image}
                        className="h-[50px] w-[50px]"
                        alt={correction.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {correction.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {correction.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {correction.type}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {correction.date}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      correction.status === "corrige"
                        ? "success"
                        : correction.status === "en cours"
                          ? "warning"
                          : "error"
                    }
                  >
                    {correction.status}
                  </Badge>
                </TableCell>
                <TableCell className=" text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex h-[50px] items-center w-[100px] overflow-hidden rounded-md">

                    <div>
                      {correction.file}
                    </div>
                    <div>
                      <FileIcon className="size-5" />

                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      correction.status === "corrige"
                        ? "success"
                        : correction.status === "en cours"
                          ? "warning"
                          : "error"
                    }
                  >
                    {correction.prediction}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <button className="dropdown-toggle"
                      onClick={() => handleToggleDropdown(correction.id)}
                    >
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === correction.id}
                      onClose={handleCloseDropdown}
                      className="w-40 p-2"
                    >
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex w-full items-center space-x-2 font-normal text-left text-red-500 rounded-lg hover:bg-red-100 hover:text-red-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        < TrashBinIcon className="text-red-500 hover:text-gray-700 dark:hover:text-gray-300 size-4" />
                        <div>

                          Supprimer
                        </div>
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex w-full items-center space-x-2 font-normal text-left text-green-500 rounded-lg hover:bg-green-100 hover:text-green-700 dark:text-green-400 dark:hover:bg-white/5 dark:hover:text-green-300"
                        >
                        < CheckCircleIcon className="text-green-500 hover:text-green-700 dark:hover:text-green-300 size-4" />
                        <div>
                        Recorriger
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
