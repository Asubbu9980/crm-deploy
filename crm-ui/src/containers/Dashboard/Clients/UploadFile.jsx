import React, { useState } from 'react'
import { DropzoneArea } from 'react-mui-dropzone'
import CrmModel from 'src/components/Model';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Box } from '@mui/system';
import { uploadClients } from 'src/apis/clients';
import { error, success } from 'src/hooks/Toasters';
import CrmTable from 'src/components/Table';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAppLoaderContext } from 'src/context/LoaderContext';

const theaders = [
    { label: "Email", field: "email", type: "text" },
    { label: "Message", field: "message", type: "text" },
    { label: "Status", field: "status", type: "status" },
]
const StyledDropzoneAreaContainer = Styled(Box)`
.MuiDropzoneArea-root{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.MuiDropzonePreviewList-root{
    justify-content: center;
}
.MuiDropzonePreviewList-image {
    height: 30px;
}
.css-r1hick-MuiGrid-root>.MuiGrid-item{
    display: -webkit-inline-box;

}
.css-ahj2mt-MuiTypography-root{
    margin-left: 5px;
}
`

function UploadFile(props) {
    const { showUploadFileModel, setShowUploadFileModel, reloadClients } = props;
    const [uploadedClients, setUploadedClients] = useState([])
    const [showDropBox, setShowDropBox] = useState(true)
    const { startLoading } = useAppLoaderContext();

    const [file, setFile] = useState({
        file: "",
        fileName: ""
    })

    const handleChange = async (e) => {
        if (e.length) {
            setFile({
                file: e[0],
                fileName: e[0].name
            })
        }
    }

    const onSubmit = () => {
        if (!file.fileName) {
            error("Upload CSV file");
            return null;
        }

        startLoading(true);
        const formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileName", file.fileName);
        uploadClients(formData).then(res => {
            startLoading(false);
            if (res.status === 200) {
                success(res.message);
                const uploadedClientsRes = res.data.map(cl => {
                    return {
                        ...cl,
                        status: cl.status ? <CheckCircleOutlineIcon color={"success"} /> : <HighlightOffIcon color={"error"} />
                    }
                })
                setUploadedClients(uploadedClientsRes);
                setShowDropBox(false);
                reloadClients()

            } else {
                error(res.message);
            }
        });

    }
    const onCloseModel = () => {
        setShowUploadFileModel(false);
        setFile({
            file: "",
            fileName: ""
        })
        setUploadedClients([]);
        setShowDropBox(true);
    }


    return (
        <div >
            <CrmModel show={showUploadFileModel} onSubmit={onSubmit} onClose={onCloseModel} showFooter={showDropBox}
                width={700} title={"Upload File"}
            >
                {showDropBox ?
                    <StyledDropzoneAreaContainer>
                        <DropzoneArea onChange={handleChange}
                            acceptedFiles={['.csv', '.xlsx']}
                            showAlerts={false}
                            showFileNames={true}
                        />
                    </StyledDropzoneAreaContainer>
                    :
                    <CrmTable theaders={theaders} tbody={uploadedClients} totalCount={uploadedClients.length} defaultRowsPerPage={10} 
                    onPageChange={(e)=>{}}/>
                }
            </CrmModel>

        </div>
    )
}

UploadFile.propTypes = {
    showUploadFileModel: PropTypes.bool,
    setShowUploadFileModel: PropTypes.func,
    reloadClients: PropTypes.func,
}
export default UploadFile




