
import { EnvelopeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedinIn} from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import {heroData} from "@/data/hero";
import { Button } from "@/components/ui/button";
export default function Contact (){
    return (
        <section id="contact" className="flex flex-row gap-2">
        
            <div>  
            <p>{heroData.cta}</p>
            
            <div className="flex flex-wrap">
            <SiGithub className="h-5 w-5" />
            <FaLinkedinIn className="h-5 w-5" />
            <SiInstagram className="h-5 w-5" />
            <SlSocialFacebook className="h-5 w-5" />
                <a href="#Contact">
                  <EnvelopeIcon className="h-5 w-5 inline mr-2" />
                </a>
                <a className="w-fit text-xs text-gray-600 rounded-md p-2 lowercase" href="#Resume">
                  <ArrowDownTrayIcon className="h-3 w-3 inline mr-2" />
                  resume
                </a>
                </div>
           </div>           
           <div>
            <form className="flex flex-col">
            <label>Name</label>
            <input></input>
            <label>Email</label>
            <input></input>
            <label>Message</label>
            <textarea></textarea>
           </form> 
           <Button>Submit</Button>
           </div>
        </section>
    );
}