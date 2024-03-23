import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import gsap from "gsap";
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const moveRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuVariants = {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: 0,
    },
  };

  useEffect(() => {
    const container = containerRef.current;
    const move = moveRef.current;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const move = moveRef.current;

    gsap.to(move, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.3,
    });
  }, [mousePosition]);

  return (
    <div className=" min-h-screen max-w-[100vw]">
      <div ref={containerRef} className=" bg-zinc-600 min-h-screen relative">
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
        >
          {isMenuOpen && (
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: isMenuOpen ? "0" : "-100vh" }}
              transition={{ type: "tween", duration: 0.8 }}
              className="bg-[#FF5F38] flex fixed z-[70]  w-[100vw] pb-[2vw] px-[2vw] sm:max-2xl:px-0"
            >
              <div className="flex  sm:max-2xl:justify-between  justify-left w-[70vw] px-[2vw] py-[2vw]">
                <div className="hidden sm:max-2xl:flex ">
                  <video
                    src="src\Video\videoo.mp4 "
                    className="sm:max-2xl:rounded-xl w-[30vw]"
                    autoPlay
                    loop
                    muted
                  ></video>
                </div>
                <div className=" text-[2rem]  sm:max-lg:text-[1rem] 2xl:text-[2rem]">
                  {[
                    "Home",
                    "Work",
                    "Services & Models",
                    "About",
                    "Contact",
                  ].map((items, index) => {
                    return (
                      <li className="list-none" key={index}>
                        {items}
                      </li>
                    );
                  })}
                </div>
              </div>
              <div className="pl-[25vw] py-[2vw]">
                <button className="text-[1.5vmax]" onClick={toggleMenu}>
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
        <div
          ref={moveRef}
          style={{
            transform: "translate(-50%, -50%)",
          }}
          className={`move overflow-hidden sm:max-2xl:text-[2vw] bg-[#FF5F38] sm:max-2xl:h-[7vw]  h-[16vw] w-[16vw] 
           sm:max-2xl:w-[7vw] rounded-full fixed z-40 flex items-center justify-center`}
        >
          <p className="text-[70%]">play reel</p>
        </div>
        <video
          src="src\Video\videoo.mp4"
          className="z-10 h-screen  w-full absolute object-cover"
          autoPlay
          loop
          muted
        ></video>

        <div className="z-50 flex  flex-col justify-between relative  text-white">
          <nav className="flex justify-between px-[2vw] py-[2vw]">
            {[
              "The venture agency",
              <button onClick={toggleMenu}>Menu</button>,
            ].map((items, index) => {
              return (
                <li
                  className={`list-none  ${
                    index === 1 && "cursor-pointer text-[2vmax]"
                  } ${index === 0 && "text-[2vmax]"}  `}
                  key={index}
                >
                  {items}
                </li>
              );
            })}
          </nav>

          <h1 className=" text-center  pt-[8vw] text-[20vw]  ">
            {"rejouice".split("").map((items, index) => {
              return (
                <span
                  className="font-['NB_International_Pro_Boo'] font-semi-bold leading-none"
                  key={index}
                >
                  {items}
                </span>
              );
            })}
          </h1>
        </div>
      </div>
    </div>
  );
}
export default App;
