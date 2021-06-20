export const getWeekDay = (): string => {
  const date = new Date();
  console.log("weekday" + date.getDay());
  switch (date.getDay()) {
    case 1:
      return "LUNDI";
    case 2:
      return "MARDI";
    case 3:
      return "MERCREDI";
    case 4:
      return "JEUDI";
    case 5:
      return "VENDREDI";
    case 6:
      return "SAMEDI";
    case 7:
      return "DIMANCHE";
    default:
      return "LUNDI";
  }
};
