// import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../services/db";
import { 
  // Query, 
  Timestamp,  addDoc, collection, getDocs, query, where } from "firebase/firestore";
  
import { User, UserConverter } from "../../Users/User";
import { buildEmail } from "../../../utils/Utils";

const LoginImage = "https://edp.raincode.my.id/static/media/login.cc0578413db10119a7ff.png";

// https://blog.logrocket.com/user-authentication-firebase-react-apps/
// https://github.com/atharvadeosthale/firebase-auth-article/blob/master/src/Login.js
function LoginIndex() {
  const navigate = useNavigate();
  const history = useNavigate();
  const [error, setError] = useState<any>(null);
  const [emailOrTel, setEmailOrTel] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    onSubmit(emailOrTel, password);
  };

  async function onSubmit(emailOrTel: string, password: string) {

    try {
      setLoading(true);

       emailOrTel = emailOrTel.includes('@') ? emailOrTel : buildEmail(emailOrTel);

       const auth = getAuth();
       const userCredential = await signInWithEmailAndPassword(
         auth,
         emailOrTel,
         password
       );

       if(!userCredential.user) {
         throw new Error(`User with ${emailOrTel} not found in database !`);
       }
     

      if (userCredential.user) {
        checkUserRoleAndRedirect(userCredential.user.email!);
      }
    
    } catch (error: unknown) {
      /*
      console.log(error?.code);
      console.log(error.message);
      */
      console.log(error);

    }
  }

  // https://blog.logrocket.com/user-authentication-firebase-react-apps/
  const checkUserRoleAndRedirect = async (emailOrTel: string) => {

    // const user = await ( emailOrTel.includes('@') ? getUserByEmailInDB(emailOrTel) : getUserByTelInDB(emailOrTel) );



    const q = query(collection(db, "users"), where("email", "==", emailOrTel));
    const querySnapshot = await getDocs(q);

    
    let user: User = null;

    switch (querySnapshot.size) {
      case 0:
        throw new Error(`User with ${emailOrTel} not found in database !`);
      case 1:
        user = UserConverter.fromFirestore(querySnapshot.docs[0]);

        localStorage.setItem("user", JSON.stringify(user));

        setLoading(false);
        user!.roles?.includes('admin') ? navigate("/") : navigate("/onlineClients", { state: user });
        window.location.reload();
        break;
        
      default:
        throw new Error(`Multiple users with the same ${emailOrTel} in database !`);
    }

    /*
    if (querySnapshot.size === 1) {
      querySnapshot.docs.map((doc) => {
        user = UserConverter.fromFirestore(doc)
      })
    }
    */

 

  }

  

  /*
  const getUserByEmailInDB = async (email: string): Promise<User> => {    
    const q = query(collection(db, "users"), where("email", "==", email.trim()));
    return await getUserInDB(q, email);
  }

  const getUserByTelInDB = async (tel: string): Promise<User> => {    
    const q = query(collection(db, "users"), where("tel", "==", tel.trim()));
    return await getUserInDB(q, tel);
  }
  const getUserInDB =async (q: Query, emailOrTel: string): Promise<User> => {

    const querySnapshot = await getDocs(q);
    let user: User = null;
    switch (querySnapshot.size) {
      case 0:
        throw new Error(`User with ${emailOrTel} not found in database !`);
      case 1:
        user = UserConverter.fromFirestore(querySnapshot.docs[0])
        break;
      default:
        throw new Error(`Multiple users with the same ${emailOrTel} in database !`);
    }
    return user;
  }

  */
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const docs = await getDocs(q);

      let connectedUser: User = null;

      if (docs.docs.length === 0) {
        connectedUser = {
          authProvider: "google",
          uid: user.uid,
          name: user.displayName!,
          username: user.displayName!,
          email: user.email!,
          roles: ['user'],
          createTime: Timestamp.now()
        };
        await addDoc(collection(db, "users"), connectedUser);
      } else if(docs.docs.length === 1) {

        docs.docs.map((doc) => {
          connectedUser = UserConverter.fromFirestore(doc);
          connectedUser = {...connectedUser, authProvider: "google", createTime: Timestamp.now() } as User;
        })
      }
      localStorage.setItem("user", JSON.stringify(connectedUser));
      setLoading(false);
      
      // navigate("/pharmacies");
      connectedUser!.roles?.includes('admin') ? navigate("/") : navigate("/onlineClients", { state: connectedUser });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    history("/reset/password");
  }


  return (
    <>
      <div className="flex min-h-screen">
        <div className="flex w-full flex-col md:flex-row">
          {/* Image */}
          <div className="md:bg-emerald-500 md:min-h-screen flex flex-wrap md:w-1/2">
            <div className="items-center text-center flex flex-col relative justify-center mx-auto">
              <img
                src={LoginImage}
                alt="Logo Login"
                className="md:w-72 w-48 mx-auto"
              />
              <div className="md:block hidden text-slate-100">
                <h1 className="font-semibold text-2xl pb-2">
                  Login to Your Account
                </h1>
                <span className="text-sm">
                  Free access to EDP Online services
                </span>
              </div>
            </div>
          </div>
          {/* Login Section */}
          <div className="flex flex-col md:flex-1 items-center justify-center">
            <div className="loginWrapper flex flex-col w-full lg:px-36 md:px-8 px-8 md:py-8">
              {/* Login Header Text */}
              <div className="hidden md:block font-medium self-center text-xl sm:text-3xl text-gray-800">
                Bienvenue !
              </div>

              {/* Sparator */}
              <div className="hidden md:block relative mt-10 h-px bg-gray-300">
                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                  <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                    Connectez-vous sur votre compte
                  </span>
                </div>
              </div>

              <div className="md:hidden block my-4">
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>

              {/* Login Form */}
              <div className="md:mt-10 mt-4">
                <form onSubmit={handleSubmit}>
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
                        onChange={(e) => setEmailOrTel(e.target.value)}
                        className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full md:py-2 py-3 focus:outline-none focus:border-emerald-400"
                        placeholder="Email ou Tel"
                      />
                    </div>
                    {error?.email && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error.email[0]}
                      </span>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col mb-6">
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
                        placeholder="Password"
                      />
                    </div>
                    {error?.password && (
                      <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {error.password[0]}
                      </span>
                    )}
                  </div>

                  {/* Forgot Password Link */}
                  <div className="flex items-center mb-6 -mt-2 md:-mt-4">
                    <div className="flex ml-auto">
                      <Link
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          handleReset();
                        }}
                        className="inline-flex font-semibold text-xs sm:text-sm text-emerald-500 hover:text-emerald-700"
                      >
                        Password oublié ?
                      </Link>
                    </div>
                  </div>

                  {/* Button Login */}
                  <div className="flex w-full">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm bg-emerald-500 hover:bg-emerald-700 rounded-lg md:rounded md:py-2 py-3 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 md:uppercase">
                        {loading ? "Processing...." : "Login"}
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
                  {/* <FontAwesomeIcon icon={faGoogle} /> */}
                  <span onClick={signInWithGoogle} className="mr-2 flex-1">
                    {loading ? "Processing...." : "Login with Google"}
                  </span>
                </button>
              </div>
            
              {/* End Social Button */}

              {/* Register Link */}
              <div className="flex justify-center items-center  my-6 md:mb-0">
                <Link
                  to="/auth/register"
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

                  <span className="ml-2">Pas de compte ? Créez un compte </span>
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

export default LoginIndex;
