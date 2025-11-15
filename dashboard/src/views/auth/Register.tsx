import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useState, type ChangeEventHandler, type FormEventHandler } from "react";
interface IState {
  name: string;
  password: string;
  email: string;
}
const Register = () => {
  const [state, setState] = useState<IState>({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle: ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    const { name, value } = e.target;
    setState((prev)=>({ ...prev, [name]: value }));
  };

  const submit:FormEventHandler<HTMLFormElement> | undefined=(e)=>{
      e.preventDefault();
      console.log(state)
  }
  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <h2 className="text-xl mb-3 font-b">Welcome to Ecommerce</h2>
          <p className="text-sm mb-3 font-medium">
            Please register your account
          </p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                required
                className="px-3 py-2 outline-none border border-solid border-slate-700 bg-transparent rounded-md "
                onChange={inputHandle}
                value={state?.name}
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                id="email"
                onChange={inputHandle}
                value={state?.email}
                required
                className="px-3 py-2 outline-none border border-solid border-slate-700 bg-transparent rounded-md "
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
                onChange={inputHandle}
                value={state?.password}
                className="px-3 py-2 outline-none border border-solid border-slate-700 bg-transparent rounded-md "
              />
            </div>
            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">
                I agree to privacy policy & terms
              </label>
            </div>
            <button className="bg-slate-800 w-full hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-mb px-7 py-2 mb-3 ">
              Sign Up
            </button>
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already Have an account ?{" "}
                <Link to="/login" className="font-bold">
                  Sign in
                </Link>
              </p>
            </div>
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>
            <div className="flex justify-center items-center gap-3 ">
              <div className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <span className="text-white">
                    <FaGoogle />
                  </span>
                </span>
              </div>
              <div className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <span className="text-white">
                    <FaFacebook />
                  </span>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
