/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import { fetchPaymentsRequest } from '../../store/ducks/Student';
import Utils from '../../utils';
import DialogPaymentDetails from '../../components/DialogPaymentDetails';
import { tableIcons } from '../../assets/js/material-table-icons';

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
      // eslint-disable-next-line react/prop-types
      render: ({ studentGroup }) => (
        <Typography style={{ fontSize: '1.2rem' }}>
          {/* eslint-disable-next-line react/prop-types */}
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
      // eslint-disable-next-line react/prop-types
      render: ({ studentGroup }) => (
        <Typography style={{ fontSize: '1.2rem' }}>
          {/* eslint-disable-next-line react/prop-types */}
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
              'Hmmm... Parece que você ainda não entrou numa aula :(',
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
