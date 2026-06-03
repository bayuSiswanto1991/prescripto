import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <h2 className=" font-semibold text-gray-400 text-2xl text-center">
        CONTACT <span className=" font-semibold text-gray-600 text-2xl">US</span>
      </h2>

      <div className=" my-10 flex flex-col md:flex-row gap-10 ">
        <img src={assets.contact_image} alt="" className=" w-[560px]" />
        <div className=" flex flex-col gap-6 justify-center text-sm text-gray-600">
          <p className=" text-xl text-gray-700 font-medium">OUR OFFICE</p>
          <p>
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p>
            Tel: (415) 555-0132 <br />
            Email: greatstackdev@gmail.com
          </p>
          <p className=" text-xl text-gray-700 font-medium">CAREERS AT PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>
          <button className=" border px-8 py-4 border-black text-sm hover:bg-black hover:text-white w-fit">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
