import React from "react";

const mentionslegales = () => {
  return (
    <div className="flex flex-col dark:text-white text-center py-16">
      <h1 className="text-lg pb-4">MENTIONS LEGALES</h1>
      <p>Queen ASBL</p>
      <p>Grand-Place Baudouin Ier, 3</p>
      <p>1420 Braine-l’Alleud</p>
      <br></br>
      <p>N° d’entreprise : 0423 561 386</p>
      <a href="tel: 02 318 66 39">Tel : 02 318 66 39</a>
      <p>
        <a href="https://www.radioemotion.be" target="_blank">
          Site internet : www.radioemotion.be
        </a>
      </p>
      <p>
        Mail : <a href="mailto:info@radioemotion.be">info@radioemotion.be</a>
      </p>
      <br />
      <h1 className="text-lg pb-4">Membres du Conseil d’administration :</h1>
      <ul className="space-y-2 list-disc list-inside">
        <li>Derek Copain</li>
        <li>Danny Ghéraille</li>
        <li>Loïc Van Deun</li>
      </ul>
      <br />
      <h1 className="text-lg pb-4">Membres de l’assemblée générale :</h1>
      <ul className="space-y-2 list-disc list-inside">
        <li>Derek Copain</li>
        <li>Danny Ghéraille</li>
        <li>Loïc Van Deun</li>
        <li>Frédéric Remy</li>
      </ul>
      <br />
      <p className="">
        Les informations détaillées au sujet du service Emotion et de l’éditeur
        Queen ASBL sont consultables sur le site du Conseil supérieur de
        l’audiovisuel :{" "}
        <a href="https://www.csa.be/service/emotion/" target="_blanc">
          csa
        </a>
      </p>
    </div>
  );
};

export default mentionslegales;
