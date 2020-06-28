/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import { storeSecondStepForm } from '../../../../store/ducks/StudentGroup';
import { searchExercisesRequest } from '../../../../store/ducks/Exercise';
import { ContainerActionButtons, ActionButtons } from '../styles';
import { tableIcons } from '../../../../assets/js/material-table-icons';

const ActivityStep = ({ activeStep, handleBack, handleNext }) => {
  const dispatch = useDispatch();

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
    },
    {
      title: 'DESCRIÇÃO',
      field: 'description',
      sorting: false,
      hidden: true,
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
              <div style={{ display: 'flex', flex: 1, padding: '15px' }}>
                <div style={{ display: 'flex', width: '20%' }}>
                  <img
                    src="https://media.istockphoto.com/vectors/cartoon-people-doing-wrist-extension-stretch-exercise-vector-id540566306"
                    width="100%"
                    height="100%"
                    alt="Activity Example"
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: '80%',
                    marginLeft: '45px',
                    fontSize: '1.2rem',
                    color: '#d3d3d3',
                  }}
                >
                  {rowData.description}
                </div>
              </div>
            );
          }}
          onRowClick={(event, rowData) => {
            setSelectedValue(rowData.id);
            setExerciseIds(rowData);
          }}
          options={{
            padding: 'dense',
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
            pageSize: 4,
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
          style={{ fontSize: '1.2rem' }}
        />
      </div>

      {/* Step Control Buttons */}
      <ContainerActionButtons>
        <ActionButtons>
          <div>
            <Button
              disabled={activeStep === 0}
              color="secondary"
              onClick={handleBack}
            >
              Voltar
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickNext}
              disabled={!exerciseIds || exerciseIds.length === 0}
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
