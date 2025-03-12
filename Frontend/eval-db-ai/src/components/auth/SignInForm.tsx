import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { GoogleLogin, GoogleLoginResponse } from '@react-oauth/google';


export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook pour rediriger l'utilisateur

  // Fonction qui sera appelée lors d'un succès de connexion
  const handleLoginSuccess = (response: GoogleLoginResponse) => {
    setLoading(true);
    const token = response.credential; // Récupérer le token d'authentification
    console.log(token);



          // Redirection après authentification réussie (par exemple vers la page d'accueil)
          navigate('/'); // Redirection vers le profil de l'utilisateur
    // Envoie du token au backend Django pour validation
    /*fetch('http://localhost:8000/api/auth/google/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }), // Envoie du token
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        // Ici, tu peux vérifier si le backend a bien répondu, puis rediriger l'utilisateur
        if (data.access_token) {
          // Stocker le token (par exemple dans localStorage)
          localStorage.setItem('access_token', data.access_token);

          // Redirection après authentification réussie (par exemple vers la page d'accueil)
          navigate('/'); // Redirection vers le profil de l'utilisateur
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error('Erreur lors de la connexion:', err);
      });*/
  };

  // Fonction appelée en cas d'échec de la connexion
  const handleLoginFailure = (error: Error) => {
    console.error('Échec de la connexion :', error);
  };

  return (
    <div className="flex flex-col mt-5 flex-1">
      <div className="w-full max-w-md mx-auto">

      </div>
      <div className="flex flex-col bg-white  p-5 rounded-2xl justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-bold text-blue-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Connectez-vous            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pour de connecter entrer votre email et mot de passe
            </p>
          </div>
          <div>

            <form>
              <div className="space-y-4">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="info@gmail.com" />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="relative py-1 sm:py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="p-1 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                      Or
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    useOneTap // Optionnel : permet d'utiliser le système "One Tap" de Google
                  />
                  
                  {/*<button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                    <svg
                      width="21"
                      className="fill-current"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
                    </svg>
                    Connecter avec Github
                  </button>*/}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Se souvenir de moi
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="md">
                    Connexion
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Vous n'avez pas de compte ? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
