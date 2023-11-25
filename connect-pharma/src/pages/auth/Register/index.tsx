
import { faEnvelope, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserCredential, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../../Users/User";
import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, getDb } from "../../../services/db";
import { buildEmail } from "../../../utils/Utils";
import { formatPhoneNumber } from './../../../utils/Utils';
import { WebAppData, WebAppDataStep } from "../../../utils/WebAppData";


export {};

declare global {
  interface Window {
    Telegram: any; // 👈️ turn off type checking
  }
}

const tele = window.Telegram.WebApp;

function RegisterIndex() {
  const navigate = useNavigate();
  // const [error, setError] = useState(false);
  
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { userTelephone, userEmail } = useParams();
  const [email, setEmail] = useState(userEmail!.replaceAll(",", "."));
  // const [tel, setTel] = useState(userTelephone ? formatPhoneNumber(userTelephone) : '');
  const [tel, setTel] = useState(userTelephone ? userTelephone : '');


  useEffect(() => {
    tele.ready();
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();


    // setError(false);
    if(password !== confirmPassword) {
      throw new Error(`Confirmation password is not the same to password !`);
    }

    setLoading(true);
    onSubmit(email, password, tel);
  };

  async function onSubmit(email: string, password: string, tel: string) {

    try {
     
      email = email ? email : buildEmail(tel);

      const q = query(collection(db, "users"), where("email", "==", email));
      const docs = await getDocs(q);

      if(docs.docs.length > 0 ) {        
        throw new Error(`User with email ${email} already exist !`);
      } 

      const auth = getAuth();
      
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user: User = {
        authProvider: "local",
        uid: userCredential.user.uid,
        username: userCredential.user.displayName!,
        email: userCredential.user.email!,
        roles: ["user"],
        tel: tel,
        createTime: Timestamp.now()
      };

      if(email === buildEmail(tel)) {
        user.password = password;
      }
      
      addUser(user);


    } catch (error: any) {
      console.error(error.code);
      console.error(error.message);
    }
  }

  const addUser = (user: User) => {
    const usersRef = collection(getDb(), 'users');
    addDoc(usersRef, user)
      .then(() => {
        setLoading(false);

        // send this data to bot
        const data: WebAppData = {
          message: 'Votre compte a été bien créé dans notre système ! ',
          email: email,
          tel: formatPhoneNumber(tel),
          hasEmail: true, 
          frontendUrl: 'https://connect-pharma-911ea.web.app',
          step: WebAppDataStep.LOGIN
        }
        tele.sendData(JSON.stringify(data));

        //
        navigate("/auth/login");
        console.log("Data sucessfuly submitted")
      })
      .catch((error) => {
        console.log("Error adding document:", error);
      });
  }

  const registerImage =
    "https://edp.raincode.my.id/static/media/login.cc0578413db10119a7ff.png";
  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-emerald-500 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={registerImage}
                alt="Logo"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  Register an Account
                </h1>
                <span className="text-sm">
                  Free access to EDP Online services
                </span>
              </div>
            </div>
          </div>
          {/* Register Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
              {/* Login Header Text */}
              <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                S'enregistrer
              </div>

              {/* Sparator */}
              <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    Formulaire d'enregistrement
                  </span>
                </div>
              </div>

              <div className="md:hidden block my-4">
                <h1 className="text-2xl font-semibold">Register</h1>
              </div>

              {/* Register Form */}
              <div className="md:mt-10 mt-4">
                <form onSubmit={handleSubmit}>

                      {/* tel */}
                      <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faPhone} />
                      </div>

                      <input
                        id="tel"
                        type="text"
                        name="tel"
                        onChange={(e) => setTel(e.target.value)}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        
                        required
                        defaultValue={tel}
                        disabled={true}

                        placeholder="Tel"
                      />
                    </div>

                  </div>



                  {/* Username */}
                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>

                      <input
                        id="email"
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        
                        
                        required
                        defaultValue={email}
                        disabled={true}

                        placeholder="Email"
                      />
                    </div>

                  </div>

                  {/* Username */}
                  {/* <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faUser} />
                      </div>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        placeholder="Login"
                      />
                    </div>

                  </div> */}

              

                  {/* Password */}
                  <div className="flex flex-col mb-3">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faLock} />
                      </div>

                      <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        placeholder="Mot de passe"
                        required
                      />
                    </div>

                  </div>

                  {/* confirm Password */}
                  <div className="flex flex-col mb-6">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                        <FontAwesomeIcon icon={faLock} />
                      </div>

                      <input
                        id="confirm_password"
                        type="password"
                        name="confirm_password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        placeholder="Ressaisir le mot de passe"
                        required
                      />
                    </div>


                  </div>

                  {/* Forgot Password Link */}
                  {/* <div className="flex items-center mb-6 -mt-2 md:-mt-4">
                    <div className="flex ml-auto">
                      <Link
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="inline-flex font-semibold text-xs sm:text-sm text-emerald-500 hover:text-emerald-700"
                      >
                        password oublié ?
                      </Link>
                    </div>
                  </div> */}

                  {/* Button Register */}
                  <div className="flex w-full">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 md:uppercase">
                        {loading ? "Processing...." : "Register"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Sparator */}
              <div className="relative mt-6 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    OR
                  </span>
                </div>
              </div>

              {/* Social Button */}
              <div className="flex justify-between w-full mt-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="flex items-center justify-center focus:outline-none text-slate-500 text-sm bg-slate-200 rounded-lg md:rounded md:py-2 px-3 py-3 w-full transition duration-150 ease-in"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="mr-2 flex-1">Login with Google</span>
                </button>
              </div>
             
              {/* End Social Button */}

              {/* Register Link */}
              <div className="flex justify-center items-center my-6 md:mb-0">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center font-bold text-emerald-500 hover:text-emerald-700 text-xs text-center"
                >
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                  </span>
                  <span className="ml-2">Register Link ?</span>
                </Link>
              </div>
              {/* End Register Link */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterIndex;
