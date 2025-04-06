import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { MoreDotIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";


interface CorrectionModel {
  id: number;
  model_name: string;
  description: string;
  tolerance_criteria: string;
  example_query: string;
  expected_result: string;
  difficulte: string;
  syntax_check: boolean;
  result_check: boolean;
  security_check: boolean;
  optimization_check: boolean;
  integrity_check: boolean;
  best_practices_check: boolean;
  normalization_check: boolean;
  performance_check: boolean;
  transaction_handling: boolean;
  common_errors: string;
  suggested_fix: string;
  complexity_score: number;
  sgbd_type: string;
  version: string;
}

const tableData: CorrectionModel[] = [
  {
    id: 1,
    model_name: "Correction modèle 1",
    description: "Correction de requêtes SQL pour MySQL.",
    tolerance_criteria: '{"syntax": "exacte", "order": "important"}',
    example_query: "SELECT * FROM users WHERE age > 30;",
    expected_result: "Tous les utilisateurs de plus de 30 ans.",
    difficulte: "moyenne",
    syntax_check: true,
    result_check: true,
    security_check: true,
    optimization_check: false,
    integrity_check: true,
    best_practices_check: true,
    normalization_check: false,
    performance_check: true,
    transaction_handling: true,
    common_errors: "Mauvaise gestion des jointures.",
    suggested_fix: "Utiliser des jointures explicites.",
    complexity_score: 6,
    sgbd_type: "MySQL",
    version: "1.0.0",
  },
  {
    id: 2,
    model_name: "Correction modèle 2",
    description: "Correction de requêtes SQL pour PostgreSQL.",
    tolerance_criteria: '{"syntax": "souple", "order": "non important"}',
    example_query: "SELECT name FROM employees WHERE salary > 50000;",
    expected_result: "Tous les employés avec un salaire supérieur à 50 000.",
    difficulte: "facile",
    syntax_check: true,
    result_check: false,
    security_check: true,
    optimization_check: true,
    integrity_check: true,
    best_practices_check: false,
    normalization_check: true,
    performance_check: false,
    transaction_handling: false,
    common_errors: "Manque d'index sur la colonne 'salary'.",
    suggested_fix: "Ajouter un index sur la colonne 'salary'.",
    complexity_score: 4,
    sgbd_type: "PostgreSQL",
    version: "1.2.0",
  },
  // Ajoutez d'autres entrées de modèle ici si nécessaire
];

export default function CorrectionModelList() {
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
                Modèle de Correction
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Description
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Critères de Tolérance
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Requête Exemple
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Résultat Attendu
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Difficulté
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Vérifications
              </TableCell>
              <TableCell isHeader className="py-3 font-bold text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((model) => (
              <TableRow key={model.id}>
                <TableCell className="p-3 font-bold text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.id}
                </TableCell>
                <TableCell className="py-2">
                  <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {model.model_name}
                  </p>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.description}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.tolerance_criteria}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.example_query}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.expected_result}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {model.difficulte}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div>
                    <Badge color={model.syntax_check ? "success" : "error"} size="sm">Syntaxe</Badge>
                    <Badge color={model.result_check ? "success" : "error"} size="sm">Résultats</Badge>
                    <Badge color={model.security_check ? "success" : "error"} size="sm">Sécurité</Badge>
                    <Badge color={model.optimization_check ? "success" : "error"} size="sm">Optimisation</Badge>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <button
                      className="dropdown-toggle"
                      onClick={() => handleToggleDropdown(model.id)}
                    >
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === model.id}
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
