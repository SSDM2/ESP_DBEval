
import StatisticsChart from "../../components/ecommerce/StatisticsChart";

import PageMeta from "../../components/common/PageMeta";
import MeilleursEtudiants from "../../components/ecommerce/MeilleursEtudiants";
import TauxReussite from "../../components/ecommerce/TauxReussite";
import NombreEtudiant from "../../components/ecommerce/NombreEtudiant";


export default function Home() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      {/*<ComponentCard title="Bienvenue dans votre SmartEdu">
          <ResponsiveImage />
        </ComponentCard>
         */}
      <h3 className="text-3xl py-10 text-blue-900 uppercase dark:text-white/90">
        Bienvenue dans SmartEdu            </h3>
      <div className="grid grid-cols-12 gap-4 md:gap-6">


        <div className="col-span-12 xl:col-span-5">
          <TauxReussite />
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <NombreEtudiant />

        </div>

        <div className="col-span-12 col-md-12 xl:col-span-12">
          <MeilleursEtudiants />
        </div>


        <div className="col-span-12 col-md-12 xl:col-span-12">
          <StatisticsChart />


          {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>
         */}

        </div>
      </div>
    </>
  );
}
