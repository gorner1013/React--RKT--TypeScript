import { useState, useEffect } from "react";
import * as AuthService from "services/auth.service";
import EventBus from "common/EventBus";

import Footer from "components/footer/FooterAuthDefault";
import authImg from "assets/img/auth/auth.png";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "routes";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

//dark
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../hooks/useDarkSide";

export default function Auth() {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

//   useEffect(() => {
//     const user = AuthService.getCurrentUser();

//     if (user) {
//       setCurrentUser(user);
//       setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
//       setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
//     }

//     EventBus.on("logout", logOut);

//     return () => {
//       EventBus.remove("logout", logOut);
//     };
//   }, []);

//   const logOut = () => {
//     AuthService.logout();
//     setShowModeratorBoard(false);
//     setShowAdminBoard(false);
//     setCurrentUser(undefined);
//   };

    const getRoutes = (routes: RoutesType[]): any => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <Route path={`/${prop.path}`} element={prop.component} key={key} />
                );
            } else {
                return null;
            }
        });
    };
    document.documentElement.dir = "ltr";

    //dark
    //     const [colorTheme, setTheme] = useDarkSide();
    //   const [darkSide, setDarkSide] = useState(
    //     colorTheme === "light" ? true : false
    //   );

    //   const toggleDarkMode = (checked:any) => {
    //     setTheme(colorTheme);
    //     setDarkSide(checked);
    //   };

    return (
        <div>
            <div className=" !bg-white dark:!bg-navy-900">
                <FixedPlugin />
                <main>
                    <div className="h-full">
                        <div className=" mx-auto flex flex-col md:max-w-[75%] h-screen lg:max-w-[1013px] lg:px-8 xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
                            <div className="mb-auto flex flex-col pl-12 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                                
                                {!currentUser &&(

                                
                                <Link to="/admin" className="pt-12">
                                    <div className="flex items-center hover:cursor-pointer">
                                        <svg
                                            width="8"
                                            height="12"
                                            viewBox="0 0 8 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.70994 2.11997L2.82994 5.99997L6.70994 9.87997C7.09994 10.27 7.09994 10.9 6.70994 11.29C6.31994 11.68 5.68994 11.68 5.29994 11.29L0.709941 6.69997C0.319941 6.30997 0.319941 5.67997 0.709941 5.28997L5.29994 0.699971C5.68994 0.309971 6.31994 0.309971 6.70994 0.699971C7.08994 1.08997 7.09994 1.72997 6.70994 2.11997V2.11997Z"
                                                fill="#A3AED0"
                                            />
                                        </svg>
                                        <p className="ml-3 text-sm text-gray-600 dark:text-gray-500">
                                            Back to Dashboard
                                        </p>
    
                                        {/* //darkicon 
                                        <DarkModeSwitch
                                                style={{marginLeft:"2rem"}}
                                                checked={darkSide}
                                                onChange={toggleDarkMode}
                                                size={24}
                                                /> */}
                                    </div>
                                </Link>
                                )}
                                <Routes>
                                    {getRoutes(routes)}
                                    <Route
                                        path="/"
                                        element={<Navigate to="/auth/sign-in" replace />}
                                    />
                                </Routes>
                                <div className="absolute right-0 hidden h-full md:block lg:w-[49%] 2xl:w-[44vw]">
                                    {/* <img alt="n" src={authImg} className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"/> */}
                                    <div
                                        className="h-full w-full bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                                        style={{ backgroundImage: `url(${authImg})` }}
                                    />
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
