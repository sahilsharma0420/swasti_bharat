  import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import users from "@/fakers/users";
import projects from "@/fakers/projects";
import Litepicker from "@/components/Base/Litepicker";
import ReportLineChart2 from "@/components/ReportLineChart2";
import Table from "@/components/Base/Table";
import cafe from "@/fakers/cafe";
import Pagination from "@/components/Base/Pagination";

import projectDetails from "@/fakers/project-details";
import { FormSelect, FormInput, FormCheck } from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import Button from "@/components/Base/Button";
import { Tab } from "@/components/Base/Headless";
import _ from "lodash";
import { useState } from "react";
function main() {
  const [generalReportFilter, setGeneralReportFilter] = useState<string>();

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <Tab.Group>
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-base font-medium group-[.mode--light]:text-white">
              Project Statistic
            </div>
            <Tab.List
              variant="boxed-tabs"
              className="w-auto md:ml-auto bg-white box rounded-[0.6rem] border-slate-200 group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!border-transparent dark:group-[.mode--light]:!bg-darkmode-900/30 dark:!box"
            >
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[0.12] group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                <Tab.Button
                  className="w-full md:w-24 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                  as="button"
                >
                  Daily
                </Tab.Button>
              </Tab>
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[0.12] group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                <Tab.Button
                  className="w-full md:w-24 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                  as="button"
                >
                  Monthly
                </Tab.Button>
              </Tab>
              <Tab className="bg-slate-50 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current group-[.mode--light]:bg-transparent group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[0.12] group-[.mode--light]:[&[aria-selected='true']_button]:border-transparent dark:group-[.mode--light]:[&[aria-selected='true']_button]:bg-white/[.05] dark:bg-transparent">
                <Tab.Button
                  className="w-full md:w-24 text-slate-500 whitespace-nowrap rounded-[0.6rem] group-[.mode--light]:text-slate-200"
                  as="button"
                >
                  Yearly
                </Tab.Button>
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels className="mt-3.5 box box--stacked">
            <Tab.Panel className="flex flex-col xl:flex-row gap-2 p-1.5 leading-relaxed">
              <div className="grid w-full grid-cols-4 gap-2">
                <div className="col-span-4 sm:col-span-2 xl:col-span-1 bg-gradient-to-b from-theme-2/90 to-theme-1/[0.85] flex-1 p-5 border-0 relative rounded-[0.6rem] box border-slate-200/60 bg-slate-50 overflow-hidden before:content-[''] before:w-full before:h-[130%] before:bg-gradient-to-b before:from-black/[0.15] before:to-transparent before:absolute before:right-0 before:top-0 before:rotate-45 before:-mr-[62%]">
                  <div className="flex items-center justify-center w-12 h-12 border rounded-full border-white/10 bg-white/10">
                    <Lucide
                      icon="Database"
                      className="w-6 h-6 text-white fill-white/10"
                    />
                  </div>
                  <div className="flex items-center mt-12">
                    <div className="text-2xl font-medium text-white">
                      247,220
                    </div>
                    <div className="flex items-center ml-3.5 border border-success/50 bg-success/50 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-white/90 dark:bg-white/10">
                      12%
                      <Lucide
                        icon="ChevronUp"
                        className="w-4 h-4 ml-px stroke-[1.5]"
                      />
                    </div>
                  </div>
                  <div className="mt-1 text-base text-white/70">
                    Customer Engagement
                  </div>
                  <Menu className="absolute top-0 right-0 mt-5 mr-5">
                    <Menu.Button className="w-5 h-5 text-slate-500">
                      <Lucide
                        icon="MoreVertical"
                        className="w-6 h-6 stroke-white/70 fill-white/70"
                      />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="Copy" className="w-4 h-4 mr-2" /> Copy
                        Link
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="Trash" className="w-4 h-4 mr-2" />
                        Delete
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="col-span-4 sm:col-span-2 xl:col-span-1 flex-1 p-5 border relative rounded-[0.6rem] bg-slate-50/50 overflow-hidden dark:bg-darkmode-400">
                  <div className="flex items-center justify-center w-12 h-12 border rounded-full border-primary/10 bg-primary/10">
                    <Lucide
                      icon="AppWindow"
                      className="w-6 h-6 text-primary fill-primary/10"
                    />
                  </div>
                  <div className="flex items-center mt-12">
                    <div className="text-2xl font-medium">124,625</div>
                    <div className="flex items-center ml-3.5 border border-danger/50 bg-danger/70 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-white/90">
                      3%
                      <Lucide
                        icon="ChevronDown"
                        className="w-4 h-4 ml-px stroke-[1.5]"
                      />
                    </div>
                  </div>
                  <div className="mt-1 text-base text-slate-500">
                    Lead Generation
                  </div>
                  <Menu className="absolute top-0 right-0 mt-5 mr-5">
                    <Menu.Button className="w-5 h-5 text-slate-500">
                      <Lucide
                        icon="MoreVertical"
                        className="w-6 h-6 stroke-slate-400/70 fill-slate-400/70"
                      />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="Copy" className="w-4 h-4 mr-2" /> Copy
                        Link
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="Trash" className="w-4 h-4 mr-2" />
                        Delete
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="col-span-4 sm:col-span-2 xl:col-span-1 flex-1 p-5 border relative rounded-[0.6rem] bg-slate-50/50 overflow-hidden dark:bg-darkmode-400">
                  <div className="flex items-center justify-center w-12 h-12 border rounded-full border-info/10 bg-info/10">
                    <Lucide
                      icon="Box"
                      className="w-6 h-6 text-info fill-info/10"
                    />
                  </div>
                  <div className="flex items-center mt-12">
                    <div className="text-2xl font-medium">749,220</div>
                    <div className="flex items-center ml-3.5 border border-success/50 bg-success/70 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-white/90">
                      4%
                      <Lucide
                        icon="ChevronUp"
                        className="w-4 h-4 ml-px stroke-[1.5]"
                      />
                    </div>
                  </div>
                  <div className="mt-1 text-base text-slate-500">
                    Support Tickets
                  </div>
                  <Menu className="absolute top-0 right-0 mt-5 mr-5">
                    <Menu.Button className="w-5 h-5 text-slate-500">
                      <Lucide
                        icon="MoreVertical"
                        className="w-6 h-6 stroke-slate-400/70 fill-slate-400/70"
                      />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="Copy" className="w-4 h-4 mr-2" /> Copy
                        Link
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="Trash" className="w-4 h-4 mr-2" />
                        Delete
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="col-span-4 sm:col-span-2 xl:col-span-1 flex-1 p-5 border relative rounded-[0.6rem] bg-slate-50/50 overflow-hidden dark:bg-darkmode-400">
                  <div className="flex items-center justify-center w-12 h-12 border rounded-full border-primary/10 bg-primary/10">
                    <Lucide
                      icon="PanelsTopLeft"
                      className="w-6 h-6 text-primary fill-primary/10"
                    />
                  </div>
                  <div className="flex items-center mt-12">
                    <div className="text-2xl font-medium">273,235</div>
                    <div className="flex items-center ml-3.5 border border-success/50 bg-success/70 rounded-full pl-[7px] pr-1 py-[2px] text-xs font-medium text-white/90">
                      9%
                      <Lucide
                        icon="ChevronUp"
                        className="w-4 h-4 ml-px stroke-[1.5]"
                      />
                    </div>
                  </div>
                  <div className="mt-1 text-base text-slate-500">
                    Pipeline Management
                  </div>
                  <Menu className="absolute top-0 right-0 mt-5 mr-5">
                    <Menu.Button className="w-5 h-5 text-slate-500">
                      <Lucide
                        icon="MoreVertical"
                        className="w-6 h-6 stroke-slate-400/70 fill-slate-400/70"
                      />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="Copy" className="w-4 h-4 mr-2" /> Copy
                        Link
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="Trash" className="w-4 h-4 mr-2" />
                        Delete
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
              <a
                href=""
                className="bg-slate-50 xl:w-20 text-slate-400/80 flex flex-col justify-center items-center p-5 border border-slate-300/80 rounded-[0.6rem] hover:bg-slate-50 border-dashed [&:hover_svg]:rotate-180 dark:bg-darkmode-400"
              >
                <Lucide
                  icon="PlusSquare"
                  className="w-6 h-6 transition-transform transform"
                />
              </a>
            </Tab.Panel>
            <Tab.Panel className="p-5 leading-relaxed"></Tab.Panel>
            <Tab.Panel className="p-5 leading-relaxed"></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className="flex flex-col col-span-12 xl:col-span-6 gap-y-10">
        <div>
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-base font-medium">Contact Details</div>
          </div>
          <div className="p-5 mt-3.5 box box--stacked">
            <div className="flex flex-col items-center pb-5 mb-5 border-b border-dashed gap-y-2 sm:flex-row border-slate-300/70">
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

              <div className="flex items-center px-3 py-1 font-medium border rounded-full sm:ml-auto border-success/10 bg-success/10 text-success">
                <div className="w-1.5 h-1.5 mr-2 rounded-full border border-success/50 bg-success/50"></div>{" "}
                High priority
              </div>
            </div>
            <div className="flex flex-col text-center gap-y-3 sm:flex-row">
              <div className="flex-1 border-dashed sm:border-r last:border-0">
                <div className="text-slate-500">Leads Generated</div>
                <div className="flex items-center justify-center mt-1">
                  <div className="text-base font-medium">2,176</div>
                  <div className="flex items-center ml-2 -mr-1 text-xs text-success">
                    11%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-px" />
                  </div>
                </div>
              </div>
              <div className="flex-1 border-dashed sm:border-r last:border-0">
                <div className="text-slate-500">Deals Closed</div>
                <div className="flex items-center justify-center mt-1">
                  <div className="text-base font-medium">2,027</div>
                  <div className="flex items-center ml-2 -mr-1 text-xs text-success">
                    2%
                    <Lucide icon="ChevronUp" className="w-4 h-4 ml-px" />
                  </div>
                </div>
              </div>
              <div className="flex-1 border-dashed sm:border-r last:border-0">
                <div className="text-slate-500">Meetings Scheduled</div>
                <div className="flex items-center justify-center mt-1">
                  <div className="text-base font-medium">342</div>
                  <div className="flex items-center ml-2 -mr-1 text-xs text-danger">
                    4%
                    <Lucide icon="ChevronDown" className="w-4 h-4 ml-px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 2xl:col-span-6">
          <div>
            <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
              <div className="text-base font-medium group-[.mode--light]:text-white">
                Production Insights
              </div>
            </div>
            <div className="p-5 mt-3.5 box box--stacked">
              <div className="flex flex-col gap-3 sm:items-center sm:flex-row">
                <div className="sm:mr-auto">
                  <div className="text-base text-slate-500">
                    Total Production Units
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="text-xl font-medium">24,176,221</div>
                    <div className="flex items-center ml-2 -mr-1 text-xs text-success">
                      11%
                      <Lucide icon="ChevronUp" className="w-4 h-4 ml-px" />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Lucide
                    icon="Calendar"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
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
                    className="pl-9 sm:w-64 rounded-[0.5rem]"
                  />
                </div>
              </div>
              <div className="mt-3">
                <ReportLineChart2 height={317} />
              </div>
              <div className="flex flex-col items-center gap-3 mt-5 sm:flex-row">
                <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-5">
                  <div className="flex items-center text-slate-500">
                    <div className="w-2 h-2 mr-2 border rounded-full border-primary/60 bg-primary/60"></div>{" "}
                    Machine Performance
                  </div>
                  <div className="flex items-center text-slate-500">
                    <div className="w-2 h-2 mr-2 border rounded-full border-slate-500/60 bg-slate-500/60"></div>{" "}
                    Defect Rate
                  </div>
                </div>
                <a
                  href=""
                  className="flex items-center sm:ml-auto text-primary"
                >
                  <Lucide
                    icon="ExternalLink"
                    className="w-3.5 h-3.5 stroke-[1.7]"
                  />
                  <div className="ml-1.5 whitespace-nowrap underline decoration-dotted decoration-primary/30 underline-offset-[3px]">
                    Show full report
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col col-span-12 xl:col-span-6 gap-y-10">
        <div>
          <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
            <div className="text-base font-medium">Team Collaboration</div>
          </div>
          <div className="p-5 mt-3.5 box box--stacked">
            <div className="mb-2">
              <div>Collaboration progress report</div>
            </div>
            <div>
              <div className="flex items-center w-full px-3 py-3 font-medium border rounded-lg bg-slate-50 text-slate-500 dark:bg-darkmode-400">
                <Lucide
                  icon="KanbanSquare"
                  className="w-5 h-5 mr-2 stroke-[1.3]"
                />
                Project Details for Team Members
                <Menu className="ml-auto">
                  <Menu.Button as="a">
                    <Lucide
                      icon="MoreVertical"
                      className="w-5 h-5 stroke-slate-500/70 fill-slate-500/70"
                    />
                  </Menu.Button>
                  <Menu.Items className="w-40">
                    <Menu.Item>
                      <Lucide icon="Copy" className="w-4 h-4 mr-2" /> Copy Link
                    </Menu.Item>
                    <Menu.Item>
                      <Lucide icon="Trash" className="w-4 h-4 mr-2" />
                      Delete
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <div className="flex flex-col gap-3 mt-3">
                {_.take(projectDetails.fakeProjectDetails(), 5).map(
                  (faker, fakerKey) => (
                    <div
                    className="relative flex flex-col items-center gap-9 p-3 border border-dashed rounded-lg sm:flex-row border-slate-300/60"
                    key={fakerKey}
                  >
                    <div className="absolute  mx-auto sm:top-0 sm:right-0 sm:mt-3  sm:mr-3">
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center px-3 py-1 font-medium border rounded-full border-success/10 bg-success/10 text-success">
                          <div className="w-1.5 h-1.5 mr-2 rounded-full border border-success/50 bg-success/50"></div>
                          Online
                        </div>
                        <div className="flex items-center px-3 py-1 font-medium border rounded-full border-success/10 bg-success/10 text-success">
                          <div className="w-1.5 h-1.5 mr-2 rounded-full border border-success/50 bg-success/50"></div>
                          Online
                        </div>
                      </div>
                    </div>
                    <div></div>
                    <div className="-mt-1 text-center sm:text-left">
                      <a href="" className="block font-medium">
                        {faker.title}
                      </a>
                      <div className="flex flex-wrap items-center justify-center mt-2.5 text-xs text-slate-500 sm:justify-start dark:text-slate-500">
                        <Lucide icon="Link" className="w-2.5 h-2.5 mr-1.5 stroke-[2]" />
                        <a
                          href=""
                          className="truncate underline decoration-dotted underline-offset-[3px] decoration-slate-300"
                        >
                          {faker.link}
                        </a>
                      </div>
                      <div className="flex flex-wrap items-center justify-center mt-4 sm:justify-start">
                        <div className="flex">
                          <div className="w-6 h-6 image-fit zoom-in">
                            <Tippy
                              as="img"
                              alt="Tailwise - Admin Dashboard Template"
                              className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                              src={faker.contributors[0].photo}
                              content={faker.contributors[0].name}
                            />
                          </div>
                          <div className="w-6 h-6 -ml-2.5 image-fit zoom-in">
                            <Tippy
                              as="img"
                              alt="Tailwise - Admin Dashboard Template"
                              className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                              src={faker.contributors[1].photo}
                              content={faker.contributors[1].name}
                            />
                          </div>
                          <div className="w-6 h-6 -ml-2.5 image-fit zoom-in">
                            <Tippy
                              as="img"
                              alt="Tailwise - Admin Dashboard Template"
                              className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                              src={faker.contributors[2].photo}
                              content={faker.contributors[2].name}
                            />
                          </div>
                        </div>
                        <div className="ml-3 text-xs text-slate-500">4+ Members</div>
                      </div>
                    </div>
                  </div>
                  
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col col-span-12 md:col-span-7 2xl:col-span-8 gap-y-3">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium">Quick Links</div>
          <div className="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
            <div className="relative">
              <Lucide
                icon="CalendarCheck2"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
              />
              <FormSelect className="sm:w-44 rounded-[0.5rem] pl-9 dark:!box">
                <option value="custom-date">Custom Date</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </FormSelect>
            </div>
            <div className="relative">
              <Lucide
                icon="Calendar"
                className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3]"
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
                className="pl-9 sm:w-64 rounded-[0.5rem] dark:!box"
              />
            </div>
          </div>
        </div>
        <div className="mt-3.5 box box--stacked">
          <div className="overflow-auto xl:overflow-visible">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Td className="font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 border-slate-200/80 text-slate-500">
                    Date
                  </Table.Td>
                  <Table.Td className="w-56 font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 border-slate-200/80 text-slate-500">
                    Menu Items Sold
                  </Table.Td>
                  <Table.Td className="truncate font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 border-slate-200/80 text-slate-500">
                    Customer Feedback
                  </Table.Td>
                  <Table.Td className="w-32 truncate text-right font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 border-slate-200/80 text-slate-500">
                    Total Sales
                  </Table.Td>
                  <Table.Td className="w-32 font-medium bg-slate-50 dark:bg-darkmode-500 first:rounded-tl-[0.6rem] last:rounded-tr-[0.6rem] py-5 text-center border-slate-200/80 text-slate-500">
                    Action
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {_.take(cafe.fakeCafeSales(), 5).map((faker, fakerKey) => (
                  <Table.Tr key={fakerKey} className="[&_td]:last:border-b-0">
                    <Table.Td className="py-5 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                      <a href="" className="whitespace-nowrap">
                        {faker.date}
                      </a>
                    </Table.Td>
                    <Table.Td className="py-5 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                      <a href="" className="flex items-center text-primary">
                        <Lucide
                          icon="ExternalLink"
                          className="w-3.5 h-3.5 stroke-[1.7]"
                        />
                        <div className="ml-1.5 whitespace-nowrap">
                          {faker.menuItemsSold}
                        </div>
                      </a>
                    </Table.Td>
                    <Table.Td className="py-5 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                      <div className="flex items-center">
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
                            className="w-3.5 h-3.5 mr-1 text-slate-400 fill-slate/30"
                          />
                        </div>
                        <div className="ml-1 text-xs text-slate-500">
                          ({faker.customerFeedback})
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td className="text-right py-5 first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                      <a href="" className="font-medium whitespace-nowrap">
                        {faker.totalSales}
                      </a>
                    </Table.Td>
                    <Table.Td className="py-5 relative first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] rounded-l-none rounded-r-none border-x-0 border-t-0 border-dashed dark:bg-darkmode-600">
                      <div className="flex items-center justify-center">
                        <Menu className="h-5">
                          <Menu.Button className="w-5 h-5 text-slate-500">
                            <Lucide
                              icon="MoreVertical"
                              className="w-5 h-5 stroke-slate-400/70 fill-slate-400/70"
                            />
                          </Menu.Button>
                          <Menu.Items className="w-40">
                            <Menu.Item>
                              <Lucide
                                icon="FileLineChart"
                                className="w-4 h-4 mr-2"
                              />
                              Sales Report
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide
                                icon="FileCheck2"
                                className="w-4 h-4 mr-2"
                              />
                              Item Details
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </div>
        <div className="flex flex-col-reverse flex-wrap items-center mt-8 flex-reverse gap-y-2 sm:flex-row">
          <Pagination className="flex-1 w-full mr-auto sm:w-auto">
            <Pagination.Link>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>1</Pagination.Link>
            <Pagination.Link active>2</Pagination.Link>
            <Pagination.Link>3</Pagination.Link>
            <Pagination.Link>...</Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
            <Pagination.Link>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
          <FormSelect className="w-20 rounded-[0.5rem] dark:!box">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </FormSelect>
        </div>
      </div>

      <div className="col-span-12 md:col-span-5 2xl:col-span-4 gap-y-10">
        <div className="flex items-center h-10">
          <div className="text-base font-medium">Recent Transactions</div>
        </div>
        <div className="p-5 mt-3.5 box box--stacked">
          <div className="flex items-center pb-3.5 mb-3.5 border-b border-dashed last:pb-0 last:mb-0 last:border-0">
            <div>
              <div className="w-10 h-10 p-0.5 border border-primary/80 rounded-full bg-slate-50 cursor-pointer">
                <div className="w-full h-full p-1 bg-white border rounded-full border-slate-300/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1503 1504"
                    fill="none"
                  >
                    <rect
                      x="287"
                      y="258"
                      width="928"
                      height="844"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z"
                      fill="#E84142"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="ml-3.5 w-full">
              <div className="flex items-center w-full">
                <div className="mr-4 font-medium">Avalanche</div>
                <span className="ml-auto font-medium">412.10 AVAX</span>
              </div>
              <div className="flex items-center w-full mt-0.5">
                <a href="" className="text-xs text-primary">
                  Buy
                </a>
                <div className="ml-auto text-xs text-slate-500">
                  Today, 14.25
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center pb-3.5 mb-3.5 border-b border-dashed last:pb-0 last:mb-0 last:border-0">
            <div>
              <div className="w-10 h-10 p-0.5 border border-primary/80 rounded-full bg-slate-50 cursor-pointer">
                <div className="w-full h-full p-1 bg-white border rounded-full border-slate-300/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    version="1.1"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 784.37 1277.39"
                  >
                    <g id="Layer_x0020_1">
                      <metadata id="CorelCorpID_0Corel-Layer" />
                      <g id="_1421394342400">
                        <g>
                          <polygon
                            fill="#343434"
                            fillRule="nonzero"
                            points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                          />
                          <polygon
                            fill="#8C8C8C"
                            fillRule="nonzero"
                            points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                          />
                          <polygon
                            fill="#3C3C3B"
                            fillRule="nonzero"
                            points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                          />
                          <polygon
                            fill="#8C8C8C"
                            fillRule="nonzero"
                            points="392.07,1277.38 392.07,956.52 -0,724.89 "
                          />
                          <polygon
                            fill="#141414"
                            fillRule="nonzero"
                            points="392.07,882.29 784.13,650.54 392.07,472.33 "
                          />
                          <polygon
                            fill="#393939"
                            fillRule="nonzero"
                            points="0,650.54 392.07,882.29 392.07,472.33 "
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="ml-3.5 w-full">
              <div className="flex items-center w-full">
                <div className="mr-4 font-medium">Ethereum</div>
                <span className="ml-auto font-medium">12.71 ETH</span>
              </div>
              <div className="flex items-center w-full mt-0.5">
                <a href="" className="text-xs text-primary">
                  Buy
                </a>
                <div className="ml-auto text-xs text-slate-500">
                  Today, 01.00
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center pb-3.5 mb-3.5 border-b border-dashed last:pb-0 last:mb-0 last:border-0">
            <div>
              <div className="w-10 h-10 p-0.5 border border-primary/80 rounded-full bg-slate-50 cursor-pointer">
                <div className="w-full h-full p-1 bg-white border rounded-full border-slate-300/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    version="1.1"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 4091.27 4091.73"
                  >
                    <g id="Layer_x0020_1">
                      <metadata id="CorelCorpID_0Corel-Layer" />
                      <g id="_1421344023328">
                        <path
                          fill="#F7931A"
                          fillRule="nonzero"
                          d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"
                        />
                        <path
                          fill="white"
                          fillRule="nonzero"
                          d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="ml-3.5 w-full">
              <div className="flex items-center w-full">
                <div className="mr-4 font-medium">Bitcoin</div>
                <span className="ml-auto font-medium">21.10 BTC</span>
              </div>
              <div className="flex items-center w-full mt-0.5">
                <a href="" className="text-xs text-primary">
                  Buy
                </a>
                <div className="ml-auto text-xs text-slate-500">
                  Today, 18.40
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center pb-3.5 mb-3.5 border-b border-dashed last:pb-0 last:mb-0 last:border-0">
            <div>
              <div className="w-10 h-10 p-0.5 border border-primary/80 rounded-full bg-slate-50 cursor-pointer">
                <div className="w-full h-full p-1 bg-white border rounded-full border-slate-300/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 336.41 337.42"
                  >
                    <defs></defs>
                    <title>Asset 1</title>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path
                          fill="#f0b90b"
                          d="M168.2.71l41.5,42.5L105.2,147.71l-41.5-41.5Z"
                        />
                        <path
                          fill="#f0b90b"
                          d="M231.2,63.71l41.5,42.5L105.2,273.71l-41.5-41.5Z"
                        />
                        <path
                          fill="#f0b90b"
                          d="M42.2,126.71l41.5,42.5-41.5,41.5L.7,169.21Z"
                        />
                        <path
                          fill="#f0b90b"
                          d="M294.2,126.71l41.5,42.5L168.2,336.71l-41.5-41.5Z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="ml-3.5 w-full">
              <div className="flex items-center w-full">
                <div className="mr-4 font-medium">Binance</div>
                <span className="ml-auto font-medium">231.50 BUSD</span>
              </div>
              <div className="flex items-center w-full mt-0.5">
                <a href="" className="text-xs text-primary">
                  Buy
                </a>
                <div className="ml-auto text-xs text-slate-500">
                  Today, 08.01
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center pb-3.5 mb-3.5 border-b border-dashed last:pb-0 last:mb-0 last:border-0">
            <div>
              <div className="w-10 h-10 p-0.5 border border-primary/80 rounded-full bg-slate-50 cursor-pointer">
                <div className="w-full h-full p-1 bg-white border rounded-full border-slate-300/70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1503 1504"
                    fill="none"
                  >
                    <rect
                      x="287"
                      y="258"
                      width="928"
                      height="844"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z"
                      fill="#E84142"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="ml-3.5 w-full">
              <div className="flex items-center w-full">
                <div className="mr-4 font-medium">Avalanche</div>
                <span className="ml-auto font-medium">132.20 AVAX</span>
              </div>
              <div className="flex items-center w-full mt-0.5">
                <a href="" className="text-xs text-primary">
                  Buy
                </a>
                <div className="ml-auto text-xs text-slate-500">
                  Today, 03.31
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default main;
