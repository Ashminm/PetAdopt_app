import React from "react";
import HowToAdopt from "./HowToAdopt";
import DirectCon from "./DirectCon";
import Dashboard from "./Dashboard";
function Adopt() {
    return (
        <div>
            <div className="">
                <Dashboard/>
            </div>
            <div>
                <HowToAdopt />
            </div>
            <div>
                <DirectCon/>
            </div>
        </div>
    );
}

export default Adopt;
