import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({isConfirmModalShown, setConfirmModalShown, modalTitle, modalContent, onDeletePost}) {


    const handleClose = () => setConfirmModalShown(false);

    return (
        <>
            <Modal
                show={isConfirmModalShown}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onDeletePost}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmModal;