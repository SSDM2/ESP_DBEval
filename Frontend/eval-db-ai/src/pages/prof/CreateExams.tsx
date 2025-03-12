import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ExamInputs from "../../components/form/Exams/ExamInputs";
import ExamForm from "../../components/form/form-elements/DropExam";

export default function CreateExams() {
  return (
    <div className="space-y-4">
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Creer un Examen" />


      <div className="grid grid-cols-1 xl:grid-cols-2 items-center">
        <div className="space-y-2 h-full">
          <ExamInputs />
        </div>
        <div className="space-y-2 h-full">
          <ExamForm />
        </div>
      </div>
     
    </div>
  );
}
