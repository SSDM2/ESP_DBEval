import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import DefaultInputs from "../../../components/form/form-elements/DefaultInputs";
import InputGroup from "../../../components/form/form-elements/InputGroup";
import DropzoneComponent from "../../../components/form/form-elements/DropZone";
import CheckboxComponents from "../../../components/form/form-elements/CheckboxComponents";
import RadioButtons from "../../../components/form/form-elements/RadioButtons";
import ToggleSwitch from "../../../components/form/form-elements/ToggleSwitch";
import FileInputExample from "../../../components/form/form-elements/FileInputExample";
import SelectInputs from "../../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../../components/form/form-elements/TextAreaInput";
import InputStates from "../../../components/form/form-elements/InputStates";
import PageMeta from "../../../components/common/PageMeta";
import ExerciceInputs from "../../../components/form/Exercices/ExerciceInput";
import EtudiantList from "../../../components/tables/BasicTables/ExercicestList";
import { BoxIcon, GroupIcon } from "../../../icons";
import Button from "../../../components/ui/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";
import SoumissionStat from "../../../components/ecommerce/SoumissionStat";
import ResponsiveImage from "../../../components/ui/images/ResponsiveImage";
import TwoColumnImageGrid from "../../../components/ui/images/TwoColumnImageGrid";
import DepositPage from "./ExamList";

export default function Exercice() {
  return (
    <div className="space-y-4">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Exercices" />


      <div className="grid grid-cols-1 xl:grid-cols-2 items-center">
        <div className="space-y-2 h-full">
          <ExerciceInputs />
        </div>
        <div className="space-y-2 h-full">
          <DropzoneComponent />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 col-md-12 xl:col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div>
              <ComponentCard title="Exercices">
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
                    <GroupIcon className="text-blue-800 size-6 dark:text-white/90" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-white/90">
                    Liste des Exercices
                  </h3>
                </div>
                <Button className="bg-green-500 hover:bg-green-600"
                  size="sm"
                  variant="primary"
                  startIcon={<BoxIcon className="size-5" />}
                >  Ajouter
                </Button>
              </div>
            </div>
            <DepositPage />
          </div>
        </div>
      </div>
    </div>
  );
}
