import Lucide from "@/components/Base/Lucide";

import review from "@/fakers/review";
import { Link, useLocation } from "react-router-dom";
import { Tab, Menu } from "@/components/Base/Headless";

import users from "@/fakers/users";

import Button from "@/components/Base/Button";

import { useRef, useState } from "react";
import clsx from "clsx";
import _ from "lodash";

function Main() {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };
 
  const timeSlots = [
    '04:00 Pm - 05:00 Pm',
    '05:00 Pm - 06:00 Pm', 
    '06:00 Pm - 07:00 Pm',
    '07:00 Pm - 08:00 Pm',
    '04:00 Pm - 05:00 Pm',
    '05:00 Pm - 06:00 Pm', 
    '06:00 Pm - 07:00 Pm',
    '07:00 Pm - 08:00 Pm'
  ];

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const dateRefs = useRef([]);

  const dates = Array(12).fill("01\nFeb"); // Add the \n here

  const handleDateClick = (index) => {
    // Scroll to the clicked date
    if (dateRefs.current[index]) {
      dateRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  return (
    <>
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">
          <div className="flex flex-col col-span-12 xl:col-span-8 gap-y-7">
            <div className="p-1.5 box flex flex-col box--stacked">
              <div className="flex mb-5 mt-3 mx-2 justify-between items-center">
                <div>Profile</div>
                <Button
                  variant="primary"
                  className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                >
                  Edit Profile
                </Button>
              </div>
              <div className="h-60 relative w-full rounded-[0.6rem] bg-gradient-to-b from-theme-1/95 to-theme-2/95">
                <div
                  className={clsx([
                    "w-full h-full relative overflow-hidden",
                    "before:content-[''] before:absolute before:inset-0 before:bg-texture-white before:-mt-[50rem]",
                    "after:content-[''] after:absolute after:inset-0 after:bg-texture-white after:-mt-[50rem]",
                  ])}
                ></div>
                <div className="absolute inset-x-0 top-0 w-32 h-32 mx-auto mt-36">
                  <div className="w-full h-full overflow-hidden border-[6px] box border-white rounded-full image-fit">
                    <img
                      alt="Tailwise - Admin Dashboard Template"
                      src={users.fakeUsers()[0].photo}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 mb-2.5 mr-2.5 border-2 border-white rounded-full bg-success box"></div>
                </div>
              </div>
              <div className="p-5 flex items-center justify-center  flex-col sm:flex-row gap-y-5 sm:items-end rounded-[0.6rem] bg-slate-50 pt-12 dark:bg-darkmode-500">
                <div>
                  <div className="text-2xl text-center font-bold text-slate-500">
                    Brad Pitt
                  </div>
                  <div className="flex justify-center items-center">
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
                  <div className="text-base text-center text-slate-500">
                    Lorem ipsum dolor sit.
                  </div>

                  <Button
                    variant="primary"
                    className=" px-20 mt-3 group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                  >
                    Book Appointment{" "}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col col-span-12 md:col-span-12 lg:col-span-7 2xl:col-span-7 gap-y-10">
              <div>
                <div className="p-5 mt-3.5 box box--stacked">
                  <div className="flex items-center h-10">
                    <div className="text-base font-medium 2xl:group-[.mode--light]:text-white">
                      Your Wallet
                    </div>
                  </div>
                  <div className="h-px mx-1 mb-3 border-t border-dashed border-slate-300/70"></div>
                  <div className="flex flex-col lg:items-center lg:flex-row gap-y-5">
                    <div className="flex flex-col sm:items-center sm:flex-row gap-x-3 gap-y-2"></div>
                  </div>
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
                          <div className="text-slate-500">Total Supplier</div>
                          <div className="flex items-center mt-1.5">
                            <div className="text-base font-medium">1,523</div>
                          </div>
                        </div>
                      </div>
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
                            icon="CreditCard"
                            className={clsx([
                              "w-5 h-5",
                              "group-[.primary]:text-primary group-[.primary]:fill-primary/10",
                              "group-[.success]:text-success group-[.success]:fill-success/10",
                            ])}
                          />
                        </div>
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
                        <div
                          className={clsx([
                            "group flex items-center justify-center w-10 h-10 border rounded-full mr-5",
                            "[&.primary]:border-primary/10 [&.primary]:bg-primary/10",
                            "[&.success]:border-success/10 [&.success]:bg-success/10",
                            ["primary", "success"][_.random(0, 1)],
                          ])}
                        >
                          <Lucide
                            icon="PackageSearch"
                            className={clsx([
                              "w-5 h-5",
                              "group-[.primary]:text-primary group-[.primary]:fill-primary/10",
                              "group-[.success]:text-success group-[.success]:fill-success/10",
                            ])}
                          />
                        </div>
                        <div className="flex flex-col flex-start">
                          <div className="text-slate-500">Coffee Varieties</div>
                          <div className="flex items-center mt-1.5">
                            <div className="text-base font-medium">141</div>
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
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col col-span-12 md:col-span-12 lg:col-span-7 2xl:col-span-7 gap-y-10">
              <div>
                <div className="p-5 mt-3.5 box box--stacked">
                  <div className="flex items-center h-10">
                    <div className="text-base font-medium 2xl:group-[.mode--light]:text-white">
                      Choose Your Slot{" "}
                    </div>
                  </div>
                  <div className="h-px mx-1 mb-3 border-t border-dashed border-slate-300/70"></div>

                  <div className="flex items-center h-10">
                    <div className="text-base font-medium 2xl:group-[.mode--light]:text-white">
                      Select Date{" "}
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-center space-x-2 px-2 py-2  box box--stacked">
                    {dates.map((date, index) => (
                      <div
                        key={index}
                        ref={(el) => (dateRefs.current[index] = el)}
                        onClick={() => handleDateClick(index)}
                        className={`
      text-xs text-gray-500 
      px-4 py-2
      cursor-pointer 
      justify-center
      items-center
      hover:bg-gray-100 
      transition-all 
      duration-200 

      ${
        index === 4
          ? "bg-gradient-to-b from-[#02161F] to-[#075985] text-white px-4 py-2 rounded-xl shadow-lg"
          : ""
      }
    `}
                      >
                        {date.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>

                  <Tab.Group className="flex flex-col my-3 gap-y-7">
                    <Tab.List
                      variant="boxed-tabs"
                      className="w-auto md:mr-auto bg-white box rounded-[0.6rem] border-slate-200 group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                    >
                      <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-white [&[aria-selected='true']_button]:bg-gradient-to-r [&[aria-selected='true']_button]:from-[hsla(338,68%,30%,1)] [&[aria-selected='true']_button]:to-[hsla(203,76%,28%,1)] group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                        <Tab.Button
                          className="w-full md:w-40 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                          as="button"
                        >
                          One Day
                        </Tab.Button>
                      </Tab>
                      <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-white [&[aria-selected='true']_button]:bg-gradient-to-r [&[aria-selected='true']_button]:from-[hsla(338,68%,30%,1)] [&[aria-selected='true']_button]:to-[hsla(203,76%,28%,1)] group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                        <Tab.Button
                          className="w-full md:w-40 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                          as="button"
                        >
                          Weekly Subscription
                        </Tab.Button>
                      </Tab>
                      <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-white [&[aria-selected='true']_button]:bg-gradient-to-r [&[aria-selected='true']_button]:from-[hsla(338,68%,30%,1)] [&[aria-selected='true']_button]:to-[hsla(203,76%,28%,1)] group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                        <Tab.Button
                          className="w-full md:w-40 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                          as="button"
                        >
                          Monthly Subscription
                        </Tab.Button>
                      </Tab>
                      <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-white [&[aria-selected='true']_button]:bg-gradient-to-r [&[aria-selected='true']_button]:from-[hsla(338,68%,30%,1)] [&[aria-selected='true']_button]:to-[hsla(203,76%,28%,1)] group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                        <Tab.Button
                          className="w-full md:w-40 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                          as="button"
                        >
                          Monthly Subscription
                        </Tab.Button>
                      </Tab>
                    </Tab.List>
                  </Tab.Group>

                  

                  <div className="flex items-center h-10">
                    <div className="text-base font-medium 2xl:group-[.mode--light]:text-white">
                      Select Timing{" "}
                    </div>
                  </div>


                  <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((slot) => (
          <div key={slot} className="relative">
            <input
              type="radio"
              id={slot}
              name="timeSlot"
              value={slot}
              checked={selectedTimeSlot === slot}
              onChange={() => handleTimeSlotSelect(slot)}
              className="
                absolute 
                top-2
                left-2 
                h-3
                w-3 
                
                text-blue-600 
                focus:ring-blue-500 
                border-gray-300
              "
            />
            <label
              htmlFor={slot}
              className={`
                block 
                w-full 
                p-1
                text-sm
                pl-6                border 
                rounded-md 
                cursor-pointer 
                ${selectedTimeSlot === slot 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-gray-300 text-gray-700'}
                hover:bg-gray-50
              `}
            >
              {slot}
            </label>
          </div>
        ))}
      </div>
      <div className="flex  justify-end">
      <button
        onClick={() => {
          if (selectedTimeSlot) {
            // Handle appointment confirmation
            alert(`Confirmed: ${selectedTimeSlot}`);
          }
        }}
        disabled={!selectedTimeSlot}
        className="
          mt-6 
                          bg-gradient-to-b from-[#02161F] to-[#075985] text-white px-4 py-2 rounded-xl shadow-lg
          py-1 
          bg-blue-600 
          text-white 
          rounded-sm 
          hover:bg-blue-700 
          transition-colors 
          duration-200 
          disabled:bg-gray-400 
          disabled:cursor-not-allowed
        "
      >
        Confirm Appointment
      </button>
      </div>
    </div>













                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-8 col-span-12 xl:col-span-4">
            <div className="col-span-12 xl:col-span-4">
              <div className="flex flex-col p-5 box box--stacked">
                <div className="pb-5 mb-5 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                  Reviews and Ratings{" "}
                </div>
                <div>
                  <div className="flex items-center gap-3.5 border-b border-dashed pb-5 mb-5">
                    <div>
                      <div className="w-14 h-14 overflow-hidden rounded-full image-fit border-[3px] border-slate-200/70">
                        <img
                          alt="Tailwise - Admin Dashboard Template"
                          src={users.fakeUsers()[0].photo}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-medium truncate max-w-[9rem] md:max-w-none">
                        {users.fakeUsers()[0].name}
                      </div>
                      <div className="text-slate-500 mt-0.5 truncate max-w-[9rem] md:max-w-none">
                        {users.fakeUsers()[0].position}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-2 mb-2">
                    <div>
                      <span>Reviews</span>
                    </div>

                    <div className="flex text-lg font-medium justify-between">
                      <span className="text-lg font-medium">
                        {"Weekly Subscription"}
                      </span>{" "}
                      <span>Rs 20,000</span>
                    </div>

                    <div>
                      <span>Class Details</span>
                    </div>
                  </div>

                  <div className="border border-dashed rounded-[0.6rem] border-slate-300/80">
                    <div className="flex items-center px-5 py-4 border-b border-dashed cursor-pointer border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50">
                      <div>
                        <div className="max-w-[12rem] font-medium truncate text-primary">
                          {"Class Name "}
                        </div>

                        <div className=" w-full text-slate-500 mt-0.5">
                          {"Weekly Subscription"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-dashed rounded-[0.6rem] border-slate-300/80">
                    <div className="flex items-center px-5 py-4 border-b border-dashed cursor-pointer border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50">
                      <div>
                        <div className="max-w-[12rem] font-medium truncate text-primary">
                          {"Date and Timing "}
                        </div>

                        <div className=" w-full text-slate-500 mt-0.5">
                          {"14th Feb,2025 at 04 : 00 Pm"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-dashed rounded-[0.6rem] border-slate-300/80">
                    <div className="flex items-center px-5 py-4 border-b border-dashed cursor-pointer border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50">
                      <div>
                        <div className="max-w-[12rem] font-medium truncate text-primary">
                          {"Duration "}
                        </div>

                        <div className=" w-full text-slate-500 mt-0.5">
                          {"60 Minutes"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-dashed rounded-[0.6rem] border-slate-300/80">
                    <div className="flex items-center px-5 py-4 border-b border-dashed cursor-pointer border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50">
                      <div>
                        <div className="max-w-[12rem] font-medium truncate text-primary">
                          {"Mode (Online)"}
                        </div>

                        <div className=" w-full text-slate-500 mt-0.5">
                          {
                            "Link will be shared on the panel 30 min before the class start"
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    className="w-full mt-3 bg-white text-primary border-primary/[0.15] hover:bg-primary/20 dark:bg-darkmode-400"
                  >
                    <Lucide
                      icon="ExternalLink"
                      className="stroke-[1.3] w-4 h-4 ml-2"
                    />
                    Proceed to pay{" "}
                  </Button>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="flex flex-col p-5 box box--stacked">
                <div className="pb-5 mb-3 text-lg font-medium  text-[0.94rem]">
                  Help and Support{" "}
                </div>
                <div className="pb-5 mb-2  font-medium  text-[0.94rem]">
                  Call at 9876543210 and other text we want to add here{" "}
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    className="w-full bg-white text-primary border-primary/[0.15] hover:bg-primary/20 dark:bg-darkmode-400"
                  >
                    <Lucide
                      icon="ExternalLink"
                      className="stroke-[1.3] w-4 h-4 ml-2"
                    />
                    Proceed to pay{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>




</> );
}

export default Main;
