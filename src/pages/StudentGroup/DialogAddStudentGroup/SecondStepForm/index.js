/* eslint-disable react/display-name */
import React, { forwardRef, useState } from 'react';
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

const SecondStepForm = ({
  activeStep,
  handleBack,
  handleNext,
  exercisesData,
}) => {
  const dispatch = useDispatch();

  const { createStudentGroup } = useSelector(state => state.studentGroup);
  const { secondStepData } = createStudentGroup;

  const [exerciseIds, setExerciseIds] = useState(secondStepData);

  const [selectedValue, setSelectedValue] = React.useState(0);

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
    },
    { title: 'DESCRIÇÃO', field: 'description', sorting: false },
  ];

  const handleClickNext = () => {
    dispatch(storeSecondStepForm([exerciseIds]));
    handleNext();
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Selecione uma atividade"
        columns={columns}
        data={exercisesData}
        options={{
          pageSizeOptions: [], // Don't show Row size option
          padding: 'dense',
        }}
        onRowClick={(event, rowData) => {
          setSelectedValue(rowData.id);
          setExerciseIds(rowData);
        }}
        style={{ marginBottom: '20px' }}
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
  exercisesData: PropTypes.array.isRequired,
};

export default SecondStepForm;
