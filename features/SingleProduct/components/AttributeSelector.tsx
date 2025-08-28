"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { IAttribute, IAttributeValue } from "../interface/interface";

interface AttributeSelectorProps {
    attribute: IAttribute;
    value: string;
    onChange: (value: string) => void;
    onAddValue?: (attributeId: string, newValue: IAttributeValue) => void; // برای افزودن مقدار جدید به backend یا state
}

export const AttributeSelector = ({ attribute, value, onChange, onAddValue }: AttributeSelectorProps) => {
    const [showNewInput, setShowNewInput] = useState(false);
    const [newValue, setNewValue] = useState("");

    const handleSelectChange = (val: string) => {
        if (val === "__add_new__") {
            setShowNewInput(true);
            onChange("");
        } else {
            setShowNewInput(false);
            onChange(val);
        }
    };

    const handleAddNewValue = () => {
        if (!newValue.trim()) return;

        const newVal: IAttributeValue = {
            name: newValue.trim(),
            slug: newValue.trim().toLowerCase().replace(/\s+/g, "-"),
        };

        onChange(newVal.slug);
        setShowNewInput(false);
        setNewValue("");

        if (onAddValue) onAddValue(attribute._id, newVal);
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium">{attribute.name}</label>
            <Select onValueChange={handleSelectChange} value={value}>
                <SelectTrigger>
                    <SelectValue placeholder="انتخاب مقدار" />
                </SelectTrigger>
                <SelectContent>
                    {attribute.values.map((v) => (
                        <SelectItem key={v.slug} value={v.slug}>
                            {v.name}
                        </SelectItem>
                    ))}
                    <SelectItem value="__add_new__">➕ افزودن مقدار جدید</SelectItem>
                </SelectContent>
            </Select>

            {showNewInput && (
                <div className="mt-1 flex gap-2">
                    <Input placeholder="مقدار جدید..." value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                    <button type="button" className="rounded bg-blue-600 px-3 py-1 text-white" onClick={handleAddNewValue}>
                        اضافه
                    </button>
                </div>
            )}
        </div>
    );
};
