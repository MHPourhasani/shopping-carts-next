import MultiSelect from "./MultiSelect";
import colors from "@/assets/json/colors.json";

interface Props {
    defaultColors?: any[];
    onChange: (selected: any[]) => void;
}

const ColorPicker = (props: Props) => {
    const { defaultColors, onChange } = props;

    return (
        <div className="flex flex-col justify-between gap-2">
            <label className="dark:text-secondary-100">رنگ ها</label>
            <MultiSelect
                defaultValues={defaultColors?.map((color) => {
                    return { title: color.name, color: color.hex };
                })}
                options={colors.map((c) => {
                    return { title: c.name, color: c.hex };
                })}
                onChange={(selected) =>
                    onChange(
                        selected.map((item) => {
                            return { name: item.title, hex: item.color! };
                        }),
                    )
                }
            />
        </div>
    );
};

export default ColorPicker;
