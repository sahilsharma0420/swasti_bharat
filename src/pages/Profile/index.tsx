import Lucide from "@/components/Base/Lucide";

import review from "@/fakers/review";
import { Link, useLocation } from "react-router-dom";

import users from "@/fakers/users";

import Button from "@/components/Base/Button";

import { useState } from "react";
import clsx from "clsx";
import _ from "lodash";

function Main() {
  const [selectedCountry, setSelectedCountry] = useState("1");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedTimezone, setSelectedTimezone] = useState("-05:00");
  const [dateOfBirth, setDateOfBirth] = useState<string>();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  return (
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
            {queryParams.get("page") === null && (
              <div className="flex flex-col p-8 box box--stacked">
                <div className="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                  Profile Info
                </div>
                <div className="grid m-3 grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 box box--stacked h-full">
                    <div className="pb-5 border-b border-dashed mb-7 border-slate-300/70">
                      <div className="text-base text-slate-500">Bio</div>
                    </div>
                    <div className="flex items-center mb-8">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Soluta qui molestiae sit sunt.
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
                      <div className="text-base text-slate-500">Experiences</div>
                    </div>
                    <div className="flex items-center mb-8">
                      5+ years of experience
                    </div>
                  </div>

                  <div className="p-5 box box--stacked h-full">
                    <div className="pb-5 border-b border-dashed mb-7 border-slate-300/70">
                      <div className="text-base text-slate-500">Certificates</div>
                    </div>
                    <div className="flex items-center mb-8">
                      <ul className="list-disc pl-5 space-y-2">
                        <li className="text-gray-800">Kids yoga certificate</li>
                        <li className="text-gray-800">Parental yoga certificate</li>
                        <li className="text-gray-800">Yoga therapy certificate</li>
                        <li className="text-gray-800">
                          Experienced Registered Yoga Teacher
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t my-3 border-dashed rounded-[0.6rem] border-slate-300/80">
                  <div className="flex items-center mt-4 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam in ad quod praesentium autem nostrum totam recusan!
                  </div>
                  <div className="flex justify-end mb-2 flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                    <Button
                      variant="primary"
                      className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                    >
                      Toggle button{" "}
                    </Button>
                  </div>

                  <div className="flex items-center mb-3 mt-4">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Consectetur ex nesciunt aspernatur deserunt sequi illum, cum
                    suscipit numquam. Voluptatem praesentium tempora cum, quia
                    neque quis hic rerum laudantium excepturi. Qui.{" "}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="flex flex-col p-5 box box--stacked">
              <div className="pb-5 mb-5 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                Reviews and Ratings{" "}
              </div>
              <div>
                <div className="flex">
                  <div>
                    <span className="text-lg font-medium">{"2000"}</span>{" "}
                    <span>Reviews</span>
                  </div>
                </div>
                <div className="flex justify-end mb-2 flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                  <Button
                    variant="primary"
                    className="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
                  >
                    Give Review{" "}
                  </Button>
                </div>

                <div className="border border-dashed rounded-[0.6rem] border-slate-300/80">
                  {_.take(review.fakeReviews(), 5).map((faker, fakerKey) => (
                    <div
                      key={fakerKey}
                      className="flex items-center px-5 py-4 border-b border-dashed cursor-pointer border-slate-300/80 last:border-b-0 last:border-0 hover:bg-slate-50"
                    >
                      <div>
                        <div className="max-w-[12rem] font-medium truncate text-primary">
                          {faker.user.name}
                        </div>

                        <div className="flex my-2items-center">
                          <Lucide
                            icon="Star"
                            className="w- h-3 mr-1 text-pending fill-pending/30"
                          />
                          <Lucide
                            icon="Star"
                            className="w- h-3 mr-1 text-pending fill-pending/30"
                          />
                          <Lucide
                            icon="Star"
                            className="w- h-3 mr-1 text-pending fill-pending/30"
                          />
                          <Lucide
                            icon="Star"
                            className="w- h-3 mr-1 text-pending fill-pending/30"
                          />
                          <Lucide
                            icon="Star"
                            className="w- h-3 mr-1 text-pending fill-pending/30"
                          />
                        </div>
                        <div className=" w-full text-slate-500 mt-0.5">
                          {faker.comment}
                        </div>
                        <div className="mt-1.5 text-xs text-slate-500">
                          {faker.date}
                        </div>
                        <div className=" flex justify-end text-blue-700 mt-1.5 text-xs ">
                          {"Reply"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="primary"
                  className="w-full mt-3 bg-white text-primary border-primary/[0.15] hover:bg-primary/20 dark:bg-darkmode-400"
                >
                  View all invoices
                  <Lucide
                    icon="ArrowRight"
                    className="stroke-[1.3] w-4 h-4 ml-2"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
