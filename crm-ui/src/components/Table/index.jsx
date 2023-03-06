import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
   Box, Table, TableBody, TableRow, TableHead, TableCell, TableContainer,
   TablePagination, Paper, Tooltip, Checkbox, IconButton, Button
} from '@mui/material';
import * as moment from 'moment'
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CrmModel from 'src/components/Model';
import NoDataFound from 'src/components/StyledComponents/NoDataFound';

const StyledBox = styled(Box)`
  .crm_table{
    width: 100%;  
  
  }
  .crm_thead{
    font-size: 0.8em;
    font-weight: 600;
    background-color: #eff4fa;
    height: 50px;
  }
  .crm_th{
    padding: 1em;
    color: black;
    font-weight: 600;
  }
  .crm_tr{
    background-color: #ffffff;
    font-size: 0.9em;
    padding: 5px;
  }
  .crm_table_column{
    min-width: 150px;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 5px 5px 5px 10px;
  }
  .crm_sticky_right_header_column{
   position: sticky;
   right: 0;
   background-color: #eff4fa;
   min-width: 50px !important;
   box-shadow: inset 1px 0px 0px #e0e0e0;
 }
  .crm_sticky_right_column{
    position: sticky;
    right: 0;
    background-color: #ffffff;
    min-width: 50px !important; 
    box-shadow: inset 1px 0px 0px #e0e0e0;
  }
  .crm_sticky_left_header_column{
   position: sticky;
   left: 0;
   background-color: #eff4fa;
   min-width: 50px !important;
   box-shadow: inset -1px 0px 0px #e0e0e0;
 }
  .crm_sticky_left_column{
    position: sticky;
    left: 0;
    background-color: #ffffff;
    min-width: 50px !important;
    box-shadow: inset -1px 0px 0px #e0e0e0;
  }

`

const StyledTablePagination = styled(TablePagination)`
      p{
         margin-bottom: 0px
      }
`

