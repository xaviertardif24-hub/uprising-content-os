import React from 'react';
import BlockEditor from '../components/editor/BlockEditor';

const BlockEditorDemo = () => {
    return (
        <div className="h-full animate-in fade-in duration-500 overflow-y-auto pt-10 px-8">
            <BlockEditor />
        </div>
    );
};

export default BlockEditorDemo;
