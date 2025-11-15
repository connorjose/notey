import { ReactNode } from 'react';

interface NoteAreaProps {
    children: ReactNode;
}   

function NoteArea({children}: NoteAreaProps): JSX.Element {
    return (
        <div className="p-7 flex flex-col m-auto min-w-max min-h-max gap-2">
            {children}
        </div>
    );
}

export default NoteArea;