import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DropzoneComponent from "../../components/form/form-elements/DropZone";

import PageMeta from "../../components/common/PageMeta";
import { BoxIcon, BoxIconLine, DocsIcon, GroupIcon } from "../../icons";
import Button from "../../components/ui/button/Button";
import ExamsstList from "../../components/tables/BasicTables/RateExam";
import ComponentCard from "../../components/common/ComponentCard";
import SoumissionStat from "../../components/ecommerce/SoumissionStat";
import TwoColumnImageGrid from "../../components/ui/images/TwoColumnImageGrid";
import ExamInputs from "../../components/form/Exams/ExamInputs";
import ExamForm from "../../components/form/form-elements/DropExam";
import StatProjets from "../../components/ecommerce/StatProjets";
import Stats from "../../components/ecommerce/Stat";


const statsData = [
  {
    title: "Sujets déposés",
    percentage: 60,
    trend: 'up',
    icon: <GroupIcon className="text-success-800 size-6" />, // Icône personnalisée
    bgColor: "success", // Couleur de fond personnalisée
    textColor: "success", // Couleur du texte personnalisée
  },
  {
    title: "Sujets Corrigés",
    percentage: 40,
    trend: 'down',
    icon: <BoxIconLine className="text-red-800 size-6" />, // Icône personnalisée
    bgColor: "red", // Couleur de fond personnalisée
    textColor: "red", // Couleur du texte personnalisée
  },
];


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
              <ComponentCard title="Les statistiques des sujets deposes">

                <div className="flex justify-center">
                  <Stats stats={statsData} />
                </div>
              </ComponentCard>
            </div>
            <div>
              <h2 className="text-blue-900 dark:text-gray-300 text-title-sm my-2">📘 Énoncé de Projet</h2>
              <div className="prose max-w-none  text-sm dark:text-gray-400 rounded-md dark:border-gray-300 text-gray-800 border p-4 my-4 shadow max-h-[350px] overflow-auto">

                <h3 className="text-blue-800 my-3">🧩 Exercice 1 : Gestion d’une bibliothèque</h3>
                <p><strong>Contexte :</strong><br />
                  Une bibliothèque veut gérer les <strong>livres</strong>, les <strong>auteurs</strong> et les <strong>emprunts</strong> des lecteurs.
                </p>

                <p><strong>Tables concernées :</strong></p>
                <ul>
                  <li><code>auteur(id, nom, prenom)</code></li>
                  <li><code>livre(id, titre, id_auteur)</code></li>
                  <li><code>emprunt(id, id_livre, nom_emprunteur, date_emprunt)</code></li>
                </ul>

                <p className="my-2"><strong>🔹 Questions :</strong></p>
                <ol>
                  <li>Créer les trois tables avec les <strong>clés primaires et étrangères</strong> nécessaires.</li>
                  <li>Insérer <strong>deux auteurs</strong>, <strong>trois livres</strong> (au moins un par auteur) et <strong>deux emprunts</strong>.</li>
                  <li>Écrire une <strong>requête SQL</strong> pour afficher les <strong>titres des livres empruntés</strong> avec le <strong>nom de l’auteur</strong>.</li>
                  <li>Modifier la table <code>livre</code> pour <strong>ajouter une colonne</strong> <code>annee_parution</code> et <strong>mettre à jour</strong> cette colonne pour un des livres.</li>
                  <li>Supprimer un livre et <strong>gérer automatiquement la suppression</strong> de ses emprunts associés (<code>ON DELETE CASCADE</code>).</li>
                </ol>

                <h3 className="text-blue-800 my-3">🧩 Exercice 2 : Gestion d’une université</h3>
                <p className="my-2"><strong>Contexte :</strong><br />
                  Une université souhaite suivre les <strong>étudiants</strong>, les <strong>cours</strong> et les <strong>inscriptions</strong>.
                </p>

                <p className="my-2"><strong>Tables concernées :</strong></p>
                <ul>
                  <li><code>etudiant(id, nom, prenom)</code></li>
                  <li><code>cours(id, nom_cours)</code></li>
                  <li><code>inscription(id_etudiant, id_cours, date_inscription)</code></li>
                </ul>

                <p className="my-2"><strong>🔹 Questions :</strong></p>
                <ol>
                  <li>Créer les trois tables avec les <strong>contraintes d’intégrité référentielles</strong>.</li>
                  <li>Insérer des données pour <strong>3 étudiants</strong>, <strong>2 cours</strong> et <strong>4 inscriptions</strong>.</li>
                  <li>Écrire une <strong>requête</strong> pour afficher les <strong>noms des étudiants inscrits</strong> à un cours spécifique, par exemple <em>"Programmation"</em>.</li>
                  <li>Supprimer un cours et <strong>s’assurer que les inscriptions correspondantes sont aussi supprimées</strong>.</li>
                  <li>Afficher le <strong>nombre d’étudiants inscrits par cours</strong>, <strong>y compris les cours sans étudiants</strong> (avec <code>LEFT JOIN</code>).</li>
                </ol>
              </div>



            </div>
            <ExamsstList />
          </div>
        </div>
      </div>
    </div>
  );
}
