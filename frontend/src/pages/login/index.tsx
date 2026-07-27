import loginBg from "../../assets/login-clouds.webp";
import { CompanyLogo } from "../../assets/icons/logo";

export function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-cyan-200">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 flex aspect-[9/13] min-h-[400px] flex-col items-center justify-around rounded-xl border-2 border-white bg-white/20 p-10 backdrop-blur-sm">
        <span className="text-lg font-semibold">Welcome Back!</span>
        <span className="font-thin">Login to your account</span>
        <FieldDetails label="Email" placeholder="Enter your email" />
        <FieldDetails label="Password" placeholder="Enter your password" />
        <LoginButton />
      </div>
    </div>
  );
}
function FieldDetails({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold">{label}</span>
      <input
        className="rounded-md border border-gray-500 bg-inherit p-2 font-thin focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20"
        placeholder={placeholder}
      />
    </div>
  );
}

function LoginButton() {
  return (
    <button className="w-full rounded-xl bg-black p-1 text-white">Login</button>
  );
}
