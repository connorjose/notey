import { ReactNode } from 'react';

interface NoteAreaProps {
    children: ReactNode;
}   

function NoteArea({children}: NoteAreaProps): JSX.Element {
    return (
        <div className="note-area">
            {children}
        </div>
    );
}

export default NoteArea;