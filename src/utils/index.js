import moment from 'moment';

const Utils = {
  formatAddress: completeAddress => {
    const splitedAddress = completeAddress.split('|');

    const formatedAddress = {
      street: splitedAddress[0],
      number: splitedAddress[1] !== 'null' ? splitedAddress[1] : 'Sem Número',
      complemento:
        splitedAddress[2] !== 'null' ? splitedAddress[2] : 'Sem Complemento',
      neighboor:
        splitedAddress[3] !== 'null' ? splitedAddress[3] : 'Sem Bairro',
      referenceLocation:
        splitedAddress[4] !== 'null'
          ? splitedAddress[4]
          : 'Sem Ponto de Referência',
      city: splitedAddress[5],
      state: splitedAddress[6],
    };

    return formatedAddress;
  },

  formatDateTime: dateTimeString => {
    let formatedDateTime = '';

    if (dateTimeString && typeof dateTimeString === 'string') {
      formatedDateTime = moment(dateTimeString).format('DD/MM/YYYY - HH:mm');
    }

    return formatedDateTime;
  },

  formatPhone: phoneString => {
    const DDD = `${phoneString[0]}${phoneString[1]}`;
    const number = `${phoneString.slice(2, 7)}-${phoneString.slice(7)}`;

    return `(${DDD}) ${number}`;
  },
};

export default Utils;
