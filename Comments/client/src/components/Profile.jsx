const Profile = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl text-red-400 mb-4">Your Profile 👤</h2>

      <div className="bg-white/5 p-6 rounded-xl border border-red-500/20">
        <p className="text-gray-300">Username: Shashank</p>
        <p className="text-gray-300">Email: example@gmail.com</p>
      </div>
    </div>
  );
};

export default Profile;