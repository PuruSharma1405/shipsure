
import { TextField } from "@mui/material";


interface MultiLineTextBoxProps {
    label: string;
    value: any;
    onChange: (e: any) => void;
}

export const MultiLineTextBox: React.FC<MultiLineTextBoxProps> = ({ label, value, onChange }) => {
    return (
        <>
            <TextField
                id="outlined-multiline-static"
                label={label}
                multiline
                rows={4}
                defaultValue={value}
                onChange={onChange}
            />

        </>
    );
};

