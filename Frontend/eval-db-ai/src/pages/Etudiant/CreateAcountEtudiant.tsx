import { useState } from "react";
import Badge from "../../components/ui/badge/Badge";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { BoxIcon, GroupIcon, MoreDotIcon, PencilIcon, TrashBinIcon } from "../../icons";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
import SoumissionStat from "../../components/ecommerce/SoumissionStat";
import CorrectionModelList from "../../components/tables/BasicTables/CorrectionModelList";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import Input from "../../components/form/input/InputField";
import ComponentForm from "../../components/common/ComponentForm";

// Typage du formulaire
type FormState = {
  numero: string;
  fullName: string;
  email: string;
  role: string;
  statut: string;
  modelName: string;
};

const initialFormState: FormState = {
  numero: "",
  fullName: "",
  email: "",
  role: "",
  statut: "",
  modelName: "",
};

const CreateAcountEtudiant = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  const handleInputChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    // Tu peux faire un POST ici
  };

  return (
    <div className="space-y-4">
      <PageMeta
        title="Creation de Etudiant"
        description="Formulaire de création d’un modèle de correction"/>
      <PageBreadcrumb pageTitle="Gestion des Comptes Etudiants" />
      <div className="md:w-3/4 mx-auto">
        <ComponentForm title="Formulaire de Creation de Comptes Etudiant">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-1 xsm:grid-cols-1 sm:grid-cols-1 md:space-x-8 xsm:space-y-4">
              <div className="space-y-6">
                {/* Partie 0 : Informations Utilisateur */}


                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Prénom et Nom</Label>
                  <Input
                    type="text"
                    value={formState.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Modou Thiam"
                    className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Email</Label>
                  <Input
                    type="email"
                    value={formState.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="exemple@email.com"
                    className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Statut</Label>
                  <Select
                    options={["Actif", "Inactif", "En attente"]}
                    value={formState.statut}
                    onChange={(e) => handleInputChange("statut", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    >
                      Creer le compte
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </ComponentForm>
      </div>
    </div>
  );
};

export default CreateAcountEtudiant;
