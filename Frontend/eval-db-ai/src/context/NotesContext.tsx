import React, { createContext, useContext, useState, useEffect } from "react";

export interface NoteSGBD {
  id: number;
  name: string;
  student: string;
  database: string;
  echeance: string;
  type: string;
  status: "corrige" | "Absente" | "indisponible";
  file: string;
  correction: string;
  image: string;
  note: number | string;
}

interface NotesContextType {
  notes: NoteSGBD[];
  setNotes: (notes: NoteSGBD[]) => void;
  loading: boolean;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const fakeNotes: NoteSGBD[] = [
  {
    id: 1,
    name: "Requête SQL - MySQL",
    student: "Serigne modou Thiam",
    database: "MySQL",
    echeance: "12/04/2025",
    type: "QCM",
    status: "corrige",
    file: "Voir la copie",
    correction: "Corrigé",
    image: "/images/exos/exo-01.png",
    note: 16.5,
  },
  {
    id: 2,
    name: "Optimisation PostgreSQL",
    student: "Mame Bou FALL",
    database: "PostgreSQL",
    echeance: "18/04/2025",
    type: "Projet",
    status: "indisponible",
    file: "Voir la copie",
    correction: "Indisponible",
    image: "/images/exos/exo-02.png",
    note: "N/A",
  },
  {
    id: 3,
    name: "Fonctions SQL Avancées",
    student: "Marie Sene",
    database: "SQLite",
    echeance: "15/04/2025",
    type: "TP",
    status: "indisponible",
    file: "Voir la copie",
    correction: "En cours",
    image: "/images/exos/exo-03.png",
    note: "N/A",
  },
];

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<NoteSGBD[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule une API ou un chargement
    setTimeout(() => {
      setNotes(fakeNotes);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <NotesContext.Provider value={{ notes, setNotes, loading }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
