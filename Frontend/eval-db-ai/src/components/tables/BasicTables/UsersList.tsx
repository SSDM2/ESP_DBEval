import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { BoxIcon, EyeCloseIcon, EyeIcon, FileIcon, GroupIcon, MoreDotIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { useState } from "react";
import Button from "../../ui/button/Button";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { Dropdown } from "../../ui/dropdown/Dropdown";

interface Users {
  user_id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  last_login: string | null;
  avatar?: string; // Optionnel 
}


// Define the table data using the interface
const tableData: Users[] = [
  {
    user_id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
    role: "étudiant",
    status: "active",
    last_login: "2025-03-09T14:22:00",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Image d'avatar fictif
  },
  {
    user_id: 2,
    username: "jane_smith",
    email: "jane.smith@example.com",
    role: "professeur",
    status: "active",
    last_login: "2025-03-08T09:30:00",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg", // Image d'avatar fictif
  },
  {
    user_id: 3,
    username: "paul_rouge",
    email: "paul.rouge@example.com",
    role: "étudiant",
    status: "suspended",
    last_login: "2025-03-07T16:05:00",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg", // Image d'avatar fictif
  },
  {
    user_id: 4,
    username: "lucie_brown",
    email: "lucie.brown@example.com",
    role: "professeur",
    status: "active",
    last_login: "2025-03-10T08:45:00",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg", // Image d'avatar fictif
  },
  {
    user_id: 5,
    username: "michel_rouge",
    email: "michel.rouge@example.com",
    role: "étudiant",
    status: "active",
    last_login: "2025-03-09T20:15:00",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg", // Image d'avatar fictif
  },
];
// Définition des types pour les utilisateurs
interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  last_login: string | null;
  avatar?: string; // Optionnel si l'avatar est présent
}

interface UsersTableProps {
  tableData: User[];
  onAddUser: () => void; // Fonction pour l'ajout d'utilisateur
}


export default function UsersList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Pour gérer l'utilisateur sélectionné

  // Fonction de gestion des actions CRUD
  const handleRowClick = (user: User): void => {
    setSelectedUser(user);  // Affiche les informations de l'utilisateur sélectionné
  };

  const handleDelete = (userId: number): void => {
    // Ajoutez ici la logique pour supprimer un utilisateur
    console.log("Supprimer l'utilisateur avec l'ID", userId);
  };

  const handleUpdate = (userId: number): void => {
    // Ajoutez ici la logique pour mettre à jour un utilisateur
    console.log("Mettre à jour l'utilisateur avec l'ID", userId);
  };
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (id: number) => {
    // Si le dropdown ouvert est déjà celui sur lequel on clique, on le ferme
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  return (
    <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-2 rounded-md">
      <div className="max-w-full overflow-x-auto">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex space-x-3 items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <GroupIcon className="text-blue-800 size-6 dark:text-white/90" />
            </div>
            <h3 className="text-lg font-semibold text-blue-800 dark:text-white/90">
              Liste des utilisateurs
            </h3>
          </div>
          <Button className="bg-green-500 hover:bg-green-600"
            size="sm"
            variant="primary"
            endIcon={<BoxIcon className="size-5" />}
          >  Ajouter
          </Button>
        </div>

        <Table>
          {/* Table Header */}
          <TableHeader className="border-blue-800 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="p-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                N
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Etudiant
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Email
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Rôle
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Statut
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Dernière connexion
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
            {tableData.map((user) => (
              <TableRow
                key={user.user_id}
                //onClick={() => handleRowClick(user)} 
                className="hover:bg-blue-200 dark:hover:bg-gray-950"
              >
                <TableCell className="py-2 text-center font-bold text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.user_id}
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                      <img
                        src={user.avatar || "/path/to/default-avatar.png"} // Image par défaut si pas d'avatar
                        className="h-[50px] w-[50px]"
                        alt={user.username}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.username}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.email}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.role}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={user.status === "active" ? "success" : "error"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.last_login ? new Date(user.last_login).toLocaleString() : "N/A"}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <button className="dropdown-toggle"
                      onClick={() => handleToggleDropdown(user.user_id)}
                    >
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === user.user_id}
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
