import { useState, useRef, useEffect } from "react";
import users from "@/fakers/users";
import Lucide, { icons } from "@/components/Base/Lucide";
import clsx from "clsx";

function Main() {
  const [activeTab, setActiveTab] = useState("All");
  const leftSidebarRef = useRef(null);
  const mainContentRef = useRef(null);
  const [leftSidebarHeight, setLeftSidebarHeight] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sessions = [
    {
      time: "04:00 Pm - 05:00 Pm",
      date: "14th Feb, 2025",
      type: "Yoga for Diabetes",
      price: 1000,
      days: 4,
    },
    {
      time: "04:00 Pm - 05:00 Pm",
      date: "14th Feb, 2025",
      type: "Yoga for Diabetes",
      price: 1000,
      days: 4,
    },
    {
      time: "04:00 Pm - 05:00 Pm",
      date: "14th Feb, 2025",
      type: "Yoga for Diabetes",
      price: 1000,
      days: 4,
    },
    {
      time: "04:00 Pm - 05:00 Pm",
      date: "14th Feb, 2025",
      type: "Yoga for Diabetes",
      price: 1000,
      days: 4,
    },
    {
      time: "04:00 Pm - 05:00 Pm",
      date: "14th Feb, 2025",
      type: "Yoga for Diabetes",
      price: 1000,
      days: 4,
    },
  ];

  // Measure left sidebar content height on mount and resize
  useEffect(() => {
    if (leftSidebarRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (leftSidebarRef.current) {
          setLeftSidebarHeight(leftSidebarRef.current.scrollHeight);
        }
      });
      
      resizeObserver.observe(leftSidebarRef.current);
      setLeftSidebarHeight(leftSidebarRef.current.scrollHeight);
      
      return () => {
        if (leftSidebarRef.current) {
          resizeObserver.unobserve(leftSidebarRef.current);
        }
      };
    }
  }, []);

  // Handle scrolling synchronization for desktop view
  const handleScroll = (e) => {
    // Only apply scroll behavior on larger screens
    if (window.innerWidth >= 1024) {
      const scrollTop = e.target.scrollTop;
      const windowHeight = window.innerHeight;
      
      // If we haven't scrolled past the left sidebar content
      if (scrollTop < leftSidebarHeight - windowHeight) {
        if (leftSidebarRef.current) {
          leftSidebarRef.current.style.transform = `translateY(-${scrollTop}px)`;
        }
        setHasReachedEnd(false);
      } else {
        setHasReachedEnd(true);
        // Fix the left sidebar at the bottom of its content
        if (leftSidebarRef.current) {
          leftSidebarRef.current.style.transform = `translateY(-${leftSidebarHeight - windowHeight}px)`;
        }
      }
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen bg-pink-50 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
          <div className="flex items-center">
            <img
              src="src/assets/images/users/user1-100x100.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <h2 className="font-bold">Ankush Gupta</h2>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md"
            style={{ backgroundColor: "#B41883", color: "white" }}
          >
            <Lucide icon={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </button>
        </div>

        {/* Left Sidebar Container - Hidden on mobile by default unless toggled */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block lg:w-80 h-screen overflow-y-auto lg:overflow-hidden relative z-20`}>
          {/* Left Sidebar Content */}
          <div
            ref={leftSidebarRef}
            className="w-full h-auto text-white p-6 lg:transition-transform"
            style={{ backgroundColor: "#B41883" }}
          >
            <div className="flex flex-col items-center lg:items-start mb-6">
              {/* Profile image with background image */}
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full mb-4 relative flex items-center justify-center">
                {/* Background image behind profile */}
                <div
                  className="absolute inset-0 w-full h-full rounded-full"
                  style={{
                    backgroundImage: "url('src/assets/images/myImages/Div.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.3,
                  }}
                ></div>

                {/* Profile image */}
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden relative z-10">
                  <img
                    src="src/assets/images/users/user1-100x100.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-bold">Ankush Gupta</h2>
            </div>

            <div className="text-xs mb-6">
              <p>Data & AI Architect | Databricks 6X</p>
              <p>Certified | Azure 8X Certified | Lead ML</p>
              <p>Data Engineer | GCP certified Professional</p>
              <p>Data Engineer | Data Architecture | GCP 3X</p>
              <p>| Certified Data Scientist and Data</p>
              <p>Engineer | GenAI | FinOps</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Hath Yoga
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Proper ventilation and light
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Hath Yoga
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Hath Yoga
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  vinyak yoga
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Proper ventilation and light
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Hath Yoga
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
              <div className="flex gap-2">
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Hindi
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  English
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Punjabi
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <div className="flex">
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  5 Year of Experience
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Certification</h3>
              <div className="flex flex-wrap gap-2">
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Kids Yoga Certification
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Kids Yoga Certification
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Prenatal Yoga Certification
                </span>
                <span
                  style={{ backgroundColor: "#FFF3FC", color: "#89346E" }}
                  className="px-2 py-1 rounded-lg text-xs"
                >
                  Prenatal Yoga Certification
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div
          ref={mainContentRef}
          className="flex-1 h-screen overflow-y-auto py-4 md:py-6 px-4 md:pl-10 md:pr-6 lg:pl-14"
          style={{ backgroundColor: "#FFF4EB" }}
          onScroll={handleScroll}
        >
          {/* Tabs */}
          <div className="flex flex-wrap justify-center mb-6 gap-2">
            <button
              onClick={() => setActiveTab("All")}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md border-2 border-black text-sm ${
                activeTab === "All" ? "bg-black text-white" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("1:1 Call")}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md border-2 border-black text-sm ${
                activeTab === "1:1 Call" ? "bg-black text-white" : ""
              }`}
            >
              1:1 Call
            </button>
            <button
              onClick={() => setActiveTab("Weekly")}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md border-2 border-black text-sm ${
                activeTab === "Weekly" ? "bg-black text-white" : ""
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setActiveTab("Monthly")}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md border-2 border-black text-sm ${
                activeTab === "Monthly" ? "bg-black text-white" : ""
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Session Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {sessions.map((session, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-sm md:text-base">{session.time}</p>
                    <p className="text-xs md:text-sm text-gray-500">{session.date}</p>
                  </div>
                  <span className="bg-orange-200 text-orange-600 px-2 py-1 rounded-md text-xs">
                    {session.days} Days
                  </span>
                </div>

                <div
                  className="flex justify-between py-3 px-2 md:py-4 rounded-xl items-center mt-3 md:mt-4"
                  style={{ backgroundColor: "#FFE3F6" }}
                >
                  <div className="flex items-center">
                    <div className="bg-pink-100 p-1.5 md:p-2 rounded-md mr-2 md:mr-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:w-5 md:h-5"
                      >
                        <path
                          d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15l5 5-5 5-5-5 5-5z"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-medium">{session.type}</p>
                    </div>
                  </div>
                  <button className="bg-pink-100 text-black text-xs md:text-sm px-2 py-1 md:px-3 md:py-1 border-2 border-black rounded-md flex items-center">
                    $ {session.price} <span className="ml-1">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Similar Profiles */}
          <div className="bg-gradient-to-b from-[#D7B99D38] to-[#F9EEFB38] bg-opacity-20 p-3 md:p-4 rounded-tl-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg md:text-xl font-bold">Similar Profiles</h3>
              <button className="bg-black text-white px-2 py-1 md:px-3 md:py-1 rounded-md text-xs md:text-sm">
                See All
              </button>
            </div>

            <div className="w-full mt-3 md:mt-4">
              <div className="flex overflow-x-auto pb-2 gap-3 md:gap-5 hide-scrollbar">
                {users.fakeUsers().map((user, index) => (
                  <div
                    key={index}
                    className="p-2 min-w-[130px] md:min-w-[180px] lg:min-w-[200px] bg-white rounded-lg"
                  >
                    <div className="flex flex-col items-start">
                      <div className="w-full">
                        <div className="w-full aspect-[7/5] overflow-hidden rounded-xl border-[3px] border-slate-200/70">
                          <img
                            className="w-full h-full object-cover"
                            alt="User Profile"
                            src={user.photo}
                          />
                        </div>
                      </div>
                      <div className="mt-2.5 md:mt-3.5 text-sm md:text-base font-bold">
                        {user.name}
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="mt-0.5 md:mt-1 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Lucide
                              key={i}
                              icon="Star"
                              className="w-3 h-3 md:w-3.5 md:h-3.5 mr-0.5 md:mr-1 text-pending fill-pending/30"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-1 md:mt-2 text-xs text-justify font-medium line-clamp-3 md:line-clamp-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nobis totam harum corrupti, odio, quis, perferendis
                        officiis quos itaque dolorem molestiae quod iusto.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ratings and Feedback */}
          <div className="p-3 md:p-6 rounded-lg">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Ratings and feedback</h3>

            <div className="flex flex-col md:flex-row gap-4 md:gap-5">
              <div className="w-full md:w-1/2 bg-white rounded-2xl px-1 py-3 border-r border-gray-200 flex items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 mr-3 md:mr-6 flex-shrink-0">
                  <img
                    src="src/assets/images/myImages/schedule_image.png"
                    alt="Rating icon"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs">See What Others Say -</p>
                  <p className="text-xs">Check Instructor Ratings</p>
                  <p className="text-xs">& Reviews!</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex gap-4 md:gap-5">
                <div className="w-1/2 bg-white rounded-2xl px-1 py-3 flex flex-col items-center justify-center">
                  <h4 className="text-xl md:text-3xl font-bold">10</h4>
                  <p className="text-xxs md:text-xs text-gray-500">TOTAL REVIEWS</p>
                </div>
                <div className="w-1/2 flex bg-white rounded-2xl px-1 py-3 flex-col items-center justify-center">
                  <h4 className="text-xl md:text-3xl font-bold">4/5</h4>
                  <div className="text-yellow-400 text-sm md:text-base mb-0.5 md:mb-1">{"★★★★☆"}</div>
                  <p className="text-xxs md:text-xs text-gray-500">OVERALL RATING</p>
                </div>
              </div>
            </div>

            <div className="w-full mt-4 md:mt-8">
              <div className="flex overflow-x-auto pb-4 md:pb-6 gap-3 md:gap-5 hide-scrollbar">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="p-1.5 min-w-[200px] md:min-w-[250px] lg:min-w-[300px] flex flex-col">
                    <div className="h-24 md:h-28 flex flex-col text-center items-center relative w-full p-3 md:p-4 rounded-[0.6rem] bg-white">
                      <img
                        className="mb-1 md:mb-2 w-6 h-4 md:w-8 md:h-6"
                        src="src/assets/images/myImages/comma_image.png"
                        alt=""
                      />
                      <p className="text-xs line-clamp-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Temporibus velit ab{" "}
                      </p>
                      <div className="absolute inset-x-0 top-0 w-12 h-12 md:w-16 md:h-16 mx-auto mt-16 md:mt-20">
                        <div className="w-full h-full overflow-hidden rounded-full image-fit">
                          <img
                            alt="User Profile"
                            src={users.fakeUsers()[index % users.fakeUsers().length].photo}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-3 md:p-5 flex items-center justify-center flex-col sm:flex-row gap-y-3 md:gap-y-5 sm:items-end rounded-[0.6rem] pt-8 md:pt-12">
                      <div>
                        <div className="text-sm md:text-base text-center font-bold text-slate-500">
                          {index === 0 ? "Brad Pitt" : index === 1 ? "John Doe" : "Jane Smith"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
        .text-xxs {
          font-size: 0.65rem;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
export default Main;