import moment from 'moment';

const Utils = {
  formatAddress: completeAddress => {
    const splitedAddress = completeAddress.split('|');

    const formatedAddress = {
      street: splitedAddress[0],
      number: !splitedAddress[1] ? ', Sem número' : `, ${splitedAddress[1]}`,

      complemento: !splitedAddress[2]
        ? ' - Sem complemento'
        : ` - ${splitedAddress[2]}`,

      neighboor: splitedAddress[3],

      referenceLocation: !splitedAddress[4]
        ? 'Sem ponto de referência'
        : splitedAddress[4],

      city: `, ${splitedAddress[5]}`,
      state: ` - ${splitedAddress[6]}`,
    };

    return formatedAddress;
  },

  formatDateTime: dateTimeString => {
    let formatedDateTime = '';

    if (dateTimeString && typeof dateTimeString === 'string') {
      formatedDateTime = moment(dateTimeString).format('DD/MM/YYYY HH:mm');
    }

    return formatedDateTime;
  },

  formatPhone: phoneString => {
    const DDD = `${phoneString[0]}${phoneString[1]}`;
    const number = `${phoneString.slice(2, 7)}-${phoneString.slice(7)}`;

    return `(${DDD}) ${number}`;
  },

  formatDateTimeToDatabase: dateTime => {
    let formatedDateTime = '';

    if (dateTime) {
      formatedDateTime = moment(dateTime).format('YYYY-MM-DD HH:mm:ss');
    }

    return formatedDateTime;
  },

  formatDateToDatabase: date => {
    let formatedDateTime = '';

    if (date) {
      formatedDateTime = moment(date).format('YYYY-MM-DD');
    }

    return formatedDateTime;
  },

  dateToDisplay: date => {
    let formatedDate = '';

    if (date) {
      formatedDate = moment(date).format('DD/MM/YYYY');
    }

    return formatedDate;
  },

  isBeginDateTimeBeforeEndDateTime: (beginDateTime, endDateTime) => {
    return moment(beginDateTime).isBefore(moment(endDateTime));
  },
};

export default Utils;
