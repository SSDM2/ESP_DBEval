import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
 
  CheckCircleIcon,
 
  ChevronDownIcon,
  FileIcon,
  FolderIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PieChartIcon,
  PlugInIcon,
  TimeIcon,
  UserCircleIcon,
  UserIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  description?: string;
  subItems?: { name: string; notificationCount?: number; path: string;  description?: string; pro?: boolean; new?: boolean }[];
};
const navItemsProfesseur: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Tableau de Bord",
    path: "/dashboard",
    description: "Vue d'ensemble des performances et des statistiques.",
  },

  // Menu Professeur
  

  {
    name: "Sujets d'Examen",
    icon: <FileIcon />,
    description: "Gérer les sujets d'examen et leur dépôt.",
    subItems: [
      { 
        name: "Déposer un Sujet", 
        path: "/upload-exam", 
        description: "Téléchargez des sujets d'examen au format texte ou PDF.",
      },
      { 
        name: "Consulter les Sujets Déposés", 
        path: "/view-exams", 
        description: "Voir les sujets déposés par les autres professeurs.",
      },
    ],
  },

  {
    name: "Corrections",
    icon: <CheckCircleIcon />,
    description: "Gérer les corrections et modèles de correction.",
    subItems: [
      { 
        name: "Ajouter un Modèle de Correction", 
        path: "/add-correction-model", 
        description: "Ajoutez des modèles de correction pour chaque exercice.",
      },
      { 
        name: "Consulter les Corrections", 
        path: "/view-corrections", 
        description: "Voir les corrections proposées et ajuster les résultats.",
      },
    ],
  },

  {
    name: "Tableau de Performance",
    icon: <FolderIcon />,
    description: "Consulter les performances des étudiants.",
    path: "/performance-dashboard",
  },
  {
    name: "Gestion des Comptes",
    icon: <UserIcon />,
    description: "Gérer les comptes des professeurs et étudiants.",
    subItems: [
      { 
        name: "Créer un Compte Professeur", 
        path: "/create-teacher-account", 
        description: "Créer et gérer les comptes pour les professeurs.",
      },
      { 
        name: "Créer un Compte Étudiant", 
        path: "/create-student-account", 
        description: "Créer et gérer les comptes pour les étudiants.",
      },
    ],
  },
 
];
const navItemsEtudiant: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Tableau de Bord",
    path: "/etudiant/",
    description: "Accédez à vos statistiques, vos progrès et les activités récentes.",
  },

  {
    name: "Mes Examen et Sujets",
    icon: <ListIcon />,
    description: "Accéder aux sujets déposés et soumettre des réponses.",
    subItems: [
      { 
        name: "Voir les Sujets d'Examen", 
        path: "/exams", 
        description: "Accédez aux sujets déposés par les professeurs.",
      },
      { 
        name: "Soumettre une Réponse", 
        path: "/submit-answer", 
        description: "Soumettez vos réponses en format PDF (avec Drag & Drop).",
      },
    ],
  },

  {
    name: "Corrections et Notes",
    icon: <CheckCircleIcon />,
    description: "Consulter les corrections automatiques et les notes attribuées.",
    path: "/my-corrections",
  },

  {
    name: "Suivi des Performances",
    icon: <TimeIcon />,
    description: "Suivez vos progrès avec des graphiques d'évolution.",
    path: "/performance-tracking",
  },

  // Menu Profil
  {
    name: "Mon Profil",
    icon: <UserCircleIcon />,
    path: "/profile",
    description: "Accédez à vos informations personnelles et paramètres.",
  },

 
];


const othersItems: NavItem[] = [
   // Menu Déconnexion
   {
    name: "Déconnexion",
    icon:   <svg
    className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z"
      fill=""
    />
  </svg>,
    path: "/logout",
    description: "Se déconnecter de l'application.",
  },
   // Menu Profil
   {
    name: "Mon Profil",
    icon: <UserCircleIcon />,
    path: "/profile",
    description: "Accédez à vos informations personnelles et paramètres.",
  },


  
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
  
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "parametres";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "parametres"].forEach((menuType) => {
      const items = menuType === "main" ? navItemsProfesseur : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "parametres",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "parametres") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "parametres") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                ? "menu-item-active"
                : "menu-item-inactive"
                } cursor-pointer ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
                }`}
            >
              <span
                className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "rotate-180 text-brand-500"
                    : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`menu-item-icon-size ${isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span> 

                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path)
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <h1 className="text-2xl font-extrabold text-blue-800">
                SmartEdu
              </h1>
            </>
          ) : (
            <h1 className="text-2xl font-extrabold text-blue-800">
              SM
            </h1>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItemsProfesseur, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "parametres"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "parametres")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
