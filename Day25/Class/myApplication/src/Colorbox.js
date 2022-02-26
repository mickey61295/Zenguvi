import { useState } from "react";


export function Colorbox() {
    const [color, setColor] = useState("Red");
    const styles = {
        fontSize: "24px",
        background: color
    };
    const [colorlist, setcolorList] = useState(["red", "green", "blue"]);
    return (
        <div>
            <input
                onChange={(event) => {
                    setColor(event.target.value)
                    // console.log(event.target);
                }}
                style={styles}
                placeholder="Enter a Color" />
        <button 
        onClick={() => {
            setcolorList([color, ...colorlist])
        } }
        >Add Color</button>
    
        {colorlist.map((item) => (
            <Small_box color={item} />
        ))}
        </div>
    );
}


export function Small_box({color}) {
    const styles = {
        background: color,
        width: "300px",
        height: "35px",
        marginTop: "10px"
    }
    return <div style={styles}></div>

}
