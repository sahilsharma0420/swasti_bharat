import "@/assets/css/pages/landing-page.css";
import Lucide, { icons } from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";

import users from "@/fakers/users";

import Button from "@/components/Base/Button";

function Main() {
  return (
    <>
      <div className="w-full mt-8">
  <div className="flex overflow-x-auto pb-6 gap-5 hide-scrollbar">
    {users.fakeUsers().map((user, index) => (
      <div key={index} className="p-4 min-w-[200px] md:min-w-[250px] lg:min-w-[300px] box box--stacked">
        <div className="flex flex-col items-start">
          <div className="w-full">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-xl border-[3px] border-slate-200/70">
              <img
                className="w-full h-full object-cover"
                alt="User Profile"
                src={user.photo}
              />
            </div>
          </div>
          <div className="mt-3.5 text-xl font-bold">{user.name}</div>
          <div className="flex justify-center items-center">
            <div className="mt-1 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Lucide
                  key={i}
                  icon="Star"
                  className="w-3.5 h-3.5 mr-1 text-pending fill-pending/30"
                />
              ))}
            </div>
          </div>
          <div className="mt-2 text-base text-justify font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis totam harum corrupti, odio, quis, perferendis officiis quos itaque dolorem molestiae quod iusto.
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

      <div className="w-full mt-8 ">
  {/* Scrollable container */}
  <div className="flex overflow-x-auto pb-6 gap-5 hide-scrollbar">
    {/* Card 1 - Purple */}
    <div
      style={{ width: "212px", height: "259px", flex: "0 0 auto" }}
      className="rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div
        style={{ backgroundColor: "#F9EBFF" }}
        className="relative h-full"
      >
        {/* Wave structure */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <svg
            width="212"
            height="159"
            viewBox="0 0 212 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117.5 96.07C111 136.07 52.5 163.07 2.00001 158.07C-25.6142 158.07 -6.00062 28.6844 -6.00062 1.07015C-6.00062 -26.5441 195 -54.9299 211.5 6.57004C211.5 75.57 125.95 44.07 117.5 96.07Z"
              fill="#EACBF8"
            />
          </svg>
        </div>

        {/* Bottom section with text */}
        <div className="relative pt-8 pb-8 px-6 flex items-center justify-center h-72">
          <h2 className="text-3xl font-bold text-gray-900 mt-24">
            Diabetes
          </h2>
        </div>
      </div>

      {/* Top section with circular image */}
      <div className="absolute top-4 left-4 z-50">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src="src/assets/images/users/user1-100x100.jpg"
          alt="User"
        />
      </div>
    </div>

    {/* Card 2 - Green */}
    <div
      style={{ width: "212px", height: "259px", flex: "0 0 auto" }}
      className="rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div
        style={{ backgroundColor: "#F0FFDB" }}
        className="relative h-full"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <svg
            width="212"
            height="159"
            viewBox="0 0 212 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117.5 96.07C111 136.07 52.5 163.07 2.00001 158.07C-25.6142 158.07 -6.00062 28.6844 -6.00062 1.07015C-6.00062 -26.5441 195 -54.9299 211.5 6.57004C211.5 75.57 125.95 44.07 117.5 96.07Z"
              fill="#D4EEB1"
            />
          </svg>
        </div>
        <div className="relative pt-8 pb-8 px-6 flex items-center justify-center h-72">
          <h2 className="text-3xl font-bold text-gray-900 mt-24">
            Diabetes
          </h2>
        </div>
      </div>
      <div className="absolute top-4 left-4 z-50">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src="src/assets/images/users/user1-100x100.jpg"
          alt="User"
        />
      </div>
    </div>

    {/* Card 3 - Orange */}
    <div
      style={{ width: "212px", height: "259px", flex: "0 0 auto" }}
      className="rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div
        style={{ backgroundColor: "#FFE7C4" }}
        className="relative h-full"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <svg
            width="212"
            height="159"
            viewBox="0 0 212 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117.5 96.07C111 136.07 52.5 163.07 2.00001 158.07C-25.6142 158.07 -6.00062 28.6844 -6.00062 1.07015C-6.00062 -26.5441 195 -54.9299 211.5 6.57004C211.5 75.57 125.95 44.07 117.5 96.07Z"
              fill="#FFCB81"
            />
          </svg>
        </div>
        <div className="relative pt-8 pb-8 px-6 flex items-center justify-center h-72">
          <h2 className="text-3xl font-bold text-gray-900 mt-24">
            Diabetes
          </h2>
        </div>
      </div>
      <div className="absolute top-4 left-4 z-50">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src="src/assets/images/users/user1-100x100.jpg"
          alt="User"
        />
      </div>
    </div>

    {/* Card 4 - Blue */}
    <div
      style={{ width: "212px", height: "259px", flex: "0 0 auto" }}
      className="rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div
        style={{ backgroundColor: "#C6DCFF" }}
        className="relative h-full"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <svg
            width="212"
            height="159"
            viewBox="0 0 212 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117.5 96.07C111 136.07 52.5 163.07 2.00001 158.07C-25.6142 158.07 -6.00062 28.6844 -6.00062 1.07015C-6.00062 -26.5441 195 -54.9299 211.5 6.57004C211.5 75.57 125.95 44.07 117.5 96.07Z"
              fill="#96BEFF"
            />
          </svg>
        </div>
        <div className="relative pt-8 pb-8 px-6 flex items-center justify-center h-72">
          <h2 className="text-3xl font-bold text-gray-900 mt-24">
            Diabetes
          </h2>
        </div>
      </div>
      <div className="absolute top-4 left-4 z-50">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src="src/assets/images/users/user1-100x100.jpg"
          alt="User"
        />
      </div>
    </div>

    {/* Card 5 - Purple */}
    <div
      style={{ width: "212px", height: "259px", flex: "0 0 auto" }}
      className="rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div
        style={{ backgroundColor: "#F9EBFF" }}
        className="relative h-full"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <svg
            width="212"
            height="159"
            viewBox="0 0 212 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117.5 96.07C111 136.07 52.5 163.07 2.00001 158.07C-25.6142 158.07 -6.00062 28.6844 -6.00062 1.07015C-6.00062 -26.5441 195 -54.9299 211.5 6.57004C211.5 75.57 125.95 44.07 117.5 96.07Z"
              fill="#EACBF8"
            />
          </svg>
        </div>
        <div className="relative pt-8 pb-8 px-6 flex items-center justify-center h-72">
          <h2 className="text-3xl font-bold text-gray-900 mt-24">
            Diabetes
          </h2>
        </div>
      </div>
      <div className="absolute top-4 left-4 z-50">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src="src/assets/images/users/user1-100x100.jpg"
          alt="User"
        />
      </div>
    </div>

    {/* Card 6 - Green with orange wave */}
    <div
      style={{ width: "212px", height: "259px", flex: "0 0 auto" }}
      className="rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div
        style={{ backgroundColor: "#F0FFDB" }}
        className="relative h-full"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <svg
            width="212"
            height="159"
            viewBox="0 0 212 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117.5 96.07C111 136.07 52.5 163.07 2.00001 158.07C-25.6142 158.07 -6.00062 28.6844 -6.00062 1.07015C-6.00062 -26.5441 195 -54.9299 211.5 6.57004C211.5 75.57 125.95 44.07 117.5 96.07Z"
              fill="#FFCB81"
            />
          </svg>
        </div>
        <div className="relative pt-8 pb-8 px-6 flex items-center justify-center h-72">
          <h2 className="text-3xl font-bold text-gray-900 mt-24">
            Diabetes
          </h2>
        </div>
      </div>
      <div className="absolute top-4 left-4 z-50">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src="src/assets/images/users/user1-100x100.jpg"
          alt="User"
        />
      </div>
    </div>

    {/* Card 7 - Orange */}
    <div
      style={{ width: "212px", height: "259px", flex: "0 0 auto" }}
      className="rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div
        style={{ backgroundColor: "#FFE7C4" }}
        className="relative h-full"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <svg
            width="212"
            height="159"
            viewBox="0 0 212 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117.5 96.07C111 136.07 52.5 163.07 2.00001 158.07C-25.6142 158.07 -6.00062 28.6844 -6.00062 1.07015C-6.00062 -26.5441 195 -54.9299 211.5 6.57004C211.5 75.57 125.95 44.07 117.5 96.07Z"
              fill="#FFCB81"
            />
          </svg>
        </div>
        <div className="relative pt-8 pb-8 px-6 flex items-center justify-center h-72">
          <h2 className="text-3xl font-bold text-gray-900 mt-24">
            Diabetes
          </h2>
        </div>
      </div>
      <div className="absolute top-4 left-4 z-50">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src="src/assets/images/users/user1-100x100.jpg"
          alt="User"
        />
      </div>
    </div>

    {/* Card 8 - Blue */}
    <div
      style={{ width: "212px", height: "259px", flex: "0 0 auto" }}
      className="rounded-3xl overflow-hidden shadow-lg relative"
    >
      <div
        style={{ backgroundColor: "#C6DCFF" }}
        className="relative h-full"
      >
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
          <svg
            width="212"
            height="159"
            viewBox="0 0 212 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M117.5 96.07C111 136.07 52.5 163.07 2.00001 158.07C-25.6142 158.07 -6.00062 28.6844 -6.00062 1.07015C-6.00062 -26.5441 195 -54.9299 211.5 6.57004C211.5 75.57 125.95 44.07 117.5 96.07Z"
              fill="#96BEFF"
            />
          </svg>
        </div>
        <div className="relative pt-8 pb-8 px-6 flex items-center justify-center h-72">
          <h2 className="text-3xl font-bold text-gray-900 mt-24">
            Diabetes
          </h2>
        </div>
      </div>
      <div className="absolute top-4 left-4 z-50">
        <img
          className="w-24 h-24 rounded-full shadow-md"
          src="src/assets/images/users/user1-100x100.jpg"
          alt="User"
        />
      </div>
    </div>
  </div>
</div>

{/* Add this CSS to your stylesheet to hide scrollbar but keep scrolling functionality */}
<style jsx>{`
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`}</style>
    </>
  );
}
export default Main;
