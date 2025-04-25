import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import TextArea from "../input/TextArea";
import Checkbox from "../input/Checkbox";
import ComponentForm from "../../common/ComponentForm";

// Déclaration des interfaces pour l'état du formulaire
interface ModeleFormState {
  modelName: string;
  description: string;
  toleranceCriteria: string;
  exampleQuery: string;
  expectedResult: string;
  difficulte: string;
  complexityScore: number;
  sgbdType: string;
  version: string;
  syntaxCheck: boolean;
  resultCheck: boolean;
  securityCheck: boolean;
  optimizationCheck: boolean;
  integrityCheck: boolean;
  bestPracticesCheck: boolean;
  normalizationCheck: boolean;
  performanceCheck: boolean;
  transactionHandling: boolean;
  commonErrors: string;
  suggestedFix: string;
}

// Déclaration des types pour les options des Select
interface SelectOption {
  label: string;
  value: string;
}

const ModeleInputs = () => {
  // Initialisation des états du formulaire avec des valeurs par défaut
  const [formState, setFormState] = useState<ModeleFormState>({
    modelName: "",
    description: "",
    toleranceCriteria: "",
    exampleQuery: "",
    expectedResult: "",
    difficulte: "moyenne",
    complexityScore: 5,
    sgbdType: "MySQL",
    version: "8.0",
    syntaxCheck: false,
    resultCheck: false,
    securityCheck: false,
    optimizationCheck: false,
    integrityCheck: false,
    bestPracticesCheck: false,
    normalizationCheck: false,
    performanceCheck: false,
    transactionHandling: false,
    commonErrors: "",
    suggestedFix: "",
  });

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Affichage des valeurs dans la console pour l'instant
    console.log(formState);
  };

  // Mise à jour de l'état des valeurs du formulaire
  const handleInputChange = (field: keyof ModeleFormState, value: any) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  return (
      <ComponentForm title="Création du Modèle de Correction">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 xsm:grid-cols-1 sm:grid-cols-1 md:space-x-8 xsm:space-y-4">
            <div className="space-y-6">
            {/* Partie 1 : Nom du modèle et description */}
            <div>
              <Label htmlFor="modelName" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                Nom du modèle
              </Label>
              <Input
                type="text"
                id="modelName"
                placeholder="Ex : Correction de requête SQL"
                value={formState.modelName}
                onChange={(e) => handleInputChange("modelName", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Description</Label>
              <TextArea
                rows={2}
                value={formState.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Décrivez l'objectif et le type de correction"
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Partie 2 : Critères de tolérance */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Critères de tolérance</Label>
              <TextArea
                rows={2}
                value={formState.toleranceCriteria}
                onChange={(e) => handleInputChange("toleranceCriteria", e.target.value)}
                placeholder="Ex : Syntaxe, ordre des résultats"
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Partie 3 : Exemple de requête SQL */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Exemple de Requête SQL</Label>
              <TextArea
                rows={2}
                value={formState.exampleQuery}
                onChange={(e) => handleInputChange("exampleQuery", e.target.value)}
                placeholder="Ecrivez une requête SQL à corriger"
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Résultat Attendu</Label>
              <TextArea
                rows={2}
                value={formState.expectedResult}
                onChange={(e) => handleInputChange("expectedResult", e.target.value)}
                placeholder="Quel résultat doit-on obtenir ?"
                className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Partie 4 : Difficulté, Score et SGBD */}
            <div className="flex gap-6">
              <div className="w-1/2">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Niveau de difficulté</Label>
                <Select
                  options={["Facile", "Moyenne", "Difficile"]}
                  value={formState.difficulte}
                  onChange={(e) => handleInputChange("difficulte", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-1/2">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Score de Complexité</Label>
                <Input
                  type="number"
                  value={formState.complexityScore}
                  onChange={(e) => handleInputChange("complexityScore", Number(e.target.value))}
                  min="1"
                  max="10"
                  className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-1/2">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Type de SGBD</Label>
                <Select
                  options={["MySQL", "PostgreSQL", "SQLite"]}
                  value={formState.sgbdType}
                  onChange={(e) => handleInputChange("sgbdType", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-1/2">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Version</Label>
                <Input
                  type="text"
                  value={formState.version}
                  onChange={(e) => handleInputChange("version", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            </div>
            <div className="space-y-6 md:p-6">
              {/* Partie 5 : Vérifications (Checkboxes) */}
              <div className="space-y-4">
                <Checkbox
                  checked={formState.syntaxCheck}
                  onChange={() => handleInputChange("syntaxCheck", !formState.syntaxCheck)}
                  label="Vérification de la syntaxe"
                />
                <Checkbox
                  checked={formState.resultCheck}
                  onChange={() => handleInputChange("resultCheck", !formState.resultCheck)}
                  label="Vérification des résultats"
                />
                <Checkbox
                  checked={formState.securityCheck}
                  onChange={() => handleInputChange("securityCheck", !formState.securityCheck)}
                  label="Vérification de la sécurité"
                />
                <Checkbox
                  checked={formState.optimizationCheck}
                  onChange={() => handleInputChange("optimizationCheck", !formState.optimizationCheck)}
                  label="Vérification de l'optimisation"
                />
                <Checkbox
                  checked={formState.integrityCheck}
                  onChange={() => handleInputChange("integrityCheck", !formState.integrityCheck)}
                  label="Vérification de l'intégrité"
                />
              </div>

              {/* Partie 6 : Suggestions et Erreurs */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Erreurs fréquentes</Label>
                <TextArea
                  rows={2}
                  value={formState.commonErrors}
                  onChange={(e) => handleInputChange("commonErrors", e.target.value)}
                  placeholder="Écrire des erreurs fréquentes détectées"
                  className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-400">Suggestions de correction</Label>
                <TextArea
                  rows={2}
                  value={formState.suggestedFix}
                  onChange={(e) => handleInputChange("suggestedFix", e.target.value)}
                  placeholder="Suggestions pour améliorer la requête"
                  className="w-full p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

            {/* Bouton de soumission */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Soumettre le modèle
              </button>
            </div>
            </div>
          </div>
        </form>
      </ComponentForm>
  );
};

export default ModeleInputs;
