import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import SoumissionInputs from "../../components/form/Exams/SoumissionInputs";
import SoumissionFile from "../../components/form/form-elements/SoumissionFile";
import SoumissionstList from "../../components/tables/BasicTables/SoumissionstList";
import { GroupIcon } from "../../icons";

export default function Soumission() {
  return (
    <div className="space-y-4">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Soumissions" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <SoumissionInputs />
        </div>
        <div className="space-y-6">
          <SoumissionFile />
         
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 col-md-12 xl:col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex space-x-3 items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                  <GroupIcon className="text-blue-800 size-6 dark:text-white/90" />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-white/90">
                  Liste des Soumissions
                </h3>
              </div>

            </div>
            <SoumissionstList />
          </div>
        </div>
      </div>
    </div>
  );
}
