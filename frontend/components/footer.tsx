import Image from "next/image";
export const Footer = () => {
  return (
    <div className="relative">
      <footer className="bg-[#ffe9d0]  bottom-[0] dark:bg-black z-[99999] absolute left-0 right-0 ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href=""
              className="flex items-center mt-0  sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Image
                src={"/png/logo-footer.png"}
                alt={"Logo"}
                width={"100"}
                height={"100"}
                className="w-[350px] mt-0"
              />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-white sm:mx-auto dark:border-orange-400 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="" className="hover:underline">
              TokenForge™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};
