"use client";
import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface Props {
    value: string;
    onChange: (content: string) => void;
}

const TextEditor = ({ value, onChange }: Props) => {
    const editor = useRef<any>(null);

    const config = useMemo(
        () => ({
            editor: {},
            uploader: {
                insertImageAsBase64URI: true,
                imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"], // this line is not much important , use if you only strictly want to allow some specific image format
            },
        }),
        [],
    );

    return (
        <div className="flex w-full flex-col gap-4">
            <label className="dark:text-secondary-100">متن</label>
            {/* "https://www.soubhagyajit.com/blogs/adding-Jodit-js-:-rich-text-editor-to-a-react-(next.js)-application" */}
            <JoditEditor
                ref={editor}
                value={value}
                // @ts-ignore
                config={config}
                onChange={onChange}
                className="w-full bg-white dark:bg-secondary-700"
            />
        </div>
    );
};

export default TextEditor;
