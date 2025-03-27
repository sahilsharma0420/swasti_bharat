import Lucide from "@/components/Base/Lucide";
import Litepicker from "@/components/Base/Litepicker";
import { Tab, Menu } from "@/components/Base/Headless";
import users from "@/fakers/users";

import { Draggable as FullCalendarDraggable } from "@/components/Base/Calendar";
import { Draggable } from "@fullcalendar/interaction";
import _ from "lodash";
import { useState } from "react";


function Main() {
  const [generalReportFilter, setGeneralReportFilter] = useState<string>();

  const dragableOptions: Draggable["settings"] = {
    itemSelector: ".event",
    eventData(eventEl) {
      const getDays = () => {
        const days = eventEl.querySelectorAll(".event__days")[0]?.textContent;
        return days ? days : "0";
      };
      return {
        title: eventEl.querySelectorAll(".event__title")[0]?.innerHTML,
        duration: {
          days: parseInt(getDays()),
        },
      };
    },
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-y-10 gap-x-6">
          <div className="col-span-12">
            <img
              src="src/assets/images/myImages/instructor_image.png"
              alt="notfound"
            />
          </div>

            <div className="flex flex-col col-span-12 lg:col-span-7 gap-y-7">
              <div className="text-base font-medium group-[.mode--light]:text-white">
                Referal Insights
              </div>
              <div>
                <div className="p-5 mt-3.5 box box--stacked">
                  <div className="flex flex-col lg:items-center lg:flex-row gap-y-5">
                    <div className="flex flex-col sm:items-center sm:flex-row gap-x-3 gap-y-2">
                    <div className="relative">
                <Lucide
                  icon="Calendar"
                  className="absolute group-[.mode--light]:!text-slate-200 inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
                />
                <Litepicker
                  value={generalReportFilter}
                  onChange={(e) => {
                    setGeneralReportFilter(e.target.value);
                  }}
                  options={{
                    autoApply: false,
                    singleMode: false,
                    numberOfColumns: 2,
                    numberOfMonths: 2,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  className="pl-9 sm:w-64 rounded-[0.5rem] group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                />
              </div>
                     
                    </div>
                  </div>
                  <div className="h-px mx-1 my-3 border-t border-dashed border-slate-300/70"></div>

                  <div className=" rounded-md border-slate-300/70">
                    <div className="flex flex-col items-center md:flex-row">
                      <div className="flex items-center justify-center flex-1 py-3 border-dashed md:border-r border-slate-300/70 last:border-0">
                        <div className="flex flex-col flex-start">
                          <div className="text-slate-500">Total Supplier</div>
                          <div className="flex items-center mt-1.5">
                            <div className="text-base font-medium">1,523</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-1 py-3 border-dashed md:border-r border-slate-300/70 last:border-0">
                        <div className="flex flex-col flex-start">
                          <div className="text-slate-500">
                            Expenses Analysis
                          </div>
                          <div className="flex items-center mt-1.5">
                            <div className="text-base font-medium">261</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-1 py-3 border-dashed md:border-r border-slate-300/70 last:border-0">
                        <div className="flex flex-col flex-start">
                          <div className="text-slate-500">Coffee Varieties</div>
                          <div className="flex items-center mt-1.5">
                            <div className="text-base font-medium">141</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg md:text-xl font-bold">
Yoga Instructors
                    </h3>
                 
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
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Nobis totam harum corrupti, odio, quis,
                              perferendis officiis quos itaque dolorem molestiae
                              quod iusto.
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>






              <div className="flex flex-col ">
                <div className="">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg md:text-xl font-bold">
Free Resources                    </h3>
                 
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
                                  src="src/assets/images/myImages/pdf image.png"
                                />
                              </div>
                            </div>
                          
                            <div className="flex justify-center items-center">
                            
                            </div>
                            <div className="mt-1 md:mt-2 mb-2 text-sm text-justify font-semibold line-clamp-3 md:line-clamp-4">
                            "Yoga: A Healthy Way of Living" for Upper Primary Stage
                            </div>
                            <div className="flex w-full justify-between
">
                              <p className="text-xs">14th Feb, 2025</p>
                              <p className="text-xs">15 Mb</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col col-span-12 lg:col-span-5 gap-y-7">
              <div className="text-base font-medium group-[.mode--light]:text-white">
                Classes
              </div>
              <Tab.Group className="flex flex-col gap-y-7">
                <Tab.List
                  variant="boxed-tabs"
                  className="w-auto md:mr-auto bg-white box rounded-[0.6rem] border-slate-200 group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                >
                  <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-white [&[aria-selected='true']_button]:bg-gradient-to-r [&[aria-selected='true']_button]:from-[hsla(338,68%,30%,1)] [&[aria-selected='true']_button]:to-[hsla(203,76%,28%,1)] group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                    <Tab.Button
                      className="w-full md:w-24 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                      as="button"
                    >
                      Upcoming
                    </Tab.Button>
                  </Tab>
                  <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-white [&[aria-selected='true']_button]:bg-gradient-to-r [&[aria-selected='true']_button]:from-[hsla(338,68%,30%,1)] [&[aria-selected='true']_button]:to-[hsla(203,76%,28%,1)] group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                    <Tab.Button
                      className="w-full md:w-24 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                      as="button"
                    >
                      Completed
                    </Tab.Button>
                  </Tab>
                  <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-white [&[aria-selected='true']_button]:bg-gradient-to-r [&[aria-selected='true']_button]:from-[hsla(338,68%,30%,1)] [&[aria-selected='true']_button]:to-[hsla(203,76%,28%,1)] group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                    <Tab.Button
                      className="w-full md:w-24 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                      as="button"
                    >
                      Missed
                    </Tab.Button>
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <FullCalendarDraggable
                      id="calendar-events"
                      options={dragableOptions}
                    >
                      <div className="p-5 mt-3.5 box box--stacked">
                        <div className="flex  items-start pb-5  border-b border-dashed gap-y-2 flex-row border-slate-300/70">
                          <div className="overflow-hidden rounded-full w-14 h-14 image-fit border-[3px] border-slate-200/70">
                            <img
                              alt=""
                              src={"/images/pages/Calender/user.png"}
                            />
                          </div>
                          <div className="text-start flex flex-col gap-1 text-left ml-4">
                            <div className="text-base font-medium">
                              {"Ankush Gupta"}
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {"14th Feb,2024 - 14th March, 2025"}
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {"04:00 Pm - 05:00 Pm"}
                            </div>
                            <div className="flex text-center  w-40 px-3 py-1 font-medium border rounded-full  border-success/10 bg-success/90 text-white">
                              Monthly Package
                            </div>
                          </div>
                          <div className="flex items-center px-3 py-1 font-medium border rounded-full ml-auto border-success/10 bg-success/10 text-success">
                            <div className="w-1.5 h-1.5 mr-2 rounded-full border border-success/50 bg-success/50"></div>{" "}
                            Online
                          </div>
                        </div>
                        <div className="flex  text-start gap-y-3 flex-row">
                          <div className="h-px mx-1  border-t border-dashed border-slate-300/70"></div>
                        </div>
                      </div>

                      <div className="p-5 mt-3.5 box box--stacked">
                        <div className="flex items-start pb-5  border-b border-dashed gap-y-2 flex-row border-slate-300/70">
                          <div className="overflow-hidden rounded-full w-14 h-14 image-fit border-[3px] border-slate-200/70">
                            <img
                              alt=""
                              src={"/images/pages/Calender/user.png"}
                            />
                          </div>
                          <div className="text-start flex flex-col gap-1 text-left ml-4">
                            <div className="text-base font-medium">
                              {"Ankush Gupta"}
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {"14th Feb,2024 - 14th March, 2025"}
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {"04:00 Pm - 05:00 Pm"}
                            </div>
                            <div className="flex text-center  w-40 px-3 py-1 font-medium border rounded-full  border-success/10 bg-success/90 text-white">
                              Monthly Package
                            </div>
                          </div>
                          <div className="flex items-center px-3 py-1 font-medium border rounded-full ml-auto border-success/10 bg-success/10 text-success">
                            <div className="w-1.5 h-1.5 mr-2 rounded-full border border-success/50 bg-success/50"></div>{" "}
                            Online
                          </div>
                        </div>
                        <div className="flex  text-start gap-y-3 flex-row">
                          <div className="h-px mx-1  border-t border-dashed border-slate-300/70"></div>
                        </div>
                      </div>

                      <div className="p-5 mt-3.5 box box--stacked">
                        <div className="flex  items-start pb-5  border-b border-dashed gap-y-2 flex-row border-slate-300/70">
                          <div className="overflow-hidden rounded-full w-14 h-14 image-fit border-[3px] border-slate-200/70">
                            <img
                              alt=""
                              src={"/images/pages/Calender/user.png"}
                            />
                          </div>
                          <div className="text-start flex flex-col gap-1 text-left ml-4">
                            <div className="text-base font-medium">
                              {"Ankush Gupta"}
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {"14th Feb,2024 - 14th March, 2025"}
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {"04:00 Pm - 05:00 Pm"}
                            </div>
                            <div className="flex text-center  w-40 px-3 py-1 font-medium border rounded-full  border-success/10 bg-success/90 text-white">
                              Monthly Package
                            </div>
                          </div>
                          <div className="flex items-center px-3 py-1 font-medium border rounded-full ml-auto border-success/10 bg-success/10 text-success">
                            <div className="w-1.5 h-1.5 mr-2 rounded-full border border-success/50 bg-success/50"></div>{" "}
                            Online
                          </div>
                        </div>
                        <div className="flex  text-start gap-y-3 flex-row">
                          <div className="h-px mx-1  border-t border-dashed border-slate-300/70"></div>
                        </div>
                      </div>
                    </FullCalendarDraggable>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
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
