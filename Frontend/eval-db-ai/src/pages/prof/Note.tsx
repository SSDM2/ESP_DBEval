import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import InputGroup from "../../components/form/form-elements/InputGroup";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
import RadioButtons from "../../components/form/form-elements/RadioButtons";
import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import InputStates from "../../components/form/form-elements/InputStates";
import PageMeta from "../../components/common/PageMeta";
import { BoxIcon, GroupIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import TauxReussite from "../../components/ecommerce/TauxReussite";
import NombreEtudiant from "../../components/ecommerce/NombreEtudiant";
import SoumissionStat from "../../components/ecommerce/SoumissionStat";
import ComponentCard from "../../components/common/ComponentCard";
import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
import NotesList from "../../components/tables/BasicTables/NotesList";

export default function Note() {
  return (
    <div className="space-y-4">
      <PageMeta
        title="SmartEdu"
        description="Description de smartEdu"
      />
      <PageBreadcrumb pageTitle="Notes" />
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
                <h3 className="text-sm text-blue-800 dark:text-white/90">
                Liste des Notes proposée par l'IA
                </h3>
              </div>
              <Button className="bg-green-500 hover:bg-green-600"
                size="sm"
                variant="primary"
                startIcon={<BoxIcon className="size-5" />}
              >  Ajouter
              </Button>
            </div>
            <NotesList />
          </div>
        </div>
      </div>
    </div>
  );
}
