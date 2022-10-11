import React from "react";
import { SiTwitter, SiGithub, SiDiscord } from "react-icons/si";

const Paops = (props: {handleComponent: any}) => {
    const {handleComponent} = props;
    return (
        <div className="pt-28 text-white min-h-[100vh] w-5/6 flex-column justify-start items-start">
            <div className="flex-col justify-start items-start w-full">
                <p className="text-2xl text-bold text-center">POAPs</p>
            </div>
        </div>
    );
}

export default Paops;