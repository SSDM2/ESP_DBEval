import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import TextArea from "../input/TextArea";
import ComponenForm from "../../common/ComponentForm";

export default function ExamInputs() {
  const options = [
    { value: "QCM", label: "Question a choix multiple" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const [messageTwo, setMessageTwo] = useState("");
  let defaultDate = new Date()
  defaultDate.setDate(defaultDate.getDate())

  const [date, setDate] = useState<Date>(defaultDate)

  const onSetDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDate(new Date(event.target.value))
  }
  return (
    <ComponenForm title="Formulaire d'Exercice">
      <div className="space-y-6">

        <div>
          <Label htmlFor="inputTwo">Titre de l'exercice</Label>
          <Input type="text" id="inputTwo" placeholder="Ex : LMD" />
        </div>
        <div>
          <Label>Description</Label>
          <TextArea
            rows={2}
            value={messageTwo}
            error
            onChange={(value) => setMessageTwo(value)}
            hint="Please enter a valid message."
          />
        </div>

        <div>
          <Label>Type d'exercice</Label>
          <Select
            options={options}
            placeholder="Ex : Question / Reponse"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label htmlFor="datePicker">Date d'echeance</Label>
          <div className="relative w-full">
            <Input
              type="date"
              value={date.toLocaleDateString('en-CA')}
              onChange={onSetDate}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-300"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <CalenderIcon className="h-6 w-6" />
            </span>
          </div>
        </div>
         
      </div>
    </ComponenForm>
  );
}
