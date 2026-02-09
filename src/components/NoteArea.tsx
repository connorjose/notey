import { ReactNode } from 'react';

interface NoteAreaProps {
    children: ReactNode;
}   

function NoteArea({children}: NoteAreaProps): JSX.Element {
    return (
        <div className="p-4 flex flex-col m-auto w-full h-full gap-2 overflow-auto">
            {children}
        </div>
    );
}

export default NoteArea;