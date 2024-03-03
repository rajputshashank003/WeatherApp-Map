import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function ThemeButton ({ColorValue, updateBgColor}) {

    return (
        <>
            <Switch 
            style={{color: ColorValue.bgColor === 'white' ? "#242424" : "white" }} 
            onChange={updateBgColor} 
            {...label} 
            defaultChecked
        />
        <span style={{color: ColorValue.bgColor === 'white' ? "black" : "white", fontFamily:"Sans-Serif"}}>
            Switch to {ColorValue.bgColor === 'white' ? "Dark" : "Bright"}  
        </span>
        </>
    );
};
