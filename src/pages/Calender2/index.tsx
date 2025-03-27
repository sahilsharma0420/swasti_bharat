import Lucide from "@/components/Base/Lucide";
import events from "@/fakers/events";
import { Tab, Menu } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import Calendar from "@/components/Calendar";
import { Draggable as FullCalendarDraggable } from "@/components/Base/Calendar";
import { Draggable } from "@fullcalendar/interaction";
import _ from "lodash";
import clsx from "clsx";

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



        <div className="flex flex-col w-full gap-y-7">
            <div>
              <div className="p-5 mt-3.5 box box--stacked">
                <div className="flex items-center h-10">
                  <div className="text-base font-medium 2xl:group-[.mode--light]:text-white">
                    Your Instructor
                  </div>
                </div>
                <div className="h-px mx-1 mb-3 border-t border-dashed border-slate-300/70"></div>

                <div className="py-5 mt-5 border border-dashed rounded-md border-slate-300/70">
                  <div className="flex flex-col items-center md:flex-row">
                    <div className="flex items-center justify-center flex-1 py-3 border-dashed md:border-r border-slate-300/70 last:border-0">
                      <div
                        className={clsx([
                          "group flex items-center justify-center w-10 h-10 border rounded-full mr-5",
                          "[&.primary]:border-primary/10 [&.primary]:bg-primary/10",
                          "[&.success]:border-success/10 [&.success]:bg-success/10",
                          ["primary", "success"][_.random(0, 1)],
                        ])}
                      >
                        <Lucide
                          icon="Coffee"
                          className={clsx([
                            "w-5 h-5",
                            "group-[.primary]:text-primary group-[.primary]:fill-primary/10",
                            "group-[.success]:text-success group-[.success]:fill-success/10",
                          ])}
                        />
                      </div>
                      <div className="flex flex-col flex-start">
                        <div className="text-slate-500">Name</div>
                        <div className="flex items-center mt-1.5">
                          <div className="text-base font-medium">Sahil Sharma</div>
                        </div>
                        <div className="flex items-center">
                      <Lucide
                        icon="Star"
                        className="w-3.5 h-3.5 mr-1 text-pending fill-pending/30"
                      />
                      <Lucide
                        icon="Star"
                        className="w-3.5 h-3.5 mr-1 text-pending fill-pending/30"
                      />
                      <Lucide
                        icon="Star"
                        className="w-3.5 h-3.5 mr-1 text-pending fill-pending/30"
                      />
                      <Lucide
                        icon="Star"
                        className="w-3.5 h-3.5 mr-1 text-pending fill-pending/30"
                      />
                      <Lucide
                        icon="Star"
                        className="w-3.5 h-3.5 mr-1 text-pending fill-pending/30"
                      />
                    </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-1 py-3 px-2 border-dashed md:border-l md:border-r border-slate-300/70 last:border-0">
                      <div className="flex flex-col flex-start">
                        <div className="text-slate-500">Bio</div>
                        <div className="flex items-center mt-1.5">
                          <div className="text-base font-medium">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Rerum, laboriosam? Cum magni molestias nihil
                            quidem, quia sit mollitia omnis expedita modi
                            commodi distinctio. Harum nostrum doloremque
                            repellendus ipsa quia facilis.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center flex-1 py-3 border-dashed md:border-r border-slate-300/70 last:border-0">
                      <div className="flex flex-col flex-start">
                        <div className=" max-w-md">
      <div className="mb-6">
        <h2 className="text-gray-500 text-lg font-medium mb-3">Specialization</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li className="text-gray-700">Hatha Yoga</li>
          <li className="text-gray-700">Vinyasa Yoga</li>
          <li className="text-gray-700">Ashtanga Yoga</li>
        </ul>
        <p className="text-right mt-1">
          <a href="#" className="text-gray-500 text-sm">More</a>
        </p>
      </div>
      
      <div className="mt-6">
        <h2 className="text-gray-500 text-lg font-medium mb-3">Experience</h2>
        <p className="text-gray-700">5 Year of Experience</p>
      </div>
    </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end text-blue-700 pb-3.5 mb-3.5 border-b border-dashed last:pb-0 last:mb-0 last:border-0">
                  <Button variant="outline-primary" className=" mt-4 ">
                    <Lucide
                      icon="ExternalLink"
                      className="w-4 h-4 mr-2 stroke-[1.3]"
                    />{" "}
View Full Profile                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-8 box box--stacked">
              <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                Profile Info
              </div>
              <div className="grid m-5 grid-cols-1 md:grid-cols-2 gap-5">
  <div className="p-5 box box--stacked h-full">
    <div className="pb-5 border-b border-dashed mb-7 border-slate-300/70">
      <div className="text-base text-slate-500">Languages</div>
    </div>
    <div className="flex items-center mb-8">
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-gray-800">Hindi</li>
        <li className="text-gray-800">English</li>
        <li className="text-gray-800">Punjabi</li>
      </ul>
    </div>
  </div>
  <div className="p-5 box box--stacked h-full">
    <div className="pb-5 border-b border-dashed mb-7 border-slate-300/70">
      <div className="text-base text-slate-500">Languages</div>
    </div>
    <div className="flex items-center mb-8">
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-gray-800">Hindi</li>
        <li className="text-gray-800">English</li>
        <li className="text-gray-800">Punjabi</li>
      </ul>
    </div>
  </div>
  <div className="p-5 box box--stacked h-full">
    <div className="pb-5 border-b border-dashed mb-7 border-slate-300/70">
      <div className="text-base text-slate-500">Languages</div>
    </div>
    <div className="flex items-center mb-8">
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-gray-800">Hindi</li>
        <li className="text-gray-800">English</li>
        <li className="text-gray-800">Punjabi</li>
      </ul>
    </div>
  </div>
  <div className="p-5 box box--stacked h-full">
    <div className="pb-5 border-b border-dashed mb-7 border-slate-300/70">
      <div className="text-base text-slate-500">Languages</div>
    </div>
    <div className="flex items-center mb-8">
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-gray-800">Hindi</li>
        <li className="text-gray-800">English</li>
        <li className="text-gray-800">Punjabi</li>
      </ul>
    </div>
  </div>
  {/* Centering the last single box */}
  <div className="p-5 box box--stacked h-full md:col-span-2 md:w-1/2 md:mx-auto">
    <div className="pb-5 border-b border-dashed mb-7 border-slate-300/70">
      <div className="text-base text-slate-500">Languages</div>
    </div>
    <div className="flex items-center mb-8">
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-gray-800">Hindi</li>
        <li className="text-gray-800">English</li>
        <li className="text-gray-800">Punjabi</li>
      </ul>
    </div>
  </div>
</div>


              <div className="border-t my-3 border-dashed rounded-[0.6rem] border-slate-300/80">
                <div className="flex gap-x-4 mt-3 justify-end mb-2 flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                  <Button
                    variant="primary"
                    className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                  >
                    Toggle button{" "}
                  </Button>
                  <Button
                    variant="primary"
                    className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                  >
                    Toggle button{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
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

         
        </div>
      </div>
    </div>
  );
}

export default Main;
