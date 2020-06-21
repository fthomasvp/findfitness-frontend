/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Typography from '@material-ui/core/Typography';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import { fetchPaymentsRequest } from '../../store/ducks/Student';
import Utils from '../../utils';
import DialogPaymentDetails from '../../components/DialogPaymentDetails';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const StudentGroup = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.user.id);
  const { payments, pagination } = useSelector(state => state.student);

  const [openPaymentDetails, setOpenPaymentDetails] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleClosePaymentDetails = () => setOpenPaymentDetails(false);

  /**
   * Table Columns
   */
  const columns = [
    {
      title: 'Quando',
      field: 'studentGroup[eventDateTimeBegin]',
      defaultSort: 'desc',
      render: ({ studentGroup }) => (
        <Typography style={{ fontSize: '1.2rem' }}>
          {Utils.formatDateTime(studentGroup.eventDateTimeBegin)}
        </Typography>
      ),
    },
    {
      title: 'Exercício',
      field: 'studentGroup[exercises][0][name]',
    },
    {
      title: 'Personal',
      field: 'studentGroup[personal][name]',
    },
    {
      title: 'Preço',
      field: 'studentGroup[eventPrice]',
      render: ({ studentGroup }) => (
        <Typography style={{ fontSize: '1.2rem' }}>
          R$ {studentGroup.eventPrice}
        </Typography>
      ),
    },
  ];

  /**
   * Effects
   */
  useEffect(() => {
    dispatch(fetchPaymentsRequest(userId, pagination));
  }, [dispatch, userId, pagination]);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title=""
        columns={columns}
        data={payments}
        actions={[
          {
            icon: () => <OpenInBrowserIcon />,
            tooltip: 'Ver detalhes',
            onClick: (event, rowData) => {
              setOpenPaymentDetails(true);

              setSelectedPayment(rowData);
            },
          },
        ]}
        options={{
          pageSizeOptions: [], // Don't show Row size option
          actionsColumnIndex: -1, // Add actions on the end of row
          headerStyle: {
            fontSize: '1.2rem',
          },
          cellStyle: {
            fontSize: '1.2rem',
            color: '#d3d3d3',
          },
          searchFieldStyle: {
            fontSize: '1.2rem',
          },
          paginationType: 'stepped',
        }}
        localization={{
          toolbar: {
            searchPlaceholder: 'Buscar',
            searchTooltip: 'Buscar',
          },
          body: {
            emptyDataSourceMessage:
              'Hmmm... Parece que você ainda não entrou numa aula ;-(',
          },
          pagination: {
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página',
          },
          header: {
            actions: 'Detalhes',
          },
        }}
        style={{ padding: '30px' }}
      />

      {selectedPayment && (
        <DialogPaymentDetails
          open={openPaymentDetails}
          handleClose={handleClosePaymentDetails}
          payment={selectedPayment}
        />
      )}
    </div>
  );
};

export default StudentGroup;
