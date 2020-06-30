import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import TextField from '@material-ui/core/TextField';

import * as StudentGroupReducer from '../../store/ducks/StudentGroup';
import { DialogTitle, DialogContent, DialogActions } from './styles';

const DialogStudentGroupEvaluation = ({ open, handleClose, evaluation }) => {
  const dispatch = useDispatch();

  const {
    id,
    liked,
    commentary,
    student: { id: idStudent },
    idStudentGroup,
  } = evaluation;

  const [isGoodSelected, setIsGoodSelected] = useState(false);
  const [isBadSelected, setIsBadSelected] = useState(false);
  const [textCommentary, setTextCommentary] = useState('');

  const handleChangeGoodEvaluation = () => {
    setIsGoodSelected(true);

    setIsBadSelected(false);
  };

  const handleChangeBadEvaluation = () => {
    setIsGoodSelected(false);

    setIsBadSelected(true);
  };

  const handleChangeCommentary = event => {
    setTextCommentary(event.target.value);
  };

  const clearEvaluation = () => {
    setIsGoodSelected(false);
    setIsBadSelected(false);

    setTextCommentary('');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="evaluation"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="evaluation"
        onClose={handleClose}
        style={{ textAlign: 'center' }}
      >
        Avalie sua aula!
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {id !== 0 ? (
            <>
              <Grid container justify="center" item xs={12} sm={6}>
                {!liked ? (
                  <IconButton disabled={id !== 0}>
                    <ThumbDownIcon fontSize="large" color="secondary" />
                  </IconButton>
                ) : (
                  <IconButton disabled={id !== 0}>
                    <ThumbDownOutlinedIcon fontSize="large" color="secondary" />
                  </IconButton>
                )}
              </Grid>

              <Grid container justify="center" item xs={12} sm={6}>
                {liked ? (
                  <IconButton disabled={id !== 0}>
                    <ThumbUpIcon fontSize="large" color="primary" />
                  </IconButton>
                ) : (
                  <IconButton disabled={id !== 0}>
                    <ThumbUpOutlinedIcon fontSize="large" color="primary" />
                  </IconButton>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="commentary"
                  label="Comentários livres"
                  variant="outlined"
                  defaultValue={commentary}
                  multiline
                  rows={2}
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  disabled={id !== 0}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid container justify="center" item xs={12} sm={6}>
                {isBadSelected ? (
                  <IconButton onClick={handleChangeBadEvaluation}>
                    <ThumbDownIcon fontSize="large" color="secondary" />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleChangeBadEvaluation}>
                    <ThumbDownOutlinedIcon fontSize="large" color="secondary" />
                  </IconButton>
                )}
              </Grid>

              <Grid container justify="center" item xs={12} sm={6}>
                {isGoodSelected ? (
                  <IconButton onClick={handleChangeGoodEvaluation}>
                    <ThumbUpIcon fontSize="large" color="primary" />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleChangeGoodEvaluation}>
                    <ThumbUpOutlinedIcon fontSize="large" color="primary" />
                  </IconButton>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Comentários livres"
                  variant="outlined"
                  value={textCommentary}
                  onChange={handleChangeCommentary}
                  multiline
                  rows={2}
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          autoFocus
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleClose();

            clearEvaluation();
          }}
        >
          Voltar
        </Button>
        {id === 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();

              // `isBadSelected` precisa tá negado, pois se for verdadeiro, seu real valor
              // enviado para o Backend deverá ser `falso`
              const evaluation = {
                liked: isGoodSelected || !isBadSelected,
                commentary: textCommentary,
              };

              dispatch(
                StudentGroupReducer.createStudentEvaluationRequest(
                  idStudentGroup,
                  idStudent,
                  evaluation
                )
              );

              clearEvaluation();
            }}
            // disabled={id !== 0}
          >
            Avaliar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

DialogStudentGroupEvaluation.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DialogStudentGroupEvaluation;
