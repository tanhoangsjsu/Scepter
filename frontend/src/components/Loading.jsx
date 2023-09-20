import HashLoader from "react-spinners/HashLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/react";
import '../App.css';

const Loading = (props) => {
    const { loadingType, color, size, loading } = props;

    const homepageLoading = css`
    display: block;
    margin: 0 auto;
    `;
    return ( 
    <>
    <div className="loading-container">
        {loadingType === "HashLoader" && (
            <HashLoader
                color={color}
                loading={loading}
                size={size}
                css={homepageLoading}
            />
        )}
        {loadingType === "PacmanLoader" && (
            <PacmanLoader
                color={color}
                loading={loading}
                size={size}
                css={homepageLoading}
            />
        )}
    </div>
    </>
    );
}
export default Loading;