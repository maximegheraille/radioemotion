import { NextApiRequest, NextApiResponse } from "next";
import { Song } from "../../../interfaces/song";
var mysql = require("mysql");
const post = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (process.env.dev_local === "true") {
      const data: Song[] = [
        {
          id: 5086,
          // youtube: "https://youtu.be/NIj-L1Gu1MM",
          youtube: "",
          apple_music:
            "https://itunes.apple.com/fr/album/your-latest-trick/id7593643?i=7593713&uo=6&at=10luqD&ct=&mt=1&app=music",
          photo: "1",
          artiste: "Dire Straits",
          //artiste: "",
          titre: "So Far Away",
          //  titre: "",
          voted: false,
          votes: 50,
        },
        // {
        //   id: 52105,
        //   youtube: "https://youtu.be/NIj-L1Gu1MM",
        //   apple_music:
        //     "https://geo.music.apple.com/be/album/love-is-back/1544501544?i=1544502069&itsct=music_box&itscg=30200&at=10luqD&ct=songs_love_is_back&app=music&ls=1",
        //   photo: "1",
        //   artiste: "Celeste",
        //   titre: "Love Is Back",
        //   voted: false,
        //   votes: 150,
        // },
        // {
        //   id: 1437,
        //   youtube: "0",
        //   apple_music:
        //     "https://geo.music.apple.com/be/album/best-of-my-love/170522776?i=170522819&mt=1&app=music&at=10luqD",
        //   photo: "1",
        //   artiste: "Emotions",
        //   titre: "Best of my love",
        //   voted: false,
        //   votes: 2,
        // },
        // {
        //   id: 270,
        //   youtube: "0",
        //   apple_music:
        //     "https://geo.music.apple.com/be/album/you-dont-fool-me/1440821736?i=1440822697&itsct=music_box&itscg=30200&at=10luqD&ct=songs_you_don%27t_fool_me&app=music&ls=1",
        //   photo: "1",
        //   artiste: "Queen",
        //   titre: "You Don't Fool Me",
        //   voted: false,
        //   votes: 45,
        // },
      ];
      res.status(200).json(data[Math.floor(Math.random() * data.length)]);
    } else {
      var connection = mysql.createConnection({
        host: "localhost",
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      connection.query(
        "SELECT * FROM current_song",
        function (error: any, results: any, _fields: any) {
          if (error) {
            console.log(error);
            throw error;
          }
          // res.status(200).json({ test: "test" });
          if (results[0].photo === "0") {
            results[0].photo = "";
          } else {
            results[0].photo = `https://www.radioemotion.be/covers/${results[0].id}.jpg`;
          }
          if (results[0].youtube === "0") {
            results[0].youtube = "";
          }
          connection.query(
            `SELECT * FROM votusers WHERE ((voter = '${req.connection.remoteAddress}') AND (item = ${results[0].id} ))`,
            function (error: any, results2: any, _fields: any) {
              console.log(results2.length);
              if (error) {
                //throw error;
                results[0].voted = false;
                res.status(200).json(results[0]);
              } else if (results2.length > 0) {
                results[0].voted = true;
                res.status(200).json(results[0]);
              } else {
                results[0].voted = false;
                res.status(200).json(results[0]);
              }
              console.log(results[0]);
            }
          );
          // connection.destroy();
        }
      );
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default post;
