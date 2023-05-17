import SpinnerBootstrap from 'react-bootstrap/Spinner';

const Spinner = ()=> {
    return (
        <SpinnerBootstrap animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </SpinnerBootstrap>
    );
}
export default Spinner;