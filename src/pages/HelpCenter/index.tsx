import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import users from "@/fakers/users";
import projects from "@/fakers/projects";
import projectDetails from "@/fakers/project-details";
import { FormSelect, FormInput, FormCheck, FormTextarea } from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import Button from "@/components/Base/Button";
import { Tab } from "@/components/Base/Headless";
import _ from "lodash";
import { useState } from "react";


        const Main = () => {
          const [searchTerm, setSearchTerm] = useState('');
          
          // Sample category data
          const categories = [
            {
              id: 1,
              title: "Getting Started",
              links: [
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels"
              ]
            },
            {
              id: 2,
              title: "Getting Started",
              links: [
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels"
              ]
            },
            {
              id: 3,
              title: "Getting Started",
              links: [
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels"
              ]
            },
            {
              id: 4,
              title: "Getting Started",
              links: [
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels"
              ]
            },
            {
              id: 5,
              title: "Getting Started",
              links: [
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels"
              ]
            },
            {
              id: 6,
              title: "Getting Started",
              links: [
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels",
                "Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels"
              ]
            }
          ];
        
          const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
          };
        
          const handleSubmit = (e) => {
            e.preventDefault();
            // Handle search functionality
            console.log("Searching for:", searchTerm);
          };
        
          return (
            <div className="flex flex-col min-h-screen">
              {/* Hero Section */}
              <header className="relative rounded-2xl m-3 mx-4 text-white overflow-hidden">
  <div className="container mx-auto">
    <div className="flex flex-col md:flex-row items-center relative">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-8 md:p-8 z-10">
        <h1 className="text-4xl font-bold mb-2">How Can We Help You?</h1>
        <p className="mb-6 text-xs">Navigate Through Our Help Center for Solutions, Tips, and Direct Support Channels</p>
        
        <div className="relative mt-3">
            <FormInput
              type="text"
              placeholder="Search Your Keyword"
              className="sm:py-3"
            />
            <Button
              variant="primary"
              size="sm"
              className="w-full sm:w-auto sm:absolute inset-y-0 right-0 pl-3.5 pr-4 my-auto mt-2 sm:mt-auto mr-2 h-9 sm:h-8"
            >
              <Lucide
                icon="Search"
                className="w-3.5 h-3.5 mr-1.5 stroke-[1.3]"
              />
              Search
            </Button>
          </div>
      </div>
      
      {/* Right Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center min-h-full z-10">
        <div className="flex justify-center items-center h-64">
          <img src="src/assets/images/myImages/contact_banner.png" alt="Help Center Illustration" className="w-64" />
        </div>
      </div>
      
      {/* Background with Diagonal Divider */}
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full z-0">
        {/* Left side with gradient */}
        <div className="absolute top-0 left-0 w-3/5 h-full bg-gradient-to-r from-[#4A0F38] to-[#913674]"></div>
        
        {/* Right side with solid color */}
        <div className="absolute top-0 right-0 w-2/5 h-full"  style={{backgroundColor:'#913674'}}></div>
        
        {/* Diagonal divider */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 right-0 z-1 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div style={{backgroundColor:"#8D4275"}} className="absolute top-0 right-0 w-1/2 h-full transform origin-bottom-left skew-x-[-12deg]"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
        
              {/* Categories Grid */}
              <section className="py-10 px-4">
                <div className="container mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <div key={category.id} className="box box--stacked p-6 shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-bold mb-4">{category.title}</h2>
                        <ul className="space-y-3">
                          {category.links.map((link, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-purple-800 mr-2">•</span>
                              <p className="text-gray-600 text-sm">{link}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
        
              {/* Contact Form */}
              <section className="py-10 px-4 bg-gray-50">
                <div className="container mx-auto">
                  <div className="flex flex-col md:flex-row bg-white p-4 rounded-lg shadow-md overflow-hidden">
                    <div  className="w-full bg-gradient-to-t from-[#3D0029] to-[#A3006F] md:w-1/3 rounded-2xl text-white p-8">
                      <h2 className="text-2xl font-bold mb-4">Connect Now</h2>
                      <p className="mb-6">We'd love to hear from you! Whether you have questions, need support, or want to collaborate, feel free to reach out to us.</p>
                      
                      <div className="flex justify-center mt-6">
                        <img src="src/assets/images/myImages/contact_banner1.png" alt="Support Illustration" className="w-48" />
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/3 p-8">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Your Name</label>
                            <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        type="text"
                        placeholder={users.fakeUsers()[0].name}
                      />
                    </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Email</label>
                            <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        type="text"
                        placeholder={users.fakeUsers()[0].email}
                      />
                    </div>                          </div>
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">Mobile Number</label>
                            <div className="flex">
                              <div className="bg-gray-100 border border-r-0 rounded-l p-2 flex items-center">
                                <span className="text-green-600 font-bold">+91</span>
                              </div>
                              <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        type="text"
                        placeholder={users.fakeUsers()[0].phone}
                      />
                    </div>                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Message</label>
                          <div className="flex-1 w-full mt-3 xl:mt-0">
                          <FormTextarea
                  className="-mb-1.5 pr-16 pb-24 rounded-xl resize-none"
                  placeholder="Type a message..."
                />
                    </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
        
              <footer  className="bg-gradient-to-t from-[#3D0029] to-[#A3006F]  text-white pt-10 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          <div>
            <h3 className="font-bold mb-4">Logo</h3>
            <div className="flex space-x-2 mt-4">
              <a href="#" className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-purple-800">f</span>
              </a>
              <a href="#" className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-purple-800">t</span>
              </a>
              <a href="#" className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-purple-800">in</span>
              </a>
              <a href="#" className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-purple-800">g</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Link</h3>
            <ul className="space-y-2">
              <li><a href="#" className="flex items-center hover:underline"><span className="text-yellow-300 mr-2">›</span> Home</a></li>
              <li><a href="#" className="flex items-center hover:underline"><span className="text-yellow-300 mr-2">›</span> About Us</a></li>
              <li><a href="#" className="flex items-center hover:underline"><span className="text-yellow-300 mr-2">›</span> Services</a></li>
              <li><a href="#" className="flex items-center hover:underline"><span className="text-yellow-300 mr-2">›</span> Product</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Policy</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="block hover:underline">
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-300 mr-2">›</span>
                    <span>People Saying About Footer.</span>
                  </div>
                  <div className="text-sm text-gray-300 ml-4">8 Nov, 2021</div>
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-300 mr-2">›</span>
                    <span>People Saying About Footer.</span>
                  </div>
                  <div className="text-sm text-gray-300 ml-4">8 Nov, 2021</div>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </span>
                <span>Shikohabad, Uttar Pradesh</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </span>
                <span>connect@swastibharat.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-300 mr-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </span>
                <span>91+585-656-658</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 pb-6 text-center">
          <p>© 2023 All rights reserved</p>
        </div>
      </div>
      
      {/* Wave Pattern */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <svg className="w-full" viewBox="0 0 1425 83" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M-75 16.8842V82.8842H99V16.8842C85 17.3842 75 18.032 58 10.8603C22.5 -4.1158 0.5 -3.11585 -34 10.8603C-49.5929 17.1771 -68 16.7175 -75 16.8842Z" fill="white" fillOpacity="0.08"/>
          <path d="M99 16.8842V82.8842H273V16.8842C259 17.3842 249 18.032 232 10.8603C196.5 -4.1158 174.5 -3.11585 140 10.8603C124.407 17.1771 106 16.7175 99 16.8842Z" fill="white" fillOpacity="0.08"/>
          <path d="M273 16.8842V82.8842H447V16.8842C433 17.3842 423 18.032 406 10.8603C370.5 -4.1158 348.5 -3.11585 314 10.8603C298.407 17.1771 280 16.7175 273 16.8842Z" fill="white" fillOpacity="0.08"/>
          <path d="M447 16.8842V82.8842H621V16.8842C607 17.3842 597 18.032 580 10.8603C544.5 -4.1158 522.5 -3.11585 488 10.8603C472.407 17.1771 454 16.7175 447 16.8842Z" fill="white" fillOpacity="0.08"/>
          <path d="M621 16.8842V82.8842H795V16.8842C781 17.3842 771 18.032 754 10.8603C718.5 -4.1158 696.5 -3.11585 662 10.8603C646.407 17.1771 628 16.7175 621 16.8842Z" fill="white" fillOpacity="0.08"/>
          <path d="M795 16.8842V82.8842H969V16.8842C955 17.3842 945 18.032 928 10.8603C892.5 -4.1158 870.5 -3.11585 836 10.8603C820.407 17.1771 802 16.7175 795 16.8842Z" fill="white" fillOpacity="0.08"/>
          <path d="M969 16.8842V82.8842H1143V16.8842C1129 17.3842 1119 18.032 1102 10.8603C1066.5 -4.1158 1044.5 -3.11585 1010 10.8603C994.407 17.1771 976 16.7175 969 16.8842Z" fill="white" fillOpacity="0.08"/>
          <path d="M1143 16.8842V82.8842H1317V16.8842C1303 17.3842 1293 18.032 1276 10.8603C1240.5 -4.1158 1218.5 -3.11585 1184 10.8603C1168.41 17.1771 1150 16.7175 1143 16.8842Z" fill="white" fillOpacity="0.08"/>
          <path d="M1317 16.8842V82.8842H1491V16.8842C1477 17.3842 1467 18.032 1450 10.8603C1414.5 -4.1158 1392.5 -3.11585 1358 10.8603C1342.41 17.1771 1324 16.7175 1317 16.8842Z" fill="white" fillOpacity="0.08"/>
        </svg>
      </div>
    </footer>
            </div>
          );
        };
        
 
export default Main;