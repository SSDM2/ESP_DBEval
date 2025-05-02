import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UsersList from "../../components/tables/BasicTables/UsersList";


export default function Users() {
  return (
    <div className="space-y-4">
      <PageMeta
        title="SmartEDU"
        description="Plateforme educative pour tous"
      />
      <PageBreadcrumb pageTitle="Utilisateurs" />
      {/*<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <UsersInputs />
        </div>
        <div className="space-y-6">
          <UsersFile />
         
        </div>
      </div>
        */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">

        <div className="col-span-12 col-md-12 xl:col-span-12">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}
