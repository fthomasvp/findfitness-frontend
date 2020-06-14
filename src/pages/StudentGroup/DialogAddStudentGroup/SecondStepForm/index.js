/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

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
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import { storeSecondStepForm } from '../../../../store/ducks/StudentGroup';
import { searchExercisesRequest } from '../../../../store/ducks/Exercise';

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

const SecondStepForm = ({ activeStep, handleBack, handleNext }) => {
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
      title: 'NOME',
      field: 'name',
      headerStyle: {
        fontSize: '1.2rem',
      },
      cellStyle: {
        fontSize: '1.2rem',
        color: '#d3d3d3',
      },
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
      <MaterialTable
        icons={tableIcons}
        title="Selecione uma atividade"
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
        options={{
          pageSizeOptions: [], // Don't show Row size option
          padding: 'dense',
        }}
        onRowClick={(event, rowData) => {
          setSelectedValue(rowData.id);
          setExerciseIds(rowData);
        }}
        localization={{
          toolbar: {
            searchPlaceholder: 'Buscar',
            searchTooltip: 'Buscar',
          },
          body: {
            emptyDataSourceMessage: 'Poxa! Ainda não há atividades cadastradas',
          },
          pagination: {
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página',
          },
        }}
        style={{ marginBottom: '20px', fontSize: '1.2rem' }}
      />

      {/* Step Control Buttons */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
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
      </div>
    </div>
  );
};

SecondStepForm.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default SecondStepForm;
