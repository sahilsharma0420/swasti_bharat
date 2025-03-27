import Lucide from "@/components/Base/Lucide";
import events from "@/fakers/events";
import { Tab, Menu } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import Calendar from "@/components/Calendar";
import { Draggable as FullCalendarDraggable } from "@/components/Base/Calendar";
import { Draggable } from "@fullcalendar/interaction";
import _ from "lodash";

function Main() {
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
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="text-base font-medium group-[.mode--light]:text-white">
          Classes
        </div>
        <div className="mt-3.5 flex flex-col lg:flex-row gap-y-10 gap-x-6">
          <div className="w-full lg:w-[29rem] flex-none">
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
                      <div className="flex  items-start pb-5 mb-5 border-b border-dashed gap-y-2 flex-row border-slate-300/70">
                        <div className="overflow-hidden rounded-full w-14 h-14 image-fit border-[3px] border-slate-200/70">
                          <img alt="" src={"/images/pages/Calender/user.png"} />
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
                        <div className="flex-1 border-dashed border-r last:border-0">
                          <div className="text-slate-500">
                            Tilak Nagar, near community center ,near sabji
                            mandi, West Delhi, 247776
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 mt-3.5 box box--stacked">
                      <div className="flex items-start pb-5 mb-5 border-b border-dashed gap-y-2 flex-row border-slate-300/70">
                        <div className="overflow-hidden rounded-full w-14 h-14 image-fit border-[3px] border-slate-200/70">
                          <img alt="" src={"/images/pages/Calender/user.png"} />
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
                        <div className="flex-1 border-dashed border-r last:border-0">
                          <div className="text-slate-500">
                            Tilak Nagar, near community center ,near sabji
                            mandi, West Delhi, 247776
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 mt-3.5 box box--stacked">
                      <div className="flex  items-start pb-5 mb-5 border-b border-dashed gap-y-2 flex-row border-slate-300/70">
                        <div className="overflow-hidden rounded-full w-14 h-14 image-fit border-[3px] border-slate-200/70">
                          <img alt="" src={"/images/pages/Calender/user.png"} />
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
                        <div className="flex-1 border-dashed border-r last:border-0">
                          <div className="text-slate-500">
                            Tilak Nagar, near community center ,near sabji
                            mandi, West Delhi, 247776
                          </div>
                        </div>
                      </div>
                    </div>
                  </FullCalendarDraggable>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>

          <div className="flex flex-col w-full gap-y-7">
            <div className="flex flex-col p-5 box box--stacked">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
