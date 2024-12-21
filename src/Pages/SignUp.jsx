import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";

function SignUp({ title, opps, sentence }) {
  return (
    <div className="w-full h-screen bg-custom-gradient">
      <div className="w-full h-screen bg-white/80 flex items-center justify-center">
        <div className="w-[85vw] md:w-[68vw] h-[75vh] bg-white rounded-2xl shadow-2xl md:grid md:grid-cols-2">
          <div className="w-full h-full hidden md:inline rounded-l-2xl border-r-[4px] border-primaryBlue relative">
            <img
              className="absolute z-10 w-[70%] border-[3px] border-primaryPink bottom-[8%] right-[5%]"
              src="/public/Img/young-attractive-pinkhaired-woman-bright-fuchsia-hoodie-looks-into-camera-poses-with-smile-isolated-background.jpg"
            />
            <img
              className="absolute z-10 w-[42%] left-[6%] top-[25%] border-[3px] border-primaryBlue"
              src="/public/Img/high-fashion-portrait-young-beautiful-brunette-woman-wearing-nice-trendy-blue-suit-sexy-fashion-model-posing-studio-fashionable-female-isolated.jpg"
            />
            <img
              className="absolute z-10 w-[37%] top-[10%] right-[11%] border-[3px] border-primaryYellow"
              src="/public/Img/portrait-person-wearing-yellow.jpg"
            />
            <div className="absolute z-20 triangle1 w-[10%] h-[12%] top-[40%] right-[10%]  bg-primaryBlue"></div>
            <div className="absolute z-20 triangle2 w-[10%] h-[12%] top-[35%] left-[3%] bg-primaryPink"></div>
            <div className="absolute z-20 triangle2 w-[15%] h-[12%] bottom-[8%] right-[3%] bg-primaryYellow"></div>
            <div className="w-[8%] absolute aspect-square rounded-full top-[20%] right-[45%] bg-primaryPink"></div>
            <div className="w-[8%] absolute aspect-square rounded-full bottom-[32%] left-[22%] bg-primaryYellow"></div>
          </div>
          <div className="w-full h-full rounded-r-2xl border-l-[4px] border-primaryYellow font-tanker">
            <div className="bg-white p-8 rounded-r-2xl w-full h-full overflow-y-auto max-h-[calc(100vh-20px)]">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                {title}
              </h2>
              <form>
                {title === "Sign Up" ? (
                  <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <FaUser className="absolute top-3 left-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryPink"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <TbPasswordFingerprint className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryYellow"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-black hover:text-primaryGrayDark hover:bg-white border-[3px] border-black rounded-lg font-medium transition-all duration-200"
                >
                  {title}
                </button>
              </form>
              <p className="mt-6 text-center text-primaryGrayDark">
                {sentence}{" "}
                <a
                  href="/login"
                  className="text-primaryPink hover:text-primaryBlue font-medium"
                >
                  {opps}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
