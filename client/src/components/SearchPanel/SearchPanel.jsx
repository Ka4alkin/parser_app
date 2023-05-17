import Form from 'react-bootstrap/Form';

import InputGroup from 'react-bootstrap/InputGroup';
import {getAllPosts} from "../../API.jsx";
import {Button} from "react-bootstrap";
import {useState} from "react";

const SearchPanel = ({setPosts, loadAllPosts, setShowPagination}) => {

    const [isResetBtnShown, setResetBtnShown] = useState(false)
    const _onSearch = (event) => {
        if (event.target.value.length >= 3) {
            setResetBtnShown(true)
            setShowPagination(false)
            getAllPosts({
                searchStr: event.target.value
            }).then(setPosts)
        }
    }

    return (
        <>
            <InputGroup className="mt-3 mb-3">
                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                <Form.Control
                    minLength={3}
                    aria-describedby="basic-addon1"
                    onChange={_onSearch}
                    placeholder="type more than 3 characters..."
                />
            </InputGroup>
            {isResetBtnShown && <Button onClick={() => {
                loadAllPosts()
                setResetBtnShown(false)
                setShowPagination(true)
            }
            } style={{marginLeft: '10px'}} variant="danger">reset</Button>}
        </>
    );
}

export default SearchPanel;