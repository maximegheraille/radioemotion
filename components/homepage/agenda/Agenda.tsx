import {
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { useQuery } from "react-query";
import { Agenda } from "../../../interfaces/agenda";
import { DateIsoConverter } from "../../shared/datetime/DateIsoConverter";
import LoadingState from "../../shared/LoadingState";
import Link from "next/link";

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
      {isLoading || isError ? (
        <>
          {[...Array(5)].map((agenda: Agenda, index: number) => (
            <div key={index} className="shadow-lg mb-4 lg:flex card">
              <LoadingState
                width="w-6/12"
                heigth="h-28"
                data={agenda?.photo}
                isLoading={isLoading}
                isError={isError}
              >
                <Image
                  width="435"
                  height="235"
                  src={agenda?.photo}
                  className="rounded-l-lg"
                />
              </LoadingState>
              <div className="p-2 text-center lg:text-left lg:w-6/12 lg:flex-shrink-0">
                <LoadingState
                  width="w-full"
                  heigth="h-4"
                  data={agenda?.title}
                  isLoading={isLoading}
                  isError={isError}
                >
                  <p className="text-lg font-medium line-clamp-2">
                    {agenda?.title}
                  </p>
                </LoadingState>
                <LoadingState
                  width="w-full"
                  heigth="h-4"
                  data={agenda?.commune}
                  isLoading={isLoading}
                  isError={isError}
                  classNames="my-4"
                >
                  <p className="py-1">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="mr-2 text-[#D53E3A]"
                    />
                    {agenda?.commune}
                  </p>
                </LoadingState>
                <LoadingState
                  width="w-full"
                  heigth="h-4"
                  data={DateIsoConverter(agenda?.event_date)}
                  isLoading={isLoading}
                  isError={isError}
                >
                  <p>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="mr-2 text-[#D53E3A]"
                    />
                    {DateIsoConverter(agenda?.event_date)}
                  </p>
                </LoadingState>
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
      {data &&
        data.map((agenda: Agenda, index: number) => (
          <Link key={index} href={`/agenda/${agenda.id}`}>
            <a>
              <div className="shadow-lg mb-4 lg:flex card">
                <Image
                  width="500"
                  height="235"
                  src={agenda?.photo}
                  className="rounded-t-lg lg:rounded-l-lg lg:rounded-r-none"
                />
                <div className="p-1 xl:p-2 text-center lg:w-6/12 xl:w-7/12 lg:text-left lg:flex-shrink-0">
                  <p className="text-base xl:text-lg font-semibold line-clamp-1">
                    {agenda.title}
                  </p>
                  <p className="xl:py-1">
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
            </a>
          </Link>
        ))}
    </div>
  );
};

export default Agendas;
