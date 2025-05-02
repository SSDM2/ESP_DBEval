import React, { createContext, useState, useEffect, useContext } from 'react';

type User = {
    id: string;
    name: string;
    prenom: string;
    nom: string;
    email: string;
    role: string;
    add: string;
    classe: string;
    photo: string;
    ecole: string;
    tel: string;
    pays: string;
    // Ajoute d'autres champs si besoin
};

type UserContextType = {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Simuler un chargement depuis une API ou localStorage
    useEffect(() => {

        // Chargement simulé des données statiques
        const fakeUser: User = {
            id: '1',
            name: 'Mame Bou Fall',
            prenom: 'Mame Bou',
            nom: 'Fall',
            email: 'mamebou.fall@esp.sn',
            role: 'Professeur',
            add: 'Ouakam',
            pays: 'Senegal',
            tel: '+222 33 398 46 00',
            ecole: 'ESP',
            classe: 'Master 1',
            photo: '/images/user/user.png',
        };

        // Simule un petit délai
        setTimeout(() => {
            setUser(fakeUser);
            setLoading(false);
        }, 500); // 0.5 seconde de "chargement"
    }, []);

    /*const fetchUser = async () => {
      try {
        // Ex: récupération depuis un token dans localStorage
        const token = localStorage.getItem('token');
        if (token) {
          const res = await fetch('/api/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          }
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de l’utilisateur', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);*/

    return (
        <UserContext.Provider value={{ user, loading, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
