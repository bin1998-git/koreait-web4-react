import UseRef01 from "./04-UseRef/UseRef01";
import UseRef02 from "./04-UseRef/UseRef02";
import Emotion01 from "./Emotion/Emotion01";
import Emotion02 from "./Emotion/Emotion02";
import Router01 from "./ReactRouter/Router01/Router01";
import Router02 from "./ReactRouter/Router02/Router02";
import Router03 from "./ReactRouter/Router03.jsx/Router03";
import Router04 from "./ReactRouter/Router04/Router04";
import Router05 from "./ReactRouter/Router05/Router05";
import Zustand01 from "./Zustand/Zustand01";
import Zustand02 from "./Zustand/Zustand02";


export default function Study() {
    const stateStudy = {
        1: <UseRef01 />,
        2: <UseRef02 />,
        3: <Emotion01 />,
        4: <Emotion02 />,
        5: <Router01 />,
        6: <Router02 />,
        7: <Router03 />,
        8: <Router04 />,
        9: <Router05 />,
        10: <Zustand01 />,
        11: <Zustand02 />
    };


  return stateStudy[11];
}
