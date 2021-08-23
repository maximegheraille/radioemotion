import {
  faCalendar,
  faCalendarAlt,
  faMapMarked,
  faMapMarkedAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import { Agenda } from "../../../interfaces/agenda";
import { DateIsoConverter } from "../../shared/datetime/DateIsoConverter";

const Agendas = () => {
  const { data, isLoading, isError } = useQuery(
    "agenda",
    async () => {
      const info = await fetch("/api/index/agenda");
      return info.json();
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div className="w-full">
      {data &&
        data.map((agenda: Agenda, index: number) => (
          <div
            key={index}
            className="shadow-lg mb-4 lg:flex text-black dark:text-white bg-[#E4E7EA] dark:bg-[#1F1F1E] rounded-lg"
          >
            <Image
              width="435"
              height="235"
              src={agenda?.photo}
              className="rounded-l-lg"
            />
            <div className="p-2 text-center lg:text-left lg:w-6/12 lg:flex-shrink-0">
              <p className="text-lg font-medium line-clamp-2">{agenda.titre}</p>
              <p className="py-1">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mr-2 text-[#D53E3A]"
                />
                {agenda.commune}
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-2 text-[#D53E3A]"
                />
                {DateIsoConverter(agenda.event_date)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Agendas;
