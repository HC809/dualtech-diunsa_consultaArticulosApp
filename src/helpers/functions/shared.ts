import moment from "moment";
import "moment/locale/es";

//SetTimeout Load TEST
export const setTimeoutTest = (delay: number) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
};

//Formato numero con dos decimales
export function ToNumber(number: number) {
  return Number(number.toFixed(2));
}

//Obtener Fecha Actual
export const currentDate = (fecha: Date) => {
  fecha.setTime(fecha.getTime() - new Date().getTimezoneOffset() * 60 * 1000);

  return fecha;
};

//Formato Fecha
export const dateNormalFormat = (fecha: Date) => {
  let initDate = moment(fecha);
  initDate.locale("es");

  return `${initDate.format("L")}`;
};

//Formato Hora
export const hourFormat = (fecha: Date) => {
  let initDate = moment(fecha);

  return `${initDate.format("h:mm:ss a")}`;
};

//UTC fecha
export const getUtcDate = (fecha: Date) => {
  return new Date(
    new Date(fecha).setTime(
      new Date(fecha).getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
  );
};

export const addZeroes = (num: number): string => {
  const dec = num.toString().split(".")[1];
  const len = dec && dec.length > 2 ? dec.length : 2;

  const result = Number(num).toFixed(len);
  return `L ${result.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
};

export const addZeroesWithoutL = (num: number): string => {
  const dec = num.toString().split(".")[1];
  const len = dec && dec.length > 2 ? dec.length : 2;

  const result = Number(num).toFixed(len);
  return result.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