function CrmTable(props) {
   const { theaders, tbody, onBtnClick, onIconBtnClick, onClickEditBtn, onClickDeleteBtn, totalCount, onPageChange,
      defaultPage = 0, defaultRowsPerPage = 20, autoPagination = true, showPagination = true,
      onSelectRow, onSelectAll, selectedRows = [] , selectAll = false} = props;
   const [page, setPage] = useState(defaultPage);
   const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [selectedRow, setSelectedRow] = useState(null);

   useEffect(()=>
   {
      setPage(defaultPage);
   },[defaultPage])

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
      onPageChange({ page: newPage, rowsPerPage, defaultRowsPerPage })
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      onPageChange({ page: 0, rowsPerPage: parseInt(event.target.value, 10), defaultRowsPerPage })
   };

   const getTableColumnValue = (element, field) => {
      let fieldList = field.split('.');
      let newField = element;
      if (newField) {
         fieldList.forEach((f) => {
            newField = newField ? newField[f] : null;
         });
      }
      return newField ? newField : '';
   }


   const getTableCell = (row) => {
      const generatedRow = theaders.map((hitem) => {
         let column = '';
         if (hitem.type === 'text') {
            column = <Tooltip title={getTableColumnValue(row, hitem.field)} key={Math.random()}>
               <TableCell className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`}>
                  <Box component="span"> {getTableColumnValue(row, hitem.field)} </Box>
               </TableCell>
            </Tooltip>
         } else if (hitem.type === 'date') {
            column = <Tooltip title={moment(getTableColumnValue(row, hitem.field)).format("DD/MM/YYYY")} key={Math.random()}>
               <TableCell className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`}>
                  <Box component="span">
                     {getTableColumnValue(row, hitem.field) ? moment(getTableColumnValue(row, hitem.field)).format("DD/MM/YYYY") : "-"}
                  </Box>
               </TableCell>
            </Tooltip>
         } else if (hitem.type === 'link') {
            column = <Tooltip title={getTableColumnValue(row, hitem.field)} key={Math.random()}>
               <TableCell className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`}>
                  <Box component="a" href={getTableColumnValue(row, hitem.field)} target={'_blank'}> {getTableColumnValue(row, hitem.field)}  </Box>
               </TableCell>
            </Tooltip>
         }
         else if (hitem.type === 'image') {
            column = <TableCell key={Math.random()} className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`} >
               <img src={getTableColumnValue(row, hitem.field)} alt="no img" height={40} width={40} />
            </TableCell>
         }

         else if (hitem.type === 'status') {
            column = <Tooltip title={getTableColumnValue(row, hitem.field)} key={Math.random()}>
               <TableCell className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`}>
                  <Box> {getTableColumnValue(row, hitem.field)} </Box>
               </TableCell>
            </Tooltip>
         }
         else if (hitem.type === 'actions') {
            column = <TableCell key={Math.random()} className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`}>
               <Box display={'flex'} alignItems={'center'} >
                  {hitem.editBtn ?
                     <Tooltip title="Edit">
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={() => { onClickEditBtn({ row, column: hitem }) }}>
                           <EditIcon />
                        </IconButton>
                     </Tooltip>
                     : null
                  }
                  {hitem.deleteBtn ?
                     <Tooltip title="Delete">
                        <IconButton color="secondary" aria-label="add to shopping cart" onClick={() => { setSelectedRow({ row, column: hitem }); setShowDeleteModal(true); }}>
                           <DeleteIcon />
                        </IconButton>
                     </Tooltip> : null
                  }

               </Box>
            </TableCell>
         }
         else if (hitem.type === 'iconbtn') {
            column = <TableCell key={Math.random()} className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`} >
               <IconButton color={hitem.color ? hitem.color : "primary"} variant={hitem.variant ? hitem.variant : "text"} onClick={() => { onIconBtnClick({ row, column: hitem }) }}>
                  {hitem.icon}
               </IconButton>
            </TableCell>
         }
         else if (hitem.type === 'button') {
            column = <TableCell key={Math.random()} className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`} >
               <Button color={hitem.color ? hitem.color : "primary"} variant={hitem.variant ? hitem.variant : "text"} onClick={() => { onBtnClick({ row, column: hitem }) }}
                  startIcon={hitem.icon}>
                  {hitem.label}
               </Button>
            </TableCell>
         }
         else if (hitem.type === 'element') {
            column = <TableCell key={Math.random()} className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`}>
               <Box> {getTableColumnValue(row, hitem.field)}</Box>
            </TableCell>
         }
         else if (hitem.type === 'checkbox') {
            column =
               // <Tooltip title={'Select row'} key={Math.random()}>
               <TableCell key={Math.random()} className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`}>
                  <Checkbox checked={selectedRows.includes(getTableColumnValue(row, hitem.field))} onChange={(e) => { onSelectRow(e.target.checked, { row, column: hitem }) }} />
               </TableCell>
            // </Tooltip>
         }
         else {
            column = <TableCell key={Math.random()} className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_column' : ''}`}>
               <Box component="span"> - </Box>
            </TableCell>
         }
         return column;
      })
      return generatedRow;
   }

   const getTableRow = (rows) => {
      return rows.map((row, index) =>
         <TableRow key={index} hover tabIndex={-1} className={'crm_tr'}>
            {getTableCell(row)}
         </TableRow>
      )
   }

   return (
      <StyledBox>
         <Box>
            <Paper sx={{ width: '100%', mb: 2 }}>
               <TableContainer style={{ width: '100%', overflowX: 'auto' }} className='scrollbar-grey'>
                  <Table className={'crm_table'} >
                     <TableHead className={'crm_thead '}>
                        <TableRow className={'crm_th '} >
                           {theaders && theaders.map((hitem, index) => (
                              <Tooltip title={hitem.label} key={index} >
                                 <TableCell className={`crm_table_column ${hitem.stickyRight ? 'crm_sticky_right_header_column' : ''} ${hitem.stickyLeft ? 'crm_sticky_left_header_column' : ''}`}>
                                    <Box component="span">
                                       {hitem.type === 'checkbox' ? <Tooltip title={'Select All'}>
                                          <Checkbox checked={selectAll} onChange={(e) => { onSelectAll(e.target.checked, hitem, index) }} />
                                       </Tooltip> : ''
                                       }
                                       {hitem.label}
                                    </Box>
                                 </TableCell>
                              </Tooltip>
                           ))}
                        </TableRow>
                     </TableHead>

                     {tbody.length ?
                        <TableBody>
                           {tbody && autoPagination ? getTableRow(tbody.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)) : getTableRow(tbody)}
                        </TableBody> :
                        <TableBody>
                           <TableRow className={'crm_tr'}>
                              <TableCell colSpan={theaders.length}>
                                 <NoDataFound />
                              </TableCell>
                           </TableRow>
                        </TableBody>
                     }
                  </Table>
               </TableContainer>

               {showPagination &&
                  <StyledTablePagination
                     rowsPerPageOptions={[10, 15, 20, 25, 50, 100]}
                     component="div"
                     count={totalCount}
                     rowsPerPage={rowsPerPage}
                     page={page}
                     onPageChange={handleChangePage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                     showFirstButton={true}
                     showLastButton={true}
                  />}
            </Paper>
         </Box>

         <CrmModel show={showDeleteModal} title={'Are you sure do you want to delete!'}
            width={550} submitLabel={'Yes'} cancelLabel={'No'} showCloseIcon={false}
            showModalBody={false} onClose={() => { setShowDeleteModal(false) }}
            onSubmit={() => { onClickDeleteBtn(selectedRow); setShowDeleteModal(false) }}
         />
      </StyledBox>
   );
}


CrmTable.propTypes = {
   theaders: PropTypes.array,
   tbody: PropTypes.array,
   onBtnClick: PropTypes.func,
   onIconBtnClick: PropTypes.func,
   onClickEditBtn: PropTypes.func,
   onClickDeleteBtn: PropTypes.func,
   totalCount: PropTypes.number,
   onPageChange: PropTypes.func,
   defaultPage: PropTypes.number,
   defaultRowsPerPage: PropTypes.number,
   autoPagination: PropTypes.bool,
   showPagination: PropTypes.bool,
   onSelectRow: PropTypes.func,
   onSelectAll: PropTypes.func,
   selectedRows: PropTypes.array,
   selectAll: PropTypes.bool,
};


export default CrmTable