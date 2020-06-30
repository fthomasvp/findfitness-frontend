/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

import { fetchPaymentsRequest } from '../../store/ducks/Student';
import * as StudentGroupReducer from '../../store/ducks/StudentGroup';
import * as PersonalReducer from '../../store/ducks/Personal';
import Utils from '../../utils';
import DialogPaymentDetails from '../../components/DialogPaymentDetails';
import DialogStudentGroupEvaluation from '../../components/DialogStudentGroupEvaluation';
import Alert from '../../components/Alert';
import { tableIcons } from '../../assets/js/material-table-icons';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

const StudentGroup = () => {
  const dispatch = useDispatch();
  const INITIAL_STUDENT_EVALUATION = {
    commentary: '',
    id: 0,
    liked: false,
    student: {
      id: 0,
      name: '',
      profilePicture: '',
    },
    idStudentGroup: 0,
  };

  const { id: userId, profile } = useSelector(state => state.auth.user);
  const { payments, pagination } = useSelector(state => state.student);
  const { studentGroupsFromPersonal } = useSelector(state => state.personal);

  const [openPaymentDetails, setOpenPaymentDetails] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [studentEvaluation, setStudentEvaluation] = useState(
    INITIAL_STUDENT_EVALUATION
  );
  const [openDialogEvaluation, setOpenDialogEvaluation] = useState(false);

  const handleClosePaymentDetails = () => setOpenPaymentDetails(false);
  const handleCloseDialogEvaluation = () => {
    setStudentEvaluation(INITIAL_STUDENT_EVALUATION);
    setOpenDialogEvaluation(false);
  };

  /**
   * Material Table info
   */
  const personalColumns = [
    {
      title: 'Quando',
      field: 'eventDateTimeBegin',
      defaultSort: 'desc',
      render: rowData => (
        <Typography style={{ fontSize: '1.2rem' }}>
          {Utils.formatDateTime(rowData.eventDateTimeBegin)}
        </Typography>
      ),
    },
    {
      title: 'Atividade',
      field: 'exercises[0][name]',
    },
    {
      title: 'Personal',
      field: 'personal[name]',
    },
    {
      title: 'Preço',
      field: 'eventPrice',
      render: rowData => (
        <Typography style={{ fontSize: '1.2rem' }}>
          R$ {rowData.eventPrice}
        </Typography>
      ),
    },
  ];

  const studentColumns = [
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
      title: 'Atividade',
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

  const personalActions = [
    {
      icon: () => <OpenInBrowserIcon color="primary" />,
      tooltip: 'Ver detalhes',
      onClick: (event, rowData) => {
        setOpenPaymentDetails(true);

        setSelectedPayment({ studentGroup: rowData });
      },
    },
  ];

  const studentActions = [
    {
      icon: () => <OpenInBrowserIcon color="primary" />,
      tooltip: 'Ver detalhes',
      onClick: (event, rowData) => {
        setOpenPaymentDetails(true);

        setSelectedPayment(rowData);
      },
    },
    {
      icon: () => <ThumbsUpDownIcon color="primary" />,
      tooltip: 'Avaliar aula',
      onClick: (event, rowData) => {
        const { student, studentGroup } = rowData;

        // Verificar se o estudante já possui avaliação
        const storedEvaluation = studentGroup.studentEvaluations.find(
          evaluation => evaluation.student.id === student.id
        );

        // Caso não possua, add alguns dados do estudante mesmo assim
        const studentInfo = {
          id: student.id,
          name: student.name,
          profilePicture: student.profilePicture,
        };

        setStudentEvaluation({
          ...studentEvaluation,
          ...storedEvaluation,
          student: {
            ...studentInfo,
          },
          idStudentGroup: studentGroup.id,
        });

        // Abrir o modal
        setOpenDialogEvaluation(true);
      },
    },
  ];

  /**
   * Alert
   */
  const error = useSelector(state => state.studentGroup.error);
  const response = useSelector(state => state.studentGroup.response);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [growTransition, setGrowTransition] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setAlertMessage('');
    setGrowTransition(false);

    dispatch(StudentGroupReducer.clearSnackbar());
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (profile === 'ROLE_PERSONAL') {
      dispatch(PersonalReducer.fetchPersonalStudentGroupsRequest(userId));
    } else {
      dispatch(fetchPaymentsRequest(userId, pagination));
    }
  }, [dispatch, userId, pagination, profile]);

  useEffect(() => {
    // Display snackbar Error message
    if (error && error.status !== 200) {
      setAlertMessage(error.data?.message || error.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    if (response && response.status === 201) {
      setAlertMessage('Obrigado por avaliar sua aula!');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      dispatch(fetchPaymentsRequest(userId, pagination));
    }
  }, [error, response, dispatch, userId, pagination]);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title=""
        columns={profile === 'ROLE_PERSONAL' ? personalColumns : studentColumns}
        data={
          profile === 'ROLE_PERSONAL' ? studentGroupsFromPersonal : payments
        }
        actions={profile === 'ROLE_PERSONAL' ? personalActions : studentActions}
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
            actions: '',
          },
        }}
      />

      {selectedPayment && (
        <DialogPaymentDetails
          open={openPaymentDetails}
          handleClose={handleClosePaymentDetails}
          payment={selectedPayment}
          profile={profile}
        />
      )}

      {studentEvaluation && (
        <DialogStudentGroupEvaluation
          open={openDialogEvaluation}
          handleClose={handleCloseDialogEvaluation}
          evaluation={studentEvaluation}
        />
      )}

      <Alert
        open={openAlert}
        handleClose={handleCloseAlert}
        growTransition={growTransition}
        message={alertMessage}
        severity={severity}
      />
    </div>
  );
};

export default StudentGroup;
