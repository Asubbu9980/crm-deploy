import React from 'react';
import Styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';
import PropTypes from 'prop-types';


const ModalBody = Styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 4px; 
    max-height: 96%;
    overflow: auto;
`

const CrmModel = (props) => {
    const { children, width = 500, show = false, hideBackdrop = false, title, onSubmit, onClose,
        cancelLabel = 'Cancel', submitLabel = 'Submit', showModalBody = true, showCloseIcon = true,
        showSubmitButton = true, showCancelButton = true, showFooter = true } = props;
    return (
        <div>
            <Modal open={show} hideBackdrop={hideBackdrop} style={{ overflow: 'auto' }}>
                <ModalBody width={width} maxWidth={'98%'}>
                    <Box className='d-flex justify-content-between align-items-start border-bottom pb-3'>
                        <Typography id="modal-modal-title" variant="h5">
                            {title}
                        </Typography>
                        {showCloseIcon &&
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        }
                    </Box>
                    {showModalBody &&
                        <Box py={3}>
                            {children}
                        </Box>
                    }
                    {showFooter ? <Box className='border-top pt-3 d-flex justify-content-end'>
                        {showCancelButton ? <Button variant="outlined" className='me-3' onClick={onClose}>{cancelLabel}</Button> : null}
                        {showSubmitButton ? <Button variant="contained" className='text-white' onClick={onSubmit}>{submitLabel}</Button> : null}
                    </Box> : null
                    }
                </ModalBody>
            </Modal>
        </div>
    )
}



CrmModel.propTypes = {
    show: PropTypes.bool,
    hideBackdrop: PropTypes.bool,
    width: PropTypes.number,
    title: PropTypes.string,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
    children: PropTypes.node,
    cancelLabel: PropTypes.string,
    submitLabel: PropTypes.string,
    showSubmitButton: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    showFooter: PropTypes.bool,
    showModalBody: PropTypes.bool,
    showCloseIcon: PropTypes.bool,
};

export default CrmModel;
