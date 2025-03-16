import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { BoxIcon, EyeCloseIcon, EyeIcon, FileIcon } from "../../../icons";

interface Soumission {
  id: number; // Unique identifier for each Soumission
  name: string; // Soumission name
  etudiantProfil: string; // Soumission name
  etudiant: string; // Soumission name
  classe: string; // Soumission name
  echeance: string; // echeance of the Soumission
  type: string; // type of the Soumission (as a string with currency symbol)
  // status: string; // Status of the Soumission
  image: string; // URL or path to the Soumission image
  date: string; // URL or path to the Soumission filee
  file: string; //Voir la copie URL or path to the Soumission image
  status: "corrige" | "en cours" | "indisponible"; // Status of the Soumission
  // action: string; // prolongee 
}


// Define the table data using the interface
const tableData: Soumission[] = [
  {
    id: 1,
    name: "Projet de MySQL",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
    date: "15/03/2025",
    file: "Voir la copie",

    image: "/images/exos/exo-01.png",
    etudiantProfil: "/images/user/user-01.png", // Replace with actual image URL
    etudiant: "/images/user/user-01.png", // Replace with actual image URL
    classe: "Master IABD",

  },
  {
    id: 2,
    name: "Projet de MySQL",
    echeance: "12/04/2025",
    type: "QCM",
    status: "indisponible",
    date: "15/03/2025",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
    etudiantProfil: "/images/user/user-01.png", // Replace with actual image URL
    etudiant: "/images/user/user-01.png", // Replace with actual image URL
    classe: "Master IABD",

  },
  {
    id: 3,
    name: "Projet de MySQL",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
    date: "15/03/2025",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
    etudiantProfil: "/images/user/user-01.png", // Replace with actual image URL
    etudiant: "/images/user/user-01.png", // Replace with actual image URL
    classe: "Master IABD",

  },
  {
    id: 4,
    name: "Projet de MySQL",
    echeance: "12/04/2025",
    type: "QCM",
    status: "en cours",
    date: "15/03/2025",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
    etudiantProfil: "/images/user/user-01.png", // Replace with actual image URL
    etudiant: "/images/user/user-01.png", // Replace with actual image URL
    classe: "Master IABD",

  },
  {
    id: 5,
    name: "Projet de MySQL",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
    date: "15/03/2025",
    file: "Voir la copie",
    image: "/images/exos/exo-01.png",
    etudiantProfil: "/images/user/user-01.png", // Replace with actual image URL
    etudiant: "/images/user/user-01.png", // Replace with actual image URL
    classe: "Master IABD",

  },
];


export default function SoumissionstList() {
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
                Etudiant
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
                Date depot
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Copie              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((Soumission) => (
              <TableRow key={Soumission.id} className="">
                <TableCell className="py-3 font-bold text-gray-500 text-theme-sm dark:text-gray-400">
                  {Soumission.id}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={Soumission.etudiant}
                        className="h-[50px] w-[50px]"
                        alt={Soumission.etudiantProfil}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {Soumission.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {Soumission.classe}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={Soumission.image}
                        className="h-[50px] w-[50px]"
                        alt={Soumission.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {Soumission.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {Soumission.classe}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {Soumission.type}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {Soumission.echeance}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      Soumission.status === "corrige"
                        ? "success"
                        : Soumission.status === "en cours"
                          ? "warning"
                          : "error"
                    }
                  >
                    {Soumission.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {Soumission.date}
                </TableCell>
                <TableCell className=" text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="flex h-[50px] items-center w-[100px] overflow-hidden rounded-md">

                    <div>
                      {Soumission.file}
                    </div>
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
