import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logOut, signIn } from "../redux/authSlioce";
import { useNavigate } from "react-router-dom";
import { toggleLogin } from "../redux/toggleSlice";

const SignInBtn = () => {
  const userData = useSelector((state) => state.auth.userData);
  const diapatch = useDispatch();
  const navigate = useNavigate();
  async function handleGoogleAuth() {
    provider.setCustomParameters({ prompt: "select_account" });
    const data = await signInWithPopup(auth, provider);
    const userData = {
      name: data?.user?.displayName,
      photo: data?.user?.photoURL,
    };
    diapatch(signIn(userData));
    navigate("/");
    diapatch(toggleLogin());
  }

  async function handleLogout() {
    await signOut(auth);
    diapatch(logOut());
    diapatch(toggleLogin());
  }
  return (
    <div>
      {userData ? (
        <button
          onClick={handleLogout}
          className="input-shadow bg-gradient-to-r 
             from-[#EA4335] via-[#4285F4] via-[#FBBC05] to-[#34A853] 
             bg-clip-text text-transparent p-4 font-bold uppercase w-full"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={handleGoogleAuth}
          className="input-shadow p-4 font-bold uppercase w-full flex justify-center items-center gap-6 bg-gradient-to-r 
             from-[#EA4335] via-[#4285F4] via-[#FBBC05] to-[#34A853] 
             bg-clip-text text-transparent"
        >
          <img
            className="w-7 h-7 object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWIl8zC8WAMHi5JVmKUb3YVvZd5gvoCdy-NQ&s"
            alt=""
          />
          Continue with Google
        </button>
      )}
    </div>
  );
};

export default SignInBtn;
