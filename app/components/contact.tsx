"use client"
import { FormEvent, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import emailjs from '@emailjs/browser';


const Contact: React.FC = () => {

    const form = useRef<HTMLFormElement | null>(null);
    
    const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!form.current) return;
    
        const toastId = toast.loading("Sending...");
    
        try {
          await emailjs.sendForm("service_ur7yu2i", "template_n144do7", form.current, {
            publicKey: "fI-kdbmvULtUdHbWR",
          });
    
          toast.success("Email sent successfully!", { id: toastId });
          form.current.reset(); // Optional: Reset form after successful submission
        } catch (error) {
          toast.error("Failed to send email. Please try again.", { id: toastId });
          console.error("FAILED...", error);
        }
      };
    
    
   return (
    <section id="contact" className="container mx-auto target-section">
          <Toaster />
          <div className="relative flex items-top justify-center sm:items-center sm:pt-0">
        <div className=" w-full mx-auto md:px-8 lg:px-8 px-1">
            <div className="mt-8 ">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 mr-2  sm:rounded-lg">
                        <h1 className="text-4xl sm:text-5xl text-[var(--color-text-dark)] font-extrabold tracking-tight">
                            Get in touch
                        </h1>
                        <p className="text-normal text-lg sm:text-2xl font-medium text-gray-400 mt-2">
                            Fill in the form to start a conversation
                        </p>

                        <div className="flex items-center mt-8 text-gray-400">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                Kwamba Suleja, Niger State, Nigeria
                                Postal Code: 910101
                            </div>
                        </div>

                        <div className="flex items-center mt-4 text-gray-400">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                +234-815-789-9361 <br /> +234-703-295-8327 
                            </div>
                        </div>

                        <div className="flex items-center mt-2 text-gray-400">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                Bellohabib682@gmail.com
                            </div>
                        </div>
                    </div>

                    <form ref={form} onSubmit={sendEmail} className="p-6 flex flex-col justify-center text-[var(--color-text-dark)] " >


                        <div className="flex flex-col mt-2">
                            <label  about="email" className="">Name</label>
                            <input required type="name" name="from_name" id="name" placeholder="Full Name" className=" mt-2 py-3 px-3 rounded-lg  border border-gray-700  font-semibold focus:border-[var(--color-btn-primary)] focus:outline-none" />
                        </div>
                        <div className="flex flex-col mt-2">
                            <label  about="email" className="">Email</label>
                            <input required type="email" name="from_email" id="email" placeholder="Email" className=" mt-2 py-3 px-3 rounded-lg  border border-gray-700  font-semibold focus:border-[var(--color-btn-primary)] focus:outline-none" />
                        </div>

                        <div className="flex flex-col mt-2">
                            <label about="tel" className="">Number</label>
                            <input required type="tel" name="from_phone" id="tel" placeholder="Telephone Number" className=" mt-2 py-3 px-3 rounded-lg  border border-gray-700  font-semibold focus:border-[var(--color-btn-primary)] focus:outline-none" />
                        </div>

                        <div className="flex flex-col mt-2">
                            <label about="message" className="">Message</label>
                            <textarea required name="message" id="test" placeholder="  Input your message here" className=" mt-2 py-3 px-3 rounded-lg  border border-gray-700  font-semibold focus:border-[var(--color-btn-primary)] focus:outline-none" />
                        </div>

                        <button type="submit" className=" bg-[var(--color-btn-primary)]  cursor-pointer hover:bg-amber-300 text-[vr(-color-text-dark)] font-bold py-3 px-6 rounded-lg mt-3  transition ease-in-out duration-300">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </section>
  );
};

export default Contact;
