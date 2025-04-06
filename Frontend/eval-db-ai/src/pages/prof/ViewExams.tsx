import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DropzoneComponent from "../../components/form/form-elements/DropZone";

import PageMeta from "../../components/common/PageMeta";
import { BoxIcon, DocsIcon, GroupIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import ExamsstList from "../../components/tables/BasicTables/RateExam";
import ComponentCard from "../../components/common/ComponentCard";
import SoumissionStat from "../../components/ecommerce/SoumissionStat";
import TwoColumnImageGrid from "../../components/ui/images/TwoColumnImageGrid";
import ExamInputs from "../../components/form/Exams/ExamInputs";
import ExamForm from "../../components/form/form-elements/DropExam";

export default function ViewExam() {
  return (
    <div className="space-y-4">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Examens" />


    
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 col-md-12 xl:col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div>
              <ComponentCard title="Voire les statistiques sur les Examens">
                <TwoColumnImageGrid />
                <div className="grid sm:grid-cols-1 sm:space-x-2 md:grid-cols-2 space-y-4 justify-center md:items-center md:col-span-12 md:space-x-6 xl:col-span-7">
                  <div className="">
                    <SoumissionStat />
                  </div>
                  <div>
                    <SoumissionStat />
                  </div>
                </div>
              </ComponentCard>
              <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex space-x-3 items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <BoxIcon className="text-blue-800 size-6 dark:text-white/90" />
                  </div>
                  <h3 className="text-sm text-blue-800 dark:text-white/90">
                    Liste des Examens
                  </h3>
                </div>
                <Button className="bg-green-500 hover:bg-green-600"
                  size="sm"
                  variant="primary"
                  endIcon={<DocsIcon className="size-5" />}
                >  Deposer un nouveau
                </Button>
              </div>
            </div>
            <ExamsstList />
          </div>
        </div>
      </div>
    </div>
  );
}
