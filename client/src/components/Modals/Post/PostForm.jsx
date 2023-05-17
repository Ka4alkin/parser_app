import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import moment from "moment";


function PostForm({formTitle, edit, isPostFormShown, setPostFormShown, onSave, post}) {

    const [title, setTitle] = useState(post?.title)
    const [link, setLink] = useState(post?.link)
    const [description, setDescription] = useState(post?.description)
    const [category, setCategory] = useState(post?.category?.length && post.category.join(', '))
    const [pubDate, setPubDate] = useState(post?.pubDate && moment(new Date(post.pubDate)).format('YYYY-MM-DD'))
    const [creator, setCreator] = useState(post?.['dc:creator'])

    const handleClose = () => setPostFormShown(false);

    const toString = (value) => {
        if (value) return value.toString()
        else return null
    }

    return (<>
        <Modal show={isPostFormShown} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{formTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => onSave(event, {
                    title,
                    link,
                    description,
                    category: category?.length ? category.split(',').map(s => s.trim()) : [],
                    pubDate,
                    ['dc:creator']: creator
                })}>

                    <Form.Group className="mb-3">
                        <Form.Label>title</Form.Label>
                        <Form.Control
                            value={toString(title)}
                            required
                            minLength={3}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            id="title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>link</Form.Label>
                        <Form.Control
                            value={toString(link)}
                            onChange={(e) => setLink(e.target.value)}
                            type="text"
                            id="link"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>description</Form.Label>
                        <Form.Control
                            as="textarea"
                            style={{height: '100px'}}
                            value={toString(description)}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            id="description"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>category</Form.Label>
                        <Form.Control
                            value={toString(category)}
                            onChange={(e) => {
                                let categoryArr = []
                                let value = e.target.value
                                if (value) {
                                    let itemList = value.trim().split(',')
                                    itemList.forEach(item => {
                                        categoryArr.push(item)
                                    })
                                }

                                setCategory(value)
                            }}
                            type="text"
                            id="category"
                        />
                        <span><i>enter values throw semicolon</i></span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>pubDate</Form.Label>
                        <Form.Control
                            value={toString(pubDate)}
                            onChange={(e) => setPubDate(e.target.value)}
                            min={!edit ? moment(new Date()).format('YYYY-MM-DD') : null}
                            type="date"
                            id="pubDate"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>creator</Form.Label>
                        <Form.Control
                            value={toString(creator)}
                            onChange={(e) => setCreator(e.target.value)}
                            type="text"
                            id="creator"
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type={'submit'} variant="primary">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    </>);
}

export default PostForm;