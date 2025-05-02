import ComponentCard from "../../common/ComponentCard";
import ComponentForm from "../../common/ComponentForm";
import { useDropzone } from "react-dropzone";
import Label from "../Label";
import Select from "../Select";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import { CalenderIcon } from "../../../icons";
import { useState } from "react";
import axios from 'axios';

const DropExam: React.FC = () => {
  const [messageTwo, setMessageTwo] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const onDrop = (acceptedFiles: File[]) => {
    console.log("Fichiers déposés :", acceptedFiles);
    // Gérer l’upload ici
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  const handleSelectChange = (value: string) => {
    console.log("Valeur sélectionnée :", value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  const classeOptions = [
    { value: "1", label: "Master 1" },
    { value: "2", label: "Master 2" },
    { value: "3", label: "Licence" },
  ];

  const exerciceTypeOptions = [
    { value: "QCM", label: "Question à choix multiple" },
    { value: "QR", label: "Questions/Réponses" },
  ];
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {

    setPrompt("Le ciel est il bleu");
    try {
      const res = await axios.post('https://141.145.206.77:11434/api/generate', {
        prompt,
        model: 'deepseek-r1:14b',
        "stream": false,
      },
      {
        timeout: 1200000 // 🕒 Attend jusqu'à 60 secondes
      });
      setResponse(res.data.response);
      console.log(response)
    } catch (err) {
      console.error(err);
      setResponse("Erreur !");
    }
  };


  return (
    <ComponentForm title="Déposer votre fichier">
      <div className="grid grid-cols-2 space-x-8">
        {/* Colonne gauche */}
        <div>
          <Label>Classe</Label>
          <Select
            options={classeOptions}
            placeholder="Ex : Master 1"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />

          {/* Dropzone */}
          <div className="transition my-4 border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
            <form
              {...getRootProps()}
              className={`dropzone rounded-xl p-7 lg:p-10 border-dashed 
                ${isDragActive
                  ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                  : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                }`}
              id="demo-upload"
            >
              <input {...getInputProps()} />
              <div className="dz-message flex flex-col items-center !m-0">
                <div className="mb-[22px] flex justify-center">
                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    <svg className="fill-current" width="29" height="28" viewBox="0 0 29 28" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                      />
                    </svg>
                  </div>
                </div>

                <h4 className="mb-3 font-semibold text-blue-800 text-theme-xl dark:text-white/90">
                  {isDragActive ? "Déposez les fichiers ici" : "Glissez et déposez vos fichiers ici"}
                </h4>
                <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-300">
                  Déposez vos images PNG, JPG, WebP, SVG ou cliquez pour parcourir
                </span>
                <span className="font-medium underline text-theme-sm text-brand-500">
                  Parcourir les fichiers
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="titreSujet">Titre du sujet</Label>
            <Input type="text" id="titreSujet" placeholder="Ex : LMD" />
          </div>

          <div>
            <Label>Description</Label>
            <TextArea
              rows={2}
              value={messageTwo}
              onChange={(value) => setMessageTwo(value)}
            />
          </div>

          <div>
            <Label htmlFor="datePicker">Date d'échéance</Label>
            <div className="relative w-full">
              <Input
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={handleDateChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-300"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <CalenderIcon className="h-6 w-6" />
              </span>
            </div>
          </div>

          <div>
            <Label>Type d'exercice</Label>
            <Select
              options={exerciceTypeOptions}
              placeholder="Ex : QCM"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Déposer
        </button>
      </div>
    </ComponentForm>
  );
};

export default DropExam;

