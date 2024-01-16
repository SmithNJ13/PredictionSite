const client = require("./setup")
const url = "https://fbref.com/en/squads/18bb7c10/Arsenal-Stats"
const axios = require("axios")
const cheerio = require("cheerio")

const premierLeagueMatches = [];

axios(url)
    .then(response => {
        const HTML = response.data;
        const $ = cheerio.load(HTML);

        $("td.left[data-stat='comp']:has(a:contains('Premier League'))").each((index, compElement) => {
            const competition = $(compElement).find("a").text().trim();
            if (competition === "Premier League") {
                const matchDate = $(compElement).closest("tr").find("th.left[data-stat='date']").text().trim();
                const opponent = $(compElement).closest("tr").find("td.left[data-stat='opponent'] a").text().trim();
                const xgFor = $(compElement).closest("tr").find("td.right[data-stat='xg_for']").text().trim();
                const xgAgainst = $(compElement).closest("tr").find("td.right[data-stat='xg_against']").text().trim();

                if (xgFor !== "" || xgAgainst !== "") {
                    const matchInfo = {
                        date: matchDate,
                        opponent: opponent,
                        xG: xgFor,
                        xGA: xgAgainst
                    };
                    premierLeagueMatches.push(matchInfo);
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    const seedUsers = async () => {
        try{
            await client.connect()
            await client.db("database").collection("users").drop()
            await client.db("database").collection("users").insertOne({
                _id: 0,
                username: "Admin",
                email: "Admin@Admin.com",
                password: "yP96XKfPLR"
                
            })
            console.log("USERS SEEDED!")
            await client.close()
        } catch (error) {
            console.log(error)
        }
    }

    const seedDB = async (matchesArray) => {
        try {
            await client.connect();
            await client.db("database").collection("statistics").createIndex({ date: 1, opponent: 1 }, { unique: true });
    
            for (const match of matchesArray) {
                try {
                    await client.db("database").collection("statistics").insertOne({
                        date: match.date,
                        opponent: match.opponent,
                        xG: parseFloat(match.xG),
                        xGA: parseFloat(match.xGA)
                    });
                    console.log(`Inserted match for ${match.date} - ${match.opponent}`);
                } catch (insertError) {
                    if (insertError.code !== 11000) {
                        console.error('Error inserting match:', insertError);
                    } else {
                    }
                }
            }
            console.log("MATCHES SEEDED!")
            await client.close();
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
    };
    
    seedUsers()
    seedDB(premierLeagueMatches);
