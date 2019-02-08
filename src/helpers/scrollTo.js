import { scroller } from "react-scroll";

const scrollTo = (nameElement) => {
    scroller.scrollTo(nameElement, {
        duration: 700,
        delay: 200,
        offset: 0,
        smooth: true
    });
};

export default scrollTo