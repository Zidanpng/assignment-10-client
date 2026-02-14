import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    navigate("/login");
    return null;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-black text-[#0a303a] mb-8 uppercase">
        MY <span className="text-[#e83128]">Profile</span>
      </h2>
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* profile header */}
        <div className="h-40 bg-gradient-to-br from-red-700 to-red-400 relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img
              src={
                user?.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile pic"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>
        {/* user info */}
        <div className="pt-20 pb-10 px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.displayName}
          </h2>
          <p className="text-gray-500 mt-2 mb-8 italic">
            "Keep your furry friends cozy this winter."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-lg mx-auto">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Full Name
              </label>
              <p className="text-lg font-medium text-gray-700">
                {user?.displayName}
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>
              <p className="text-lg font-medium text-gray-700">{user?.email}</p>
            </div>
          </div>

          {/* action button */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/updateProfile")}
              className="px-8 py-3 bg-[#e83128] text-white font-semibold rounded-full"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
