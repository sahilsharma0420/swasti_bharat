import Lucide from "@/components/Base/Lucide";
import { Menu, Popover } from "@/components/Base/Headless";
import Pagination from "@/components/Base/Pagination";
import Tippy from "@/components/Base/Tippy";
import users from "@/fakers/users";
import { useState } from "react";
import products from "@/fakers/products";
import transactions from "@/fakers/transactions";
import Button from "@/components/Base/Button";
import { formatCurrency } from "@/utils/helper";
import Table from "@/components/Base/Table";
import clsx from "clsx";
import _ from "lodash";
import Alert from "@/components/Base/Alert";
import categories from "@/fakers/categories";

import TomSelect from "@/components/Base/TomSelect";
import { ClassicEditor } from "@/components/Base/Ckeditor";
import {
  FormLabel,
  FormCheck,
  FormInput,
  FormInline,
  FormSelect,
  FormSwitch,
  InputGroup,
  FormHelp,
} from "@/components/Base/Form";
function main() {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: "10:00 Am - 11:00 Am", from: "10:00 Am", package: "" },
    { id: 2, time: "10:00 Am - 11:00 Am", from: "10:00 Am", package: "" },
    { id: 3, time: "10:00 Am - 11:00 Am", from: "10:00 Am", package: "" },
    { id: 4, time: "10:00 Am - 11:00 Am", from: "10:00 Am", package: "" },
  ]);

  const handlePackageChange = (id, value) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((slot) =>
        slot.id === id ? { ...slot, package: value } : slot
      )
    );
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [rules, setRules] = useState([
    "Set clear rules to ensure a smooth and productive class experience.",
    "Set clear rules to ensure a smooth and productive class experience.",
    "Set clear rules to ensure a smooth and productive class experience.",
    "Set clear rules to ensure a smooth and productive class experience.",
  ]);

  const handleAddRule = () => {
    setRules([...rules, ""]);
  };

  const handleRuleChange = (index, value) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    setRules(updatedRules);
  };

  const handleRemoveRule = (index) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };
  const [subcategory, setSubcategory] = useState(["0"]);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12">
        <div className="grid grid-cols-12 gap-5 mt-3.5">
          <div className="relative flex flex-col col-span-12 lg:col-span-7 xl:col-span-8 gap-y-7">
            <div className="flex flex-col p-5 box box--stacked">
              <div className="p-5 border rounded-[0.6rem] border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-[0.94rem] font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide
                    icon="ChevronDown"
                    className="w-5 h-5 stroke-[1.3] mr-2"
                  />{" "}
                  Product Information
                </div>
                <div className="mt-5">
                  {/* <Alert
                    variant="outline-warning"
                    className="flex items-center px-4 mb-2 bg-warning/5 border-warning/30"
                  >
                    {({ dismiss }) => (
                      <>
                        <div>
                          <Lucide
                            icon="Lightbulb"
                            className="stroke-[1.3] w-4 h-4 mr-3 2xl:mr-2"
                          />
                        </div>
                        <div className="mr-5 leading-relaxed">
                          Avoid selling counterfeit products / violating
                          Intellectual Property Rights, so that your products
                          are not deleted.
                          <a
                            href=""
                            className="ml-1 font-medium underline decoration-dotted decoration-warning/50 underline-offset-[3px]"
                          >
                            Learn More
                          </a>
                          <Alert.DismissButton
                            type="button"
                            className="inset-y-0 btn-close"
                            onClick={dismiss}
                            aria-label="Close"
                          >
                            <Lucide icon="X" className="w-4 h-4" />
                          </Alert.DismissButton>
                        </div>
                      </>
                    )}
                  </Alert> */}
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-40 xl:mr-8">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Class Type </div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Required
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          Select your gender from the options.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="flex-1 w-full mt-3 xl:mt-0">
                        <div className="flex flex-col items-center md:flex-row">
                          <div className="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:bg-darkmode-600">
                            <FormCheck>
                              <FormCheck.Input
                                id="checkbox-switch-4"
                                type="radio"
                                value=""
                              />
                              <FormCheck.Label htmlFor="checkbox-switch-4">
                                Individual
                              </FormCheck.Label>
                            </FormCheck>
                          </div>
                          <div className="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10 dark:bg-darkmode-600">
                            <FormCheck>
                              <FormCheck.Input
                                id="checkbox-switch-5"
                                type="radio"
                                value=""
                              />
                              <FormCheck.Label htmlFor="checkbox-switch-5">
                                Group
                              </FormCheck.Label>
                            </FormCheck>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-40  xl:mr-8">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">
                            Alot Pricing to the  Packages
                          </div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Required
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          Enter your full legal name as it appears on your
                          official identification.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="flex flex-col items-center md:flex-row">
                        <FormInput
                          type="text"
                          className="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10"
                          placeholder={"Select  a Package"}
                        />
                        <FormSelect className="md:w-36 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                          <option value="office">Packages</option>
                          <option value="home">Home</option>
                        </FormSelect>
                      </div>
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-start sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2  sm:mb-0 sm:mr-5 sm:text-right xl:w-40 xl:mr-8">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Create Slots</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Required
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          Use this section to specify the various options,
                          configurations, or variants available for your
                          product.{" "}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3  p-2 xl:mt-0 box box--stacked">
                      <div className="max-w-4xl mx-auto p-4">
                        <div>
                          <div className="mb-4 flex flex-col sm:flex-row items-center space-x-3">
                            <div className="inline-flex text-xs items-center p-0 m-0 text-gray-700 flex-shrink-0">
                              <span className="font-medium py-2">
                                {"Set your working hours"}
                              </span>
                            </div>
                              <div className="flex flex-row gap-2">
                            <div className="flex   items-center flex-row">
                              <FormInput
                                type="text"
                                className="first:rounded-b-none w-14 text-xs first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10"
                                placeholder={"From"}
                              />
                              <FormSelect className=" w-18   text-xs first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                                <option value="office">10 am</option>
                                <option value="home">11 am</option>
                              </FormSelect>
                            </div>

                            <div className="flex   items-center flex-row">
                              <FormInput
                                type="text"
                                className="first:rounded-b-none w-10 text-xs first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10"
                                placeholder={"To"}
                              />
                              <FormSelect className="w-18 text-xs first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                                <option value="office">1 pm</option>
                                <option value="home">2 p</option>
                              </FormSelect>
                            </div>
                          </div>
                          </div>
                          <div className="mb-4 flex flex-col sm:flex-row  items-center space-x-3">
                            <div className="inline-flex text-xs items-center p-0 mb-2 sm:mb-0 sm:m-0 text-gray-700  flex-shrink-0">
                              <span>{"Duration"}</span>
                            </div>
                            <div className="flex flex-row gap-2">

                            <div className=" w-32 sm:mt-3.5 sm:w-48">
                              <FormSelect>
                                <option value="daily">Minutes</option>
                                <option value="weekly">Hours</option>
                              </FormSelect>
                            </div>

                            <Button
                              onClick={handleAddRule}
                              variant="secondary"
                              className="w-32 sm:mt-3.5 mb-2"
                            >
                              <span className="mr-1">+</span> Create Slot
                            </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 p-2 box box--stacked">
                            <div className="inline-flex items-center bg-gray-200 text-gray-700 rounded-md">
                              <span className="font-medium text-xs px-1 sm:px-2  py-1">
                                10 am - 11 am
                              </span>
                              <div className="self-stretch border-l border-gray-400"></div>
                              <button
                                className="px-2 sm:px-3 py-2 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                                aria-label="Remove time slot"
                              >
                                ×
                              </button>
                            </div>

                            <div className="inline-flex items-center bg-gray-200 text-gray-700 rounded-md">
                            <span className="font-medium text-xs px-1 sm:px-2  py-1">
                            10 am - 11 am
                              </span>
                              <div className="self-stretch border-l border-gray-400"></div>
                              <button
                                className="px-2 sm:px-3 py-2 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                                aria-label="Remove time slot"
                              >
                                ×
                              </button>
                            </div>

                            <div className="inline-flex items-center bg-gray-200 text-gray-700 rounded-md">
                            <span className="font-medium text-xs px-1 sm:px-2  py-1">
                            10 am - 11 am
                              </span>
                              <div className="self-stretch border-l border-gray-400"></div>
                              <button
                                className="px-2 sm:px-3 py-2 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                                aria-label="Remove time slot"
                              >
                                ×
                              </button>
                            </div>

                            <div className="inline-flex items-center bg-gray-200 text-gray-700 rounded-md">
                            <span className="font-medium text-xs px-1 sm:px-2  py-1">
                            10 am - 11 am
                              </span>
                              <div className="self-stretch border-l border-gray-400"></div>
                              <button
                                className="px-2 sm:px-3 py-2 text-gray-500 hover:text-gray-700 flex items-center justify-center"
                                aria-label="Remove time slot"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" flex justify-center">
                        <button className="flex items-center justify-center px-14 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                          <span className="mr-1">+</span> Add Availabilty
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-start sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-40 xl:mr-8">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">
                            Alot Packages to the Slots{" "}
                          </div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Required
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          Select your gender from the options.{" "}
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3  p-2 xl:mt-0 box box--stacked">
                      <div className="max-w-4xl mx-auto p-4">
                        {timeSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className="mb-4 flex flex-col sm:flex-row items-center space-x-3"
                          >
                            <div className="inline-flex text-xs mb-2 sm:mb-0 items-center bg-gray-200 text-gray-700 rounded-md flex-shrink-0">
                              <span className="font-medium px-2 py-2">
                                {slot.time}
                              </span>
                              <div className="self-stretch border-l border-gray-400"></div>
                              <button
                                className="px-3 py-2  text-gray-500 hover:text-gray-700 flex items-center justify-center"
                                aria-label="Remove time slot"
                              >
                                ×
                              </button>
                            </div>
                            <div className="flex flex-row gap-2">

                            <div className="flex   items-center flex-row">
                              <FormInput
                                type="text"
                                className="first:rounded-b-none w-14 text-xs first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10"
                                placeholder={"From"}
                              />
                              <FormSelect className="w-20  text-xs first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                                <option value="office">10 am</option>
                                <option value="home">11 am</option>
                              </FormSelect>
                            </div>

                            <div className="flex-grow">
                              <input
                                type="text"
                                value={slot.package}
                                onChange={(e) =>
                                  handlePackageChange(slot.id, e.target.value)
                                }
                                placeholder="Assign Package"
                                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                              />
                            </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className=" flex justify-center">
                        <button className="flex items-center justify-center px-14 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                          <span className="mr-1">+</span> Save
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-start sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-40 xl:mr-8">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Rules</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Required
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          Please provide a valid phone number where we can reach
                          you if needed.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="mb-2">
                        <FormInput type="text" placeholder="Type Here" />
                      </div>

                      <Button
                        onClick={handleAddRule}
                        className="w-full mt-3.5 mb-2 border-dashed border-slate-300 hover:bg-slate-50 dark:hover:bg-darkmode-400"
                      >
                        <span className="mr-1">+</span> Add Slots
                      </Button>

                      {rules.length === 0 && (
                        <p className="text-center text-gray-500">
                          No slots added yet.
                        </p>
                      )}

                      <div className="flex flex-col p-2 gap-2 box box--stacked">
                        {rules.map((rule, index) => (
                          <div
                            key={index}
                            className=" flex flex-row justify-center bg-slate-100 border-slate-300 border rounded py-1 px-2 flex items-start"
                          >
                            <span className="text-gray-500 mr-2 mt-1">•</span>
                            <div className="flex-grow">
                              <input
                                type="text"
                                value={rule}
                                onChange={(e) =>
                                  handleRuleChange(index, e.target.value)
                                }
                                className="w-full text-xs   bg-transparent border-none p-0 focus:ring-0 focus:outline-none text-gray-700"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveRule(index)}
                              className="text-gray-400 hover:text-gray-600 ml-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-col block pt-5 mt-5 xl:items-start sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-40 xl:mr-8">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Requirement </div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Required
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                          Please provide a valid phone number where we can reach
                          you if needed.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="mb-2">
                        <FormInput type="text" placeholder="Type Here" />
                      </div>

                      <Button
                        onClick={handleAddRule}
                        className="w-full mt-3.5 mb-2 border-dashed border-slate-300 hover:bg-slate-50 dark:hover:bg-darkmode-400"
                      >
                        <span className="mr-1">+</span> Add Slots
                      </Button>

                      {rules.length === 0 && (
                        <p className="text-center text-gray-500">
                          No slots added yet.
                        </p>
                      )}

                      <div className="flex flex-col p-2 gap-2 box box--stacked">
                        {rules.map((rule, index) => (
                          <div
                            key={index}
                            className=" flex flex-row justify-center bg-slate-100 border-slate-300 border rounded py-1 px-2 flex items-start"
                          >
                            <span className="text-gray-500 mr-2 mt-1">•</span>
                            <div className="flex-grow">
                              <input
                                type="text"
                                value={rule}
                                onChange={(e) =>
                                  handleRuleChange(index, e.target.value)
                                }
                                className="w-full text-xs   bg-transparent border-none p-0 focus:ring-0 focus:outline-none text-gray-700"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveRule(index)}
                              className="text-gray-400 hover:text-gray-600 ml-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-40 xl:mr-8">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Term & Condition</div>
                      </div>
                      <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                        Check this box if you want to enable exclusive access to
                        certain features or content on our platform. Check this
                        box if you want to enable exclusive access to certain
                        features or content on our platform.
                      </div>
                    </div>
                  </label>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormCheck>
                      <FormCheck.Input
                        id="checkbox-switch-1"
                        type="checkbox"
                        value=""
                      />
                      <FormCheck.Label
                        className="ml-3.5 text-slate-500 leading-relaxed"
                        htmlFor="checkbox-switch-1"
                      >
                        Opting to maintain exclusivity for your portfolio of
                        items on this platform can significantly boost your
                        earnings.
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>

                <div className="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
                  <Button
                    variant="outline-primary"
                    className="w-full px-4 border-primary/50 md:w-auto"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 xl:col-span-4">
            <div className="flex flex-col p-5 box box--stacked">
              <div className="flex flex-col gap-5">
                <div className="border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400 relative mt-3">
                  <div className="absolute left-0 px-3 ml-4 -mt-2 text-xs uppercase bg-white text-slate-500 dark:bg-darkmode-600">
                    <div className="-mt-px">User Details</div>
                  </div>
                  <div className="p-5 mt-2.5 flex flex-col gap-5">
                    <div className="flex items-center">
                      <Lucide
                        icon="Clock"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Name:</div>
                        <a
                          href=""
                          className="underline decoration-dotted decoration-primary/30 underline-offset-[3px]"
                        >
                          {users.fakeUsers()[0].name}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Phone Number:</div>
                        {users.fakeUsers()[0].phone}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Inbox"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Email:</div>
                        <div className="text-right truncate w-52">
                          {users.fakeUsers()[0].email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Map"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Location:</div>
                        {users.fakeUsers()[0].location}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clock"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Address:</div>
                        <a
                          href=""
                          className="flex items-center underline decoration-dotted decoration-primary/30 underline-offset-[3px]"
                        >
                          <Lucide
                            icon="MapPin"
                            className="w-3.5 h-3.5 mr-1.5"
                          />
                          View Address
                        </a>
                      </div>
                    </div>
                    <div className="mt-1.5">
                      <Button className="w-full border-primary/20 text-primary/80 hover:bg-slate-50">
                        <Lucide
                          icon="PenSquare"
                          className="stroke-[1.3] w-4 h-4 mr-2"
                        />{" "}
                        Change Status
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400 relative mt-3">
                  <div className="absolute left-0 px-3 ml-4 -mt-2 text-xs uppercase bg-white text-slate-500 dark:bg-darkmode-600">
                    <div className="-mt-px">Store Details</div>
                  </div>
                  <div className="p-5 mt-2.5 flex flex-col gap-5">
                    <div className="flex items-center">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Unique ID:</div>
                        STR-{_.random(1000000000, 9000000000)}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Calendar"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Name:</div>
                        Themeforest
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Phone Number:</div>
                        {users.fakeUsers()[0].phone}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clock"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Address:</div>
                        <a
                          href=""
                          className="flex items-center underline decoration-dotted decoration-primary/30 underline-offset-[3px]"
                        >
                          <Lucide
                            icon="MapPin"
                            className="w-3.5 h-3.5 mr-1.5"
                          />
                          View Address
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clock"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Status:</div>
                        <div className="flex items-center text-xs font-medium rounded-md text-success bg-success/10 border border-success/10 px-1.5 py-px mr-auto sm:mr-0">
                          <span className="-mt-px">Active</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-1.5">
                      <Button className="w-full border-primary/20 text-primary/80 hover:bg-slate-50">
                        <Lucide
                          icon="PenSquare"
                          className="stroke-[1.3] w-4 h-4 mr-2"
                        />{" "}
                        Change Status
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400 relative mt-3">
                  <div className="absolute left-0 px-3 ml-4 -mt-2 text-xs uppercase bg-white text-slate-500 dark:bg-darkmode-600">
                    <div className="-mt-px">Transaction Reports</div>
                  </div>
                  <div className="p-5 mt-2.5 flex flex-col gap-5">
                    <div className="flex items-center">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Daily Average:</div>$
                        {formatCurrency(_.random(10000000, 90000000))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Calendar"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Monthly Average:</div>$
                        {formatCurrency(_.random(10000000, 90000000))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clock"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Annually Average:</div>
                        ${formatCurrency(_.random(10000000, 90000000))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Rating Average:</div>(
                        {_.random(3, 4)}.{_.random(1, 5)}+)
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Calendar"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Total Products:</div>
                        {_.random(1000, 10000)}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clock"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">
                          Total Transactions:
                        </div>
                        {formatCurrency(_.random(10000000, 90000000))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Lucide
                        icon="Clipboard"
                        className="w-4 h-4 mr-2.5 stroke-[1.3] text-slate-500"
                      />
                      <div className="flex flex-col flex-wrap w-full sm:items-center sm:flex-row gap-y-1">
                        <div className="sm:mr-auto w-54">Active Disputes:</div>
                        {_.random(20, 100)}
                      </div>
                    </div>
                    <div className="mt-1.5">
                      <Button className="w-full border-primary/20 text-primary/80 hover:bg-slate-50">
                        <Lucide
                          icon="PenSquare"
                          className="stroke-[1.3] w-4 h-4 mr-2"
                        />{" "}
                        More Details
                      </Button>
                    </div>
                  </div>
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
