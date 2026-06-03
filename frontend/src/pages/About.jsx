import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      {/* JUDUL */}
      <h2 className=" font-semibold text-gray-400 text-2xl text-center">
        ABOUT <span className=" font-semibold text-gray-600 text-2xl">US</span>
      </h2>

      {/* ABOUT SECTION */}
      <div className=" my-10 flex flex-col md:flex-row gap-12 ">
        <img src={assets.about_image} alt="" className=" w-[438px]" />
        <div className="flex flex-col gap-6 justify-center text-sm text-gray-600">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver
            superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <p className="text-gray-700 font-medium">Our Vision</p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to
            access the care you need, when you need it.
          </p>
        </div>
      </div>

      <h2 className=" font-semibold text-gray-400 text-2xl mb-12 ">
        WHY <span className=" font-semibold text-gray-600 text-2xl">CHOOSE US</span>
      </h2>

      <div className="flex flex-col md:flex-row ">
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-16 text-sm hover:bg-primary hover:text-white transition-all">
          <div>
            <p className=" mb-2 text-gray-700">EFFICIENCY:</p>
            <p className=" text-xs text-gray-400">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
        </div>

        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-16 text-sm hover:bg-primary hover:text-white transition-all">
          <div>
            <p className="mb-2 text-gray-700">CONCENIENCE:</p>
            <p className=" text-xs text-gray-400">Access to a network of trusted healthcare professionals in your area.</p>
          </div>
        </div>

        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-16 text-sm hover:bg-primary hover:text-white transition-all">
          <div>
            <p className="mb-2 text-gray-700">PERSONALIZATION:</p>
            <p className=" text-xs text-gray-400">Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
