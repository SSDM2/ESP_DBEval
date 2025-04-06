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



export default function CorrectionModels() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  return (
    <div className="space-y-4">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Corrections" />
      <ComponentCard title="Bienvenue dans votre SmartEdu">
          <ResponsiveImage />
        <div className="flex justify-center items-center col-span-12 space-x-6 xl:col-span-7">
          <div>
        <SoumissionStat />
          </div>
          <div>
        <SoumissionStat />
          </div>
      </div>
        </ComponentCard>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 col-md-12 xl:col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex space-x-3 items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                  <GroupIcon className="text-blue-800 size-6 dark:text-white/90" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-white/90">
                  Liste des Corrections proposée par l'IA
                </h3>
              </div>
              <Button className="bg-green-500 hover:bg-green-600"
                size="sm"
                variant="primary"
                startIcon={<BoxIcon className="size-5" />}
              >  Ajouter
              </Button>
            </div>
            <CorrectionModelList />
          </div>
        </div>
      </div>
    </div>
  );
}
