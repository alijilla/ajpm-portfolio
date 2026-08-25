import { ArrowLongUpIcon } from "@heroicons/react/24/outline";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedinIn,FaArrowUpLong } from "react-icons/fa6";
export default function Footer() {

    return(
        <footer>
            <hr></hr>
            <p>
                © 2026 Alyssa Jade P. Merjilla. All rights reserved.
            </p>
            <div className="flex flex-row justify-end gap-4 text-gray-600">
 <SiGithub className="h-5 w-5" />
 <FaLinkedinIn className="h-5 w-5" />
 <SiInstagram className="h-5 w-5" />
 <a href="#navbar">
                    <FaArrowUpLong  className="h-5 w-5" />
                </a>
            </div>
        </footer>
    )
}