import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="mx-8 md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logo} alt="" className="w-[217px] mb-8" />
          <p className="text-gray-600 w-full leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className=" flex flex-col gap-4 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Contact us</li>
            <li className="hover:text-black cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className=" flex flex-col gap-4 text-sm text-gray-600">
            <li className="hover:text-black cursor-pointer">+1-212-456-7890</li>
            <li className="hover:text-black cursor-pointer">greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className=" py-6 text-sm text-gray-600 text-center ">Copyright © 2024 GreatStack - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
