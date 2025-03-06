import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { ArrowDownIcon, ArrowUpIcon, BoxIcon, CalenderIcon, EyeCloseIcon, EyeIcon, FileIcon, InfoIcon, PlugInIcon, PlusIcon, TaskIcon, TimeIcon, UserCircleIcon } from "../../../icons";
import TextArea from "../input/TextArea";
import UserProfiles from "../../../pages/UserProfiles";
import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button";

export default function SoumissionInputs() {
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
    <ComponentCard title="Formulaire de Soumission">
      <div className="space-y-6">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <img src="/images/user/owner.jpg" alt="user" />
          </div>
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-700 dark:text-white/90 xl:text-left">
              Projet dexamen  <Badge variant="light" color="primary" endIcon={<TaskIcon />}>
                20     </Badge>
            </h4>
            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                M. Mbacke
              </p>
              <div className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                MySQL  <Badge variant="light" color="success" endIcon={<TimeIcon />}>
                  05/04/2025
                </Badge>
              </p>

            </div>
          </div>

        </div>

        <div className="text-gray-500 bg-gray-50 p-4 rounded-md border-x-2 border-blue-800">
          <div className="mb-2">

            <Badge variant="light" color="light" endIcon={<ArrowDownIcon />}>
              Note    </Badge>
          </div>
          <p className="text-sm   dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda optio, eligendi eius rem reprehenderit atque doloribus, delectus natus ipsam corporis officiis explicabo ratione, officia corrupti tempore porro dolorum ea vel?
          </p>
        </div>

        <div className="flex justify-center mt-4">

          <p className="text-sm text-gray-500 dark:text-gray-400">
            <Badge variant="light" color="light" endIcon={<FileIcon />}>
              Telecharger le projet en PDF            </Badge>
          </p>
        </div>
       
      </div>
    </ComponentCard>
  );
}
