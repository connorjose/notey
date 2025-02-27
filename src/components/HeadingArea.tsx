// import { useState } from "react";
interface HeadAreaProps {
    title: string
}

function HeadArea({title}: HeadAreaProps): JSX.Element {

    return (
        <textarea className="heading-text resize-none text-3xl" defaultValue={title}></textarea>
    );

    // Heading of note area
    // Enlarged text area

}

export default HeadArea;
