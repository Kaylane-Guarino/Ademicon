import React from "react";
import ListClient from "../components/ListClient";
import InitialContent from "../components/InitialContent";

const Content = ({ edit, id, selectedOption = "A Ademicon" }) => {
    return (
        <div className="w-full h-5/7 p-5 bg-white drop-shadow-sm">
            {selectedOption === "A Ademicon" ? (
                <InitialContent />
            ) : (
                <ListClient edit={edit} id={id} />
            )}
        </div>
    );
};

export default Content;
