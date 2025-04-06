import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ExamInputs from "../../components/form/Exams/ExamInputs";
import ModeleInputs from "../../components/form/Exams/ModeleInputs";
import ExamForm from "../../components/form/form-elements/DropExam";
import ModelCorrectionList from "../../components/tables/BasicTables/ModeleCorrection";

export default function CreateModelCorrection() {
  return (
    <div className="space-y-4">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Modele de correction" />


      <div className="items-center">
        <div className="space-y-2 h-full">
          <ModeleInputs />
        </div>
      </div>
     
    </div>
  );
}
