/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { storeSecondStepForm } from '../../../../store/ducks/student_group';
import { searchExercisesRequest } from '../../../../store/ducks/exercise';
import {
  tableIcons,
  tableOptions,
  tableLocalization,
} from '../../../../assets/js/material-table';
import { useGlobalStyles } from '../../../../global/styles';
import { ContainerActionButtons, ActionButtons } from '../styles';

const ActivityStep = ({ activeStep, handleBack, handleNext }) => {
  const dispatch = useDispatch();
  const globalClasses = useGlobalStyles();

  const secondStepData = useSelector(
    state => state.studentGroup.createStudentGroup.secondStepData
  );

  const { pagination, exercises } = useSelector(state => state.exercise);

  const [exerciseIds, setExerciseIds] = useState(secondStepData);

  // Se o usuário voltar um step, o Radio ainda estará marcado
  const [selectedValue, setSelectedValue] = useState(exerciseIds[0]);

  /**
   * Table Columns
   */
  const columns = [
    {
      render: rowData => (
        <Radio
          checked={selectedValue === rowData.id}
          value={selectedValue}
          name="radio_button"
        />
      ),
    },
    {
      title: 'ATIVIDADE',
      field: 'name',
      render: rowData => (
        <Typography
          color="textSecondary"
          className={globalClasses.primaryTypography}
        >
          {rowData.name}
        </Typography>
      ),
    },
    {
      title: 'DESCRIÇÃO',
      field: 'description',
      sorting: false,
      hidden: true,
      render: rowData => (
        <Typography
          color="textSecondary"
          className={globalClasses.primaryTypography}
        >
          {rowData.description}
        </Typography>
      ),
    },
  ];

  const handleClickNext = () => {
    dispatch(storeSecondStepForm([exerciseIds]));
    handleNext();
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(searchExercisesRequest(pagination));
    }
  }, [dispatch, exercises, pagination]);

  return (
    <div>
      <div
        style={{
          maxHeight: '390px',
          overflowY: 'auto',
        }}
      >
        <MaterialTable
          icons={tableIcons}
          title=""
          columns={columns}
          data={exercises}
          detailPanel={rowData => {
            return (
              <Grid item xs={12}>
                <Grid container style={{ padding: '10px' }}>
                  <Grid container justify="center" item xs={12} sm={3}>
                    <div>
                      <img
                        src={rowData.picture}
                        width="200px"
                        height="200px"
                        alt="Activity Example"
                      />
                    </div>
                  </Grid>

                  <Grid container justify="center" item xs={12} sm={9}>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      className={globalClasses.primaryTypography}
                    >
                      {rowData.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          }}
          onRowClick={(event, rowData) => {
            setSelectedValue(rowData.id);
            setExerciseIds(rowData);
          }}
          options={{
            ...tableOptions,
            padding: 'dense',
            pageSize: 4,
          }}
          localization={{
            ...tableLocalization,
            body: {
              emptyDataSourceMessage:
                'Hmmm... Parece que você ainda não entrou numa aula :(',
            },
            header: {
              actions: 'Detalhes',
            },
          }}
        />
      </div>

      {/* Step Control Buttons */}
      <ContainerActionButtons>
        <ActionButtons>
          <div>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              className={globalClasses.secondaryButton}
            >
              Voltar
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickNext}
              disabled={!exerciseIds || exerciseIds.length === 0}
              className={globalClasses.primaryButton}
            >
              Próximo
            </Button>
          </div>
        </ActionButtons>
      </ContainerActionButtons>
    </div>
  );
};

ActivityStep.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default ActivityStep;
