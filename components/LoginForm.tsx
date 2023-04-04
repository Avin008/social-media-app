const LoginForm = () => {
  return (
    <div className="border border-[#3F3D56] rounded-md h-full mx-auto w-[70%]">
      <h1 className="text-2xl text-center mt-5 text-white">
        Login
      </h1>
      <form className="text-white space-y-5 mt-5 px-5">
        <div className="flex flex-col gap-2">
          <label id="email">Email</label>
          <input
            className="p-2 px-3 bg-transparent rounded-md border-gray-400 border"
            type="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label id="email">Password</label>
          <input
            className="p-2 px-3 bg-transparent border rounded-md border-gray-400"
            type="password"
            placeholder="**********"
          />
        </div>
        <div className="flex flex-col gap-5">
          <button className="bg-brand p-2 rounded-md text-black">
            Login
          </button>
          <button>Login As Guest</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
