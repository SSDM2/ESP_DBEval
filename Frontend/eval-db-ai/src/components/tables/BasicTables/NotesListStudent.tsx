import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { marked } from "marked";
import html2pdf from "html2pdf.js";

import Badge from "../../ui/badge/Badge";
import { BoxIcon, FileIcon, MoreDotIcon, PencilIcon, TrashBinIcon } from "../../../icons";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { useRef, useState } from "react";
import { useNotes } from "../../../context/NotesContext";
import Button from "../../ui/button/Button";


export default function NotesListStudent() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleToggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  const { notes, loading } = useNotes();

  const [correction, setCorrection] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isloading, setLoading] = useState(false);
  const pdfContentRef = useRef<HTMLDivElement>(null); // Référence pour le PDF

  const handleCorrection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://89.168.43.230:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek-r1:14b",
          stream: false,
          prompt: `"Tu es un correcteur automatique. Tu dois corriger une copie d’étudiant.\n\n🔴 IMPORTANT : Tu dois répondre uniquement en français. Toute ta réponse doit être en français, sans aucun mot en anglais.\n\nTu corriges selon le barème fourni. Pour chaque question :\n- Écris : Qx : [Correct / Partiellement correct / Incorrect] – x / y points\n- Si nécessaire, donne une correction minimale (ex : la bonne requête SQL).\n- À la fin, écris : Note finale : x / 20\n\nRéponds maintenant en français seulement.\n\n🎓 Énoncé de l’exercice\nExercice 1 : Gestion d’une bibliothèque\nContexte :\nUne bibliothèque veut gérer les livres, les auteurs et les emprunts des lecteurs.\n\nTables concernées :\nauteur(id, nom, prenom)\n\nlivre(id, titre, id_auteur)\n\nemprunt(id, id_livre, nom_emprunteur, date_emprunt)\n\n🔹 Questions :\nCréer les trois tables avec les clés primaires et étrangères nécessaires.\n\nInsérer deux auteurs, trois livres (au moins un par auteur) et deux emprunts.\n\nÉcrire une requête SQL pour afficher les titres des livres empruntés avec le nom de l’auteur.\n\nModifier la table livre pour ajouter une colonne annee_parution et mettre à jour cette colonne pour un des livres.\n\nSupprimer un livre et gérer automatiquement la suppression de ses emprunts associés (utiliser ON DELETE CASCADE).\n\n📘 Exercice 2 : Gestion d’une université\nContexte :\nUne université souhaite suivre les étudiants, les cours et les inscriptions.\n\nTables concernées :\netudiant(id, nom, prenom)\n\ncours(id, nom_cours)\n\ninscription(id_etudiant, id_cours, date_inscription)\n\n🔹 Questions :\nCréer les trois tables avec les contraintes d’intégrité référentielles.\n\nInsérer des données pour 3 étudiants, 2 cours, et 4 inscriptions.\n\nÉcrire une requête pour afficher les noms des étudiants inscrits à un cours spécifique, par exemple \"Programmation\".\n\nSupprimer un cours et s’assurer que les inscriptions correspondantes sont aussi supprimées.\n\nAfficher le nombre d’étudiants inscrits par cours, y compris les cours sans étudiants (avec LEFT JOIN).\n\n✍️ Réponses de l’étudiant :\nExercice 1 : Gestion d’une bibliothèque\n1. Création des tables\nCREATE TABLE auteur (\nid INT,\nnom VARCHAR(100),\nprenom VARCHAR(100),\nPRIMARY KEY(id)\n);\n\nCREATE TABLE livre (\nd INT,\ntitre VARCHAR(200),\nid_auteur INT,\nFOREIGN KEY (id_auteur) REFERENCES auteur(id)\n);\n\nCREATE TABLE emprunt (\nid INT,\nid_livre INT,\nnom_emprunteur VARCHAR(100),\ndate_emprunt DATE,\nFOREIGN KEY (id_livre) REFERENCES livre(id)\n);\n\n2. Insertion des données :\nINSERT INTO auteur VALUES (1, ''Camus'', ''Albert'');\nINSERT INTO auteur VALUES (2, ''Zola'', ''Emile'');\n\nINSERT INTO livre VALUES (1, ''L’Étranger'', 1);\nINSERT INTO livre VALUES (2, ''La Peste'', 1);\nINSERT INTO livre VALUES (3, ''Germinal'', 2);\n\nINSERT INTO emprunt VALUES (1, 1, ''Dupont'', ''2024-04-20'');\nINSERT INTO emprunt VALUES (2, 3, ''Martin'', ''2024-04-25'');\n\n3. Requête pour afficher les titres empruntés et le nom de l’auteur :\nSELECT l.titre, a.nom\nFROM livre l\nJOIN emprunt e ON l.id = e.id_livre\nJOIN auteur a ON l.id_auteur = a.id;\n\n4. Modifier la table livre pour ajouter une colonne :\nALTER TABLE livre ADD annee_parution INT;\nUPDATE livre SET annee_parution = 1942 WHERE id = 1;\n\n5. Supprimer un livre et ses emprunts associés :\n-- Mauvais : la table n''est pas modifiée pour ON DELETE CASCADE\nDELETE FROM livre WHERE id = 3;\n\nExercice 2 : Gestion d’une université\n1. Création des tables :\nCREATE TABLE etudiant (\nid INT PRIMARY KEY,\nnom VARCHAR(100),\nprenom VARCHAR(100)\n);\n\nCREATE TABLE cours (\nid INT PRIMARY KEY,\nnom_cours VARCHAR(100)\n);\n\nCREATE TABLE inscription (\nid_etudiant INT,\nid_cours INT,\ndate_inscription DATE,\nFOREIGN KEY (id_etudiant) REFERENCES etudiant(id),\nFOREIGN KEY (id_cours) REFERENCES cours(id)\n);\n\n2. Insertion des données :\nINSERT INTO etudiant VALUES (1, ''Durand'', ''Julie'');\nINSERT INTO etudiant VALUES (2, ''Lemoine'', ''Paul'');\nINSERT INTO etudiant VALUES (3, ''Morel'', ''Sarah'');\n\nINSERT INTO cours VALUES (1, ''Programmation'');\nINSERT INTO cours VALUES (2, ''Mathématiques'');\n\nINSERT INTO inscription VALUES (1, 1, ''2024-03-01'');\nINSERT INTO inscription VALUES (2, 1, ''2024-03-02'');\nINSERT INTO inscription VALUES (3, 1, ''2024-03-05'');\nINSERT INTO inscription VALUES (1, 2, ''2024-03-08'');\n\n3. Requête : étudiants inscrits à “Programmation”\nSELECT e.nom, e.prenom\nFROM etudiant e\nJOIN inscription i ON i.id_etudiant = e.id\nJOIN cours c ON c.id = i.id_cours\nWHERE c.nom_cours = ''Programmation'';\n\n4. Supprimer un cours et ses inscriptions associées :\nDELETE FROM cours WHERE nom_cours = ''Mathématiques'';\n\n5. Nombre d’étudiants inscrits par cours (y compris les cours sans étudiants) :\nSELECT c.nom_cours, COUNT(i.id_etudiant) AS nb_etudiants\nFROM cours c\nLEFT JOIN inscription i ON c.id = i.id_cours\nGROUP BY c.nom_cours;\n\n⚖️ Barème de notation (total : 20 points)\nExercice 1 :\n\nCréation des tables de la bibliothèque — 3 points\nInsertion des données — 2 points\nRequête SELECT avec jointure — 2 points\nALTER TABLE + UPDATE — 2 points\nDELETE avec ON DELETE CASCADE — 3 points\n\nExercice 2 :\n6. Création des tables université — 2 points\n7. Insertion des données — 1 point\n8. SELECT avec filtre sur cours — 1 point\n9. DELETE avec effet en cascade — 2 points\n10. LEFT JOIN + COUNT — 2 points\n\n🔄 Ce que tu dois faire :\nPour chaque question de 1 à 10 :\nCompare la réponse à ce qui est attendu.\n\nÉcris :\nQ1 : [Correct / Partiellement correct / Incorrect] – x / y points\nSi incorrect ou partiellement correct, donne une }'rrection minimale.\nÀ la fin, écris la note finale sur 20.`
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      setCorrection(data.response || JSON.stringify(data, null, 2)); // selon la structure de réponse

      handleGeneratePDF();

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleGeneratePDF = () => {
    if (!pdfContentRef.current) return;

    const opt = {
      margin: 10,
      filename: "correction-ia.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(pdfContentRef.current).set(opt).save();
  };

  return (
    <div className="overflow-hidden bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">


<div style={{ padding: "20px", fontFamily: "monospace" }}>
      {isloading ? (
        <p className="dark:text-gray-300">Chargement des données en cours...</p>
      ) : (
        ""     )}
    </div>
    
      {correction && (
        <>
        <div className="max-h-[300px] overflow-auto">

          <div
            ref={pdfContentRef}
            className=" dark:text-gray-400 dark:border-gray-300 text-gray-800 p-4 text-sm rounded border shadow  prose"
            dangerouslySetInnerHTML={{ __html: marked(correction) }}
            />
            </div>
          <div className="flex justify-between my-4">
            <button
              onClick={handleGeneratePDF}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Télécharger en PDF
            </button>

            <Button onClick={handleCorrection} className="px-4 text-lg py-2 bg-green-600 text-white rounded hover:bg-green-700"
              size="sm"
              variant="primary"
              startIcon={<BoxIcon className="size-5" />}
            >  Corriger
            </Button>
          </div>
        </>
      )}

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-sky-800" >
            <TableRow className="border-blue-800 dark:border-gray-800 border-y">
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">N°</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">Projet</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">Base de données</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">Type</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">Date</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">Status</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">Copie</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">Note</TableCell>
              <TableCell isHeader className="p-3 font-bold text-gray-100 text-start text-theme-xs dark:text-gray-400">Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {notes.map((note) => (

              <TableRow className="hover:bg-blue-50 dark:hover:bg-gray-950"
                key={note.id}>
                <TableCell className="py-1 text-center font-bold text-gray-500 text-theme-sm dark:text-gray-400">{note.id}</TableCell>
                <TableCell>
                  <div className="flex items-center">

                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {note.name}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-1 text-gray-500 text-theme-sm dark:text-gray-400">{note.database}</TableCell>
                <TableCell className="py-1 text-gray-500 text-theme-sm dark:text-gray-400">{note.type}</TableCell>
                <TableCell className="py-1 text-gray-500 text-theme-sm dark:text-gray-400">{note.echeance}</TableCell>
                <TableCell className="py-1 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      note.status === "corrige"
                        ? "success"
                        : note.status === "indisponible"
                          ? "warning"
                          : "error"
                    }
                  >
                    {note.status}
                  </Badge>
                </TableCell>
                <TableCell >
                  <div className="flex items-center text-gray-500 text-theme-sm dark:text-gray-400">
                    <FileIcon className="size-5" />
                    {note.file}
                  </div>
                </TableCell>
                <TableCell className="py-1 text-gray-500 text-theme-sm dark:text-gray-400">{note.correction}</TableCell>
                <TableCell className="py-1 text-gray-500 text-theme-sm dark:text-gray-400">
                  <div className="relative inline-block">
                    <button onClick={() => handleToggleDropdown(note.id)}>
                      <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === note.id}
                      onClose={handleCloseDropdown}
                      className="w-40 p-2"
                    >
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex items-center text-red-500 hover:text-red-700"
                      >
                        <TrashBinIcon className="size-4 mr-2" /> Supprimer
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={handleCloseDropdown}
                        className="flex items-center"
                      >
                        <PencilIcon className="size-4 mr-2" /> Modifier
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
