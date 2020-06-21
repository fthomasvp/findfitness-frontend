import moment from 'moment';

const Utils = {
  formatAddress: completeAddress => {
    const splitedAddress = completeAddress.split('|');
    const nullRegex = /null/i;

    const formatedAddress = {
      street: splitedAddress[0],
      number: nullRegex.test(splitedAddress[1]) ? '' : `, ${splitedAddress[1]}`,

      complemento: nullRegex.test(splitedAddress[2])
        ? ''
        : ` - ${splitedAddress[2]}`,

      neighboor: splitedAddress[3],

      referenceLocation: nullRegex.test(splitedAddress[4])
        ? 'Sem Ponto de Referência'
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

  isBeginDateTimeBeforeEndDateTime: (beginDateTime, endDateTime) => {
    return moment(beginDateTime).isBefore(moment(endDateTime));
  },
};

export default Utils;
