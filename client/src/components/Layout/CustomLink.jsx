import {Link, useMatch} from "react-router-dom";

const CustomLink = ({children, to, ...props}) => {

    const match = useMatch(to)

    return (
        <Link
            to={to}
            style={{
                background: match ? 'inherit' : 'inherit',
                color: match ? 'rgb(214 65 65)' : '#b8b8b8',
                pointerEvents: match ? 'none' : 'all',
                borderRadius: match ? '5px' : 'none',
                margin: '0 20px',
                textDecoration: 'none'
            }}
        >
            {children}
        </Link>
    );
}

export default CustomLink;